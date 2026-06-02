import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/cadastro-profissional")({
  component: CadastroProfissionalPage,
});

function CadastroProfissionalPage() {
  const [nome, setNome] = useState("");
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [contato, setContato] = useState("");
  const [descricao, setDescricao] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  async function uploadFoto(file: File) {
    setUploading(true);
    setErr("");
    const ext = file.name.split(".").pop();
    const path = `profissionais/${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("post-images")
      .upload(path, file, { upsert: false });
    if (error) {
      setErr(error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("post-images").getPublicUrl(path);
    setFotoUrl(data.publicUrl);
    setUploading(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr("");

    const { error } = await supabase.from("profissionais").insert({
      nome,
      foto_url: fotoUrl,
      contato: contato || null,
      descricao: descricao || null,
      publicado: false,
    });

    setSaving(false);
    if (error) {
      setErr(error.message);
    } else {
      setSuccess(true);
      setNome("");
      setFotoUrl(null);
      setContato("");
      setDescricao("");
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <div className="pt-32 pb-20 px-6 lg:px-12">
          <div className="mx-auto max-w-lg text-center pt-12">
            <div className="text-6xl text-clay/40 font-display mb-6">🎉</div>
            <h1 className="font-display text-4xl mb-4">Cadastro enviado!</h1>
            <p className="text-muted-foreground mb-8">
              Seu cadastro foi recebido com sucesso. Após aprovação da equipe, seu perfil aparecerá
              na página de profissionais.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/profissionais"
                className="bg-clay text-paper px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ochre hover:text-ink transition-colors"
              >
                Ver profissionais
              </Link>
              <button
                onClick={() => setSuccess(false)}
                className="text-sm text-muted-foreground hover:text-clay"
              >
                Cadastrar outro
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 md:pt-40 pb-20 px-6 lg:px-12 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1526401457547-523d759997a3?w=1920&q=80"
            alt="Cadastro Profissional"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        <div className="mx-auto max-w-[1400px] relative">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            <span className="text-clay">§</span> Cadastro
          </div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9]">
            Seja um Profissional<span className="text-clay">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Cadastre-se para oferecer seus serviços de produção cultural no sertão.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 lg:px-12">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                Nome completo <span className="text-clay">*</span>
              </label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Seu nome"
                className="w-full bg-transparent border-b border-border focus:border-clay outline-none py-2 text-lg"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                Contato (email ou telefone)
              </label>
              <input
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                placeholder="seu@email.com ou (99) 99999-9999"
                className="w-full bg-transparent border-b border-border focus:border-clay outline-none py-2 text-lg"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                Descrição dos serviços
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={5}
                placeholder="Ex: Eu farei seu projeto cultural acontecer! Produzo eventos, oficinas e mostras artísticas no sertão."
                className="w-full bg-transparent border border-border focus:border-clay outline-none p-4 leading-relaxed text-lg"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                Foto
              </label>
              {fotoUrl && (
                <img
                  src={fotoUrl}
                  alt="Preview"
                  className="mb-3 max-h-48 w-auto object-cover border border-border rounded"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && uploadFoto(e.target.files[0])}
                className="block text-sm"
                disabled={uploading}
              />
              {uploading && (
                <div className="text-xs text-muted-foreground mt-2">Enviando foto...</div>
              )}
              {fotoUrl && (
                <button
                  type="button"
                  onClick={() => setFotoUrl(null)}
                  className="text-xs text-destructive hover:underline mt-2 block"
                >
                  Remover foto
                </button>
              )}
            </div>

            {err && (
              <div className="text-destructive text-sm bg-destructive/10 p-3 rounded">{err}</div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Link to="/profissionais" className="text-sm text-muted-foreground hover:text-clay">
                ← Ver profissionais
              </Link>
              <button
                disabled={saving || uploading}
                type="submit"
                className="bg-foreground text-background px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-clay transition-colors disabled:opacity-50"
              >
                {saving ? "Enviando..." : "Enviar cadastro"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
