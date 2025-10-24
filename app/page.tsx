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
