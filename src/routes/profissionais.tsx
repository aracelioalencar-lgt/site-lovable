import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/profissionais")({
  component: ProfissionaisPage,
});

type Profissional = {
  id: string;
  nome: string;
  foto_url: string | null;
  contato: string | null;
  descricao: string | null;
  publicado: boolean;
};

function ProfissionaisPage() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("profissionais")
      .select("id, nome, foto_url, contato, descricao, publicado")
      .order("nome")
      .then(({ data }) => {
        setProfissionais(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 md:pt-40 pb-20 px-6 lg:px-12 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1526401457547-523d759997a3?w=1920&q=80"
            alt="Profissionais de Cultura"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        <div className="mx-auto max-w-[1400px] relative">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            <span className="text-clay">§</span> Profissionais Culturais
          </div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9]">
            Produção<span className="text-clay">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Conecte-se com profissionais de produção cultural do sertão e região.
          </p>
          <div className="mt-10">
            <Link
              to="/cadastro-profissional"
              className="inline-block bg-clay text-paper px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-ochre hover:text-ink transition-colors"
            >
              Quero me cadastrar
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          {loading && <div className="text-muted-foreground">Carregando...</div>}
          {!loading && profissionais.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl text-clay/40 font-display mb-4">👥</div>
              <p className="text-muted-foreground text-lg">Nenhum profissional cadastrado ainda.</p>
              <p className="text-muted-foreground/60 text-sm mt-2">
                Em breve, novos profissionais!
              </p>
            </div>
          )}
          {!loading && profissionais.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profissionais.map((p) => (
                <div
                  key={p.id}
                  className="group relative bg-card rounded-2xl overflow-hidden border border-hover:border-clay/40 transition-all duration-300 hover:shadow-xl hover:shadow-clay/5 cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {p.foto_url ? (
                      <img
                        src={p.foto_url}
                        alt={p.nome}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-clay/30 via-ochre/20 to-clay/10 flex items-center justify-center">
                        <div className="text-8xl">👤</div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="bg-clay/90 text-paper text-xs font-mono px-3 py-1.5 uppercase tracking-wider rounded-full backdrop-blur-sm">
                        🎨 Cultura
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h2 className="font-display text-xl md:text-2xl leading-tight mb-3 group-hover:text-clay transition-colors">
                      {p.nome}
                    </h2>

                    {p.contato && (
                      <p className="text-muted-foreground text-sm mb-4">
                        <span className="font-mono text-clay/80 mr-2">📧</span>
                        {p.contato}
                      </p>
                    )}

                    {p.descricao && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {p.descricao}
                      </p>
                    )}

                    <div className="mt-6 pt-4 border-t border-border/50 text-xs text-clay/70">
                      Disponível para projetos culturais
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
