-- Remove política antiga que restringe select apenas para publicados
drop policy if exists "Perfis publicados visíveis para todos" on public.profissionais;

-- Todos podem ver todos os perfis (diretório público)
create policy "Todos podem ver perfis"
  on public.profissionais for select
  using (true);
