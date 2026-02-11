"use client"

import { useConfig } from "@/components/config-provider"
import type { CityData } from "@/lib/cities"

interface SchemaMarkupProps {
  pageType: "home" | "city" | "product" | "cityProduct"
  city?: CityData
  grade?: {
    grade: string
    slug: string
    title: string
    fullDescription: string
    price: string
    technicalSpecs: {
      strength: string
      frostResistance: string
      waterResistance: string
      mobility: string
      density: string
      setting: string
    }
    applications: { title: string; description: string }[]
  }
  pageUrl?: string
}

export function SchemaMarkup({ pageType, city, grade, pageUrl = "" }: SchemaMarkupProps) {
  const config = useConfig()

  const baseUrl = "https://betonpryamo.ru"
  const fullUrl = `${baseUrl}${pageUrl}`

  const cityName = city ? city.name : "Калининград"
  const cityNamePrepositional = city ? city.namePrepositional : "Калининграде"

  // Organization schema - present on all pages
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.companyName,
    url: baseUrl,
    logo: config.logoImage ? `${baseUrl}${config.logoImage}` : `${baseUrl}/icon.svg`,
    telephone: config.phone,
    email: config.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address,
      addressLocality: config.addressCity,
      addressRegion: "Калининградская область",
      addressCountry: "RU",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: config.phone,
      contactType: "sales",
      availableLanguage: "Russian",
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 54.7104,
          longitude: 20.4522,
        },
        geoRadius: "150000",
      },
    },
    sameAs: [
      config.whatsapp,
      config.telegram,
    ].filter(Boolean),
  }

  // LocalBusiness schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ConcreteContractor",
    name: config.companyName,
    url: fullUrl,
    telephone: config.phone,
    email: config.email,
    image: config.logoImage ? `${baseUrl}${config.logoImage}` : `${baseUrl}/icon.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address,
      addressLocality: config.addressCity,
      addressRegion: "Калининградская область",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 54.7104,
      longitude: 20.4522,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: `${config.prices[0]?.price || "7 100"} - ${config.prices[config.prices.length - 1]?.price || "9 300"} RUB/м3`,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Калининградская область",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "156",
      bestRating: "5",
    },
  }

  // WebSite schema
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.companyName,
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  // BreadcrumbList schema
  const breadcrumbs: { name: string; url: string }[] = [
    { name: "Главная", url: baseUrl },
  ]

  if (pageType === "city" && city) {
    breadcrumbs.push({ name: `Бетон в ${cityNamePrepositional}`, url: `${baseUrl}/${city.slug}` })
  }

  if (pageType === "product" && grade) {
    breadcrumbs.push({ name: `Бетон ${grade.grade}`, url: `${baseUrl}/beton/${grade.slug}` })
  }

  if (pageType === "cityProduct" && city && grade) {
    breadcrumbs.push({ name: `Бетон в ${cityNamePrepositional}`, url: `${baseUrl}/${city.slug}` })
    breadcrumbs.push({
      name: `${grade.grade} в ${cityNamePrepositional}`,
      url: `${baseUrl}/${city.slug}/beton/${grade.slug}`,
    })
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  // Product offers for all concrete grades
  const productSchemas = config.prices.map((priceItem) => {
    const priceNumeric = priceItem.price.replace(/\s/g, "")
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `Бетон ${priceItem.grade}`,
      description: `Бетон марки ${priceItem.grade} с доставкой по ${cityNamePrepositional} и Калининградской области от завода-производителя`,
      brand: {
        "@type": "Brand",
        name: config.companyName,
      },
      manufacturer: {
        "@type": "Organization",
        name: config.companyName,
      },
      offers: {
        "@type": "Offer",
        url: city ? `${baseUrl}/${city.slug}/beton/${priceItem.slug}` : `${baseUrl}/beton/${priceItem.slug}`,
        priceCurrency: "RUB",
        price: priceNumeric,
        priceValidUntil: new Date(new Date().getFullYear(), 11, 31).toISOString().split("T")[0],
        unitCode: "MTQ",
        unitText: "м3",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: config.companyName,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: city ? `${cityName}, Калининградская область` : "Калининградская область",
        },
        deliveryLeadTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 24,
          unitCode: "HUR",
        },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "RU",
            addressRegion: "Калининградская область",
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: 0,
              maxValue: 1,
              unitCode: "DAY",
            },
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: 0,
              maxValue: 1,
              unitCode: "DAY",
            },
          },
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "87",
        bestRating: "5",
      },
    }
  })

  // Single product page schema
  let singleProductSchema = null
  if (grade) {
    const gradePrice = config.prices.find((p) => p.slug === grade.slug)
    const priceNumeric = gradePrice ? gradePrice.price.replace(/\s/g, "") : grade.price.replace(/[^\d]/g, "")

    singleProductSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: grade.title,
      description: grade.fullDescription,
      brand: {
        "@type": "Brand",
        name: config.companyName,
      },
      manufacturer: {
        "@type": "Organization",
        name: config.companyName,
      },
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Прочность",
          value: grade.technicalSpecs.strength,
        },
        {
          "@type": "PropertyValue",
          name: "Морозостойкость",
          value: grade.technicalSpecs.frostResistance,
        },
        {
          "@type": "PropertyValue",
          name: "Водонепроницаемость",
          value: grade.technicalSpecs.waterResistance,
        },
        {
          "@type": "PropertyValue",
          name: "Подвижность",
          value: grade.technicalSpecs.mobility,
        },
        {
          "@type": "PropertyValue",
          name: "Плотность",
          value: grade.technicalSpecs.density,
        },
      ],
      offers: {
        "@type": "Offer",
        url: fullUrl,
        priceCurrency: "RUB",
        price: priceNumeric,
        priceValidUntil: new Date(new Date().getFullYear(), 11, 31).toISOString().split("T")[0],
        unitCode: "MTQ",
        unitText: "м3",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: config.companyName,
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "87",
        bestRating: "5",
      },
    }
  }

  // FAQ schema for home/city pages
  const faqSchema = (pageType === "home" || pageType === "city") ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Какой бетон лучше для фундамента в ${cityNamePrepositional}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Для фундамента в ${cityNamePrepositional} рекомендуем бетон М200-М300 в зависимости от нагрузки. М200 подходит для малоэтажного строительства, М300 - для более тяжелых конструкций.`,
        },
      },
      {
        "@type": "Question",
        name: `Сколько стоит доставка бетона в ${cityNamePrepositional}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Стоимость доставки зависит от объема заказа и расстояния. Цены на бетон: от ${config.prices[0]?.price || "7 100"} руб/м3. Для точного расчета оставьте заявку или позвоните по телефону ${config.phoneFormatted}.`,
        },
      },
      {
        "@type": "Question",
        name: "Какие документы вы предоставляете на бетон?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Мы предоставляем паспорт качества на каждую партию бетона, сертификаты соответствия ГОСТ и протоколы испытаний. Производство сертифицировано по ISO 9001:2000.",
        },
      },
    ],
  } : null

  // Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Производство и доставка бетона",
    provider: {
      "@type": "Organization",
      name: config.companyName,
      telephone: config.phone,
      email: config.email,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: city ? `${cityName}, Калининградская область` : "Калининградская область",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Каталог бетона",
      itemListElement: config.prices.map((priceItem) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: `Бетон ${priceItem.grade}`,
        },
        priceCurrency: "RUB",
        price: priceItem.price.replace(/\s/g, ""),
        unitCode: "MTQ",
      })),
    },
  }

  const schemas: object[] = [organizationSchema, localBusinessSchema, breadcrumbSchema, serviceSchema]

  if (pageType === "home") {
    schemas.push(webSiteSchema)
    schemas.push(...productSchemas)
  }

  if (pageType === "city") {
    schemas.push(...productSchemas)
  }

  if (faqSchema) {
    schemas.push(faqSchema)
  }

  if (singleProductSchema && (pageType === "product" || pageType === "cityProduct")) {
    schemas.push(singleProductSchema)
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
