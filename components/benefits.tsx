import { Truck, Clock, Shield, Percent } from "lucide-react"
import { Card } from "@/components/ui/card"

const benefits = [
  {
    icon: Truck,
    title: "Собственный автопарк",
    description: "Более 20 миксеров для доставки в любую точку области",
  },
  {
    icon: Clock,
    title: "Доставка за 2 часа",
    description: "Быстрая подача бетона точно в срок",
  },
  {
    icon: Shield,
    title: "Гарантия качества",
    description: "Сертифицированная продукция с паспортом качества",
  },
  {
    icon: Percent,
    title: "Цены от завода",
    description: "Экономия до 30% без посредников",
  },
]

export function Benefits() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
