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
      .then((data) => setConfig(data))
      .catch(() => {})
  }, [])

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}
