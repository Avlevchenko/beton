import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Benefits } from "@/components/benefits"
import { Products } from "@/components/products"
import { ConcreteGuide } from "@/components/concrete-guide"
import { Process } from "@/components/process"
import { Advantages } from "@/components/advantages"
import { SeoText } from "@/components/seo-text"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { getCityBySlug, getAllCitySlugs } from "@/lib/cities"
import type { Metadata } from "next"

interface CityPageProps {
  params: Promise<{
    city: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllCitySlugs()
  return slugs.map((slug) => ({
    city: slug,
  }))
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)

  if (!city) {
    return {
      title: "Страница не найдена",
    }
  }

  return {
    title: `Купить бетон в ${city.namePrepositional} с доставкой от 7600 руб/м3 I заказать бетон от производителя`,
    description: `Купить бетон в ${city.namePrepositional}, доставка по городу и области, широкий ассортимент, хорошие цены и гибкую систему скидок, звоните, качество по ISO 9001:2000.`,
  }
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)

  if (!city) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header currentCity={city} />
      <Hero city={city} />
      <Benefits city={city} />
      <Products city={city} />
      <ConcreteGuide city={city} />
      <Process city={city} />
      <Advantages city={city} />
      <ContactForm city={city} />
      <SeoText city={city} />
      <Footer city={city} />
    </main>
  )
}
