import { NextResponse } from "next/server"

export async function GET() {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      return NextResponse.json(
        {
          error: "Telegram не настроен",
          hasBotToken: !!botToken,
          hasChatId: !!chatId,
        },
        { status: 500 },
      )
    }

    // Test bot token validity
    const botInfoUrl = `https://api.telegram.org/bot${botToken}/getMe`
    const botInfoResponse = await fetch(botInfoUrl)
    const botInfo = await botInfoResponse.json()

    if (!botInfoResponse.ok) {
      return NextResponse.json(
        {
          error: "Неверный токен бота",
          details: botInfo.description,
        },
        { status: 500 },
      )
    }

    // Send test message
    const testMessage = "✅ Тестовое сообщение - Telegram настроен правильно!"
    const sendMessageUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    const sendResponse = await fetch(sendMessageUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: testMessage,
      }),
    })

    const sendResult = await sendResponse.json()

    if (!sendResponse.ok) {
      return NextResponse.json(
        {
          error: "Ошибка отправки сообщения",
          botInfo: botInfo.result,
          sendError: sendResult.description,
          chatId: chatId,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      botInfo: botInfo.result,
      messageId: sendResult.result.message_id,
      chatId: chatId,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Произошла ошибка",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
