import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-sertao.jpg";
import bordadoImg from "@/assets/oficina-bordado.jpg";
import bijuteriaImg from "@/assets/oficina-bijuteria.jpg";
import caretaImg from "@/assets/oficina-careta.jpg";
import poesiaImg from "@/assets/oficina-poesia.jpg";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Eiken Project — Associação Triunfo Cultura e Arte" },
      {
        name: "description",
        content:
          "Projeto cultural que celebra a arte, o artesanato e a poesia do sertão pernambucano. Oficinas, mostras e tradição em Triunfo/PE.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..700,0..100&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
});

const oficinas = [
  { n: "01", titulo: "Tramas da Diversidade", sub: "Bordando Sonhos", desc: "Bordado artesanal celebrando a moda e a cultura sertaneja.", img: bordadoImg, oficineira: "Janaina Alencar", data: "Mar 2026" },
  { n: "02", titulo: "Eco-Bijuterias", sub: "Arte com Materiais Reciclados", desc: "Transformando o descartável em adorno: bijuteria sustentável.", img: bijuteriaImg, oficineira: "Victor Douglas Ramos", data: "Mar 2026" },
  { n: "03", titulo: "A Arte do Careta", sub: "Oficina de Máscaras e Relhos", desc: "Máscaras tradicionais que dão vida ao folclore pernambucano.", img: caretaImg, oficineira: "Coletivo Triunfo", data: "Out 2025" },
  { n: "04", titulo: "No Meu Sertão tem Poesia", sub: "Rimas e Contos", desc: "Mostra literária no Polo Gastronômico de Triunfo, valorizando a literatura sertaneja.", img: poesiaImg, oficineira: "Mostra Coletiva", data: "Set 2025" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Manifesto />
      <Oficinas />
      <UltimasPostagens />
      <Numeros />
      <Agenda />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 ken-burns">
        <img src={heroImg} alt="Sertão de Triunfo ao entardecer" className="h-full w-full object-cover" width={1920} height={1280} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink/80" />
      <div className="grain absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12 h-full flex flex-col justify-between pt-24 pb-16">
        <div className="flex items-center gap-3 text-paper/80 text-xs uppercase tracking-[0.3em] reveal">
          <span className="h-px w-10 bg-paper/60" />
          Triunfo · Pernambuco · Brasil
        </div>
        <div className="reveal" style={{ animationDelay: "0.2s" }}>
          <h1 className="font-display text-paper text-[clamp(3rem,11vw,11rem)] leading-[0.88] tracking-tight">
            Tramas <span className="italic font-light text-ochre">da</span><br />
            diversidade<span className="text-clay">.</span>
          </h1>
          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="max-w-md text-paper/85 text-base md:text-lg leading-relaxed">
              Um projeto cultural que celebra a arte, o artesanato e a poesia do sertão pernambucano —
              entre o bordado, o cordel e a máscara do careta.
            </p>
            <div className="flex items-center gap-6 text-paper/70 text-xs uppercase tracking-[0.25em]">
              <div>
                <div className="text-paper text-3xl font-display">12</div>
                <div className="mt-1">Oficinas ativas</div>
              </div>
              <div className="h-12 w-px bg-paper/30" />
              <div>
                <div className="text-paper text-3xl font-display">2026</div>
                <div className="mt-1">Edição atual</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Bordado", "Cordel", "Careta", "Cerâmica", "Reisado", "Xilogravura", "Forró", "Renda"];
  const loop = [...items, ...items, ...items];
  return (
    <div className="border-y border-border bg-clay text-paper py-6 overflow-hidden">
      <div className="marquee whitespace-nowrap flex gap-12 text-2xl md:text-4xl font-display">
        {loop.map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            {w}<span className="text-ochre">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="relative py-32 md:py-48 px-6 lg:px-12">
      <div className="mx-auto max-w-[1400px] grid md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground sticky top-32">
            <span className="text-clay">§</span> Manifesto
          </div>
        </div>
        <div className="md:col-span-9">
          <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
            Acreditamos que <em className="italic font-light text-clay">a arte do sertão</em> não cabe em vitrines —
            ela mora nas mãos, nos quintais e nas vozes de quem <span className="underline decoration-ochre decoration-4 underline-offset-8">faz cultura todo dia</span>.
          </p>
          <div className="mt-16 grid sm:grid-cols-3 gap-10 text-sm leading-relaxed text-muted-foreground">
            {[
              { t: "Memória viva", d: "Documentamos saberes e fazeres tradicionais antes que se percam no tempo." },
              { t: "Mão na massa", d: "Oficinas práticas conduzidas por mestres e artesãs da própria comunidade." },
              { t: "Triunfo no mapa", d: "Levamos a produção sertaneja para mostras, catálogos e festivais." },
            ].map((b) => (
              <div key={b.t} className="border-t border-foreground/20 pt-4">
                <h3 className="font-display text-xl text-foreground mb-2">{b.t}</h3>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Oficinas() {
  return (
    <section id="oficinas" className="bg-ink text-paper py-32 md:py-48 px-6 lg:px-12 grain">
      <div className="mx-auto max-w-[1400px] relative z-10">
        <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-ochre mb-4">Catálogo 2025–2026</div>
            <h2 className="font-display text-5xl md:text-7xl tracking-tight">
              Oficinas <span className="italic font-light">&</span> mostras
            </h2>
          </div>
          <div className="text-sm text-paper/60 max-w-xs">
            Quatro caminhos para entrar na cultura do sertão pelas mãos de quem a vive.
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-20">
          {oficinas.map((o, idx) => (
            <article key={o.n} className={`group ${idx % 2 === 1 ? "md:mt-24" : ""}`}>
              <div className="relative overflow-hidden mb-6 aspect-[4/5]">
                <img src={o.img} alt={o.titulo} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-paper text-ink text-xs px-3 py-1.5 font-mono">N° {o.n}</div>
                <div className="absolute bottom-4 right-4 text-paper/90 text-xs uppercase tracking-[0.2em] bg-ink/70 backdrop-blur-sm px-3 py-1.5">{o.data}</div>
              </div>
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <h3 className="font-display text-3xl md:text-4xl">{o.titulo}</h3>
                <span className="text-ochre text-2xl">→</span>
              </div>
              <div className="text-ochre italic mb-3 text-lg">{o.sub}</div>
              <p className="text-paper/70 leading-relaxed mb-4">{o.desc}</p>
              <div className="text-xs uppercase tracking-[0.2em] text-paper/50">Oficineira · {o.oficineira}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type PostPreview = {
  id: string;
  titulo: string;
  slug: string;
  excerpt: string | null;
  capa_url: string | null;
  categoria: string;
  autor: string | null;
  published_at: string | null;
};

function UltimasPostagens() {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("posts")
      .select("id, titulo, slug, excerpt, capa_url, categoria, autor, published_at")
      .eq("publicado", true)
      .order("published_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        setPosts(data ?? []);
        setLoading(false);
      });
  }, []);

  if (!loading && posts.length === 0) return null;

  return (
    <section className="py-32 md:py-48 px-6 lg:px-12 border-t border-border">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              <span className="text-clay">§</span> Diário do Sertão
            </div>
            <h2 className="font-display text-5xl md:text-7xl tracking-tight">
              Últimas <em className="italic font-light text-clay">postagens</em>
            </h2>
          </div>
          <Link to="/blog" className="text-xs uppercase tracking-[0.2em] border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors">
            Ver todas →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {posts.map((p) => (
            <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group block">
              <div className="relative overflow-hidden aspect-[4/5] mb-5 bg-secondary">
                {p.capa_url ? (
                  <img src={p.capa_url} alt={p.titulo} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="h-full w-full bg-clay/20 flex items-center justify-center text-6xl text-clay/40 font-display">✦</div>
                )}
                <div className="absolute top-4 left-4 bg-paper text-ink text-xs px-3 py-1.5 font-mono uppercase tracking-wider">{p.categoria}</div>
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {p.published_at ? new Date(p.published_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }) : ""}
              </div>
              <h3 className="font-display text-2xl md:text-3xl leading-tight group-hover:text-clay transition-colors">{p.titulo}</h3>
              {p.excerpt && <p className="mt-3 text-muted-foreground leading-relaxed line-clamp-3">{p.excerpt}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Numeros() {
  const stats = [
    { v: "12+", l: "Oficinas realizadas" },
    { v: "340", l: "Participantes inscritos" },
    { v: "08", l: "Mestres da cultura" },
    { v: "2014", l: "Desde" },
  ];
  return (
    <section className="py-24 px-6 lg:px-12 border-y border-border">
      <div className="mx-auto max-w-[1400px] grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats.map((s) => (
          <div key={s.l} className="border-t-2 border-clay pt-6">
            <div className="font-display text-5xl md:text-6xl tracking-tight">{s.v}</div>
            <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Agenda() {
  const eventos = [
    { d: "11", m: "Mar", t: "Oficina · Bordando Sonhos", l: "Polo Gastronômico, Triunfo" },
    { d: "11", m: "Mar", t: "Oficina · Eco-Bijuterias", l: "Escola Municipal Centro" },
    { d: "01", m: "Set", t: "Mostra · No Meu Sertão tem Poesia", l: "Praça Coberta" },
    { d: "12", m: "Out", t: "A Arte do Careta · Apresentação", l: "Triunfo / PE" },
  ];
  return (
    <section id="agenda" className="py-32 md:py-48 px-6 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="text-clay">§</span> Agenda
            </div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-5xl md:text-7xl tracking-tight">
              O que vem <em className="italic font-light text-clay">aí</em>.
            </h2>
          </div>
        </div>
        <div className="border-t border-foreground/30">
          {eventos.map((e, i) => (
            <a key={i} href="#" className="group grid grid-cols-12 gap-4 md:gap-10 items-center py-8 md:py-10 border-b border-foreground/20 hover:bg-clay/5 transition-colors px-2">
              <div className="col-span-2 font-display">
                <div className="text-4xl md:text-6xl leading-none">{e.d}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{e.m}</div>
              </div>
              <div className="col-span-8 md:col-span-7">
                <div className="font-display text-2xl md:text-3xl group-hover:text-clay transition-colors">{e.t}</div>
                <div className="text-sm text-muted-foreground mt-1">{e.l}</div>
              </div>
              <div className="col-span-2 md:col-span-3 text-right text-2xl md:text-3xl text-muted-foreground group-hover:text-clay group-hover:translate-x-1 transition-all">→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
