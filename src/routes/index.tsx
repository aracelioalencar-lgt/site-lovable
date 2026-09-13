import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/projeto-forro.png";
import bordadoImg from "@/assets/oficina-bordado.jpg";
import bijuteriaImg from "@/assets/oficina-bijuteria.jpg";
import caretaImg from "@/assets/oficina-careta.jpg";
import poesiaImg from "@/assets/oficina-poesia.jpg";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { supabase } from "@/integrations/supabase/client";
import { fetchBlogspotPosts } from "@/lib/blogspot";
import type { BlogspotPost } from "@/lib/blogspot";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Orizonn! — Associação Triunfo Cultura e Arte" },
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
  {
    n: "01",
    titulo: "Tramas da Diversidade",
    sub: "Bordando Sonhos",
    desc: "Bordado artesanal celebrando a moda e a cultura sertaneja.",
    img: bordadoImg,
    oficineira: "Janaina Alencar",
    data: "Mar 2026",
  },
  {
    n: "02",
    titulo: "Eco-Bijuterias",
    sub: "Arte com Materiais Reciclados",
    desc: "Transformando o descartável em adorno: bijuteria sustentável.",
    img: bijuteriaImg,
    oficineira: "Victor Douglas Ramos",
    data: "Mar 2026",
  },
  {
    n: "03",
    titulo: "A Arte do Careta",
    sub: "Oficina de Máscaras e Relhos",
    desc: "Máscaras tradicionais que dão vida ao folclore pernambucano.",
    img: caretaImg,
    oficineira: "Coletivo Triunfo",
    data: "Out 2025",
  },
  {
    n: "04",
    titulo: "No Meu Sertão tem Poesia",
    sub: "Rimas e Contos",
    desc: "Mostra literária no Polo Gastronômico de Triunfo, valorizando a literatura sertaneja.",
    img: poesiaImg,
    oficineira: "Mostra Coletiva",
    data: "Set 2025",
  },
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
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0 ken-burns">
        <img
          src={heroImg}
          alt="Projeto Forró"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink/80" />
      <div className="grain absolute inset-0" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-paper">
        <p className="text-[10px] uppercase tracking-[0.4em] text-ochre mb-4 reveal">
          Triunfo · Pernambuco
        </p>
        <h1
          className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] max-w-4xl reveal"
          style={{ animationDelay: "0.15s" }}
        >
          Arte viva do <em className="italic font-light text-ochre">sertão</em>
        </h1>
        <p
          className="mt-4 max-w-lg text-paper/70 text-base md:text-lg leading-relaxed reveal"
          style={{ animationDelay: "0.3s" }}
        >
          Oficinas, mostras e tradição que celebram a cultura e o artesanato pernambucano.
        </p>
        <a
          href="#oficinas"
          className="mt-8 inline-flex items-center gap-2 border border-paper/40 px-6 py-3 text-xs uppercase tracking-[0.2em] text-paper hover:bg-paper hover:text-ink transition-all duration-300 reveal"
          style={{ animationDelay: "0.45s" }}
        >
          Explorar oficinas
          <span>→</span>
        </a>
      </div>
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 reveal"
        style={{ animationDelay: "0.6s" }}
      >
        <a
          href="#manifesto"
          className="flex flex-col items-center gap-2 text-paper/50 hover:text-paper transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="w-px h-6 bg-paper/30 animate-pulse" />
        </a>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Bordado",
    "Cordel",
    "Careta",
    "Cerâmica",
    "Reisado",
    "Xilogravura",
    "Forró",
    "Renda",
  ];
  const loop = [...items, ...items, ...items];
  return (
    <div className="border-y border-border bg-clay text-paper py-4 overflow-hidden">
      <div className="marquee whitespace-nowrap flex gap-10 text-lg md:text-2xl font-display">
        {loop.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w}
            <span className="text-ochre text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Manifesto() {
  return (
    <section id="manifesto" className="relative py-20 md:py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-[1200px] grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground sticky top-32">
            <span className="text-clay">§</span> Manifesto
          </div>
        </div>
        <div className="md:col-span-9">
          <p className="font-display text-2xl md:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-tight">
            Acreditamos que <em className="italic font-light text-clay">a arte do sertão</em> não
            cabe em vitrines — ela mora nas mãos, nos quintais e nas vozes de quem{" "}
            <span className="underline decoration-ochre decoration-4 underline-offset-8">
              faz cultura todo dia
            </span>
            .
          </p>
          <div className="mt-12 grid sm:grid-cols-3 gap-8 text-sm leading-relaxed text-muted-foreground">
            {[
              {
                t: "Memória viva",
                d: "Documentamos saberes e fazeres tradicionais antes que se percam no tempo.",
              },
              {
                t: "Mão na massa",
                d: "Oficinas práticas conduzidas por mestres e artesãs da própria comunidade.",
              },
              {
                t: "Triunfo no mapa",
                d: "Levamos a produção sertaneja para mostras, catálogos e festivais.",
              },
            ].map((b, i) => (
              <div
                key={b.t}
                className="border-t border-foreground/20 pt-3 group hover:border-clay transition-colors duration-500"
              >
                <h3 className="font-display text-base text-foreground mb-1 group-hover:text-clay transition-colors">
                  {b.t}
                </h3>
                <p className="text-sm">{b.d}</p>
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
    <section id="oficinas" className="bg-ink text-paper py-20 md:py-28 px-6 lg:px-12 grain">
      <div className="mx-auto max-w-[1200px] relative z-10">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-ochre mb-3">
              Catálogo 2025–2026
            </div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">
              Oficinas <span className="italic font-light">&</span> mostras
            </h2>
          </div>
          <div className="text-xs text-paper/60 max-w-[280px]">
            Quatro caminhos para entrar na cultura do sertão pelas mãos de quem a vive.
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
          {oficinas.map((o, idx) => (
            <article key={o.n} className={`group ${idx % 2 === 1 ? "md:mt-12" : ""}`}>
              <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                <img
                  src={o.img}
                  alt={o.titulo}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-paper text-ink text-[10px] px-2 py-1 font-mono">
                  N° {o.n}
                </div>
                <div className="absolute bottom-3 right-3 text-paper/90 text-[10px] uppercase tracking-[0.2em] bg-ink/70 backdrop-blur-sm px-2 py-1">
                  {o.data}
                </div>
              </div>
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h3 className="font-display text-xl md:text-2xl">{o.titulo}</h3>
                <span className="text-ochre text-lg">→</span>
              </div>
              <div className="text-ochre italic mb-2 text-sm">{o.sub}</div>
              <p className="text-paper/70 text-sm leading-relaxed mb-2">{o.desc}</p>
              <div className="text-[10px] uppercase tracking-[0.2em] text-paper/50">
                Oficineira · {o.oficineira}
              </div>
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
  source?: "supabase" | "blogspot";
  link?: string;
};

function UltimasPostagens() {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase
        .from("posts")
        .select("id, titulo, slug, excerpt, capa_url, categoria, autor, published_at")
        .eq("publicado", true)
        .order("published_at", { ascending: false })
        .limit(3),
      fetchBlogspotPosts(),
    ]).then(([supaResult, blogspotPosts]) => {
      const supaPosts: PostPreview[] = (supaResult.data ?? []).map((p) => ({
        ...p,
        source: "supabase" as const,
      }));
      const bsPosts: PostPreview[] = blogspotPosts.slice(0, 3).map((p) => ({
        id: p.id,
        titulo: p.titulo,
        slug: p.slug,
        excerpt: p.excerpt,
        capa_url: p.capa_url,
        categoria: p.categoria,
        autor: p.autor,
        published_at: p.published_at,
        source: "blogspot" as const,
        link: p.link,
      }));
      const merged = [...supaPosts, ...bsPosts]
        .sort((a, b) => {
          const da = a.published_at ? new Date(a.published_at).getTime() : 0;
          const db = b.published_at ? new Date(b.published_at).getTime() : 0;
          return db - da;
        })
        .slice(0, 3);
      setPosts(merged);
      setLoading(false);
    });
  }, []);

  if (!loading && posts.length === 0) return null;

  return (
    <section className="py-20 md:py-28 px-6 lg:px-12 border-t border-border">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
              <span className="text-clay">§</span> Diário do Sertão
            </div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">
              Últimas <em className="italic font-light text-clay">postagens</em>
            </h2>
          </div>
          <Link
            to="/blog"
            className="text-[10px] uppercase tracking-[0.2em] border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
          >
            Ver todas →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p) =>
            p.source === "blogspot" && p.link ? (
              <a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-3 bg-secondary">
                  {p.capa_url ? (
                    <img
                      src={p.capa_url}
                      alt={p.titulo}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-clay/20 flex items-center justify-center text-4xl text-clay/40 font-display">
                      ✦
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-paper text-ink text-[10px] px-2 py-1 font-mono uppercase tracking-wider">
                    {p.categoria}
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  {p.published_at
                    ? new Date(p.published_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </div>
                <h3 className="font-display text-lg md:text-xl leading-tight group-hover:text-clay transition-colors">
                  {p.titulo}
                </h3>
                {p.excerpt && (
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {p.excerpt}
                  </p>
                )}
              </a>
            ) : (
              <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                <div className="relative overflow-hidden aspect-[3/4] mb-3 bg-secondary">
                  {p.capa_url ? (
                    <img
                      src={p.capa_url}
                      alt={p.titulo}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-clay/20 flex items-center justify-center text-4xl text-clay/40 font-display">
                      ✦
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-paper text-ink text-[10px] px-2 py-1 font-mono uppercase tracking-wider">
                    {p.categoria}
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  {p.published_at
                    ? new Date(p.published_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </div>
                <h3 className="font-display text-lg md:text-xl leading-tight group-hover:text-clay transition-colors">
                  {p.titulo}
                </h3>
                {p.excerpt && (
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {p.excerpt}
                  </p>
                )}
              </Link>
            ),
          )}
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
    <section className="py-16 px-6 lg:px-12 border-y border-border">
      <div className="mx-auto max-w-[1200px] grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div
            key={s.l}
            className="border-t-2 border-clay pt-4 group hover:border-ochre transition-colors duration-500"
          >
            <div className="font-display text-3xl md:text-4xl tracking-tight group-hover:text-clay transition-colors">
              {s.v}
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {s.l}
            </div>
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
    <section id="agenda" className="py-20 md:py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid md:grid-cols-12 gap-8 mb-10">
          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="text-clay">§</span> Agenda
            </div>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">
              O que vem <em className="italic font-light text-clay">aí</em>.
            </h2>
          </div>
        </div>
        <div className="border-t border-foreground/30">
          {eventos.map((e, i) => (
            <a
              key={i}
              href="#"
              className="group grid grid-cols-12 gap-3 md:gap-6 items-center py-5 md:py-6 border-b border-foreground/20 hover:bg-clay/5 transition-all duration-300 px-3"
            >
              <div className="col-span-2 font-display">
                <div className="text-2xl md:text-3xl leading-none group-hover:text-clay transition-colors">
                  {e.d}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
                  {e.m}
                </div>
              </div>
              <div className="col-span-8 md:col-span-7">
                <div className="font-display text-base md:text-lg group-hover:text-clay transition-colors">
                  {e.t}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{e.l}</div>
              </div>
              <div className="col-span-2 md:col-span-3 text-right text-lg md:text-xl text-muted-foreground group-hover:text-clay group-hover:translate-x-2 transition-all duration-300">
                →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
