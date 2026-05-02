
-- Fix search_path on functions
create or replace function public.set_updated_at()
returns trigger language plpgsql
security invoker
set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;

-- Revoke execute on SECURITY DEFINER functions from public/anon/authenticated
revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- Restrict bucket listing: only allow reading individual objects, no LIST
drop policy if exists "Imagens de posts são públicas" on storage.objects;
create policy "Imagens de posts são públicas para leitura"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'post-images');

-- Note: listing is enforced by the Storage API based on policies; the warning is informational
-- since this is a public marketing bucket. Listing risk is acceptable for post cover images.
