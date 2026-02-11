"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Lock, Save, LogOut, Phone, MessageCircle, Mail, MapPin,
  Building, Eye, Upload, ImageIcon, Globe, RussianRuble, Send, Bell,
} from "lucide-react"
import type { SiteConfig, PriceItem } from "@/lib/site-config"
import Link from "next/link"

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [loginError, setLoginError] = useState("")
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [uploading, setUploading] = useState<string | null>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const faviconInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedToken = sessionStorage.getItem("admin_token")
    if (savedToken) {
      setToken(savedToken)
      setIsAuthed(true)
      loadConfig(savedToken)
    }
  }, [])

  const loadConfig = async (authToken?: string) => {
    try {
      const t = authToken || token
      const res = await fetch("/api/config", {
        headers: t ? { Authorization: `Bearer ${t}` } : {},
      })
      const data = await res.json()
      setConfig(data)
    } catch {
      console.error("Ошибка загрузки конфигурации")
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setLoginError(data.error || "Неверный пароль")
        return
      }

      setToken(data.token)
      sessionStorage.setItem("admin_token", data.token)
      setIsAuthed(true)
      setPassword("")
      loadConfig(data.token)
    } catch {
      setLoginError("Ошибка подключения к серверу")
    }
  }

  const handleSave = async () => {
    if (!config) return
    setIsSaving(true)
    setSaveMessage("")

    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(config),
      })

      const data = await res.json()

      if (!res.ok) {
        setSaveMessage(`Ошибка: ${data.error}`)
        return
      }

      setSaveMessage("Настройки успешно сохранены!")
      setTimeout(() => setSaveMessage(""), 4000)
    } catch {
      setSaveMessage("Ошибка сохранения")
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    setIsAuthed(false)
    setToken("")
    setConfig(null)
    sessionStorage.removeItem("admin_token")
  }

  const updateField = (field: keyof SiteConfig, value: string) => {
    if (!config) return
    setConfig({ ...config, [field]: value })
  }

  const updatePrice = (slug: string, newPrice: string) => {
    if (!config) return
    const updatedPrices = config.prices.map((p) =>
      p.slug === slug ? { ...p, price: newPrice } : p
    )
    setConfig({ ...config, prices: updatedPrices })
  }

  const handleFileUpload = async (file: File, type: "logo" | "favicon") => {
    setUploading(type)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        setSaveMessage(`Ошибка загрузки: ${data.error}`)
        return
      }

      if (type === "logo") {
        updateField("logoImage", data.url)
      } else {
        updateField("faviconUrl", data.url)
      }
    } catch {
      setSaveMessage("Ошибка загрузки файла")
    } finally {
      setUploading(null)
    }
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Вход в админ-панель</CardTitle>
            <p className="text-muted-foreground text-sm mt-2">Введите пароль для доступа к настройкам сайта</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="mt-2"
                  required
                />
              </div>

              {loginError && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  {loginError}
                </div>
              )}

              <Button type="submit" className="w-full h-12">
                <Lock className="h-4 w-4 mr-2" />
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <p className="text-muted-foreground">Загрузка настроек...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Админ-панель</h1>
              <p className="text-xs text-muted-foreground">Управление настройками сайта</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild className="bg-transparent">
              <Link href="/" target="_blank">
                <Eye className="h-4 w-4 mr-2" />
                Открыть сайт
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="bg-transparent">
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {saveMessage && (
          <div
            className={`mb-6 p-4 rounded-lg border text-sm font-medium ${
              saveMessage.includes("Ошибка")
                ? "bg-destructive/10 border-destructive/20 text-destructive"
                : "bg-primary/10 border-primary/20 text-primary"
            }`}
          >
            {saveMessage}
          </div>
        )}

        <div className="space-y-6">
          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Основная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Название компании</Label>
                <Input
                  id="companyName"
                  value={config.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Logo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                Логотип
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <p className="text-sm text-muted-foreground mb-2">Текущий логотип:</p>
                  <div className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-muted/50">
                    {config.logoImage ? (
                      <img src={config.logoImage || "/placeholder.svg"} alt="Логотип" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-3xl">{config.logoText}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <Label>Загрузить изображение логотипа</Label>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">PNG или SVG, рекомендуемый размер 200x200px</p>
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(file, "logo")
                      }}
                    />
                    <Button
                      variant="outline"
                      onClick={() => logoInputRef.current?.click()}
                      disabled={uploading === "logo"}
                      className="bg-transparent"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {uploading === "logo" ? "Загрузка..." : "Выбрать файл"}
                    </Button>
                  </div>
                  {config.logoImage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateField("logoImage", "")}
                      className="text-destructive hover:text-destructive"
                    >
                      Удалить изображение (вернуть букву)
                    </Button>
                  )}
                  {!config.logoImage && (
                    <div>
                      <Label htmlFor="logoText">Или текст логотипа (1-2 символа)</Label>
                      <Input
                        id="logoText"
                        value={config.logoText}
                        onChange={(e) => updateField("logoText", e.target.value.slice(0, 2))}
                        maxLength={2}
                        className="mt-2 w-24"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Favicon */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Favicon (иконка вкладки браузера)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <p className="text-sm text-muted-foreground mb-2">Текущий favicon:</p>
                  <div className="w-16 h-16 rounded-lg border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-muted/50">
                    {config.faviconUrl ? (
                      <img src={config.faviconUrl || "/placeholder.svg"} alt="Favicon" className="w-full h-full object-contain" />
                    ) : (
                      <Globe className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <Label>Загрузить favicon</Label>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">ICO, PNG или SVG, рекомендуемый размер 32x32px или 64x64px</p>
                    <input
                      ref={faviconInputRef}
                      type="file"
                      accept="image/*,.ico"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(file, "favicon")
                      }}
                    />
                    <Button
                      variant="outline"
                      onClick={() => faviconInputRef.current?.click()}
                      disabled={uploading === "favicon"}
                      className="bg-transparent"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {uploading === "favicon" ? "Загрузка..." : "Выбрать файл"}
                    </Button>
                  </div>
                  {config.faviconUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateField("faviconUrl", "")}
                      className="text-destructive hover:text-destructive"
                    >
                      Удалить favicon (вернуть стандартный)
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RussianRuble className="h-5 w-5 text-primary" />
                Цены на бетон
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Измените цены и они обновятся на всех страницах сайта
              </p>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="text-left px-4 py-3 text-sm font-semibold">Марка бетона</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold">Цена за м3 (руб.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {config.prices.map((item) => (
                      <tr key={item.slug} className="border-b last:border-b-0">
                        <td className="px-4 py-3">
                          <span className="font-semibold text-base">Бетон {item.grade}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground text-sm">от</span>
                            <Input
                              value={item.price}
                              onChange={(e) => updatePrice(item.slug, e.target.value)}
                              className="w-32"
                              placeholder="0"
                            />
                            <span className="text-muted-foreground text-sm shrink-0">{'руб/м\u00B3'}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Контактные данные
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phoneFormatted">Телефон (отображаемый)</Label>
                  <Input
                    id="phoneFormatted"
                    value={config.phoneFormatted}
                    onChange={(e) => updateField("phoneFormatted", e.target.value)}
                    placeholder="+7 (401) 234-56-78"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон (для ссылки, без пробелов)</Label>
                  <Input
                    id="phone"
                    value={config.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+74012345678"
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input
                    id="email"
                    type="email"
                    value={config.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="info@betonpryamo.ru"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messengers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Мессенджеры
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="whatsapp">Ссылка на WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={config.whatsapp}
                  onChange={(e) => updateField("whatsapp", e.target.value)}
                  placeholder="https://wa.me/74012345678"
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">{'Формат: https://wa.me/7XXXXXXXXXX'}</p>
              </div>
              <div>
                <Label htmlFor="telegram">Ссылка на Telegram</Label>
                <Input
                  id="telegram"
                  value={config.telegram}
                  onChange={(e) => updateField("telegram", e.target.value)}
                  placeholder="https://t.me/username"
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">{'Формат: https://t.me/username'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Notifications - Telegram Bot */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Telegram-бот для заявок
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                Укажите данные Telegram-бота для получения заявок с сайта. Создайте бота через @BotFather и получите токен.
              </div>
              <div>
                <Label htmlFor="telegramBotToken">Токен бота (Bot Token)</Label>
                <Input
                  id="telegramBotToken"
                  value={config.telegramBotToken}
                  onChange={(e) => updateField("telegramBotToken", e.target.value)}
                  placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                  className="mt-2 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">Получите у @BotFather в Telegram</p>
              </div>
              <div>
                <Label htmlFor="telegramChatId">Chat ID (ID чата для получения заявок)</Label>
                <Input
                  id="telegramChatId"
                  value={config.telegramChatId}
                  onChange={(e) => updateField("telegramChatId", e.target.value)}
                  placeholder="356221353"
                  className="mt-2 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {"Напишите боту /start, затем откройте api.telegram.org/bot<TOKEN>/getUpdates для получения ID"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notification Email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Дублирование заявок на Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                Укажите email для дублирования заявок. Заявки будут приходить и в Telegram, и на указанный адрес.
              </div>
              <div>
                <Label htmlFor="notificationEmail">Email для заявок</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input
                    id="notificationEmail"
                    type="email"
                    value={config.notificationEmail}
                    onChange={(e) => updateField("notificationEmail", e.target.value)}
                    placeholder="info@promo-links.ru"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Для работы email-уведомлений необходимо добавить SMTP_HOST, SMTP_USER, SMTP_PASSWORD в переменные окружения
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Адрес
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="addressCity">Город</Label>
                  <Input
                    id="addressCity"
                    value={config.addressCity}
                    onChange={(e) => updateField("addressCity", e.target.value)}
                    placeholder="Калининград"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Адрес</Label>
                  <Input
                    id="address"
                    value={config.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="ул. Производственная, 15"
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Режим работы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="workHoursWeekdays">Будние дни</Label>
                <Input
                  id="workHoursWeekdays"
                  value={config.workHoursWeekdays}
                  onChange={(e) => updateField("workHoursWeekdays", e.target.value)}
                  placeholder="Понедельник - Пятница: 8:00 - 20:00"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="workHoursWeekends">Выходные дни</Label>
                <Input
                  id="workHoursWeekends"
                  value={config.workHoursWeekends}
                  onChange={(e) => updateField("workHoursWeekends", e.target.value)}
                  placeholder="Суббота - Воскресенье: 9:00 - 18:00"
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border mt-8 -mx-4 px-4 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <p className="text-sm text-muted-foreground">
              Не забудьте сохранить после внесения изменений
            </p>
            <Button onClick={handleSave} disabled={isSaving} size="lg" className="min-w-[200px]">
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Сохранение..." : "Сохранить настройки"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
