-- Habilita RLS
alter table public.profissionais enable row level security;

-- Qualquer pessoa pode se cadastrar (insert)
create policy "Qualquer pessoa pode cadastrar profissional"
  on public.profissionais for insert
  with check (true);

-- Usuários anônimos podem ver apenas perfis publicados
create policy "Perfis publicados visíveis para todos"
  on public.profissionais for select
  using (publicado = true);

-- Admins podem ver todos os perfis
create policy "Admins podem ver todos os perfis"
  on public.profissionais for select
  using (public.has_role(auth.uid(), 'admin'));

-- Admins podem atualizar perfis
create policy "Admins podem atualizar perfis"
  on public.profissionais for update
  using (public.has_role(auth.uid(), 'admin'));

-- Admins podem excluir perfis
create policy "Admins podem excluir perfis"
  on public.profissionais for delete
  using (public.has_role(auth.uid(), 'admin'));
