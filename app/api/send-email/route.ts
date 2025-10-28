import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, message, productTitle } = body

    console.log("[v0] Received form data:", { name, phone, hasMessage: !!message, productTitle })

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json({ error: "Имя и телефон обязательны для заполнения" }, { status: 400 })
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    console.log("[v0] Telegram config:", {
      hasBotToken: !!botToken,
      botTokenLength: botToken?.length,
      chatId: chatId,
      chatIdType: typeof chatId,
    })

    if (!botToken || !chatId) {
      console.error("[v0] Missing Telegram credentials")
      return NextResponse.json({ error: "Telegram не настроен" }, { status: 500 })
    }

    const messageSubject = productTitle ? `🔔 Новая заявка на ${productTitle}` : "🔔 Новая заявка с сайта"

    const telegramMessage = `
${messageSubject}

👤 Имя: ${name}
📱 Телефон: ${phone}
${productTitle ? `📦 Продукт: ${productTitle}` : ""}
${message ? `\n💬 Комментарий:\n${message}` : ""}

🌐 Сайт: betonpryamo.ru
📅 Дата: ${new Date().toLocaleString("ru-RU")}
    `.trim()

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    console.log("[v0] Sending to Telegram API:", {
      url: telegramApiUrl.replace(botToken, "***TOKEN***"),
      chatId,
      messageLength: telegramMessage.length,
    })

    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Telegram API error response:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      })

      // Return more helpful error message
      let userMessage = "Ошибка отправки в Telegram"
      if (errorData.description?.includes("chat not found")) {
        userMessage = "Неверный Chat ID. Проверьте правильность ID чата."
      } else if (errorData.description?.includes("bot was blocked")) {
        userMessage = "Бот заблокирован. Разблокируйте бота в Telegram."
      } else if (errorData.description?.includes("Unauthorized")) {
        userMessage = "Неверный токен бота. Проверьте TELEGRAM_BOT_TOKEN."
      }

      return NextResponse.json(
        {
          error: userMessage,
          details: errorData.description || "Неизвестная ошибка",
        },
        { status: 500 },
      )
    }

    const result = await response.json()
    console.log("[v0] Message sent successfully! Message ID:", result.result?.message_id)
    return NextResponse.json({ success: true, messageId: result.result?.message_id })
  } catch (error) {
    console.error("[v0] Server error:", error)
    return NextResponse.json({ error: "Произошла ошибка сервера" }, { status: 500 })
  }
}
