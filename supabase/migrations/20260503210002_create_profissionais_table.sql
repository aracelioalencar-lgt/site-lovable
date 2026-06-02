create table profissionais (
  id uuid default uuid_generate_v4() primary key,
  nome text not null,
  foto_url text,
  contato text,
  descricao text,
  publicado boolean default false,
  criado_em timestamp with time zone default timezone('utc'::text, now()) not null,
  atualizado_em timestamp with time zone default timezone('utc'::text, now()) not null
);
