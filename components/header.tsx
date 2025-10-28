import { Phone, MessageCircle, MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { cities, type CityData } from "@/lib/cities"

interface HeaderProps {
  currentCity?: CityData
}

export function Header({ currentCity }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">Б</span>
              </div>
              <div>
                <h1 className="font-bold text-xl leading-tight">БетонПрямо</h1>
                <p className="text-xs text-muted-foreground">Завод-производитель</p>
              </div>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden lg:flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  {currentCity ? currentCity.name : "Доставка в области"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 max-h-[400px] overflow-y-auto">
                {cities.map((city) => (
                  <DropdownMenuItem key={city.slug} asChild>
                    <Link href={`/${city.slug}`} className="cursor-pointer">
                      {city.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <a href="tel:+74012345678" className="font-bold text-lg hover:text-primary transition-colors">
                +7 (401) 234-56-78
              </a>
              <span className="text-xs text-muted-foreground">Ежедневно 8:00 - 20:00</span>
            </div>

            <div className="flex gap-2">
              <Button size="icon" variant="outline" asChild className="md:hidden bg-transparent">
                <a href="tel:+74012345678" aria-label="Позвонить">
                  <Phone className="h-4 w-4" />
                </a>
              </Button>
              <Button size="icon" variant="default" asChild>
                <a href="https://wa.me/74012345678" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
