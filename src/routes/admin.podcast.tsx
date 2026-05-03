import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { slugify } from "@/lib/slug";
import type { User } from "@supabase/supabase-js";

export const Route = createFileRoute("/admin/podcast")({
  component: AdminPodcastPage,
});

type Podcast = {
  id: string;
  titulo: string;
  slug: string;
  excerpt: string | null;
  conteudo: string;
  capa_url: string | null;
  categoria: string;
  autor: string | null;
  published_at: string | null;
  imagens: string[] | null;
  audio_url: string | null;
};

function AdminPodcastPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      if (session?.user) checkAdmin(session.user.id);
      else { setIsAdmin(false); setChecking(false); }
    });
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      if (data.session?.user) checkAdmin(data.session.user.id);
      else setChecking(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function checkAdmin(uid: string) {
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid).eq("role", "admin").maybeSingle();
    setIsAdmin(!!data);
    setChecking(false);
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-muted-foreground">Verificando acesso...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl mb-4">Acesso restrito</h1>
          <p className="text-muted-foreground mb-6">Você precisa ser administrador para acessar esta página.</p>
          <Link to="/admin" className="text-clay hover:underline">Voltar ao login</Link>
        </div>
      </div>
    );
  }

  return <PodcastEditor user={user} onSuccess={() => navigate({ to: "/projetos" })} />;
}

function PodcastEditor({ user, onSuccess }: { user: User; onSuccess: () => void }) {
  const [titulo, setTitulo] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [autor, setAutor] = useState("");
  const [capaUrl, setCapaUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [imagens, setImagens] = useState<string[]>([]);
  const [publicado, setPublicado] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");
  const [uploadProgress, setUploadProgress] = useState("");

  useEffect(() => {
    setSlug(slugify(titulo));
  }, [titulo]);

  async function uploadCapa(file: File) {
    setUploading(true); setUploadProgress("Enviando capa..."); setErr("");
    try {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/podcast/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("post-images").upload(path, file, { upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("post-images").getPublicUrl(path);
      setCapaUrl(data.publicUrl);
    } catch (e: any) {
      setErr(e.message);
    }
    setUploading(false); setUploadProgress("");
  }

  async function uploadAudio(file: File) {
    setUploading(true); setUploadProgress("Enviando áudio..."); setErr("");
    try {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/podcast/audio/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("post-images").upload(path, file, { upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("post-images").getPublicUrl(path);
      setAudioUrl(data.publicUrl);
    } catch (e: any) {
      setErr(e.message);
    }
    setUploading(false); setUploadProgress("");
  }

  async function uploadImagem(file: File): Promise<string | null> {
    setUploading(true); setUploadProgress("Enviando imagem..."); setErr("");
    try {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/podcast/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("post-images").upload(path, file, { upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("post-images").getPublicUrl(path);
      return data.publicUrl;
    } catch (e: any) {
      setErr(e.message);
      return null;
    } finally {
      setUploading(false); setUploadProgress("");
    }
  }

  async function handleAddImagem(file: File) {
    const url = await uploadImagem(file);
    if (url) {
      setImagens([...imagens, url]);
    }
  }

  function removerImagem(index: number) {
    setImagens(imagens.filter((_, i) => i !== index));
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setErr("");
    
    if (!audioUrl) {
      setErr("Por favor, adicione um arquivo de áudio para o podcast.");
      setSaving(false);
      return;
    }

    const payload = {
      titulo,
      slug: slug || slugify(titulo),
      excerpt: excerpt || null,
      conteudo: conteudo || "",
      categoria: "podcast",
      autor: autor || null,
      capa_url: capaUrl,
      imagens: imagens.length > 0 ? imagens : null,
      audio_url: audioUrl,
      publicado,
      published_at: publicado ? new Date().toISOString() : null,
      author_id: user.id,
    };

    const { error } = await supabase.from("posts").insert(payload);
    setSaving(false);
    
    if (error) {
      setErr(error.message);
    } else {
      onSuccess();
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground text-sm">
              ← Painel
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-display text-xl">Novo Podcast</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/podcasts" className="text-sm text-muted-foreground hover:text-clay">
              Ver podcasts
            </Link>
          </div>
        </div>
      </header>

      <div className="px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={save} className="space-y-8">
            <div className="text-xs uppercase tracking-[0.3em] text-clay mb-2">
              <span className="text-clay">🎙️</span> Novo Podcast
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Título do Episódio</label>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
                placeholder="Ex: Episode 1 -Histórias do Sertão"
                className="w-full bg-transparent border-b border-border focus:border-clay outline-none py-3 font-display text-2xl md:text-4xl"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Slug (URL)</label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  className="w-full bg-transparent border-b border-border focus:border-clay outline-none py-2 font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Autor/Apresentador</label>
                <input
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  placeholder="Ex: João da Silva"
                  className="w-full bg-transparent border-b border-border focus:border-clay outline-none py-2"
                />
              </div>
            </div>

            <div className="bg-clay/10 border border-clay/30 rounded-xl p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-clay mb-4 font-semibold">
                🎙️ Arquivo de Áudio *
              </div>
              
              {!audioUrl ? (
                <div className="border-2 border-dashed border-clay/30 rounded-lg p-8 text-center hover:border-clay/60 transition-colors">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => e.target.files?.[0] && uploadAudio(e.target.files[0])}
                    className="hidden"
                    id="audio-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="audio-upload" className="cursor-pointer">
                    <div className="text-4xl mb-2">🎧</div>
                    <div className="text-sm text-muted-foreground">
                      {uploading ? "Enviando..." : "Clique para selecionar o arquivo de áudio"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">MP3, WAV, OGG, M4A</div>
                  </label>
                </div>
              ) : (
                <div className="bg-background rounded-lg p-4 border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-clay/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-clay" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">Áudio carregado</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {audioUrl.split("/").pop()}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAudioUrl(null)}
                      className="text-xs text-destructive hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Imagem de Capa</label>
              {capaUrl ? (
                <div className="relative inline-block mb-3">
                  <img src={capaUrl} alt="capa" className="max-h-48 w-auto rounded-lg border border-border" />
                  <button
                    type="button"
                    onClick={() => setCapaUrl(null)}
                    className="absolute top-2 right-2 bg-destructive text-white text-xs px-2 py-1 rounded"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-clay/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && uploadCapa(e.target.files[0])}
                    className="hidden"
                    id="capa-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="capa-upload" className="cursor-pointer">
                    <div className="text-2xl mb-1">🖼️</div>
                    <div className="text-xs text-muted-foreground">
                      {uploading ? "Enviando..." : "Clique para adicionar imagem de capa"}
                    </div>
                  </label>
                </div>
              )}
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Descrição Curta</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                maxLength={300}
                placeholder="Uma breve descrição do episódio..."
                className="w-full bg-transparent border border-border focus:border-clay outline-none p-3 italic"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Descrição Completa</label>
              <textarea
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                rows={8}
                placeholder="Descrição detalhada do episódio, notas do episódio, links mencionados..."
                className="w-full bg-transparent border border-border focus:border-clay outline-none p-4 leading-relaxed"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-2">Galeria de Imagens</label>
              <div className="grid grid-cols-4 gap-3 mb-3">
                {imagens.map((url, i) => (
                  <div key={i} className="relative group">
                    <img src={url} alt={`Imagem ${i + 1}`} className="w-full h-24 object-cover border border-border rounded" />
                    <button
                      type="button"
                      onClick={() => removerImagem(i)}
                      className="absolute top-1 right-1 bg-destructive text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity rounded"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] cursor-pointer text-clay hover:text-ochre transition-colors">
                <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleAddImagem(e.target.files[0])} className="hidden" disabled={uploading} />
                + Adicionar imagem
              </label>
            </div>

            {err && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm">
                {err}
              </div>
            )}

            {uploadProgress && (
              <div className="bg-clay/10 border border-clay/30 text-clay px-4 py-3 rounded-lg text-sm">
                {uploadProgress}
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Link to="/admin" className="text-sm text-muted-foreground hover:text-clay">
                ← Voltar ao painel
              </Link>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={publicado}
                    onChange={(e) => setPublicado(e.target.checked)}
                    className="accent-clay h-4 w-4"
                  />
                  Publicar agora
                </label>
                <button
                  disabled={saving || uploading}
                  type="submit"
                  className="bg-clay text-paper px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ochre hover:text-ink transition-colors disabled:opacity-50 rounded-lg"
                >
                  {saving ? "Salvando..." : "Salvar Podcast"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}