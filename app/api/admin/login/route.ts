import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      return NextResponse.json({ error: "ADMIN_PASSWORD не настроен на сервере" }, { status: 500 })
    }

    if (password === adminPassword) {
      return NextResponse.json({ success: true, token: adminPassword })
    }

    return NextResponse.json({ error: "Неверный пароль" }, { status: 401 })
  } catch {
    return NextResponse.json({ error: "Ошибка авторизации" }, { status: 500 })
  }
}
