"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { defaultConfig, type SiteConfig } from "@/lib/site-config"

const ConfigContext = createContext<SiteConfig>(defaultConfig)

export function useConfig() {
  return useContext(ConfigContext)
}

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig)

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (!data.prices) {
          data.prices = defaultConfig.prices
        }
        setConfig(data)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (config.faviconUrl) {
      const link = document.querySelector("link[rel='icon']") as HTMLLinkElement
        || document.createElement("link")
      link.rel = "icon"
      link.href = config.faviconUrl
      if (!link.parentElement) document.head.appendChild(link)
    }
  }, [config.faviconUrl])

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}
