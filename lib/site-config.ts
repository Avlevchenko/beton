export interface PriceItem {
  slug: string
  grade: string
  price: string
}

export interface SiteConfig {
  companyName: string
  phone: string
  phoneFormatted: string
  whatsapp: string
  telegram: string
  email: string
  address: string
  addressCity: string
  workHoursWeekdays: string
  workHoursWeekends: string
  logoText: string
  logoImage: string
  faviconUrl: string
  prices: PriceItem[]
  telegramBotToken: string
  telegramChatId: string
  notificationEmail: string
}

export const defaultConfig: SiteConfig = {
  companyName: "БетонПрямо",
  phone: "+74012345678",
  phoneFormatted: "+7 (401) 234-56-78",
  whatsapp: "https://wa.me/74012345678",
  telegram: "",
  email: "info@betonpryamo.ru",
  address: "ул. Производственная, 15",
  addressCity: "Калининград",
  workHoursWeekdays: "Понедельник - Пятница: 8:00 - 20:00",
  workHoursWeekends: "Суббота - Воскресенье: 9:00 - 18:00",
  logoText: "Б",
  logoImage: "",
  faviconUrl: "",
  prices: [
    { slug: "m200", grade: "М200", price: "7 100" },
    { slug: "m300", grade: "М300", price: "8 300" },
    { slug: "m350", grade: "М350", price: "8 700" },
    { slug: "m400", grade: "М400", price: "9 300" },
  ],
  telegramBotToken: "",
  telegramChatId: "",
  notificationEmail: "",
}
