/**
 * Ravi Restaurant — $100K Premium Light Luxury Website
 * Design: Editorial Luxury · White + Pakistani Green
 * Zero icons. Pure typography + geometry + whitespace.
 * Designed by ShapesInfinity.tech
 */

import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   ANIMATION PRIMITIVES
   ───────────────────────────────────────────── */

const ease = [0.16, 1, 0.3, 1];

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 1, delay, ease }}
    className={className}
  >
    {children}
  </motion.div>
);

const SlideIn = ({ children, delay = 0, className = "", from = "left" }: { children: React.ReactNode; delay?: number; className?: string; from?: "left" | "right" }) => (
  <motion.div
    initial={{ opacity: 0, x: from === "left" ? -80 : 80 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 1, delay, ease }}
    className={className}
  >
    {children}
  </motion.div>
);

const ScaleReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 1.2, delay, ease }}
    className={className}
  >
    {children}
  </motion.div>
);

const Stagger = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-40px" }}
    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerChild = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── Text Reveal — Word-by-word clip-mask unveil ─── */

function TextReveal({ children, className = "", delay = 0 }: { children: string; className?: string; delay?: number }) {
  const words = children.split(" ");
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`inline ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.3em] last:mr-0">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: {
                  duration: 0.7,
                  delay: delay + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ─── Line Reveal — Animated horizontal line that draws on scroll ─── */

function LineReveal({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-block origin-left w-10 h-px bg-green ${className}`}
    />
  );
}

/* ─── Label Reveal — Subtitle that fades + slides in ─── */

function LabelReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-4 ${className}`}
    >
      <LineReveal delay={delay} />
      <span className="text-green text-[0.7rem] font-semibold tracking-[3px] uppercase">{children}</span>
    </motion.div>
  );
}

/* ─── Counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const dur = 2000, t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target]);

  return <div ref={ref} className="font-serif text-5xl md:text-7xl text-green font-semibold tabular-nums">{count}{suffix}</div>;
}

/* ─── Magnetic Button ─── */
function MagButton({ children, className = "", href, onClick }: { children: React.ReactNode; className?: string; href?: string; onClick?: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const move = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  };
  const leave = () => { x.set(0); y.set(0); };

  const Tag = href ? motion.a : motion.button;
  return <Tag href={href} onClick={onClick} style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={leave} className={className}>{children}</Tag>;
}

/* ─── Parallax Image ─── */
function PxImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ y }} className="w-full h-[120%] object-cover" referrerPolicy="no-referrer" />
    </div>
  );
}


/* ─── Premium Loading Screen ─── */

function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number;
    const t0 = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.floor(eased * 100));
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 400);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <div className="font-serif text-5xl md:text-6xl text-green font-medium tracking-tight">Ravi</div>
        <div className="text-[0.6rem] text-ash tracking-[4px] uppercase mt-2">Restaurant · Since 1978</div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-px bg-mist relative overflow-hidden">
        <motion.div
          className="h-full bg-green origin-left"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Percentage */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[0.65rem] text-ash tracking-[3px] mt-4 tabular-nums font-medium"
      >
        {progress}%
      </motion.div>
    </motion.div>
  );
}

/* ─── Lazy Video — only loads when in viewport ─── */

function LazyVideo({ src, className = "", poster }: { src: string; className?: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "200px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      autoPlay={inView}
      loop
      muted
      playsInline
      poster={poster}
      className={className}
    >
      {inView && <source src={src} type="video/mp4" />}
    </video>
  );
}


/* ─────────────────────────────────────────────
   MAIN APP
   ───────────────────────────────────────────── */

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Mains");

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOp = useTransform(hp, [0, 0.6], [1, 0]);
  const heroScale = useTransform(hp, [0, 0.6], [1, 0.96]);
  const heroImgY = useTransform(hp, [0, 1], ["0%", "25%"]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const menu: Record<string, Array<{ name: string; desc: string; price: string; tag?: string }>> = {
    Mains: [
      { name: "Chicken Karahi", desc: "Slow-cooked in a wok with tomatoes, green chillies, ginger & secret spices", price: "42", tag: "Bestseller" },
      { name: "Mutton Nihari", desc: "12-hour slow-braised mutton shank in rich aromatic nihari gravy", price: "58", tag: "Signature" },
      { name: "Dal Makhani", desc: "Black lentils cooked low and slow with butter, cream & whole spices", price: "28" },
      { name: "Seekh Kebab", desc: "Hand-minced lamb kebabs grilled over charcoal with fresh herbs", price: "35" },
    ],
    Karahi: [
      { name: "Chicken Karahi", desc: "Classic wok-cooked chicken with tomatoes and green chillies", price: "42", tag: "Bestseller" },
      { name: "Mutton Karahi", desc: "Tender mutton pieces in rich karahi masala with fresh ginger", price: "65" },
      { name: "Prawn Karahi", desc: "Fresh Gulf prawns in our signature karahi sauce", price: "75", tag: "Special" },
    ],
    Biryani: [
      { name: "Lamb Biryani", desc: "Fragrant basmati layered with tender lamb, saffron & caramelized onions", price: "55", tag: "Must Try" },
      { name: "Chicken Biryani", desc: "Classic Karachi-style chicken biryani with aloo and whole spices", price: "38" },
    ],
    Breads: [
      { name: "Peshwari Naan", desc: "Stone-baked flatbread stuffed with coconut, almonds & sultanas", price: "12" },
      { name: "Garlic Naan", desc: "Tandoor-baked naan with roasted garlic and fresh coriander", price: "8" },
      { name: "Tandoori Roti", desc: "Whole wheat flatbread baked fresh in our clay tandoor", price: "5" },
    ],
    Desserts: [
      { name: "Gulab Jamun", desc: "Soft milk-solid dumplings soaked in rose-scented sugar syrup", price: "18" },
      { name: "Kheer", desc: "Creamy rice pudding infused with cardamom, saffron & pistachios", price: "15" },
    ],
  };

  const navItems = ["Our Story", "Menu", "Specials", "Reviews", "Contact"];

  return (
    <>
      {/* ─── Premium Loading Screen ─── */}
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

    <div className={`min-h-screen font-sans text-charcoal bg-white ${loading ? "overflow-hidden h-screen" : ""}`}>

      {/* ─── Top Strip ─── */}
      <div className="bg-green text-white text-center py-2.5 px-4 text-[0.6rem] tracking-[3px] font-semibold uppercase z-[101] relative">
        Website Concept by ShapesInfinity.tech for Ravi Restaurant, Dubai
      </div>

      {/* ─── Navbar ─── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease }}
        className={`fixed top-[36px] w-full z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl py-4 shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 flex justify-between items-center">
          <a href="#" className="flex flex-col">
            <span className="font-serif text-[1.7rem] md:text-[2rem] text-green font-medium tracking-tight leading-none">Ravi</span>
            <span className="text-[0.55rem] text-ash tracking-[3px] uppercase mt-1">Restaurant · 1978</span>
          </a>

          <ul className="hidden lg:flex gap-10 items-center">
            {navItems.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-ash hover:text-green text-[0.8rem] font-medium tracking-wide transition-colors duration-300 relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-green transition-all duration-400 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <MagButton className="hidden lg:block bg-green hover:bg-green-deep text-white px-8 py-3 text-[0.75rem] font-semibold tracking-widest uppercase btn-shine transition-all duration-300">
            Reserve
          </MagButton>

          <button className="lg:hidden text-charcoal" onClick={() => setMenuOpen(true)}>
            <span className="flex flex-col gap-1.5">
              <span className="w-6 h-[1.5px] bg-charcoal" />
              <span className="w-4 h-[1.5px] bg-charcoal" />
            </span>
          </button>
        </div>
      </motion.nav>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col px-8 py-8"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="font-serif text-2xl text-green font-medium">Ravi</span>
              <button onClick={() => setMenuOpen(false)} className="text-charcoal text-sm font-medium tracking-widest uppercase">Close</button>
            </div>
            <ul className="flex flex-col gap-8">
              {navItems.map((item, i) => (
                <motion.li key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 + 0.15 }}>
                  <a href={`#${item.toLowerCase().replace(" ", "-")}`} onClick={() => setMenuOpen(false)} className="font-serif text-4xl text-charcoal hover:text-green transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto pb-6">
              <button className="w-full bg-green text-white py-4 text-sm font-semibold tracking-widest uppercase">Reserve a Table</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden bg-ivory">

        {/* ── HERO VIDEO BACKGROUND ──
            Replace the src below with your own video file or URL.
            Supported: .mp4, .webm
            Place your video in the public/ folder and use "/your-video.mp4"
            Or use a full URL like "https://your-domain.com/ravi-hero.mp4"
        */}
        {/* Hero Video — Chicken Karahi Cooking (compressed 2.6MB) */}
        <motion.div style={{ y: heroImgY }} className="absolute inset-0 -top-[10%] -bottom-[10%]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src={`${import.meta.env.BASE_URL}hero-video.mp4`} type="video/mp4" />
          </video>

          {/* Overlays for text readability */}
          <div className="absolute inset-0 bg-white/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/30 to-white/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory/70 via-transparent to-transparent" />
        </motion.div>

        {/* Decorative green vertical line */}
        <div className="absolute left-8 md:left-16 top-0 bottom-0 w-px bg-green/10 z-10" />

        <motion.div style={{ opacity: heroOp, scale: heroScale }} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 pt-40 pb-20 md:pb-28 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="w-12 h-px bg-green" />
            <span className="text-green text-[0.7rem] font-semibold tracking-[4px] uppercase">Al Satwa, Dubai · Established 1978</span>
          </motion.div>

          <h1 className="font-serif text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.95] mb-8 max-w-[900px] text-charcoal">
            <TextReveal delay={0.7}>Where</TextReveal>{" "}
            <span className="inline-block overflow-hidden align-bottom">
              <motion.em
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="text-green-gradient not-italic italic inline-block"
              >
                Karachi
              </motion.em>
            </span>
            <br />
            <TextReveal delay={0.95}>meets Dubai.</TextReveal>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-ash text-lg md:text-xl leading-relaxed max-w-xl mb-14"
          >
            Authentic Pakistani cuisine beloved by Dubai for over four decades. Legendary curries, timeless recipes, honest food.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-wrap gap-5"
          >
            <MagButton href="#menu" className="bg-green hover:bg-green-deep text-white px-12 py-4.5 text-[0.75rem] font-semibold tracking-[2px] uppercase btn-shine transition-all duration-300 inline-block">
              View Menu
            </MagButton>
            <MagButton href="#contact" className="border border-green text-green px-12 py-4.5 text-[0.75rem] font-semibold tracking-[2px] uppercase hover:bg-green hover:text-white transition-all duration-300 inline-block">
              Book a Table
            </MagButton>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-[0.55rem] text-ash tracking-[3px] uppercase [writing-mode:vertical-lr]">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="w-px h-10 bg-green/40" />
        </motion.div>
      </section>


      {/* ════════════════════════════════════════════
          MARQUEE STRIP
          ════════════════════════════════════════════ */}
      <div className="bg-green text-white py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-8 text-[0.7rem] font-medium tracking-[2px] uppercase">
              <span>Open 24 Hours</span>
              <span className="text-white/30">—</span>
              <span>Al Satwa, Dubai</span>
              <span className="text-white/30">—</span>
              <span>Legendary Since 1978</span>
              <span className="text-white/30">—</span>
              <span>Delivery Available</span>
              <span className="text-white/30">—</span>
              <span>4.4 Google Rating</span>
              <span className="text-white/30 mr-16">—</span>
            </div>
          ))}
        </div>
      </div>


      {/* ════════════════════════════════════════════
          STATS
          ════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x divide-border">
          {[
            { num: 45, suffix: "+", label: "Years Serving Dubai" },
            { num: 1000, suffix: "+", label: "Guests Every Day" },
            { num: 4, suffix: ".4", label: "Google Rating" },
          ].map((s, i) => (
            <FadeUp key={i} delay={i * 0.15} className="text-center px-8">
              <Counter target={s.num} suffix={s.suffix} />
              <div className="text-[0.7rem] text-ash font-medium tracking-[3px] uppercase mt-4">{s.label}</div>
            </FadeUp>
          ))}
        </div>
      </section>

      <div className="hr-green max-w-[1400px] mx-auto" />


      {/* ════════════════════════════════════════════
          OUR STORY
          ════════════════════════════════════════════ */}
      <section id="our-story" className="py-28 md:py-40 px-6 md:px-16 bg-white relative overflow-hidden">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-green-faint blur-[100px] pointer-events-none opacity-60" />

        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
          <SlideIn from="left">
            <div className="relative">
              <PxImage
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2000&auto=format&fit=crop"
                alt="Ravi Restaurant Interior"
                className="aspect-[4/5] w-full"
              />
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 md:right-8 bg-green text-white px-10 py-7 shadow-2xl"
              >
                <div className="font-serif text-4xl font-bold leading-none">45+</div>
                <div className="text-[0.6rem] font-semibold tracking-[2px] uppercase mt-2 text-white/80">Years of Legacy</div>
              </motion.div>
            </div>
          </SlideIn>

          <SlideIn from="right" delay={0.2}>
            <LabelReveal delay={0.1} className="mb-6">Our Heritage</LabelReveal>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-charcoal leading-[1.1] mb-8">
              <TextReveal delay={0.2}>A Dubai Institution</TextReveal><br />
              <TextReveal delay={0.4}>Since</TextReveal>{" "}
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="text-green-gradient inline-block"
                >1978</motion.span>
              </span>
            </h2>

            <p className="text-ash text-lg leading-[1.8] mb-8">
              In 1978, a small family from Karachi opened a humble restaurant in Al Satwa with one mission — serve the most authentic Pakistani food Dubai had ever tasted. More than 45 years later, Ravi Restaurant is a Dubai legend.
            </p>

            <div className="border-l-2 border-green bg-green-faint pl-8 py-6 pr-6 my-10">
              <p className="font-serif italic text-xl md:text-2xl text-charcoal leading-relaxed">
                "Ravi is not just a restaurant. It's a piece of Dubai's soul — the kind of place that makes this city feel like home."
              </p>
            </div>

            <p className="text-ash leading-[1.8]">
              Our menu has remained unchanged because perfection doesn't need improvement. Every curry, every karahi, every naan — prepared with generations of knowledge.
            </p>
          </SlideIn>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          MENU
          ════════════════════════════════════════════ */}
      <section id="menu" className="py-28 md:py-40 px-6 md:px-16 bg-ivory relative">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <LineReveal />
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-green text-[0.7rem] font-semibold tracking-[3px] uppercase">Handcrafted Daily</motion.span>
              <LineReveal delay={0.1} className="inline-block origin-right w-10 h-px bg-green" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-charcoal leading-tight">
              <TextReveal delay={0.15}>Our Famous Menu</TextReveal>
            </h2>
            <FadeUp delay={0.4}><p className="text-ash text-lg mt-5">Recipes unchanged since 1978.</p></FadeUp>
          </div>

          {/* Tabs */}
          <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-1.5 mb-14">
            {Object.keys(menu).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-7 py-3 text-[0.75rem] font-semibold tracking-[1.5px] uppercase transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-green text-white"
                    : "text-ash hover:text-green border border-transparent hover:border-green/20"
                }`}
              >
                {tab}
              </button>
            ))}
          </FadeUp>

          {/* Items */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {(menu[activeTab] || []).map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="group py-8 border-b border-border last:border-0 transition-all duration-300 hover:pl-3"
                >
                  <div className="flex justify-between items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-3 mb-2">
                        <span className="font-serif text-xl md:text-2xl text-charcoal group-hover:text-green transition-colors duration-300">{item.name}</span>
                        {item.tag && (
                          <span className="text-[0.55rem] font-bold tracking-[2px] uppercase text-green bg-green-pale px-3 py-1">{item.tag}</span>
                        )}
                      </div>
                      <p className="text-sm text-ash leading-relaxed max-w-lg">{item.desc}</p>
                    </div>
                    <div className="font-serif text-2xl text-green font-semibold whitespace-nowrap">
                      <span className="text-sm font-sans text-ash font-normal mr-1">AED</span>{item.price}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          FULL WIDTH IMAGE QUOTE
          ════════════════════════════════════════════ */}
      {/* Quote Section — Pot Lid Lifted Video (compressed 1.5MB) */}
      <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <LazyVideo
          src={`${import.meta.env.BASE_URL}quote-video.mp4`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-deep/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FadeUp className="text-center px-6">
            <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-white max-w-4xl leading-tight italic">
              "The best meal in Dubai for under 60 dirhams."
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className="w-8 h-px bg-white/40" />
              <span className="text-white/70 text-[0.7rem] tracking-[3px] uppercase font-medium">TimeOut Dubai</span>
              <span className="w-8 h-px bg-white/40" />
            </div>
          </FadeUp>
        </div>
      </div>


      {/* ════════════════════════════════════════════
          SPECIALS
          ════════════════════════════════════════════ */}
      <section id="specials" className="py-28 md:py-40 px-6 md:px-16 bg-white relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20">
            <LabelReveal className="mb-6">Chef's Selection</LabelReveal>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-charcoal leading-tight">
              <TextReveal delay={0.15}>Weekly Specials</TextReveal>
            </h2>
            <FadeUp delay={0.35}><p className="text-ash text-lg mt-5">Limited dishes, finest seasonal ingredients.</p></FadeUp>
          </div>

          <Stagger className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Whole Roast Lamb", desc: "Weekend special — whole slow-roasted lamb with aromatic rice. Order 24h in advance. Serves groups.", price: "380", label: "per whole" },
              { title: "Prawn Karahi", desc: "Fresh Gulf prawns in our signature karahi sauce. Available Wednesday & Thursday only.", price: "75", label: "" },
              { title: "Family Feast Box", desc: "Feeds 4–6. Karahi + Biryani + Dal + Naan x6 + Salad + Raita + Dessert.", price: "220", label: "for 4–6" },
            ].map((s, i) => (
              <StaggerChild key={i}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="border border-border bg-snow p-10 md:p-12 h-full flex flex-col group cursor-default hover:border-green/20 transition-colors duration-500"
                >
                  {/* Number */}
                  <span className="font-serif text-6xl text-green/10 font-bold leading-none mb-8 group-hover:text-green/20 transition-colors duration-500">
                    0{i + 1}
                  </span>
                  <h3 className="font-serif text-2xl text-charcoal mb-4 group-hover:text-green transition-colors duration-300">{s.title}</h3>
                  <p className="text-ash text-sm leading-relaxed flex-1 mb-10">{s.desc}</p>
                  <div>
                    <span className="font-serif text-3xl text-green font-semibold">AED {s.price}</span>
                    {s.label && <span className="text-ash text-sm ml-2">/ {s.label}</span>}
                  </div>
                </motion.div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          WHY RAVI
          ════════════════════════════════════════════ */}
      <section className="py-28 md:py-40 px-6 md:px-16 bg-green-faint relative overflow-hidden">
        <div className="absolute -right-40 top-20 w-[600px] h-[600px] rounded-full bg-green/5 blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
          <SlideIn from="left">
            <LabelReveal className="mb-6">The Ravi Way</LabelReveal>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-charcoal leading-[1.1] mb-14">
              <TextReveal delay={0.15}>Why Dubai Loves</TextReveal><br />
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-green-gradient inline-block"
                >Ravi</motion.span>
              </span>
            </h2>

            <Stagger className="flex flex-col gap-10">
              {[
                { num: "01", title: "Open 24 Hours, Every Day", desc: "Whether it's 2 AM or 2 PM, Ravi is always open. Great food has no closing time." },
                { num: "02", title: "Unchanged Recipes Since 1978", desc: "Our founder's recipes have never been modified. If it was perfect then, why change it?" },
                { num: "03", title: "From Presidents to Everyone", desc: "From heads of state to construction workers — Ravi has always been for everyone." },
                { num: "04", title: "Unbeatable Value", desc: "A full meal for under AED 60. Quality food should never be a luxury." },
              ].map((item) => (
                <StaggerChild key={item.num} className="flex gap-8 items-start group">
                  <div className="font-serif text-3xl text-green/20 font-bold min-w-[50px] group-hover:text-green/50 transition-colors duration-500">{item.num}</div>
                  <div>
                    <h4 className="font-semibold text-charcoal text-lg mb-2 group-hover:text-green transition-colors duration-300">{item.title}</h4>
                    <p className="text-sm text-ash leading-relaxed">{item.desc}</p>
                  </div>
                </StaggerChild>
              ))}
            </Stagger>
          </SlideIn>

          <SlideIn from="right" delay={0.2} className="relative">
            <PxImage
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop"
              alt="Fine dining"
              className="aspect-square w-full"
            />
            {/* Corner decorations */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-green/20" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-green/20" />
          </SlideIn>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          REVIEWS
          ════════════════════════════════════════════ */}
      <section id="reviews" className="py-28 md:py-40 px-6 md:px-16 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <LineReveal />
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-green text-[0.7rem] font-semibold tracking-[3px] uppercase">Guest Stories</motion.span>
              <LineReveal delay={0.1} className="inline-block origin-right w-10 h-px bg-green" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-charcoal">
              <TextReveal delay={0.15}>Dubai Speaks</TextReveal>
            </h2>
          </div>

          <Stagger className="grid md:grid-cols-3 gap-8">
            {[
              { text: "I've lived in Dubai for 18 years and Ravi has been my weekly ritual for all 18 of them. The chicken karahi is the best dish in the city — no contest.", author: "Ahmed Al Mansouri", loc: "Dubai" },
              { text: "My first stop whenever I land in Dubai. I've been to Michelin-starred restaurants and nothing compares to Ravi's nihari at midnight. Magic in a bowl.", author: "James Thornton", loc: "London" },
              { text: "The biryani is extraordinary. The family feast box fed 6 of us for AED 220. We ordered it twice in the same week. Incredible value.", author: "Priya Sharma", loc: "Dubai Silicon Oasis" },
            ].map((r, i) => (
              <StaggerChild key={i}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="border border-border bg-snow p-10 h-full flex flex-col hover:border-green/20 transition-colors duration-500"
                >
                  {/* Star representation — no icons, just text */}
                  <div className="text-green text-sm font-semibold tracking-[2px] mb-8">★ ★ ★ ★ ★</div>
                  <p className="text-ash text-[0.95rem] leading-[1.8] italic flex-1 mb-10">"{r.text}"</p>
                  <div>
                    <div className="font-semibold text-charcoal text-sm">{r.author}</div>
                    <div className="text-[0.7rem] text-ash mt-1 tracking-wide">{r.loc}</div>
                  </div>
                </motion.div>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          CTA
          ════════════════════════════════════════════ */}
      <section id="contact" className="relative py-28 md:py-40 px-6 md:px-16 bg-green overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-tight mb-8">
            <TextReveal>Come Experience Ravi</TextReveal>
          </h2>
          <p className="text-lg text-white/80 leading-relaxed mb-14 max-w-2xl mx-auto">
            Over 45 years of legendary food, open 24 hours a day. Visit us in Al Satwa or order for delivery.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <MagButton className="bg-white text-green hover:bg-ivory px-12 py-5 text-[0.75rem] font-bold tracking-[2px] uppercase transition-all duration-300">
              Reserve a Table
            </MagButton>
            <MagButton className="border-2 border-white text-white hover:bg-white/10 px-12 py-5 text-[0.75rem] font-bold tracking-[2px] uppercase transition-all duration-300">
              Order Delivery
            </MagButton>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════ */}
      <footer className="bg-charcoal text-white/60 py-20 md:py-24 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h3 className="font-serif text-3xl text-white mb-2 tracking-tight">Ravi Restaurant</h3>
              <span className="text-green-soft text-[0.6rem] font-bold tracking-[2px] uppercase block mb-6">Authentic Pakistani Cuisine</span>
              <p className="text-sm leading-relaxed max-w-sm">
                Dubai's most beloved Pakistani restaurant since 1978. Al Satwa. Open 24 hours, every day.
              </p>
            </div>

            {[
              { title: "Visit", links: ["Al Satwa, Dubai", "Open 24/7", "Free Parking", "Get Directions"] },
              { title: "Menu", links: ["Karahi Dishes", "Biryani", "Breads & Sides", "Family Feast"] },
              { title: "Contact", links: ["+971 4 331 5353", "info@ravi-restaurant.ae", "Instagram", "WhatsApp"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white text-[0.65rem] font-bold tracking-[2px] uppercase mb-6">{col.title}</h4>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/50 text-sm hover:text-green-soft transition-colors duration-300">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>© 2026 Ravi Restaurant · All Rights Reserved · Al Satwa, Dubai</p>
            <p>Designed by <a href="#" className="text-green-soft hover:text-white transition-colors">ShapesInfinity.tech</a></p>
          </div>
        </div>
      </footer>

      {/* Bottom watermark */}
      <div className="bg-green text-white text-center py-3 px-4 text-[0.6rem] tracking-[2px] font-bold uppercase">
        Website Design Proposal by ShapesInfinity.tech · samueledison.c@gmail.com · shapesinfinity.tech
      </div>

    </div>
    </>
  );
}
