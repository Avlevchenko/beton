import { MessageCircle, Phone, Mail } from "lucide-react"
import type { CityData } from "@/lib/cities"

interface FooterProps {
  city?: CityData
}

export function Footer({ city }: FooterProps) {
  const locationText = city
    ? `Производство и доставка качественного бетона в ${city.namePrepositional} и Калининградской области с 2009 года`
    : "Производство и доставка качественного бетона в Калининграде и области с 2009 года"

  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">Б</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">БетонПрямо</h3>
                <p className="text-xs opacity-80">Завод-производитель</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">{locationText}</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <div className="space-y-3">
              <a
                href="tel:+74012345678"
                className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
              >
                <Phone className="h-4 w-4" />
                +7 (401) 234-56-78
              </a>
              <a
                href="mailto:info@betonpryamo.ru"
                className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
              >
                <Mail className="h-4 w-4" />
                info@betonpryamo.ru
              </a>
              <a
                href="https://wa.me/74012345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Режим работы</h4>
            <div className="space-y-2 text-sm">
              <p>Понедельник - Пятница: 8:00 - 20:00</p>
              <p>Суббота - Воскресенье: 9:00 - 18:00</p>
              <p className="opacity-80 mt-4">г. Калининград, ул. Производственная, 15</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
          <p>© 2025 БетонПрямо. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
