import { NextResponse } from "next/server"
import { writeFile } from "node:fs/promises"
import { join } from "node:path"

export async function POST(request: Request) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD
    const authHeader = request.headers.get("authorization")

    if (!adminPassword || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string

    if (!file) {
      return NextResponse.json({ error: "Файл не загружен" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = file.name.split(".").pop() || "png"
    const filename = `${type}-${Date.now()}.${ext}`
    const filepath = join(process.cwd(), "public", "uploads", filename)

    await writeFile(filepath, buffer)

    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch {
    return NextResponse.json({ error: "Ошибка загрузки файла" }, { status: 500 })
  }
}
