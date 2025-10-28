"use client"

import { Card } from "@/components/ui/card"
import { Factory, Award, Clock, Shield, Truck, Calculator, HeadphonesIcon, CheckCircle2, Zap } from "lucide-react"
import type { CityData } from "@/lib/cities"

interface AdvantagesProps {
  city?: CityData
}

export function Advantages({ city }: AdvantagesProps) {
  const cityNamePrepositional = city?.namePrepositional || "Калининграде"
  const cityNameGenitive = city?.nameGenitive || "Калининграда"
  const cityName = city?.name

  const advantages = [
    {
      icon: Factory,
      title: "Собственное производство",
      description: "Работаем напрямую от завода-производителя без посредников. Контролируем качество на каждом этапе.",
    },
    {
      icon: Award,
      title: "Сертифицированная продукция",
      description:
        "Все марки бетона соответствуют ГОСТ. Предоставляем паспорта качества и сертификаты на каждую партию.",
    },
    {
      icon: Clock,
      title: "Доставка точно в срок",
      description: `Собственный автопарк из 15+ миксеров. Доставляем бетон в ${cityName || "любую точку"} в течение 2 часов с момента заказа.`,
    },
    {
      icon: Shield,
      title: "Гарантия качества",
      description: "Даем официальную гарантию на всю продукцию. Лабораторный контроль каждой партии бетона.",
    },
    {
      icon: Calculator,
      title: "Прозрачное ценообразование",
      description: "Цены напрямую от производителя без наценок. Точный расчет необходимого объема бетона.",
    },
    {
      icon: Truck,
      title: "Бесплатная доставка",
      description: `При заказе от 10 м³ доставка в ${cityName || "Калининград"} бесплатно. Работаем по всей области.`,
    },
    {
      icon: HeadphonesIcon,
      title: "Техподдержка 24/7",
      description: "Консультируем по выбору марки бетона и расчету объема. Всегда на связи по телефону и WhatsApp.",
    },
    {
      icon: CheckCircle2,
      title: "Работаем с НДС",
      description: "Полный пакет документов для юридических лиц. Работаем по договору с отсрочкой платежа.",
    },
    {
      icon: Zap,
      title: "Современное оборудование",
      description: "Автоматизированный бетонный узел последнего поколения. Высокая точность дозирования компонентов.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Преимущества работы с нами</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Более 10 лет на рынке производства и поставки бетона в {cityNamePrepositional} и Калининградской области
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{advantage.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{advantage.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">10+</div>
            <div className="text-sm text-muted-foreground">лет на рынке</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">50 000+</div>
            <div className="text-sm text-muted-foreground">м³ бетона в год</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">2 000+</div>
            <div className="text-sm text-muted-foreground">довольных клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">15+</div>
            <div className="text-sm text-muted-foreground">автомиксеров</div>
          </div>
        </div>
      </div>
    </section>
  )
}
