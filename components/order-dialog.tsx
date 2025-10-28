"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface OrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productTitle?: string
}

export function OrderDialog({ open, onOpenChange, productTitle }: OrderDialogProps) {
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
          productTitle,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при отправке")
      }

      setIsSubmitted(true)
      setFormData({ name: "", phone: "", message: "" })

      setTimeout(() => {
        setIsSubmitted(false)
        onOpenChange(false)
      }, 5000)
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {productTitle ? `Заказать ${productTitle}` : "Оставить заявку"}
          </DialogTitle>
          <DialogDescription>
            Заполните форму и мы свяжемся с вами в течение 15 минут для уточнения деталей заказа
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="dialog-name">Ваше имя *</Label>
            <Input
              id="dialog-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Иван Иванов"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="dialog-phone">Телефон *</Label>
            <Input
              id="dialog-phone"
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
            <Label htmlFor="dialog-message">Комментарий</Label>
            <Textarea
              id="dialog-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Укажите объем и адрес доставки"
              className="mt-2 min-h-[100px]"
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

          <Button type="submit" className="w-full h-12" disabled={isSubmitting || isSubmitted}>
            {isSubmitting ? "Отправка..." : isSubmitted ? "Заявка отправлена!" : "Отправить заявку"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
