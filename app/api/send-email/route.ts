import { NextResponse } from "next/server"
import { getFullConfig } from "@/app/api/config/route"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, message, productTitle } = body

    if (!name || !phone) {
      return NextResponse.json({ error: "Имя и телефон обязательны для заполнения" }, { status: 400 })
    }

    const config = getFullConfig()

    // Telegram: берем из конфига админки, если пусто - из env
    const botToken = config.telegramBotToken || process.env.TELEGRAM_BOT_TOKEN
    const chatId = config.telegramChatId || process.env.TELEGRAM_CHAT_ID

    const messageSubject = productTitle ? `Новая заявка на ${productTitle}` : "Новая заявка с сайта"

    const telegramMessage = `
${messageSubject}

Имя: ${name}
Телефон: ${phone}
${productTitle ? `Продукт: ${productTitle}` : ""}
${message ? `\nКомментарий:\n${message}` : ""}

Сайт: ${config.companyName}
Дата: ${new Date().toLocaleString("ru-RU")}
    `.trim()

    let telegramSent = false

    // Отправка в Telegram
    if (botToken && chatId) {
      try {
        const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
        const response = await fetch(telegramApiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: telegramMessage }),
        })

        if (response.ok) {
          telegramSent = true
        } else {
          const errorData = await response.json()
          console.error("[v0] Telegram error:", errorData.description)
        }
      } catch (err) {
        console.error("[v0] Telegram fetch error:", err)
      }
    }

    // Дублирование на email
    let emailSent = false
    const notificationEmail = config.notificationEmail

    if (notificationEmail) {
      try {
        // Используем бесплатный сервис отправки через Telegram бота
        // или формируем mailto-ссылку для логирования
        const emailSubject = encodeURIComponent(messageSubject)
        const emailBody = encodeURIComponent(
          `Имя: ${name}\nТелефон: ${phone}\n${productTitle ? `Продукт: ${productTitle}\n` : ""}${message ? `Комментарий: ${message}\n` : ""}Дата: ${new Date().toLocaleString("ru-RU")}`
        )

        // Если есть SMTP настройки в env - отправляем через nodemailer
        const smtpHost = process.env.SMTP_HOST
        const smtpUser = process.env.SMTP_USER
        const smtpPass = process.env.SMTP_PASSWORD

        if (smtpHost && smtpUser && smtpPass) {
          const nodemailer = await import("nodemailer")
          const transporter = nodemailer.default.createTransport({
            host: smtpHost,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === "true",
            auth: { user: smtpUser, pass: smtpPass },
          })

          await transporter.sendMail({
            from: process.env.SMTP_FROM || smtpUser,
            to: notificationEmail,
            subject: messageSubject,
            text: `Имя: ${name}\nТелефон: ${phone}\n${productTitle ? `Продукт: ${productTitle}\n` : ""}${message ? `Комментарий: ${message}\n` : ""}Дата: ${new Date().toLocaleString("ru-RU")}`,
            html: `
              <h2>${messageSubject}</h2>
              <p><strong>Имя:</strong> ${name}</p>
              <p><strong>Телефон:</strong> <a href="tel:${phone}">${phone}</a></p>
              ${productTitle ? `<p><strong>Продукт:</strong> ${productTitle}</p>` : ""}
              ${message ? `<p><strong>Комментарий:</strong> ${message}</p>` : ""}
              <p><strong>Дата:</strong> ${new Date().toLocaleString("ru-RU")}</p>
            `,
          })
          emailSent = true
        } else {
          console.log(`[v0] Email notification would be sent to: ${notificationEmail}`)
          console.log(`[v0] Subject: ${messageSubject}`)
          console.log(`[v0] To enable email, add SMTP_HOST, SMTP_USER, SMTP_PASSWORD env vars`)
        }
      } catch (err) {
        console.error("[v0] Email send error:", err)
      }
    }

    if (!telegramSent && !emailSent && (botToken || notificationEmail)) {
      return NextResponse.json(
        { error: "Ошибка отправки уведомлений. Проверьте настройки Telegram или Email в админке." },
        { status: 500 }
      )
    }

    if (!botToken && !chatId && !notificationEmail) {
      return NextResponse.json(
        { error: "Не настроены каналы уведомлений. Укажите Telegram бота или Email в админ-панели." },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, telegramSent, emailSent })
  } catch (error) {
    console.error("[v0] Server error:", error)
    return NextResponse.json({ error: "Произошла ошибка сервера" }, { status: 500 })
  }
}
