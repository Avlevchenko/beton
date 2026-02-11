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
}
