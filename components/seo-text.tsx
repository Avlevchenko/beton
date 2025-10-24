import { Truck, Award, Clock, Shield, TrendingUp, Users } from "lucide-react"

export function SeoText() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent">
            Производство и доставка бетона в Калининграде
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Работаем напрямую от завода-производителя. Гарантируем качество, скорость и выгодные цены
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Сертифицированное качество</h3>
            <p className="text-muted-foreground">
              Каждая партия проходит лабораторный контроль и соответствует ГОСТ 7473-2010
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Собственный автопарк</h3>
            <p className="text-muted-foreground">
              Современные миксеры 6-10 м³. Доставка за 1-2 часа в любую точку области
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Заводские цены</h3>
            <p className="text-muted-foreground">
              Без посреднических наценок. Скидки при больших объемах и для постоянных клиентов
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Широкий ассортимент марок бетона</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  В нашем каталоге представлены все востребованные марки бетона от М100 до М500. Мы производим бетон для
                  фундаментов, стяжек полов, монолитных конструкций, дорожного строительства и других видов работ.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Наиболее популярными марками являются бетон М200 для малоэтажного строительства, М300 для возведения
                  жилых домов и М350 для промышленных объектов. Наши специалисты помогут подобрать оптимальную марку с
                  учетом специфики вашего проекта.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Быстрая доставка по всей области</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Мы располагаем собственным автопарком современных автобетоносмесителей объемом от 6 до 10 м³. Это
                  позволяет нам осуществлять оперативную доставку бетона на объекты заказчиков в любую точку
                  Калининграда и области.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Благодаря постоянному перемешиванию в барабане миксера бетон сохраняет свои свойства в течение всего
                  времени транспортировки. Среднее время доставки — 1-2 часа с момента подтверждения заказа.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 via-orange-500/10 to-primary/10 border border-primary/20 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-center">
              Преимущества покупки бетона напрямую от производителя
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary-foreground text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold mb-1">Контроль качества на всех этапах</p>
                  <p className="text-sm text-muted-foreground">
                    От закупки сырья до отгрузки готовой продукции. Используем только сертифицированные материалы
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary-foreground text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold mb-1">Гибкая система скидок</p>
                  <p className="text-sm text-muted-foreground">
                    Для постоянных клиентов и при заказе больших объемов. Выгодные условия для юридических лиц
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary-foreground text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold mb-1">Полный пакет документов</p>
                  <p className="text-sm text-muted-foreground">
                    Работаем официально с НДС. Возможность отсрочки платежа для юридических лиц
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary-foreground text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="font-semibold mb-1">Работаем круглосуточно</p>
                  <p className="text-sm text-muted-foreground">
                    Принимаем заказы без выходных. Оперативный расчет стоимости и консультации специалистов
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Профессиональная консультация и техническая поддержка</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Наши технические специалисты всегда готовы проконсультировать вас по вопросам выбора марки бетона,
                    расчета необходимого объема, особенностей укладки и ухода за бетоном. Мы поможем оптимизировать
                    расходы на строительство, подобрав оптимальное соотношение цены и качества для вашего проекта.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Свяжитесь с нами по телефону или через форму обратной связи, и мы оперативно рассчитаем стоимость доставки
            бетона на ваш объект
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:+74012345678"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <span>Позвонить сейчас</span>
            </a>
            <a
              href="https://wa.me/74012345678"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#25D366]/90 transition-colors"
            >
              <span>Написать в WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
