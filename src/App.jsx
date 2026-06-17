import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  PowerOff, 
  BatteryCharging, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Map, 
  MessageCircle, 
  Plus, 
  Minus, 
  Menu,
  X,
  ChevronDown,
  CalendarDays,
  Wrench,
  Smartphone,
  EyeOff,
  VolumeX,
  Battery,
  Lock,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Signal,
  History,
  Star,
  Cpu,
  Package,
  Route,
  Compass,
  Gem,
  Users,
  AlertTriangle,
  Zap,
  Navigation,
  Linkedin
} from 'lucide-react';
import { LazyMotion, m, AnimatePresence } from 'framer-motion';
import { SOCIAL_PROOF } from './data/socialProof';

// Carga diferida de las features de animación (chunk async, fuera del bundle inicial)
const loadMotionFeatures = () => import('./lib/motionFeatures').then((res) => res.default);

// --- CONFIGURACIÓN Y CONSTANTES ---
const COLORS = {
  blue: "#02255b",
  darkBlue: "#011a42",
  lime: "#9fe43f",
  white: "#ffffff",
};

// WhatsApp: número y mensaje únicos para TODOS los botones de la web
const WHATSAPP_PHONE = "5493518626405";
const WHATSAPP_MESSAGE = "Hola, me interesa el servicio de rastreo para mi moto";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// --- CONVERSION TRACKING (Meta Pixel) ---
// Dispara el evento estándar "Lead" cuando alguien inicia contacto por WhatsApp.
// El parámetro content_name permite ver en Meta QUÉ origen (perfil/sección)
// genera los contactos, para optimizar la pauta hacia el público que más convierte.
const trackLead = (source = "whatsapp") => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: source, content_category: "whatsapp_click" });
  }
};

// --- COMPONENTES ---

// 1. NAVBAR INTELIGENTE (DISTRIBUCIÓN PROPORCIONAL)
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "App y Funciones", href: "#beneficios" },
    { name: "Hardware", href: "#hardware" },
    { name: "Seguridad", href: "#seguridad" },
    { name: "Planes", href: "#planes" },
    { name: "Taller", href: "#taller" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-b from-[#00102b]/95 to-[#02255b]/90 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      {/* Línea de luz lima inferior (solo cuando la barra tiene fondo) */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9fe43f]/60 to-transparent shadow-[0_0_8px_rgba(159,228,63,0.35)]" />
      )}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center w-full">
        
        {/* 1. LOGO (Izquierda) */}
        <a href="#" onClick={(e) => handleNavClick(e, '#inicio')} className="flex items-center gap-2.5 group cursor-pointer z-50 flex-shrink-0">
          <span className="relative flex items-center justify-center flex-shrink-0">
            <m.span
              className="absolute h-9 w-9 rounded-full border border-[#9fe43f]/40"
              animate={{ scale: [0.7, 2], opacity: [0.45, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              aria-hidden="true"
            />
            <m.span
              className="absolute h-9 w-9 rounded-full border border-[#9fe43f]/40"
              animate={{ scale: [0.7, 2], opacity: [0.45, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
              aria-hidden="true"
            />
            <img src="/centinel-logo.svg" alt="" aria-hidden="true" className="h-8 md:h-9 w-auto relative z-10" />
          </span>
          <span className="text-xl md:text-2xl font-black tracking-tighter text-white whitespace-nowrap">
            CENTINEL <span className="text-[#9fe43f] group-hover:text-white transition-colors">GPS</span>
          </span>
        </a>

        {/* 2. MENÚ DE NAVEGACIÓN (Centro - Ocupa el espacio disponible) */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-6 lg:gap-10 px-4">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs lg:text-sm font-bold text-gray-200 hover:text-[#9fe43f] transition-colors uppercase tracking-wide cursor-pointer whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* 3. BOTÓN CONTACTO (Derecha) */}
        <div className="hidden md:block flex-shrink-0">
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-2.5 rounded-full font-bold text-xs lg:text-sm transition-all whitespace-nowrap ${
              scrolled 
                ? "bg-[#9fe43f] text-[#02255b] hover:bg-white" 
                : "border-2 border-white text-white hover:bg-white hover:text-[#02255b]"
            }`}
          >
            HABLÁ CON UN ASESOR
          </a>
        </div>

        {/* Mobile Toggle (Solo visible en móviles) */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#011a42] border-b border-white/10 overflow-hidden absolute top-full left-0 w-full shadow-2xl"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-white font-bold text-lg hover:text-[#9fe43f] border-b border-white/5 pb-2"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9fe43f] font-bold text-lg pt-2 flex items-center gap-2"
              >
                HABLAR POR WHATSAPP <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// 2. HERO SECTION (MEJORADO)
const Hero = () => {
  const handleScrollToFeatures = (e) => {
    e.preventDefault();
    const element = document.getElementById('beneficios');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="inicio" className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[#02255b] overflow-hidden min-h-[95vh] flex flex-col justify-center">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/hero-moto.webp"
          alt="Motocicleta de noche"
          className="w-full h-full object-cover opacity-40"
          width="1600"
          height="1067"
          fetchPriority="high"
          decoding="async"
          onError={(e) => e.target.style.display = 'none'}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02255b]/90 via-[#02255b]/70 to-[#02255b]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#02255b]/40 to-[#02255b]" />
      </div>

      {/* Animated Blobs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#9fe43f] rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-blob" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#9fe43f] rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-blob animation-delay-2000" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <m.div
            key={i}
            className="absolute w-2 h-2 bg-[#9fe43f]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center z-10 relative">
        <m.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-3 mb-8"
          >
            <span className="inline-block py-2 px-6 rounded-full bg-[#9fe43f] text-[#02255b] text-xs md:text-sm font-black tracking-widest uppercase shadow-[0_0_20px_rgba(159,228,63,0.3)]">
              ★ +300 motos protegidas en Córdoba
            </span>
            <span className="inline-block py-2 px-6 rounded-full bg-[#9fe43f]/10 border border-[#9fe43f]/40 text-[#9fe43f] text-xs md:text-sm font-bold tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(159,228,63,0.1)]">
              <m.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block w-2 h-2 bg-[#9fe43f] rounded-full mr-2"
              />
              Taller de instalación propio
            </span>
          </m.div>
          
          <h1 className="mb-10 font-black text-white tracking-tight">
            {/* LÍNEA 1: TÍTULO PRINCIPAL (Rastreo) */}
            <m.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="block text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-4"
            >
              Rastreo y Control <br className="hidden md:block" />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9fe43f] via-[#b0ff4f] to-white animate-gradient-x">
                  Satelital para tu Moto.
                </span>
                <m.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#9fe43f] to-transparent"
                  animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </m.span>

            {/* LÍNEA 2: SUBTÍTULO (Corte de corriente) */}
            <m.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="block text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mt-4 tracking-normal"
            >
              Cortale la corriente desde tu celular.
            </m.span>
          </h1>

          <m.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-100 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Tu moto te avisa si alguien la toca. Vos la ves en el mapa y la apagás desde el celular.{" "}
            <span className="text-[#9fe43f] font-bold relative whitespace-nowrap">
              El control lo tenés vos
              <m.span
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#9fe43f]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              />
            </span>
            , no el que se la quiere llevar.
          </m.p>

          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <m.a
              href="#beneficios"
              onClick={handleScrollToFeatures}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-[#02255b] font-black py-5 px-10 rounded-full text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all cursor-pointer group"
            >
              Desliza para conocer más
              <m.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-6 h-6 group-hover:text-[#9fe43f] transition-colors" />
              </m.div>
            </m.a>
            
            <m.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white font-black py-5 px-10 rounded-full text-lg hover:bg-white hover:text-[#02255b] transition-all cursor-pointer group"
            >
              Hablar con un asesor
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </m.a>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};

// --- BRAND MARQUEE (LOGOS + WORDMARKS) ---
const BrandMarquee = () => {
  const brands = [
    { name: "HONDA", logo: "/brands/honda.svg" },
    { name: "YAMAHA", logo: "/brands/yamaha.svg" },
    { name: "KAWASAKI" },
    { name: "BENELLI" },
    { name: "KTM", logo: "/brands/ktm.svg" },
    { name: "DUCATI", logo: "/brands/ducati.svg" },
    { name: "BAJAJ" },
    { name: "BMW", logo: "/brands/bmw.svg" },
    { name: "ROYAL ENFIELD" },
    { name: "SUZUKI", logo: "/brands/suzuki.svg" },
    { name: "MOTOMEL" },
    { name: "ZANELLA" },
  ];

  return (
    <section className="w-full bg-[#011a42] border-y border-white/5 py-10 overflow-hidden">
      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#011a42] via-transparent to-[#011a42] z-10 pointer-events-none"></div>
        <div className="flex w-max animate-marquee">
          {[...brands, ...brands].map((brand, index) => (
            <div key={index} className="flex items-center gap-3 mx-7 md:mx-10 flex-shrink-0">
              {brand.logo && (
                <img
                  src={brand.logo}
                  alt=""
                  className="h-7 w-7 md:h-8 md:w-8 opacity-50"
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
              )}
              <span className="text-xl md:text-2xl font-black tracking-tight text-white/40 whitespace-nowrap select-none">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Caption centrado */}
      <div className="mt-8 flex justify-center px-6">
        <p className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-[#9fe43f] text-[11px] md:text-xs font-bold tracking-widest uppercase text-center">
          <Wrench className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          Soporte para todas las marcas · 70cc a +1000cc
        </p>
      </div>
    </section>
  );
};

// 3. PROBLEM / SOLUTION - ESTILO "BENTO GRID" (MEJORADO CON GRÁFICOS VIVOS)
const ProblemSolution = () => {
  return (
    <section id="beneficios" className="py-24 px-6 bg-[#011a42] relative scroll-mt-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <m.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#9fe43f]/5 rounded-full blur-[120px]"
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <m.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]"
          animate={{
            y: [0, -50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="text-[#9fe43f] font-bold tracking-widest text-sm uppercase bg-[#9fe43f]/10 px-4 py-2 rounded-full border border-[#9fe43f]/30">
              ⚡ App de Monitoreo 24/7
            </span>
          </m.div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
            Control Total de tu Moto. <br />
            <m.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#9fe43f] to-emerald-400"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% auto" }}
            >
              Toda la info en tu mano.
            </m.span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Funciones avanzadas diseñadas para el usuario urbano y de viaje.
          </p>
        </m.div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
            
            {/* Card 1: Ubicación & Historial (Large - ANIMADO) */}
            <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2 row-span-2 bg-[#02255b] rounded-[2.5rem] p-8 md:p-10 border border-white/10 relative overflow-hidden group hover:border-[#9fe43f]/50 transition-all shadow-lg"
            >
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#9fe43f]/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between min-h-[300px]">
                    <div>
                        <div className="flex gap-4 mb-6">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[#9fe43f]">
                                <MapPin className="w-7 h-7" />
                            </div>
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[#9fe43f]">
                                <History className="w-7 h-7" />
                            </div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Ubicación y Playback</h3>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                            Rastreo en tiempo real 24hs. Además, accedé al <strong>historial de recorridos y kilómetros de hasta 6 meses atrás</strong>.
                        </p>
                    </div>
                    
                    {/* Visual Live Map (RADAR MODE) */}
                    <div className="mt-8 w-full h-48 md:h-56 bg-[#00102b] rounded-2xl border border-white/10 relative overflow-hidden shadow-inner flex items-center justify-center">
                         {/* Map Grid Background */}
                         <div className="absolute inset-0 opacity-30" 
                              style={{ 
                                  backgroundImage: 'linear-gradient(#304a7a 1px, transparent 1px), linear-gradient(90deg, #304a7a 1px, transparent 1px)', 
                                  backgroundSize: '40px 40px',
                                  backgroundPosition: 'center center'
                              }}
                         ></div>
                         
                         {/* Radar Circles */}
                         <div className="absolute w-32 h-32 border border-[#9fe43f]/20 rounded-full"></div>
                         <div className="absolute w-64 h-64 border border-[#9fe43f]/10 rounded-full"></div>
                         
                         {/* Scanning Radar Animation */}
                         <m.div 
                            className="absolute top-1/2 left-1/2 w-[150%] h-[150%] origin-top-left bg-gradient-to-r from-transparent via-[#9fe43f]/5 to-transparent"
                            style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                         />

                         {/* Static Dot (Moto) in Center with ELEGANT WAVES */}
                         <div className="relative z-20 flex items-center justify-center w-20 h-20">
                             {/* Onda Expansiva Suave 1 */}
                             <m.div
                                className="absolute inset-0 bg-[#9fe43f] rounded-full"
                                initial={{ scale: 0.2, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: [0, 0.3, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                             />
                             {/* Onda Expansiva Suave 2 (Desfasada) */}
                             <m.div
                                className="absolute inset-0 bg-[#9fe43f] rounded-full"
                                initial={{ scale: 0.2, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: [0, 0.3, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                             />
                             
                             {/* Core Dot (Latido elegante) */}
                             <m.div 
                                className="w-3.5 h-3.5 bg-[#9fe43f] rounded-full border border-white/80 shadow-[0_0_15px_rgba(159,228,63,0.4)] z-10 relative"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                             />
                         </div>
                         
                         <div className="absolute bottom-4 left-4 flex gap-2 z-20">
                            <span className="bg-[#02255b]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-mono border border-white/10 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> GPS + LBS
                            </span>
                            <span className="bg-[#02255b]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-[#9fe43f] font-mono border border-[#9fe43f]/30">4G LTE</span>
                         </div>
                    </div>
                </div>
            </m.div>
             {/* Card 2: Alertas Inteligentes (ANIMADO) */}
            <m.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="md:col-span-1 bg-[#02255b] rounded-[2.5rem] p-8 border border-white/10 relative overflow-hidden group hover:border-[#9fe43f]/50 transition-all shadow-lg flex flex-col"
            >
                 <m.div 
                    className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-[#9fe43f]"
                    animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5 }}
                 >
                    <AlertTriangle className="w-6 h-6" />
                </m.div>
                <h3 className="text-xl font-bold text-white mb-2">Alertas Instantáneas</h3>
                <ul className="text-gray-400 text-sm space-y-2 mt-2">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9fe43f] rounded-full"></div> Movimiento no autorizado</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9fe43f] rounded-full"></div> Encendido de motor</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9fe43f] rounded-full"></div> Exceso de velocidad</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#9fe43f] rounded-full"></div> Salida de zonas seguras personalizables</li>
                </ul>
            </m.div>

             {/* Card 3: Batería & Consumo (ANIMADO) */}
            <m.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="md:col-span-1 bg-[#02255b] rounded-[2.5rem] p-8 border border-white/10 relative overflow-hidden group hover:border-[#9fe43f]/50 transition-all shadow-lg"
            >
                 <div className="flex items-center justify-between mb-6">
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#9fe43f]">
                        <BatteryCharging className="w-6 h-6" />
                    </div>
                    {/* Live Battery Graphic */}
                    <div className="w-16 h-8 border-2 border-white/20 rounded-md p-1 relative flex items-center">
                        <m.div 
                            className="h-full bg-[#9fe43f] rounded-sm"
                            animate={{ width: ["40%", "100%", "40%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-3 bg-white/20 rounded-r-sm"></div>
                    </div>
                 </div>
                <h3 className="text-xl font-bold text-white mb-2">Batería Segura</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Diseñado para motos. Consumo ultra-bajo que permite hasta <strong>50 días de Stand-by</strong> sin drenar tu batería.
                </p>
            </m.div>

            {/* Card 4: Corte de Corriente Remoto (ANIMADO) */}
            <m.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="md:col-span-1 bg-[#02255b] rounded-[2.5rem] p-8 border border-white/10 relative overflow-hidden group hover:border-[#9fe43f]/50 transition-all shadow-lg"
            >
                 <div className="relative w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-[#9fe43f]">
                    <m.div
                        className="absolute inset-0 bg-[#9fe43f]/20 rounded-2xl"
                        animate={{ opacity: [0, 0.6, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <PowerOff className="w-6 h-6 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Corte de Corriente Remoto</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Inmovilizá tu moto desde el celular con un solo toque. Enviás la orden desde la App y <strong>el motor no puede volver a arrancar</strong>.
                </p>
            </m.div>

            {/* Card 5: Protocolo de Recupero (ANIMADO) */}
            <m.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="md:col-span-2 bg-[#02255b] rounded-[2.5rem] p-8 border border-white/10 relative overflow-hidden group hover:border-[#9fe43f]/50 transition-all shadow-lg"
            >
                 <div className="absolute top-0 right-0 w-60 h-60 bg-[#9fe43f]/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
                 <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#9fe43f] flex-shrink-0">
                        <Navigation className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Protocolo de Recupero</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Si sucede lo peor, activamos nuestro protocolo para que tu moto sea <strong>retirada de donde esté, sin importar la zona</strong>. Te acompañamos en todo el proceso hasta que vuelva a tus manos.
                        </p>
                    </div>
                 </div>
            </m.div>
        </div>
      </div>
    </section>
  );
};

// --- NUEVA SECCIÓN: DETALLE DE CORTE DE CORRIENTE ---
const CutOffDetail = () => {
  return (
    <section id="seguridad" className="py-24 px-6 bg-[#02255b] relative">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Zap className="w-4 h-4" /> Función de Alta Seguridad
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Corte de Corriente Remoto
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Esta no es solo una función técnica. Es tu <strong>herramienta de recuperación</strong>. 
            Te permite bloquear el funcionamiento del vehículo desde tu celular si sucede lo peor.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Qué es */}
        <div className="bg-[#011a42] p-8 rounded-3xl border border-white/5 hover:border-[#9fe43f]/30 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-[#9fe43f]">1</span>
                ¿Cómo funciona?
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
                Enviás la orden desde la App y el sistema inmoviliza el vehículo de forma remota: el motor se apaga o no puede volver a arrancar.
                El método de instalación se mantiene en reserva por tu seguridad.
            </p>
        </div>

        {/* Card 2: Seguridad */}
        <div className="bg-[#011a42] p-8 rounded-3xl border border-white/5 hover:border-[#9fe43f]/30 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-[#9fe43f]">2</span>
                ¿Es seguro?
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
                <strong>Sí.</strong> Está diseñado para usarse cuando el vehículo está detenido o a baja velocidad. 
                No rompe la moto, ya que se instala en circuitos preparados para la interrupción.
            </p>
        </div>

        {/* Card 3: Objetivo */}
        <div className="bg-[#011a42] p-8 rounded-3xl border border-white/5 hover:border-[#9fe43f]/30 transition-colors">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-[#9fe43f]">3</span>
                Objetivo Real
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
                Inmovilizar el vehículo robado y evitar que vuelva a arrancar. Esto aumenta drásticamente las chances de recuperación policial.
            </p>
        </div>
      </div>
    </section>
  );
};

// --- NUEVA SECCIÓN: HARDWARE SPECS (HERCULES LITE) ---
const HardwareSpecs = () => {
  return (
    <section id="hardware" className="py-20 px-6 bg-[#00102b] relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Visual de Hardware: Certificaciones internacionales */}
        <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96 bg-white rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(2,37,91,0.5)]">
                <img
                    src="/certificaciones.jpg"
                    alt="Certificaciones internacionales del equipo: CE, UKCA, EAC, RCM, FCC, ICASA, ANATEL, PTCRB, GCF, NOM, NYCE, RoHS, REACH, WEEE, NF, R-NZ, IMDA y TDRA"
                    className="w-full h-full object-contain p-3 rounded-3xl"
                    width="800"
                    height="800"
                    loading="lazy"
                    decoding="async"
                />

                {/* Label Flotante */}
                <m.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -top-4 -right-4 bg-[#9fe43f] text-[#02255b] text-xs font-black px-4 py-2 rounded-lg shadow-lg uppercase"
                >
                    4G LTE CERTIFICADO
                </m.div>
            </div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-8">
            <div>
                <span className="text-[#9fe43f] font-bold tracking-widest text-sm uppercase mb-2 block">
                    INGENIERÍA CENTINEL
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                    HARDWARE
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                    No trabajamos con equipos "descartables". Seleccionamos el <strong>hardware</strong> bajo un criterio simple: 
                    <span className="text-white italic"> "Si falla el equipo, falla la confianza."</span>
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                    <Signal className="w-8 h-8 text-[#9fe43f] flex-shrink-0" />
                    <div>
                        <h4 className="text-white font-bold">Conectividad 4G LTE</h4>
                        <p className="text-gray-400 text-sm">Alta velocidad y estabilidad de conexión superior a equipos 2G antiguos.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Battery className="w-8 h-8 text-[#9fe43f] flex-shrink-0" />
                    <div>
                        <h4 className="text-white font-bold">Modo Ahorro</h4>
                        <p className="text-gray-400 text-sm">No descarga tu batería. Soporta largos períodos con la moto parada.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Wrench className="w-8 h-8 text-[#9fe43f] flex-shrink-0" />
                    <div>
                        <h4 className="text-white font-bold">Instalación Oculta</h4>
                        <p className="text-gray-400 text-sm">Compacto y cableado. Compatible con motos de 110cc a +1000cc.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <ShieldCheck className="w-8 h-8 text-[#9fe43f] flex-shrink-0" />
                    <div>
                        <h4 className="text-white font-bold">Soporte Humano Real</h4>
                        <p className="text-gray-400 text-sm">Un equipo de más de 12 personas a tu disposición. Siempre te atiende un humano, nunca una IA.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

// --- PRUEBA SOCIAL: CLIENTES REALES ---
// El material vive en src/data/socialProof.js (generado por scripts/process-social-proof.mjs).
// Para agregar leyendas: en ese archivo, sumá "caption" a cualquier ítem.

// Video que SOLO se reproduce cuando está visible (ahorra datos/batería en mobile).
const AutoplayVideo = ({ src, poster }) => {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster || undefined}
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full h-full object-cover"
    />
  );
};

// Mezcla round-robin: 1ro de cada perfil, 2do de cada perfil, etc.
// Intercala los perfiles SIN alterar el orden interno de cada uno.
// El orden de esta lista define cómo se intercalan en la vista "ver todo".
const INTERLEAVE_ORDER = ["laburante", "rider", "transporte", "fierrero"];
const interleaveSocialProof = () => {
  const lists = INTERLEAVE_ORDER.map((k) => SOCIAL_PROOF[k]).filter(Boolean);
  const max = Math.max(...lists.map((l) => l.length));
  const out = [];
  for (let i = 0; i < max; i++) {
    for (const list of lists) {
      if (list[i]) out.push(list[i]);
    }
  }
  return out;
};

const SocialProof = ({ profileId }) => {
  // Material del perfil; si no hay perfil (landing "ver todo"), mezcla intercalada de los 4.
  const media =
    profileId && SOCIAL_PROOF[profileId]
      ? SOCIAL_PROOF[profileId]
      : interleaveSocialProof();

  if (!media || media.length === 0) return null;

  return (
    <section id="clientes" className="py-24 px-6 bg-[#011a42] border-t border-white/5 scroll-mt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-1.5 text-[#9fe43f] mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#9fe43f]" aria-hidden="true" />
            ))}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            +300 motos protegidas <br />
            <span className="text-[#9fe43f]">en Córdoba.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Clientes que cuidan lo que es suyo. Centinel está para quedarse.
          </p>
        </m.div>

        {/* Carrusel deslizable (mobile-first) */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-thin">
          {media.map((item, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i, 5) * 0.05 }}
              className="snap-center flex-shrink-0 w-64 md:w-72"
            >
              <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden border border-white/10 bg-[#02255b]">
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={item.caption || "Cliente de Centinel GPS en Córdoba"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <AutoplayVideo src={item.src} poster={item.poster} />
                )}
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#011a42]/95 to-transparent p-4 pt-10">
                    <p className="text-white text-sm font-bold">{item.caption}</p>
                  </div>
                )}
              </div>
            </m.div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-xs mt-6 md:hidden">
          ← Deslizá para ver más →
        </p>
      </div>
    </section>
  );
};

// 4. PRICING SECTION
const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: "mensual",
      type: "monthly",
      name: "PAGO MENSUAL",
      price: "$24.700",
      period: "/ mes incluye IVA",
      highlight: false,
      features: [
        "Sin permanencia, cancelás cuando querés",
        "Equipo en comodato, 100% bonificado",
        "App y monitoreo 24/7 incluidos",
        "Activación inmediata",
        "+ $40.000 instalación oculta profesional (pago único)"
      ],
      cta: "ELEGIR PAGO MENSUAL",
      message: "Hola Centinel, quiero contratar el Plan mensual y comenzar a proteger mi vehículo. ¿Cómo reservo mi turno?"
    },
    {
      id: "unico",
      type: "unico",
      name: "PAGO ÚNICO",
      price: "$330.000",
      badge: "EQUIPO PROPIO",
      period: "una sola vez, incluye IVA",
      note: "3 cuotas sin interés o 6 cuotas con 10% de recargo",
      highlight: true,
      features: [
        "El equipo GPS es tuyo para siempre",
        "3 cuotas sin interés o 6 con 10% de recargo",
        "Luego solo $4.500/mes por servidores y chip de datos satelitales",
        "Activación inmediata",
        "+ $40.000 instalación oculta profesional (pago único)"
      ],
      cta: "ELEGIR PAGO ÚNICO",
      message: "Hola Centinel, quiero contratar el Pago Único y comenzar a proteger mi vehículo. ¿Cómo reservo mi turno?"
    }
  ];

  const filteredPlans = plans.filter(p => p.type === billingCycle);

  return (
    <section id="planes" className="py-24 px-6 bg-[#02255b] relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <span className="text-[#9fe43f] font-bold tracking-widest text-sm uppercase mb-2 block">
            PRECIOS CLAROS, SIN SORPRESAS
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Elegí tu Plan de Protección
          </h2>
          
          <div className="flex justify-center mb-8">
            <div className="bg-[#011a42] p-1.5 rounded-full border border-white/10 inline-flex relative gap-2">
                {['monthly', 'unico'].map((cycle) => (
                    <button
                        key={cycle}
                        onClick={() => setBillingCycle(cycle)}
                        className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold transition-colors ${
                            billingCycle === cycle ? 'text-[#02255b]' : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {cycle === 'monthly' ? 'Pago Mensual' : 'Pago Único'}
                        {billingCycle === cycle && (
                            <m.div
                                layoutId="activeCycle"
                                className="absolute inset-0 bg-[#9fe43f] rounded-full -z-10"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </button>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <AnimatePresence mode='wait'>
            {filteredPlans.map((plan) => (
              <m.div 
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`relative w-full md:max-w-sm rounded-[2rem] p-8 border-2 transition-all duration-300 ${
                  plan.highlight 
                    ? "bg-[#032d6e] border-[#9fe43f] shadow-[0_0_30px_rgba(159,228,63,0.1)] z-10" 
                    : "bg-[#011a42] border-white/10 hover:border-[#9fe43f] hover:shadow-[0_0_20px_rgba(159,228,63,0.2)]"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-fit bg-[#9fe43f] text-[#02255b] font-black py-1 px-4 rounded-full text-xs uppercase tracking-wider shadow-lg">
                    {plan.badge}
                  </div>
                )}

                {plan.discount && (
                  <div className="absolute top-4 right-4 bg-[#9fe43f]/20 text-[#9fe43f] text-[10px] font-bold px-2 py-1 rounded border border-[#9fe43f]/30">
                    {plan.discount}
                  </div>
                )}
                
                <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-300'}`}>
                  {plan.name}
                </h3>
                
                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-4xl md:text-5xl font-black tracking-tighter ${plan.highlight ? 'text-white' : 'text-gray-200'}`}>
                    {plan.price}
                  </span>
                  <span className="text-gray-500 mb-1.5 text-sm">{plan.period}</span>
                </div>
                
                {plan.note && (
                  <p className="text-[#9fe43f] text-xs font-bold mb-6">
                    {plan.note}
                  </p>
                )}
                {!plan.note && <div className="h-4 mb-6"></div>}

                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-[#9fe43f]' : 'text-gray-500'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <m.a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-wa-source={`plan_${plan.id}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`block w-full text-center font-bold py-3.5 rounded-xl transition-colors ${
                    plan.highlight
                      ? "bg-white text-[#02255b] hover:bg-gray-100 shadow-lg"
                      : "bg-[#02255b] text-white border border-white/20 hover:bg-[#033482]"
                  }`}
                >
                  {plan.cta}
                </m.a>
              </m.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// 5. CÓMO FUNCIONA (PASOS)
const HowItWorks = () => {
  const steps = [
    {
      icon: <CalendarDays className="w-8 h-8 text-[#02255b]" />,
      title: "1. Reservá Turno",
      desc: "Contáctanos por WhatsApp. Coordinamos día y hora para tu instalación."
    },
    {
      icon: <Wrench className="w-8 h-8 text-[#02255b]" />,
      title: "2. Instalación Pro",
      desc: "Venís a nuestro taller en el Centro. En 60-90 min tu moto sale protegida."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-[#02255b]" />,
      title: "3. Descargá y Listo",
      desc: "Te enseñamos a usar la App. Ya tenés el control total en tu celular."
    }
  ];

  return (
    <section id="como-funciona" className="py-24 px-6 bg-[#011a42] border-t border-white/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            ¿Cómo obtenerlo? <br />
            <span className="text-[#9fe43f]">Es simple y rápido.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-[#02255b] border-t border-white/10 z-0"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(159,228,63,0.2)] mb-6 border-4 border-[#02255b] group transition-transform hover:scale-110">
                <div className="bg-[#9fe43f] w-full h-full rounded-full absolute opacity-0 group-hover:opacity-20 transition-opacity"></div>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. MODO STEALTH
const StealthMode = () => {
  return (
    <section className="py-24 px-6 bg-[#00102b] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9fe43f]/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 text-[#9fe43f] font-bold tracking-wider text-sm bg-[#9fe43f]/10 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-[#9fe43f] rounded-full animate-pulse"></div>
            <span>TECNOLOGÍA INDETECTABLE</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            Lo que no se ve, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9fe43f] to-emerald-400">
              no se puede romper.
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            A diferencia de las alarmas ruidosas que delatan su ubicación, nuestro sistema opera en <strong>"Modo Fantasma"</strong>. 
            El ladrón no sabrá que está siendo rastreado hasta que sea demasiado tarde.
          </p>

          <ul className="space-y-6">
            {[
              {
                icon: <EyeOff className="w-6 h-6 text-[#9fe43f]" />,
                title: "Instalación Oculta Profunda",
                desc: "Escondido lejos de los accesos rápidos."
              },
              {
                icon: <VolumeX className="w-6 h-6 text-[#9fe43f]" />,
                title: "Silencioso y Sin Luces",
                desc: "Sin leds parpadeantes ni sirenas que alerten al delincuente."
              },
              {
                icon: <Battery className="w-6 h-6 text-[#9fe43f]" />,
                title: "Batería de Respaldo",
                desc: "Si cortan los cables de la moto, el equipo sigue transmitiendo por horas."
              }
            ].map((item, i) => (
              <li key={i} className="flex gap-4">
                <div className="mt-1 bg-white/5 p-3 rounded-xl border border-white/10 h-fit">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative h-[400px] md:h-[500px] bg-[#011a42] rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center group shadow-2xl">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#9fe43f 1px, transparent 1px), linear-gradient(90deg, #9fe43f 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="relative z-10 flex flex-col items-center">
             <div className="relative">
                <div className="absolute inset-0 bg-[#9fe43f] blur-3xl opacity-20 animate-pulse"></div>
                <ShieldCheck className="w-32 h-32 text-white/90 drop-shadow-[0_0_15px_rgba(159,228,63,0.5)]" />
                <div className="absolute -bottom-4 -right-4 bg-[#02255b] border border-[#9fe43f] text-[#9fe43f] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                   <Lock className="w-3 h-3" /> SECURE
                </div>
             </div>
             <div className="absolute top-0 w-full h-1 bg-[#9fe43f]/50 blur-sm animate-[scan_3s_ease-in-out_infinite]"></div>
          </div>
          <div className="absolute top-10 left-10 bg-[#02255b]/80 backdrop-blur border border-white/10 px-4 py-2 rounded-lg text-xs text-gray-300 shadow-lg">
             <span className="text-[#9fe43f]">●</span> Signal: ENCRYPTED
          </div>
          <div className="absolute bottom-10 right-10 bg-[#02255b]/80 backdrop-blur border border-white/10 px-4 py-2 rounded-lg text-xs text-gray-300 shadow-lg">
             <span className="text-[#9fe43f]">●</span> Status: HIDDEN
          </div>
        </div>
      </div>
    </section>
  );
};

// 7. TRUST SECTION
const TrustSection = () => {
  return (
    <section id="taller" className="py-24 px-6 bg-[#02255b] scroll-mt-20 relative overflow-hidden">
        {/* Background Workshop */}
        <div className="absolute inset-0 z-0">
             <img
              src="/img/taller.webp"
              alt="Taller de motos profesional"
              className="w-full h-full object-cover opacity-10 mix-blend-overlay"
              width="1280"
              height="853"
              loading="lazy"
              decoding="async"
              onError={(e) => e.target.style.display = 'none'}
            />
             <div className="absolute inset-0 bg-gradient-to-r from-[#02255b] via-[#02255b]/95 to-[#02255b]/90" />
        </div>
        
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-[#9fe43f] font-bold tracking-wider text-sm bg-[#9fe43f]/10 px-4 py-2 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              <span>SEGURIDAD Y RESPALDO</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Contamos con taller propio de instalación en <br/>Córdoba capital.
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              A diferencia de servicios que solo existen en internet, nosotros realizamos la 
              <strong className="text-white"> instalación profesional en nuestro Taller Propio </strong>. 
              Calidad asegurada y técnicos especializados para no dañar el sistema eléctrico de tu moto.
              El taller esta constantemente monitoreado con cámaras para tranquilidad de ambas partes.
            </p>
          </div>

           {/* Google Map Real Embed */}
           <div className="flex-1 w-full">
              <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl h-[300px] relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.7970165332204!2d-64.21078002414342!3d-31.41971817426011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a2779909d435%3A0x11deb8cfae9af61!2sR%C3%ADo%20Negro%20847%2C%20X5000%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1768248655369!5m2!1ses-419!2sar" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

// 8. FAQ
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    {
      question: "¿Sirve para cualquier moto?",
      answer: "Sí. El sistema es compatible con todas las motos, desde baja hasta alta cilindrada.",
    },
    {
      question: "¿La instalación es segura para la moto?",
      answer: "Sí. La instalación es oculta, privada, hecha por personal seleccionado, sin modificaciones invasivas y monitoreada por camaras cctv.",
    },
    {
      question: "¿Cómo se paga la suscripción mensual?",
      answer: "La suscripción se paga de forma mensual mediante el procesador de pago de mercado pago, el pago mensual sirve para mantener el servicio activo y la moto conectada.",
    },
    {
      question: "¿Y si prefiero comprar el equipo?",
      answer: "Podés. Con el plan de Pago Único el equipo GPS queda 100% tuyo: lo abonás una sola vez (con opción de cuotas) y a partir de ahí solo mantenés una tarifa mensual reducida para los servidores y el chip de datos satelitales que mantienen tu moto conectada.",
    },
    {
      question: "¿Descarga la batería de la moto?",
      answer: "No. El equipo Hercules Lite tiene un modo de ultra-bajo consumo y una batería interna que le permite estar hasta 50 días en stand-by sin afectar el arranque de tu moto.",
    },
    {
      question: "¿El corte de motor puede dañar mi moto?",
      answer: "No. El relay se instala en un circuito preparado para la interrupción, sin afectar la mecánica ni la electrónica original de tu moto. El método de instalación se mantiene en reserva por tu seguridad.",
    },
  ];

  return (
    <section id="faq" className="py-24 px-6 bg-[#011a42] scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Preguntas Frecuentes</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-white/10 rounded-2xl overflow-hidden bg-[#02255b]">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9fe43f] hover:bg-white/5 transition-colors"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-panel-${index}`}
              >
                <span className="font-bold text-white text-lg pr-4">{faq.question}</span>
                {activeIndex === index ? (
                  <Minus className="w-6 h-6 text-[#9fe43f] flex-shrink-0" aria-hidden="true" />
                ) : (
                  <Plus className="w-6 h-6 text-[#9fe43f] flex-shrink-0" aria-hidden="true" />
                )}
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <m.div
                    id={`faq-panel-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 text-base">
                      {faq.answer}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 9. FOOTER RESTAURADO
const Footer = () => {
    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    return (
        <footer className="bg-[#00102b] border-t border-white/10 pt-16 pb-10 px-6 text-sm">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                {/* Columna 1: Marca */}
                <div className="space-y-4">
                    <span className="flex items-center gap-2.5 mb-2">
                        <img src="/centinel-logo.svg" alt="" aria-hidden="true" className="h-9 w-auto" />
                        <span className="text-2xl font-black tracking-tighter text-white">
                            CENTINEL <span className="text-[#9fe43f]">GPS</span>
                        </span>
                    </span>
                    <p className="text-gray-400 leading-relaxed max-w-xs">
                        Seguridad vehicular y rastreo satelital en Córdoba. Tecnología certificada para proteger lo que más querés.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a 
                            href="https://www.facebook.com/people/Centinel-GPS/61567807584454/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white/5 p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                        >
                            <Facebook className="w-5 h-5"/>
                        </a>
                        <a 
                            href="https://www.instagram.com/centinelgps/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white/5 p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                        >
                            <Instagram className="w-5 h-5"/>
                        </a>
                        <a 
                            href="https://www.linkedin.com/company/centinel-gps/?originalSubdomain=ar" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white/5 p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                        >
                            <Linkedin className="w-5 h-5"/>
                        </a>
                    </div>
                </div>

                {/* Columna 2: Navegación */}
                <div>
                    <h4 className="text-white font-bold mb-6 text-base">Navegación Rápida</h4>
                    <ul className="space-y-3 text-gray-400">
                        {['Beneficios', 'Hardware', 'Planes', 'Taller', 'FAQ'].map(item => (
                            <li key={item}>
                                <button 
                                    onClick={() => handleScroll(item.toLowerCase())}
                                    className="hover:text-[#9fe43f] transition-colors"
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Columna 3: Contacto */}
                <div>
                    <h4 className="text-white font-bold mb-6 text-base">Contacto</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li className="flex gap-3 items-start">
                            <MapPin className="w-5 h-5 text-[#9fe43f] flex-shrink-0 mt-0.5" />
                            <span>Rio negro 847, Córdoba Capital, Argentina.</span>
                        </li>
                        <li className="flex gap-3 items-center">
                            <Phone className="w-5 h-5 text-[#9fe43f] flex-shrink-0" />
                            <a href="tel:+5493518626405" className="hover:text-[#9fe43f] transition-colors">+54 9 3518626405</a>
                        </li>
                        <li className="flex gap-3 items-center">
                            <Mail className="w-5 h-5 text-[#9fe43f] flex-shrink-0" />
                            <a href="mailto:Soportecentinelgps@gmail.com" className="hover:text-[#9fe43f] transition-colors break-all">Soportecentinelgps@gmail.com</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
                <p>© {new Date().getFullYear()} Centinel Motos Córdoba. Todos los derechos reservados.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
                    <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
                </div>
            </div>
        </footer>
    );
};

// 10. WHATSAPP BUTTON & APP COMPONENT
const FloatingWhatsApp = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
    {/* Etiqueta sutil "Hablanos" */}
    <m.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      data-wa-source="etiqueta_hablanos"
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 2.5, type: "spring", stiffness: 300 }}
      className="bg-white text-[#02255b] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
    >
      Hablanos
    </m.a>
  <m.a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    data-wa-source="boton_flotante"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1, type: "spring" }}
    whileHover={{ scale: 1.1 }}
    className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center justify-center border-4 border-[#02255b]"
    aria-label="Contactar por WhatsApp"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-8 h-8"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  </m.a>
  </div>
);

// ============================================================
// EXPERIENCIA INTERACTIVA POR PERFIL (Meta Ads / mobile-first)
// ============================================================
// MESSAGE MATCH: editá los titulares de cada perfil acá para que
// espejen el copy de tus anuncios de Meta. Un solo lugar, sin
// tocar el resto del código.
// "laburante" está terminado; "rider" y "fierrero" son BORRADOR.
const PROFILES = {
  laburante: {
    kicker: "Para el que labura con la moto",
    problemTitle: "Tu moto es tu socia. La que nunca falta.",
    problemText: "Si te la roban, no perdés solo la moto: perdés los repartos, los viajes y la plata de todos los días.",
    agitateTitle: "Se la llevan en segundos. Recuperarla es una carrera contra el tiempo.",
    agitateText: "En Córdoba se denuncian más de 25 robos de motos por día. Sin saber dónde está, la búsqueda arranca a ciegas — y cada día sin moto es un día sin ingresos. ¿Cuántos días te podés bancar sin tu herramienta de trabajo?",
    solutionTitle: "Con Centinel, la frenás vos.",
    solutionText: "Tu moto conectada a tu celular, las 24 horas.",
    benefits: [
      {
        icon: PowerOff,
        title: "Corte de corriente remoto",
        desc: "¿Te la llevaron? La apagás desde el celular y no arranca más. Donde esté."
      },
      {
        icon: AlertTriangle,
        title: "Alerta al instante",
        desc: "Si alguien la toca o la mueve, te suena el celular al segundo."
      },
      {
        icon: Navigation,
        title: "Recupero sin importar la zona",
        desc: "La ves en el mapa en tiempo real y activamos el protocolo para ir a buscarla."
      },
    ],
    ctaTitle: "Volvé a laburar tranquilo.",
    ctaSub: "Instalación en 60-90 minutos en nuestro taller de Córdoba. Salís protegido el mismo día.",
    ctaButton: "Quiero proteger mi moto",
    whatsappMessage: "Hola Centinel, laburo con mi moto y quiero protegerla. ¿Me contás cómo funciona el servicio?",
  },
  // BORRADOR — pendiente de aprobación
  transporte: {
    kicker: "Para el que va a todos lados en moto",
    problemTitle: "Tu moto te ahorra tiempo y plata. Todos los días.",
    problemText: "Te movés rápido, gastás monedas de nafta, llegás a todos lados. Hasta el día que no está y caés en la cuenta de cuánto dependías de ella.",
    agitateTitle: "Reponerla cuesta una fortuna. Cuidarla, monedas.",
    agitateText: "En Córdoba se denuncian más de 25 robos de motos por día. Si te la sacan, recuperarla depende de una sola cosa: saber dónde está al instante. El rastreo te sale por mes menos que un par de cargas de nafta. Comprarte otra moto, ni comparación.",
    solutionTitle: "La cuenta cierra sola.",
    solutionText: "Tu moto conectada a tu celular, las 24 horas.",
    benefits: [
      {
        icon: AlertTriangle,
        title: "Alerta al instante",
        desc: "Si alguien la toca o la mueve mientras estás adentro, te suena el celular al segundo."
      },
      {
        icon: PowerOff,
        title: "Corte de corriente remoto",
        desc: "¿Te la llevaron? La apagás desde el celular y no arranca más. Donde esté."
      },
      {
        icon: Navigation,
        title: "Recupero sin importar la zona",
        desc: "La ves en el mapa en tiempo real y activamos el protocolo para ir a buscarla."
      },
    ],
    ctaTitle: "La inversión más obvia para tu moto.",
    ctaSub: "Instalación en 60-90 minutos en nuestro taller de Córdoba. Salís protegido el mismo día.",
    ctaButton: "Quiero proteger mi moto",
    whatsappMessage: "Hola Centinel, uso mi moto para moverme todos los días y quiero protegerla. ¿Me contás cómo funciona el servicio?",
  },
  // BORRADOR — pendiente de aprobación
  rider: {
    kicker: "Para el que sale a rodar",
    problemTitle: "La ruta es tuya. El miedo, no.",
    problemText: "Salir a rodar es desconectar. Pero cuanto más lejos vas, más solo te sentís si algo pasa en el camino.",
    agitateTitle: "Lejos de casa, ¿quién sabe por dónde andás?",
    agitateText: "Una rodada larga, una picada con amigos, una parada en el bar del camino. Disfrutás distinto cuando tu gente puede ver por dónde vas en tiempo real, y sabés que la moto avisa si alguien la toca mientras la dejás un rato sola.",
    solutionTitle: "Tu compañero de ruta invisible.",
    solutionText: "Tu moto conectada a tu celular, las 24 horas.",
    benefits: [
      {
        icon: Users,
        title: "Tu gente sabe dónde andás",
        desc: "Compartí tu ubicación en vivo con quien quieras. Si salís a la ruta, tu familia te sigue el viaje desde el celular."
      },
      {
        icon: MapPin,
        title: "Ubicación y recorridos",
        desc: "La ves en el mapa en tiempo real y guardás el historial de tus salidas de hasta 6 meses."
      },
      {
        icon: AlertTriangle,
        title: "Cuidada en cada parada",
        desc: <>Si alguien la toca mientras parás, te avisa al instante. <strong className="text-[#9fe43f] font-semibold">Y si hace falta, la apagás desde el celular.</strong></>
      },
    ],
    ctaTitle: "Salí a rodar. Nunca más solo.",
    ctaSub: "Instalación en 60-90 minutos en nuestro taller de Córdoba. Salís protegido el mismo día.",
    ctaButton: "Quiero rodar tranquilo",
    whatsappMessage: "Hola Centinel, salgo a rodar con mi moto y quiero protegerla. ¿Me contás cómo funciona el servicio?",
  },
  // BORRADOR — pendiente de aprobación
  fierrero: {
    kicker: "Para el que tiene una joya",
    problemTitle: "Una moto así no es una moto más.",
    problemText: "Hay piezas, tiempo y cariño que ningún seguro te devuelve.",
    agitateTitle: "Las motos cuidadas no se roban al azar: se eligen.",
    agitateText: "Y si pasa, lo que define todo es el tiempo: cuanto antes sepas dónde está, más chances de recuperarla entera. A ciegas, la búsqueda se hace cuesta arriba.",
    solutionTitle: "Protegela como la cuidás.",
    solutionText: "Tu moto conectada a tu celular, las 24 horas.",
    benefits: [
      {
        icon: AlertTriangle,
        title: "Alerta al instante",
        desc: "Si alguien la toca, la mueve o la enciende, te suena el celular al segundo."
      },
      {
        icon: EyeOff,
        title: "Instalación oculta indetectable",
        desc: "Sin luces, sin sirenas, sin marcas. El ladrón no sabe que está siendo rastreado."
      },
      {
        icon: PowerOff,
        title: "Corte de corriente remoto",
        desc: "La apagás desde el celular y no arranca más. Donde esté."
      },
    ],
    ctaTitle: "Dormí tranquilo. Ella está vigilada.",
    ctaSub: "Instalación en 60-90 minutos en nuestro taller de Córdoba. Salís protegido el mismo día.",
    ctaButton: "Quiero protegerla ya",
    whatsappMessage: "Hola Centinel, tengo una moto que cuido mucho y quiero protegerla. ¿Me contás cómo funciona el servicio?",
  },
};

// --- PANTALLA 1: SELECCIÓN DE PERFIL ---
const ProfileSelector = ({ onSelect }) => {
  // "Lock-on": al elegir, la tarjeta se fija como objetivo de radar antes de pasar al flujo
  const [picked, setPicked] = useState(null);
  const handlePick = (id) => {
    if (picked) return;
    setPicked(id);
    setTimeout(() => onSelect(id), 750);
  };

  const options = [
    { id: "laburante", icon: Package, phrase: "Laburo con mi moto todos los días" },
    { id: "transporte", icon: Route, phrase: "Es mi transporte: me lleva a todos lados" },
    { id: "rider", icon: Compass, phrase: "Salgo a rodar, es mi cable a tierra" },
    { id: "fierrero", icon: Gem, phrase: "Tengo una moto que cuido como un tesoro" },
  ];

  return (
    <section className="min-h-screen bg-[#02255b] bg-grid-soft flex flex-col px-6 py-5 relative overflow-hidden">
      {/* Fondo sutil */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#9fe43f] rounded-full mix-blend-overlay filter blur-[100px] opacity-15 animate-blob" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#9fe43f] rounded-full mix-blend-overlay filter blur-[100px] opacity-15 animate-blob animation-delay-2000" />


      <div className="max-w-md mx-auto w-full flex flex-col flex-1 justify-center relative z-10">
        {/* Logo */}
        <m.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <span className="flex items-center justify-center gap-2.5">
            <img src="/centinel-logo.svg" alt="" aria-hidden="true" className="h-9 w-auto" />
            <span className="text-xl font-black tracking-tighter text-white">
              CENTINEL <span className="text-[#9fe43f]">GPS</span>
            </span>
          </span>
          <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mt-1">
            Seguridad satelital para tu moto · Córdoba
          </p>
        </m.div>

        {/* Pregunta */}
        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-3xl md:text-4xl font-black text-white text-center mb-2 leading-tight"
        >
          ¿Cómo vivís <span className="text-[#9fe43f]">tu moto</span>?
        </m.h1>
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 text-center mb-5 text-sm"
        >
          Elegí la que más se parezca a vos y te mostramos cómo protegerla.
        </m.p>

        {/* Tarjetas de perfil */}
        <div className="flex flex-col gap-2.5">
          {options.map((opt, i) => (
            <m.button
              key={opt.id}
              initial={{ opacity: 0, y: 30 }}
              animate={
                picked === opt.id
                  ? { opacity: 1, y: 0, scale: 1.03 }
                  : picked
                  ? { opacity: 0.25, y: 0, scale: 0.97 }
                  : { opacity: 1, y: 0 }
              }
              transition={picked ? { duration: 0.3 } : { delay: 0.4 + i * 0.1 }}
              whileHover={picked ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handlePick(opt.id)}
              className={`w-full min-h-[64px] bg-[#011a42] border rounded-2xl px-4 py-3 flex items-center gap-3 text-left transition-colors group cursor-pointer ${
                picked === opt.id
                  ? "border-[#9fe43f] shadow-[0_0_25px_rgba(159,228,63,0.35)]"
                  : "border-white/10 hover:border-[#9fe43f]/60"
              }`}
            >
              {/* Ícono en contenedor estilizado */}
              {(() => {
                const Icon = opt.icon;
                return (
                  <span
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      picked === opt.id
                        ? "bg-[#9fe43f] text-[#02255b]"
                        : "bg-[#9fe43f]/10 text-[#9fe43f] group-hover:bg-[#9fe43f]/20"
                    }`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                );
              })()}
              <span className="flex-1 text-white font-bold text-[15px] leading-snug">
                "{opt.phrase}"
              </span>
              {picked === opt.id ? (
                <m.span
                  className="w-5 h-5 rounded-full border-2 border-[#9fe43f] border-t-transparent flex-shrink-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                />
              ) : (
                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#9fe43f] group-hover:translate-x-1 transition-all flex-shrink-0" aria-hidden="true" />
              )}
            </m.button>
          ))}
        </div>

        {/* Salida discreta / estado de localización */}
        {picked ? (
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 mx-auto min-h-[44px] flex items-center gap-2 text-[#9fe43f] text-sm font-bold"
          >
            <span className="w-2 h-2 bg-[#9fe43f] rounded-full animate-ping" aria-hidden="true" />
            Localizando tu camino…
          </m.p>
        ) : (
          <m.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            onClick={() => onSelect("all")}
            className="mt-2 mx-auto text-gray-400 hover:text-white text-sm underline underline-offset-4 min-h-[44px] px-4 cursor-pointer transition-colors"
          >
            Prefiero ver toda la info →
          </m.button>
        )}

        {/* Prueba social mínima */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-1 flex items-center justify-center gap-2 text-xs text-gray-400"
        >
          <span className="text-[#9fe43f]">★★★★★</span>
          <span className="font-bold text-gray-300">+300 motos protegidas en Córdoba</span>
        </m.div>
      </div>
    </section>
  );
};

// Puntos de confianza técnica — compartidos por todos los perfiles
const TRUST_POINTS = [
  {
    icon: Battery,
    title: "No mata la batería",
    desc: "Consumo ultra-bajo: hasta 50 días con la moto parada sin afectar el arranque."
  },
  {
    icon: Wrench,
    title: "Instalación profesional y poco invasiva",
    desc: "En nuestro taller propio, sin tocar la electrónica original de tu moto."
  },
  {
    icon: Cpu,
    title: "Tecnología importada de primer mundo",
    desc: "Porque entendemos que si falla el equipo, falla la confianza."
  },
  {
    icon: EyeOff,
    title: "100% oculto",
    desc: "Sin luces ni sirenas. El que se la quiera llevar no sabe que está siendo rastreado."
  },
];

// --- FLUJO PAS POR PERFIL ---
const ProfileFlow = ({ profileId, onReset }) => {
  const p = PROFILES[profileId];
  const whatsappUrl = WHATSAPP_LINK;

  return (
    <div className="bg-[#02255b]">
      {/* Header simple del flujo */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-[#00102b]/95 to-[#02255b]/90 backdrop-blur-md">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9fe43f]/60 to-transparent shadow-[0_0_8px_rgba(159,228,63,0.35)]" />
        <div className="max-w-3xl mx-auto px-5 py-3 flex justify-between items-center">
          <span className="flex items-center gap-2">
            <span className="relative flex items-center justify-center flex-shrink-0">
              <m.span
                className="absolute h-8 w-8 rounded-full border border-[#9fe43f]/40"
                animate={{ scale: [0.7, 2], opacity: [0.45, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                aria-hidden="true"
              />
              <m.span
                className="absolute h-8 w-8 rounded-full border border-[#9fe43f]/40"
                animate={{ scale: [0.7, 2], opacity: [0.45, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
                aria-hidden="true"
              />
              <img src="/centinel-logo.svg" alt="" aria-hidden="true" className="h-7 w-auto relative z-10" />
            </span>
            <span className="text-lg font-black tracking-tighter text-white">
              CENTINEL <span className="text-[#9fe43f]">GPS</span>
            </span>
          </span>
          <button
            onClick={onReset}
            className="text-gray-300 hover:text-white text-xs font-bold uppercase tracking-wide border border-white/15 rounded-full px-4 min-h-[44px] cursor-pointer transition-colors"
          >
            ← Elegir de nuevo
          </button>
        </div>
      </header>

      {/* 1. PROBLEMA */}
      <section className="pt-32 pb-16 px-6 text-center relative overflow-hidden bg-grid-soft">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#9fe43f] rounded-full mix-blend-overlay filter blur-[100px] opacity-10" />
        <div className="max-w-2xl mx-auto relative z-10">
          <m.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block py-2 px-5 rounded-full bg-[#9fe43f]/10 border border-[#9fe43f]/40 text-[#9fe43f] text-xs font-bold tracking-widest mb-8 uppercase"
          >
            {p.kicker}
          </m.span>
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-5xl font-black text-white leading-tight mb-6"
          >
            {p.problemTitle}
          </m.h1>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-gray-300 text-lg md:text-xl leading-relaxed"
          >
            {p.problemText}
          </m.p>
        </div>
      </section>

      {/* 2. AGITAR */}
      <section className="py-16 px-6 bg-[#00102b] border-y border-white/5 text-center">
        <div className="max-w-2xl mx-auto">
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
          >
            <AlertTriangle className="w-4 h-4" aria-hidden="true" /> El riesgo es real
          </m.div>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-white mb-5"
          >
            {p.agitateTitle}
          </m.h2>
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            {p.agitateText}
          </m.p>
        </div>
      </section>

      {/* 3. SOLUCIÓN */}
      <section className="py-20 px-6 relative overflow-hidden bg-grid-soft">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#9fe43f]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <m.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block py-2 px-5 rounded-full bg-[#9fe43f] text-[#02255b] text-xs font-black tracking-widest mb-6 uppercase"
            >
              La solución
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-white mb-4"
            >
              {p.solutionTitle}
            </m.h2>
            <m.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-300 text-lg"
            >
              {p.solutionText}
            </m.p>
          </div>

          <div className="flex flex-col gap-4">
            {p.benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#011a42] border border-white/10 rounded-3xl p-6 flex gap-5 items-start"
                >
                  <div className="w-12 h-12 bg-[#9fe43f]/10 rounded-2xl flex items-center justify-center text-[#9fe43f] flex-shrink-0">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">{b.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </m.div>
              );
            })}
          </div>

          {/* Confianza técnica (común a todos los perfiles) */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <p className="text-center text-gray-400 text-xs font-bold tracking-widest uppercase mb-5">
              Sin letra chica
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TRUST_POINTS.map((t, i) => {
                const TIcon = t.icon;
                return (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 items-start"
                  >
                    <TIcon className="w-5 h-5 text-[#9fe43f] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h4 className="text-white font-bold text-sm mb-0.5">{t.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </m.div>

          {/* CTA intermedio */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-wa-source={`perfil_${profileId}_solucion`}
              className="inline-flex items-center justify-center gap-3 bg-[#9fe43f] text-[#02255b] font-black py-4 px-8 rounded-full text-lg min-h-[56px] shadow-[0_0_30px_rgba(159,228,63,0.25)] hover:bg-white transition-colors w-full md:w-auto"
            >
              {p.ctaButton}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <p className="text-gray-500 text-xs mt-3">
              Te responde una persona del equipo, nunca un bot.
            </p>
          </m.div>
        </div>
      </section>

      {/* 3.5 DEMO DE LA APP */}
      <section className="py-16 px-6 bg-[#00102b] border-t border-white/5">
        <div className="max-w-md mx-auto text-center">
          <m.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block py-2 px-5 rounded-full bg-[#9fe43f]/10 border border-[#9fe43f]/40 text-[#9fe43f] text-xs font-bold tracking-widest mb-5 uppercase"
          >
            La app
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-white mb-8"
          >
            Mirá la app por dentro
          </m.h2>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto w-full max-w-[280px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#011a42]"
            style={{ aspectRatio: "9 / 16" }}
          >
            <AutoplayVideo src="/video/app-demo.mp4" poster="/video/app-demo-poster.webp" />
          </m.div>
        </div>
      </section>

      {/* 4. PRUEBA SOCIAL */}
      <SocialProof profileId={profileId} />

      {/* 5. PLANES */}
      <PricingSection />

      {/* 5.5 PREGUNTAS FRECUENTES */}
      <FAQ />

      {/* 6. CTA FINAL */}
      <section className="py-20 px-6 text-center bg-[#011a42] border-t border-white/5">
        <div className="max-w-xl mx-auto">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            {p.ctaTitle}
          </m.h2>
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg mb-8"
          >
            {p.ctaSub}
          </m.p>
          <m.a
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-wa-source={`perfil_${profileId}_cta_final`}
            className="inline-flex items-center justify-center gap-3 bg-[#9fe43f] text-[#02255b] font-black py-5 px-10 rounded-full text-xl min-h-[56px] shadow-[0_0_40px_rgba(159,228,63,0.3)] hover:bg-white transition-colors w-full md:w-auto"
          >
            {p.ctaButton}
            <ArrowRight className="w-6 h-6" aria-hidden="true" />
          </m.a>
          <p className="text-gray-500 text-sm mt-4">
            Taller propio en Córdoba Capital · Atención humana de lunes a sábado
          </p>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  // null = pantalla de selección | 'laburante'/'rider'/'fierrero' = flujo PAS | 'all' = landing completa
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [profile]);

  // Tracking global: cualquier clic en un link de WhatsApp dispara el evento Lead.
  // Capture phase (true) para registrarlo antes de que el navegador abra la pestaña.
  useEffect(() => {
    const handler = (e) => {
      const link = e.target.closest(
        'a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="whatsapp.com/send"]'
      );
      if (!link) return;
      trackLead(link.getAttribute("data-wa-source") || "whatsapp_generico");
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  return (
    <LazyMotion features={loadMotionFeatures}>
    <div className="min-h-screen bg-[#02255b] font-sans text-white selection:bg-[#9fe43f] selection:text-[#02255b]">
      <AnimatePresence mode="wait">
        {profile === null ? (
          <m.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProfileSelector onSelect={setProfile} />
            <FloatingWhatsApp />
          </m.div>
        ) : profile === "all" ? (
          <m.div
            key="all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Navbar />
            <Hero />
            <BrandMarquee />
            <ProblemSolution />
            <CutOffDetail />
            <HardwareSpecs />
            <SocialProof />
            <PricingSection />
            <HowItWorks />
            <StealthMode />
            <TrustSection />
            <FAQ />
            <Footer />
            <FloatingWhatsApp />
            <button
              onClick={() => setProfile(null)}
              className="fixed bottom-6 left-6 z-50 bg-[#011a42]/90 backdrop-blur border border-white/20 text-white text-xs font-bold px-4 min-h-[44px] rounded-full shadow-lg hover:border-[#9fe43f] transition-colors cursor-pointer"
            >
              ← Volver al inicio
            </button>
          </m.div>
        ) : (
          <m.div
            key={profile}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProfileFlow profileId={profile} onReset={() => setProfile(null)} />
          </m.div>
        )}
      </AnimatePresence>
    </div>
    </LazyMotion>
  );
}