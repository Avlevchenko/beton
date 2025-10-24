const steps = [
  {
    number: "01",
    title: "Заявка",
    description: "Оставьте заявку на сайте или позвоните нам",
  },
  {
    number: "02",
    title: "Расчет",
    description: "Рассчитаем объем и стоимость за 15 минут",
  },
  {
    number: "03",
    title: "Производство",
    description: "Изготовим бетон нужной марки на заводе",
  },
  {
    number: "04",
    title: "Доставка",
    description: "Доставим миксером точно в срок",
  },
]

export function Process() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Как мы работаем</h2>
          <p className="text-xl text-muted-foreground text-pretty">Простой процесс от заявки до доставки</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-6xl font-bold text-muted/20 mb-4">{step.number}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
