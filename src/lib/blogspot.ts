const BLOGSPOT_URL = "https://eikenproject.blogspot.com";
const FEED_URL = `${BLOGSPOT_URL}/feeds/posts/default?alt=json&max-results=50`;

export type BlogspotPost = {
  id: string;
  titulo: string;
  slug: string;
  excerpt: string;
  conteudo: string;
  capa_url: string | null;
  categoria: string;
  autor: string;
  published_at: string;
  link: string;
  source: "blogspot";
};

type BloggerFeedEntry = {
  title: { $t: string };
  content: { $t: string };
  published: { $t: string };
  updated: { $t: string };
  id: { $t: string };
  link: { rel: string; type?: string; href: string }[];
  category?: { scheme: string; term: string }[];
  author?: { name: { $t: string } }[];
  media$thumbnail?: { url: string };
  media$content?: { url: string; type: string };
};

type BloggerFeedResponse = {
  feed: {
    title: { $t: string };
    entry: BloggerFeedEntry[];
  };
};

function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function extractExcerpt(html: string, maxLength = 200): string {
  const text = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function entryToPost(entry: BloggerFeedEntry): BlogspotPost {
  const link = entry.link?.find((l) => l.rel === "alternate")?.href ?? "";
  const slug = link.split("/").pop()?.replace(".html", "") ?? slugFromTitle(entry.title.$t);
  const imageUrl =
    entry.media$thumbnail?.url ?? entry.media$content?.url ?? extractFirstImage(entry.content.$t);
  const categories = entry.category?.map((c) => c.term) ?? [];

  return {
    id: entry.id.$t,
    titulo: entry.title.$t,
    slug,
    excerpt: extractExcerpt(entry.content.$t),
    conteudo: entry.content.$t,
    capa_url: imageUrl,
    categoria: categories[0] || "noticia",
    autor: entry.author?.[0]?.name.$t ?? "Eiken Project",
    published_at: entry.published.$t,
    link,
    source: "blogspot",
  };
}

export async function fetchBlogspotPosts(): Promise<BlogspotPost[]> {
  try {
    const res = await fetch(FEED_URL);
    if (!res.ok) {
      console.warn(`[Blogspot] Feed retornou ${res.status}: ${res.statusText}`);
      return [];
    }
    const data: BloggerFeedResponse = await res.json();
    if (!data.feed?.entry) return [];
    return data.feed.entry.map(entryToPost);
  } catch (err) {
    console.error("[Blogspot] Erro ao buscar posts:", err);
    return [];
  }
}

export async function fetchBlogspotPostBySlug(slug: string): Promise<BlogspotPost | null> {
  try {
    const searchUrl = `${BLOGSPOT_URL}/feeds/posts/default/-/${slug}?alt=json`;
    const res = await fetch(searchUrl);
    if (!res.ok) return null;
    const data: BloggerFeedResponse = await res.json();
    if (!data.feed?.entry?.length) return null;
    return entryToPost(data.feed.entry[0]);
  } catch (err) {
    console.error("[Blogspot] Erro ao buscar post:", err);
    return null;
  }
}
