import type { MetadataRoute } from "next"
import { cities } from "@/lib/cities"
import { concreteGrades } from "@/lib/concrete-grades"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://betonpryamo.ru" // Замените на ваш реальный домен

  // Главная страница
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ]

  // Страницы городов
  cities.forEach((city) => {
    routes.push({
      url: `${baseUrl}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  })

  // Главные страницы марок бетона
  concreteGrades.forEach((grade) => {
    routes.push({
      url: `${baseUrl}/beton/${grade.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    })
  })

  // Страницы марок бетона для каждого города
  cities.forEach((city) => {
    concreteGrades.forEach((grade) => {
      routes.push({
        url: `${baseUrl}/${city.slug}/beton/${grade.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      })
    })
  })

  return routes
}
