import { NextResponse } from "next/server"
import { defaultConfig, type SiteConfig } from "@/lib/site-config"

let siteConfig: SiteConfig = { ...defaultConfig }

// Экспорт для внутреннего использования серверными API
export function getFullConfig(): SiteConfig {
  return siteConfig
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  const adminPassword = process.env.ADMIN_PASSWORD
  const isAdmin = adminPassword && authHeader === `Bearer ${adminPassword}`

  if (isAdmin) {
    // Админ получает полный конфиг включая токены
    return NextResponse.json(siteConfig)
  }

  // Публичный конфиг без секретных данных
  const { telegramBotToken, telegramChatId, notificationEmail, ...publicConfig } = siteConfig
  return NextResponse.json(publicConfig)
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      return NextResponse.json({ error: "ADMIN_PASSWORD не настроен" }, { status: 500 })
    }

    if (authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: "Неверный пароль" }, { status: 401 })
    }

    const body = await request.json()
    siteConfig = { ...siteConfig, ...body }

    return NextResponse.json({ success: true, config: siteConfig })
  } catch {
    return NextResponse.json({ error: "Ошибка сохранения" }, { status: 500 })
  }
}
