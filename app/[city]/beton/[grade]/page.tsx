import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Package, Truck, Clock, Shield } from "lucide-react"
import { OrderDialog } from "@/components/order-dialog"
import { getConcreteGradeBySlug, getAllConcreteGradeSlugs } from "@/lib/concrete-grades"
import { getCityBySlug, getAllCitySlugs } from "@/lib/cities"

export const dynamicParams = false

export async function generateStaticParams() {
  const citySlugs = getAllCitySlugs()
  const gradeSlugs = getAllConcreteGradeSlugs()

  const params = []
  for (const city of citySlugs) {
    for (const grade of gradeSlugs) {
      params.push({ city, grade })
    }
  }

  return params
}

export async function generateMetadata({
  params,
}: { params: Promise<{ city: string; grade: string }> }): Promise<Metadata> {
  const { city: citySlug, grade: gradeSlug } = await params
  const city = getCityBySlug(citySlug)
  const grade = getConcreteGradeBySlug(gradeSlug)

  if (!city || !grade) {
    return {
      title: "Страница не найдена",
    }
  }

  return {
    title: `Купить бетон ${grade.grade} по цене производителя, с доставкой по ${city.nameDative} и области`,
    description: `Заказать бетон ${grade.grade} по выгодной цене. Качественный бетон от завода производителя с доставкой по ${city.nameDative} и области`,
  }
}

export default async function CityConcreteGradePage({ params }: { params: Promise<{ city: string; grade: string }> }) {
  const { city: citySlug, grade: gradeSlug } = await params
  const city = getCityBySlug(citySlug)
  const grade = getConcreteGradeBySlug(gradeSlug)

  if (!city || !grade) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentCity={city} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-[65px] leading-tight font-bold mb-6 text-balance">
                  Доставка бетона {grade.grade} в {city.nameAccusative}
                </h1>
                <p className="text-xl text-muted-foreground mb-6 text-pretty">
                  {grade.fullDescription} Быстрая доставка бетона {grade.grade} в {city.nameAccusative} и окрестности
                  собственным автопарком.
                </p>
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-4xl font-bold text-primary">{grade.price}</span>
                  <span className="text-muted-foreground">за м³</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <OrderDialog productTitle={grade.title} city={city}>
                    <Button size="lg" className="text-lg px-8">
                      Заказать бетон
                    </Button>
                  </OrderDialog>
                  <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
                    <a href="tel:+74012345678">Позвонить</a>
                  </Button>
                </div>
              </div>

              <Card className="p-8 bg-card/50 backdrop-blur">
                <h3 className="text-2xl font-bold mb-6">Технические характеристики</h3>
                <dl className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <dt className="text-muted-foreground">Прочность:</dt>
                    <dd className="font-semibold">{grade.technicalSpecs.strength}</dd>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <dt className="text-muted-foreground">Морозостойкость:</dt>
                    <dd className="font-semibold">{grade.technicalSpecs.frostResistance}</dd>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <dt className="text-muted-foreground">Водонепроницаемость:</dt>
                    <dd className="font-semibold">{grade.technicalSpecs.waterResistance}</dd>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <dt className="text-muted-foreground">Подвижность:</dt>
                    <dd className="font-semibold">{grade.technicalSpecs.mobility}</dd>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <dt className="text-muted-foreground">Плотность:</dt>
                    <dd className="font-semibold">{grade.technicalSpecs.density}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Набор прочности:</dt>
                    <dd className="font-semibold">{grade.technicalSpecs.setting}</dd>
                  </div>
                </dl>
              </Card>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Для каких работ используется {grade.grade} в {city.namePrepositional}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {grade.applications.map((app, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{app.title}</h3>
                      <p className="text-muted-foreground">{app.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Преимущества {grade.grade} для строительства в {city.namePrepositional}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grade.advantages.map((advantage, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <p className="text-lg">{advantage}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Composition Section */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-center">Состав бетона {grade.grade}</h2>
            <Card className="p-8">
              <dl className="space-y-4">
                <div className="flex justify-between items-start border-b pb-4">
                  <dt className="text-lg text-muted-foreground font-medium">Цемент:</dt>
                  <dd className="text-lg font-semibold text-right max-w-md">{grade.composition.cement}</dd>
                </div>
                <div className="flex justify-between items-start border-b pb-4">
                  <dt className="text-lg text-muted-foreground font-medium">Песок:</dt>
                  <dd className="text-lg font-semibold text-right max-w-md">{grade.composition.sand}</dd>
                </div>
                <div className="flex justify-between items-start border-b pb-4">
                  <dt className="text-lg text-muted-foreground font-medium">Щебень:</dt>
                  <dd className="text-lg font-semibold text-right max-w-md">{grade.composition.gravel}</dd>
                </div>
                <div className="flex justify-between items-start border-b pb-4">
                  <dt className="text-lg text-muted-foreground font-medium">Вода:</dt>
                  <dd className="text-lg font-semibold text-right max-w-md">{grade.composition.water}</dd>
                </div>
                {grade.composition.additives && (
                  <div className="flex justify-between items-start">
                    <dt className="text-lg text-muted-foreground font-medium">Добавки:</dt>
                    <dd className="text-lg font-semibold text-right max-w-md">{grade.composition.additives}</dd>
                  </div>
                )}
              </dl>
            </Card>
          </div>
        </section>

        {/* Delivery Info */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Доставка бетона {grade.grade} в {city.nameAccusative}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Быстрая доставка</h3>
                <p className="text-muted-foreground">
                  Доставка бетона в {city.nameAccusative} собственным автопарком в любое время
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Точно в срок</h3>
                <p className="text-muted-foreground">
                  Гарантируем доставку в {city.nameAccusative} в согласованное время
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Гарантия качества</h3>
                <p className="text-muted-foreground">Производство по ГОСТ с сертификатами качества</p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Готовы заказать {grade.grade} в {city.nameAccusative}?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Оставьте заявку и получите расчет стоимости с учетом доставки в {city.nameAccusative} в течение 15 минут
            </p>
            <OrderDialog productTitle={grade.title} city={city}>
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Заказать бетон {grade.grade}
              </Button>
            </OrderDialog>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactForm city={city} />
      </main>

      <Footer city={city} />
    </div>
  )
}
