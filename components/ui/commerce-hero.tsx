"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, Search, ShoppingBasket, Zap, ChevronDown, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";

const translations = {
  en: {
    nav: ["Home", "Shop", "Collections", "Blog"],
    login: "Log In", search: "Search", cart: "Cart",
    heroTitle1: "Power your world with",
    heroTitle2: "premium electrical tools.",
    heroSubtitle: "From cables to circuit breakers — everything a professional electrician needs, delivered fast.",
    allCategories: "All Categories",
  },
  id: {
    nav: ["Beranda", "Toko", "Koleksi", "Blog"],
    login: "Masuk", search: "Cari", cart: "Keranjang",
    heroTitle1: "Tenagai duniamu dengan",
    heroTitle2: "peralatan listrik premium.",
    heroSubtitle: "Dari kabel hingga pemutus arus — semua yang dibutuhkan teknisi listrik profesional, dikirim cepat.",
    allCategories: "Semua Kategori",
  },
};

const categories = [
  {
    key: "lampu",
    en: "Lampu / Lighting",
    id: "Lampu / Pencahayaan",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80",
    subs: { en: ["Lampu LED", "Lampu Downlight", "Lampu Industri", "Baterai", "DC Driver", "Accessories"], id: ["Lampu LED", "Lampu Downlight", "Lampu Industri", "Baterai", "DC Driver", "Aksesori"] },
  },
  {
    key: "power-supply",
    en: "Power Supply & UPS",
    id: "Power Supply & UPS",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    subs: { en: ["Power Supply", "UPS 1 Phase", "UPS 3 Phase", "UPS DC", "Baterai UPS"], id: ["Power Supply", "UPS 1 Fasa", "UPS 3 Fasa", "UPS DC", "Baterai UPS"] },
  },
  {
    key: "renewable",
    en: "Energi Terbarukan",
    id: "Energi Terbarukan",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80",
    subs: { en: ["Solar Panel", "Hybrid System", "Street Light", "Home System"], id: ["Panel Surya", "Sistem Hybrid", "Lampu Jalan", "Sistem Rumah"] },
  },
  {
    key: "ev-charger",
    en: "EV Charger",
    id: "EV Charger",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80",
    subs: { en: ["EVlink Wallbox", "EVlink Smart Wallbox", "EVlink DC Fast Charge", "EVlink Pro AC", "E-Bike Battery"], id: ["EVlink Wallbox", "EVlink Smart Wallbox", "EVlink DC Fast Charge", "EVlink Pro AC", "Baterai E-Bike"] },
  },
  {
    key: "home-appliance",
    en: "Home & Appliance",
    id: "Rumah & Perangkat",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80",
    subs: { en: ["Switch/Sakelar", "Stop Kontak", "Smart Home", "CCTV", "AC Split", "Extension Socket", "Dimmer"], id: ["Sakelar", "Stop Kontak", "Smart Home", "CCTV", "AC Split", "Kabel Ekstensi", "Dimmer"] },
  },
  {
    key: "electrical-dist",
    en: "Electrical & Power Distribution",
    id: "Distribusi Listrik",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80",
    subs: { en: ["MCB", "MCCB", "ACB", "Load Break Switch", "Change Over Switch", "LV Fuse", "MV Cubicle", "Trafo"], id: ["MCB", "MCCB", "ACB", "Load Break Switch", "Change Over Switch", "Sekring LV", "Kubikel MV", "Trafo"] },
  },
  {
    key: "control",
    en: "Control & Protection",
    id: "Kontrol & Proteksi",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80",
    subs: { en: ["Contactor", "Thermal Overload Relay", "Motor Circuit Breaker", "Protection Relay", "PLC", "Servo Motor", "Control Relay"], id: ["Kontaktor", "Relay Termal", "MCB Motor", "Relay Proteksi", "PLC", "Servo Motor", "Relay Kontrol"] },
  },
  {
    key: "monitoring",
    en: "Power Monitoring & Measurement",
    id: "Monitoring & Pengukuran",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80",
    subs: { en: ["Current Transformer", "Analog Metering", "Digital Meter", "Power Meter", "KWh Meter", "Powertag"], id: ["Trafo Arus", "Meteran Analog", "Meteran Digital", "Power Meter", "KWh Meter", "Powertag"] },
  },
  {
    key: "signaling",
    en: "Signaling & Sensor",
    id: "Sinyal & Sensor",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80",
    subs: { en: ["Push Button", "Pilot Lamp", "Emergency Stop", "Tower Light", "Limit Switch", "Proximity Sensor", "Photoelectric"], id: ["Push Button", "Lampu Pilot", "Emergency Stop", "Tower Light", "Limit Switch", "Sensor Proximity", "Fotoelektrik"] },
  },
  {
    key: "box",
    en: "Box, Enclosure & Plug Socket",
    id: "Box, Enclosure & Stop Kontak",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400&q=80",
    subs: { en: ["MCB Box", "Panel Box", "Enclosure", "Junction Box", "Terminal Block", "Industrial Plug & Socket", "Busbar"], id: ["Box MCB", "Box Panel", "Enclosure", "Junction Box", "Terminal Block", "Plug & Socket Industri", "Busbar"] },
  },
  {
    key: "soft-starter",
    en: "Soft Starter & Inverter VSD",
    id: "Soft Starter & Inverter VSD",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80",
    subs: { en: ["Soft Starter", "Altivar Machine", "Altivar Process", "Inverter", "Electric Motor"], id: ["Soft Starter", "Altivar Machine", "Altivar Process", "Inverter", "Motor Listrik"] },
  },
  {
    key: "tools",
    en: "Electrical Tools, Safety & Equipment",
    id: "Alat Listrik, Keselamatan & Perlengkapan",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80",
    subs: { en: ["Hand Tools", "Safety Tools", "Crimping Tools", "Testers", "Pump", "Safety Shoes", "Safety Gloves"], id: ["Perkakas Tangan", "Alat Keselamatan", "Tang Crimping", "Tester", "Pompa", "Sepatu Safety", "Sarung Tangan Safety"] },
  },
  {
    key: "conduit",
    en: "Conduit",
    id: "Konduit",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    subs: { en: ["PVC Conduit"], id: ["Konduit PVC"] },
  },
  {
    key: "busbar-cable",
    en: "Busbar & Cable",
    id: "Busbar & Kabel",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=400&q=80",
    subs: { en: ["LV Power Cable", "Busbar Support", "Cable Duct", "Cable Tie", "Terminal Sleeve"], id: ["Kabel Daya LV", "Busbar Support", "Duct Kabel", "Cable Tie", "Sepatu Kabel"] },
  },
  {
    key: "maintenance",
    en: "Electrical Maintenance & Testing",
    id: "Pemeliharaan & Pengujian Listrik",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80",
    subs: { en: ["Breakers Maintenance", "Power Meter Maintenance", "MV SM6 Maintenance", "Survey Fee"], id: ["Pemeliharaan Breaker", "Pemeliharaan Power Meter", "Pemeliharaan MV SM6", "Biaya Survei"] },
  },
];

export function CommerceHero() {
  const [lang, setLang] = useState<"en" | "id">("id");
  const [openCat, setOpenCat] = useState<string | null>(null);
  const t = translations[lang];

  return (
    <div className="w-full relative container px-2 mx-auto max-w-7xl min-h-screen">
      <div className="mt-6 bg-blue-50 rounded-2xl relative">
        <header className="flex items-center">
          <div className="w-full md:w-2/3 lg:w-1/2 bg-white/95 backdrop-blur-sm p-4 rounded-br-2xl flex items-center gap-2">
            <a href="#" className="flex items-center gap-1.5 shrink-0">
              <Zap className="w-5 h-5 text-blue-600 fill-blue-500" />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent tracking-tight whitespace-nowrap">
                Kristal Elektrik
              </span>
            </a>

            <nav className="hidden lg:flex items-center justify-between w-full">
              {t.nav.map((item) => (
                <Button key={item} variant="link" className="cursor-pointer hover:text-blue-600 transition-colors text-gray-700">
                  {item}
                </Button>
              ))}
              <Button variant="ghost" size="icon" className="hover:text-blue-600 transition-colors">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-blue-600 transition-colors">
                <ShoppingBasket className="w-5 h-5" />
              </Button>
            </nav>

            <Sheet>
              <SheetTrigger asChild className="lg:hidden ml-auto">
                <Button variant="ghost" size="icon" className="hover:text-blue-600 transition-colors">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 bg-white border-r border-blue-100">
                <SheetHeader className="p-6 text-left border-b border-blue-100">
                  <SheetTitle className="flex items-center gap-1.5">
                    <Zap className="w-5 h-5 text-blue-600 fill-blue-500" />
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                      Kristal Elektrik
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col p-6 space-y-1">
                  {t.nav.map((item) => (
                    <Button key={item} variant="ghost" className="justify-start px-2 h-12 text-base font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      {item}
                    </Button>
                  ))}
                </nav>
                <Separator className="mx-6 bg-blue-100" />
                <div className="p-6 flex flex-col gap-4">
                  <Button variant="outline" className="justify-start gap-2 h-12 hover:bg-blue-50 border-blue-200 transition-colors">
                    <Search className="w-4 h-4" /> {t.search}
                  </Button>
                  <Button variant="outline" className="justify-start gap-2 h-12 hover:bg-blue-50 border-blue-200 transition-colors relative">
                    <ShoppingBasket className="w-4 h-4" /> {t.cart}
                    <span className="absolute right-3 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">3</span>
                  </Button>
                </div>
                <Separator className="mx-6 bg-blue-100" />
                <div className="px-6 pb-2 flex gap-2">
                  <button onClick={() => setLang("en")} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${lang === "en" ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-500 hover:text-gray-800"}`}>🇬🇧 English</button>
                  <button onClick={() => setLang("id")} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${lang === "id" ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-500 hover:text-gray-800"}`}>🇮🇩 Indonesia</button>
                </div>
                <div className="p-6 pt-3">
                  <Button className="w-full h-12 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white shadow-lg">
                    {t.login} <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex w-1/2 justify-end items-center pr-4 gap-3 ml-auto">
            <div className="flex items-center bg-white border border-blue-200 rounded-full p-1 gap-1">
              <button onClick={() => setLang("en")} className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${lang === "en" ? "bg-blue-600 text-white shadow" : "text-gray-500 hover:text-gray-800"}`}>EN</button>
              <button onClick={() => setLang("id")} className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${lang === "id" ? "bg-blue-600 text-white shadow" : "text-gray-500 hover:text-gray-800"}`}>ID</button>
            </div>
            <Button className="cursor-pointer bg-white text-gray-800 p-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group border border-blue-100">
              <span className="pl-4 py-2 text-sm font-medium">{t.login}</span>
              <div className="rounded-full flex items-center justify-center m-auto bg-blue-600 text-white w-10 h-10 ml-2 group-hover:scale-110 transition-transform duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </Button>
          </div>
        </header>

        <motion.section className="w-full px-4 py-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="mx-auto text-center">
            <motion.h1
              key={lang + "h1"}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 bg-clip-text text-transparent">
                {t.heroTitle1}
              </span>
              <br />
              <span className="text-gray-800">{t.heroTitle2}</span>
            </motion.h1>
            <motion.p
              key={lang + "p"}
              className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            >
              {t.heroSubtitle}
            </motion.p>
          </div>
        </motion.section>
      </div>

      {/* Category Grid */}
      <div className="mt-12 mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 px-1">{t.allCategories}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, index) => {
            const isOpen = openCat === cat.key;
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                className="bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Category Header */}
                <button
                  onClick={() => setOpenCat(isOpen ? null : cat.key)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-blue-50 transition-colors duration-200 group"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img src={cat.image} alt={cat.en} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="flex-1 text-left font-semibold text-gray-800 text-sm leading-tight group-hover:text-blue-700 transition-colors">
                    {lang === "en" ? cat.en : cat.id}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${isOpen ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-600"}`}>
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </button>

                {/* Subcategories */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 border-t border-blue-50">
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(lang === "en" ? cat.subs.en : cat.subs.id).map((sub) => (
                            <a
                              key={sub}
                              href="#"
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-medium rounded-full transition-all duration-200"
                            >
                              {sub}
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
