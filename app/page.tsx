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
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Купить бетон в Калининграде с доставкой от 7600 руб/м3 I заказать бетон от производителя",
  description:
    "Купить бетон в Калининграде, доставка по городу и области, широкий ассортимент, хорошие цены и гибкую систему скидок, звоните, качество по ISO 9001:2000.",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Benefits />
      <Products />
      <ConcreteGuide />
      <Process />
      <Advantages />
      <ContactForm />
      <SeoText />
      <Footer />
    </main>
  )
}
