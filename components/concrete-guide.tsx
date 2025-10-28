"use client"

import { Card } from "@/components/ui/card"
import { Building2, Home, Factory, Warehouse, Truck, Hammer } from "lucide-react"
import type { CityData } from "@/lib/cities"

const concreteUsage = [
  {
    grade: "М100-М150",
    icon: Hammer,
    title: "Подготовительные работы",
    uses: ["Подготовка под фундамент", "Заливка дорожек", "Бетонная подготовка", "Благоустройство территории"],
    color: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    grade: "М200",
    icon: Home,
    title: "Малоэтажное строительство",
    uses: ["Ленточные фундаменты", "Стяжки полов", "Отмостки", "Садовые дорожки", "Площадки"],
    color: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    grade: "М250-М300",
    icon: Building2,
    title: "Жилое строительство",
    uses: ["Монолитные фундаменты", "Плиты перекрытий", "Лестницы", "Колонны", "Стены"],
    color: "bg-green-50 dark:bg-green-950/30",
  },
  {
    grade: "М350",
    icon: Factory,
    title: "Промышленное строительство",
    uses: ["Монолитные конструкции", "Несущие стены", "Колонны высотных зданий", "Чаши бассейнов"],
    color: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    grade: "М400",
    icon: Warehouse,
    title: "Специальные конструкции",
    uses: ["Гидротехнические сооружения", "Мосты", "Банковские хранилища", "Объекты с высокими нагрузками"],
    color: "bg-red-50 dark:bg-red-950/30",
  },
  {
    grade: "М450-М500",
    icon: Truck,
    title: "Особо прочные конструкции",
    uses: ["Дамбы и плотины", "Метро и тоннели", "Взлетные полосы", "Специальные объекты"],
    color: "bg-indigo-50 dark:bg-indigo-950/30",
  },
]

interface ConcreteGuideProps {
  city?: CityData
}

export function ConcreteGuide({ city }: ConcreteGuideProps) {
  const cityNamePrepositional = city?.namePrepositional || "Калининграде"

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Какой бетон для чего использовать?</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Подробное руководство по выбору марки бетона для строительства в {cityNamePrepositional}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {concreteUsage.map((item, index) => {
            const Icon = item.icon
            return (
              <Card key={index} className={`p-6 hover:shadow-lg transition-shadow ${item.color}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{item.grade}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {item.uses.map((use, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="p-8 max-w-4xl mx-auto bg-primary/5 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Не уверены в выборе марки бетона?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Наши специалисты помогут подобрать оптимальную марку бетона для вашего проекта в {cityNamePrepositional} с
              учетом всех технических требований и условий эксплуатации
            </p>
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Получить консультацию
            </a>
          </Card>
        </div>
      </div>
    </section>
  )
}
