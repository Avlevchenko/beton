"use client"

import { MessageCircle, Phone, Mail } from "lucide-react"
import type { CityData } from "@/lib/cities"
import { useConfig } from "@/components/config-provider"

interface FooterProps {
  city?: CityData
}

export function Footer({ city }: FooterProps) {
  const config = useConfig()

  const locationText = city
    ? `Производство и доставка качественного бетона в ${city.namePrepositional} и Калининградской области с 2009 года`
    : "Производство и доставка качественного бетона в Калининграде и области с 2009 года"

  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {config.logoImage ? (
                <img src={config.logoImage || "/placeholder.svg"} alt={config.companyName} className="w-10 h-10 rounded-lg object-contain" />
              ) : (
                <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">{config.logoText}</span>
                </div>
              )}
              <p className="text-xl font-bold">{config.companyName}</p>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">{locationText}</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <div className="space-y-3">
              <a
                href={`tel:${config.phone}`}
                className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
              >
                <Phone className="h-4 w-4" />
                {config.phoneFormatted}
              </a>
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
              >
                <Mail className="h-4 w-4" />
                {config.email}
              </a>
              <a
                href={config.whatsapp || config.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
              >
                <MessageCircle className="h-4 w-4" />
                {config.whatsapp ? "WhatsApp" : "Telegram"}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Режим работы</h4>
            <div className="space-y-2 text-sm">
              <p>{config.workHoursWeekdays}</p>
              <p>{config.workHoursWeekends}</p>
              <p className="opacity-80 mt-4">г. {config.addressCity}, {config.address}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>© 2025 {config.companyName}. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
