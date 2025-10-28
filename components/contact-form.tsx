"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin } from "lucide-react"
import type { CityData } from "@/lib/cities"

interface ContactFormProps {
  city?: CityData
}

export function ContactForm({ city }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          city: city?.name || "Калининград",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при отправке")
      }

      setIsSubmitted(true)
      setFormData({ name: "", phone: "", message: "" })

      setTimeout(() => setIsSubmitted(false), 8000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact-form" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Получить расчет стоимости</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Оставьте заявку и мы свяжемся с вами в течение 15 минут
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Ваше имя *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Иван Иванов"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Комментарий</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Укажите марку бетона, объем и адрес доставки"
                  className="mt-2 min-h-[120px]"
                />
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}

              {isSubmitted && (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <h3 className="font-bold text-lg mb-2 text-primary">Спасибо за заявку!</h3>
                  <p className="text-sm text-muted-foreground">
                    Ваша заявка успешно отправлена. Наш менеджер свяжется с вами в ближайшее время для уточнения деталей
                    заказа.
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Телефон</h3>
                  <a href="tel:+74012345678" className="text-lg font-medium hover:text-primary transition-colors">
                    +7 (401) 234-56-78
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Ежедневно 8:00 - 20:00</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Email</h3>
                  <a
                    href="mailto:info@betonpryamo.ru"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    info@betonpryamo.ru
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Ответим в течение часа</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Адрес завода</h3>
                  <p className="text-lg font-medium">Калининград</p>
                  <p className="text-sm text-muted-foreground mt-1">ул. Производственная, 15</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
