
-- Enum role
create type public.app_role as enum ('admin', 'user');

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Profiles selecionáveis por todos" on public.profiles for select using (true);
create policy "Usuário atualiza próprio profile" on public.profiles for update using (auth.uid() = id);
create policy "Usuário insere próprio profile" on public.profiles for insert with check (auth.uid() = id);

-- User roles
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Roles visíveis para o próprio usuário" on public.user_roles
  for select using (auth.uid() = user_id or public.has_role(auth.uid(), 'admin'));

-- Posts
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  slug text not null unique,
  excerpt text,
  conteudo text not null,
  categoria text not null default 'noticia',
  capa_url text,
  autor text,
  author_id uuid references auth.users(id) on delete set null,
  publicado boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.posts enable row level security;

create policy "Posts publicados visíveis para todos" on public.posts
  for select using (publicado = true or public.has_role(auth.uid(), 'admin'));

create policy "Admins criam posts" on public.posts
  for insert with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins atualizam posts" on public.posts
  for update using (public.has_role(auth.uid(), 'admin'));

create policy "Admins excluem posts" on public.posts
  for delete using (public.has_role(auth.uid(), 'admin'));

create index posts_publicado_published_at_idx on public.posts (publicado, published_at desc);
create index posts_categoria_idx on public.posts (categoria);

-- Trigger updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger posts_set_updated_at before update on public.posts
  for each row execute function public.set_updated_at();

-- Trigger profile auto-create
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Storage bucket público
insert into storage.buckets (id, name, public) values ('post-images', 'post-images', true);

create policy "Imagens de posts são públicas" on storage.objects
  for select using (bucket_id = 'post-images');

create policy "Admins fazem upload de imagens" on storage.objects
  for insert with check (bucket_id = 'post-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins atualizam imagens" on storage.objects
  for update using (bucket_id = 'post-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins excluem imagens" on storage.objects
  for delete using (bucket_id = 'post-images' and public.has_role(auth.uid(), 'admin'));
