
drop policy if exists "Imagens de posts são públicas para leitura" on storage.objects;
-- Mantém somente leitura via URL pública direta do CDN (que não passa por RLS).
-- Sem policy SELECT, o LIST anônimo retorna vazio mas as URLs públicas continuam funcionando.
