"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Info } from "lucide-react"
import { OrderDialog } from "./order-dialog"
import Link from "next/link"
import type { CityData } from "@/lib/cities"

const products = [
  {
    title: "Бетон М200",
    slug: "m200",
    price: "от 3 500 ₽/м³",
    description: "Для фундаментов, стяжек, дорожек",
    features: ["Морозостойкость F150", "Водонепроницаемость W4", "Подвижность П3"],
  },
  {
    title: "Бетон М300",
    slug: "m300",
    price: "от 4 200 ₽/м³",
    description: "Универсальный для строительства",
    features: ["Морозостойкость F200", "Водонепроницаемость W6", "Подвижность П4"],
    popular: true,
  },
  {
    title: "Бетон М350",
    slug: "m350",
    price: "от 4 800 ₽/м³",
    description: "Для монолитных конструкций",
    features: ["Морозостойкость F200", "Водонепроницаемость W8", "Подвижность П4"],
  },
  {
    title: "Бетон М400",
    slug: "m400",
    price: "от 5 400 ₽/м³",
    description: "Для специальных конструкций",
    features: ["Морозостойкость F300", "Водонепроницаемость W10", "Подвижность П4"],
  },
]

interface ProductsProps {
  city?: CityData
}

export function Products({ city }: ProductsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string>("")

  const handleOrderClick = (productTitle: string) => {
    setSelectedProduct(productTitle)
    setIsDialogOpen(true)
  }

  const cityNamePrepositional = city?.namePrepositional || "Калининграду"

  return (
    <>
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Популярные марки бетона</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Производим все марки бетона по ГОСТ с доставкой по {cityNamePrepositional}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <Card
                key={index}
                className={`p-6 relative hover:shadow-xl transition-all ${product.popular ? "border-2 border-primary shadow-lg scale-105" : ""}`}
              >
                {product.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Хит продаж
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                <p className="text-3xl font-bold text-primary mb-3">{product.price}</p>
                <p className="text-muted-foreground mb-6 text-sm">{product.description}</p>

                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-2">
                  <Button
                    className="w-full"
                    variant={product.popular ? "default" : "outline"}
                    onClick={() => handleOrderClick(product.title)}
                  >
                    Заказать
                  </Button>
                  <Button className="w-full" variant="ghost" asChild>
                    <Link href={city ? `/${city.slug}/beton/${product.slug}` : `/beton/${product.slug}`}>
                      <Info className="h-4 w-4 mr-2" />
                      Подробнее
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Нужна другая марка бетона или большой объем?</p>
            <Button size="lg" onClick={() => handleOrderClick("")}>
              Получить индивидуальное предложение
            </Button>
          </div>
        </div>
      </section>

      <OrderDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} productTitle={selectedProduct} city={city} />
    </>
  )
}
