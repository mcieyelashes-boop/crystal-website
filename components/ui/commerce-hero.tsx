"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, Search, ShoppingBasket, Zap } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const translations = {
  en: {
    nav: ["Home", "Shop", "Collections", "Blog"],
    login: "Log In",
    search: "Search",
    cart: "Cart",
    heroTitle1: "Power your world with",
    heroTitle2: "premium electrical tools.",
    heroSubtitle:
      "From cables to circuit breakers — everything a professional electrician needs, delivered fast across Indonesia.",
    categories: [
      { title: "Cables", key: "cables" },
      { title: "Lamps", key: "lamps" },
      { title: "Breakers", key: "breakers" },
      { title: "Accessories", key: "accessories" },
    ],
  },
  id: {
    nav: ["Beranda", "Toko", "Koleksi", "Blog"],
    login: "Masuk",
    search: "Cari",
    cart: "Keranjang",
    heroTitle1: "Tenagai duniamu dengan",
    heroTitle2: "peralatan listrik premium.",
    heroSubtitle:
      "Dari kabel hingga pemutus arus — semua yang dibutuhkan teknisi listrik profesional, dikirim cepat ke seluruh Indonesia.",
    categories: [
      { title: "Kabel", key: "cables" },
      { title: "Lampu", key: "lamps" },
      { title: "Pemutus Arus", key: "breakers" },
      { title: "Aksesori", key: "accessories" },
    ],
  },
};

const categoryImages: Record<string, string> = {
  cables: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
  lamps: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&q=80",
  breakers: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&q=80",
  accessories: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&q=80",
};

export function CommerceHero() {
  const [lang, setLang] = useState<"en" | "id">("en");
  const t = translations[lang];

  return (
    <div className="w-full relative container px-2 mx-auto max-w-7xl min-h-screen">
      <div className="mt-6 bg-accent/50 rounded-2xl relative">
        <header className="flex items-center">
          <div className="w-full md:w-2/3 lg:w-1/2 bg-background/95 backdrop-blur-sm p-4 rounded-br-2xl flex items-center gap-2">
            <a href="#" className="flex items-center gap-1.5 shrink-0">
              <Zap className="w-5 h-5 text-yellow-500 fill-yellow-400" />
              <span className="text-lg font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent tracking-tight whitespace-nowrap">
                CRYSTAL ELECTRIC
              </span>
            </a>

            <nav className="hidden lg:flex items-center justify-between w-full">
              {t.nav.map((item) => (
                <Button key={item} variant="link" className="cursor-pointer relative group hover:text-primary transition-colors">
                  {item}
                </Button>
              ))}
              <Button variant="ghost" size="icon" className="cursor-pointer relative group hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="cursor-pointer relative group hover:text-primary transition-colors">
                <ShoppingBasket className="w-5 h-5" />
              </Button>
            </nav>

            <Sheet>
              <SheetTrigger asChild className="lg:hidden ml-auto">
                <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 bg-background/95 backdrop-blur-md border-r border-border/50">
                <SheetHeader className="p-6 text-left border-b border-border/50">
                  <SheetTitle className="flex items-center gap-1.5">
                    <Zap className="w-5 h-5 text-yellow-500 fill-yellow-400" />
                    <span className="text-lg font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                      CRYSTAL ELECTRIC
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col p-6 space-y-1">
                  {t.nav.map((item) => (
                    <Button key={item} variant="ghost" className="justify-start px-2 h-12 text-base font-medium hover:bg-accent/50 hover:text-primary transition-colors">
                      {item}
                    </Button>
                  ))}
                </nav>
                <Separator className="mx-6" />
                <div className="p-6 flex flex-col gap-4">
                  <Button variant="outline" className="justify-start gap-2 h-12 hover:bg-accent/50 transition-colors">
                    <Search className="w-4 h-4" />{t.search}
                  </Button>
                  <Button variant="outline" className="justify-start gap-2 h-12 hover:bg-accent/50 transition-colors relative">
                    <ShoppingBasket className="w-4 h-4" />{t.cart}
                    <span className="absolute right-3 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">3</span>
                  </Button>
                </div>
                <Separator className="mx-6" />
                <div className="px-6 pb-2 flex gap-2">
                  <button onClick={() => setLang("en")} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${lang === "en" ? "bg-yellow-500 text-white border-yellow-500" : "border-border text-muted-foreground hover:text-foreground"}`}>
                    🇬🇧 English
                  </button>
                  <button onClick={() => setLang("id")} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${lang === "id" ? "bg-yellow-500 text-white border-yellow-500" : "border-border text-muted-foreground hover:text-foreground"}`}>
                    🇮🇩 Indonesia
                  </button>
                </div>
                <div className="p-6 pt-3">
                  <Button className="w-full h-12 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white transition-all duration-300 shadow-lg hover:shadow-xl">
                    {t.login}<ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex w-1/2 justify-end items-center pr-4 gap-3 ml-auto">
            <div className="flex items-center bg-background/80 border border-border rounded-full p-1 gap-1">
              <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${lang === "en" ? "bg-yellow-500 text-white shadow" : "text-muted-foreground hover:text-foreground"}`}>
                EN
              </button>
              <button onClick={() => setLang("id")} className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${lang === "id" ? "bg-yellow-500 text-white shadow" : "text-muted-foreground hover:text-foreground"}`}>
                ID
              </button>
            </div>
            <Button variant="secondary" className="cursor-pointer bg-primary-foreground p-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group">
              <span className="pl-4 py-2 text-sm font-medium">{t.login}</span>
              <div className="rounded-full flex items-center justify-center m-auto bg-background w-10 h-10 ml-2 group-hover:scale-110 transition-transform duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </Button>
          </div>
        </header>

        <motion.section className="w-full px-4 py-24" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="mx-auto text-center">
            <motion.h1
              key={lang + "h1"}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                {t.heroTitle1}
              </span>
              <br />
              <span className="text-foreground">{t.heroTitle2}</span>
            </motion.h1>
            <motion.p
              key={lang + "p"}
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            >
              {t.heroSubtitle}
            </motion.p>
          </div>
        </motion.section>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto mt-12">
        {t.categories.map((category, index) => (
          <motion.div
            key={category.key}
            className="group relative bg-muted/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 min-h-[250px] sm:min-h-[300px] w-full overflow-hidden transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          >
            <a href="#" className="absolute inset-0 z-20">
              <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-[clamp(1.5rem,4vw,2.5rem)] font-bold relative z-10 text-yellow-500 my-2 sm:my-4 group-hover:text-orange-500 transition-colors duration-300">
                {category.title}
              </h2>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img
                  src={categoryImages[category.key]}
                  alt={category.title}
                  className="w-full max-w-[min(40vw,200px)] sm:max-w-[min(30vw,180px)] md:max-w-[min(25vw,160px)] lg:max-w-[min(20vw,140px)] h-auto object-cover rounded-2xl opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-background/95 backdrop-blur-sm rounded-tl-xl flex items-center justify-center z-10 border-l border-t border-border/50">
                <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
