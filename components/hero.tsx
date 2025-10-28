"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { OrderDialog } from "./order-dialog"
import type { CityData } from "@/lib/cities"

interface HeroProps {
  city?: CityData
}

export function Hero({ city }: HeroProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const title = city
    ? `Бетон высшего качества с доставкой в ${city.namePrepositional}`
    : "Бетон высшего качества с доставкой в Калининграде"

  const description = city
    ? `Производим и доставляем бетон любых марок в ${city.name} напрямую с завода. ${city.description ? `${city.name} — ${city.description}.` : ""} Без посредников — экономия до 30%. Гарантия качества и точные сроки.`
    : "Производим и доставляем бетон любых марок напрямую с завода. Без посредников — экономия до 30%. Гарантия качества и точные сроки."

  return (
    <>
      <section className="pt-32 pb-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-2 bg-secondary rounded-full">
                <span className="text-sm font-medium">Прямые поставки от завода</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[65px] font-bold mb-6 leading-tight text-balance">{title}</h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">{description}</p>

              {city && city.distance && (
                <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Расстояние от завода:</span> {city.distance}
                  </p>
                  {city.population && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-semibold text-foreground">Население:</span> {city.population}
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg h-14 px-8" onClick={() => setIsDialogOpen(true)}>
                  Рассчитать стоимость
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-14 px-8 bg-transparent" asChild>
                  <a href="tel:+74012345678">Позвонить сейчас</a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src="/concrete-mixer-truck-delivering-concrete-at-constr.jpg"
                  alt={`Доставка бетона в ${city?.namePrepositional || "Калининграде"}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-foreground">15</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Лет на рынке</p>
                    <p className="text-sm text-muted-foreground">Надежный поставщик</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OrderDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} city={city} />
    </>
  )
}
