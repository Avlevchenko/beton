"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Truck, Clock, Shield, Award } from "lucide-react"
import type { CityData } from "@/lib/cities"

interface ProductDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: {
    title: string
    price: string
    description: string
    features: string[]
  } | null
  city?: CityData
}

const productDetails: Record<
  string,
  {
    fullDescription: string
    applications: string[]
    advantages: string[]
    technicalSpecs: { label: string; value: string }[]
  }
> = {
  "Бетон М200": {
    fullDescription:
      "Бетон марки М200 (класс B15) - один из самых популярных видов бетона для частного строительства. Обладает оптимальным соотношением цены и качества.",
    applications: [
      "Ленточные и плитные фундаменты для малоэтажных зданий",
      "Бетонные стяжки полов",
      "Садовые дорожки и площадки",
      "Отмостки вокруг зданий",
      "Лестничные марши",
    ],
    advantages: [
      "Доступная цена",
      "Высокая прочность для большинства задач",
      "Хорошая морозостойкость",
      "Быстрое схватывание",
    ],
    technicalSpecs: [
      { label: "Класс прочности", value: "B15" },
      { label: "Морозостойкость", value: "F150" },
      { label: "Водонепроницаемость", value: "W4" },
      { label: "Подвижность", value: "П3" },
      { label: "Время схватывания", value: "2-3 часа" },
    ],
  },
  "Бетон М300": {
    fullDescription:
      "Бетон марки М300 (класс B22.5) - универсальный материал для большинства строительных работ. Самая популярная марка в коммерческом и частном строительстве.",
    applications: [
      "Монолитные фундаменты любой сложности",
      "Несущие стены и перекрытия",
      "Колонны и балки",
      "Дорожные покрытия с высокой нагрузкой",
      "Производство ЖБИ изделий",
    ],
    advantages: [
      "Универсальность применения",
      "Высокая прочность и долговечность",
      "Отличная морозостойкость",
      "Оптимальное соотношение цена/качество",
    ],
    technicalSpecs: [
      { label: "Класс прочности", value: "B22.5" },
      { label: "Морозостойкость", value: "F200" },
      { label: "Водонепроницаемость", value: "W6" },
      { label: "Подвижность", value: "П4" },
      { label: "Время схватывания", value: "2-3 часа" },
    ],
  },
  "Бетон М350": {
    fullDescription:
      "Бетон марки М350 (класс B25) - высокопрочный материал для ответственных конструкций. Используется в строительстве объектов с повышенными требованиями к надежности.",
    applications: [
      "Монолитные перекрытия многоэтажных зданий",
      "Колонны и ригели каркасных зданий",
      "Чаши бассейнов",
      "Аэродромные покрытия",
      "Производство предварительно напряженных конструкций",
    ],
    advantages: [
      "Высокая прочность на сжатие",
      "Отличная водонепроницаемость",
      "Повышенная морозостойкость",
      "Долговечность более 100 лет",
    ],
    technicalSpecs: [
      { label: "Класс прочности", value: "B25" },
      { label: "Морозостойкость", value: "F200" },
      { label: "Водонепроницаемость", value: "W8" },
      { label: "Подвижность", value: "П4" },
      { label: "Время схватывания", value: "2-3 часа" },
    ],
  },
  "Бетон М400": {
    fullDescription:
      "Бетон марки М400 (класс B30) - высокопрочный специализированный бетон для особо ответственных конструкций. Применяется в промышленном и гидротехническом строительстве.",
    applications: [
      "Мостовые конструкции и путепроводы",
      "Гидротехнические сооружения",
      "Банковские хранилища",
      "Несущие конструкции высотных зданий",
      "Специальные ЖБИ изделия",
    ],
    advantages: [
      "Максимальная прочность",
      "Высокая водонепроницаемость",
      "Устойчивость к агрессивным средам",
      "Быстрый набор прочности",
    ],
    technicalSpecs: [
      { label: "Класс прочности", value: "B30" },
      { label: "Морозостойкость", value: "F300" },
      { label: "Водонепроницаемость", value: "W10" },
      { label: "Подвижность", value: "П4" },
      { label: "Время схватывания", value: "1.5-2 часа" },
    ],
  },
}

export function ProductDetailsDialog({ open, onOpenChange, product, city }: ProductDetailsDialogProps) {
  if (!product) return null

  const details = productDetails[product.title]
  const cityName = city?.name || "Калининград"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">{product.title}</DialogTitle>
          <DialogDescription className="text-xl text-primary font-semibold">{product.price}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Описание */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Описание</h3>
            <p className="text-muted-foreground leading-relaxed">{details.fullDescription}</p>
          </div>

          {/* Технические характеристики */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Технические характеристики
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {details.technicalSpecs.map((spec, idx) => (
                <div key={idx} className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">{spec.label}</p>
                  <p className="font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Применение */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Области применения</h3>
            <ul className="space-y-2">
              {details.applications.map((app, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{app}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Преимущества */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Преимущества
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {details.advantages.map((adv, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{adv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Доставка */}
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              Доставка в {cityName}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Осуществляем быструю доставку бетона собственным автопарком миксеров
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span>Доставка от 2 часов после заказа</span>
            </div>
          </div>

          {/* Кнопка заказа */}
          <Button className="w-full" size="lg" onClick={() => onOpenChange(false)}>
            Заказать {product.title}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
