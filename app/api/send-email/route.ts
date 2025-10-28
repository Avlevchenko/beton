import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, message, productTitle } = body

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json({ error: "Имя и телефон обязательны для заполнения" }, { status: 400 })
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

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

    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Telegram API error:", errorData)
      return NextResponse.json({ error: "Ошибка отправки в Telegram" }, { status: 500 })
    }

    const result = await response.json()
    console.log("[v0] Message sent to Telegram successfully:", result.result.message_id)
    return NextResponse.json({ success: true, messageId: result.result.message_id })
  } catch (error) {
    console.error("[v0] Server error:", error)
    return NextResponse.json({ error: "Произошла ошибка сервера" }, { status: 500 })
  }
}
