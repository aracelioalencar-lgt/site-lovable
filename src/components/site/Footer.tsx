export function Footer() {
  return (
    <footer id="sobre" className="bg-clay text-paper py-20 px-6 lg:px-12 grain relative">
      <div className="mx-auto max-w-[1400px] relative z-10">
        <div className="grid md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-6">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
              Associação Triunfo<br />
              <em className="italic font-light text-ochre">Cultura e Arte</em>
            </h2>
            <p className="mt-8 max-w-md text-paper/80 leading-relaxed">
              Uma associação sem fins lucrativos dedicada à preservação e à inovação dos saberes do sertão pernambucano.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-[0.3em] text-paper/60 mb-4">Endereço</div>
            <p className="leading-relaxed">
              Triunfo · Pernambuco<br />
              Polo Gastronômico<br />
              CEP 56870-000
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-[0.3em] text-paper/60 mb-4">Contato</div>
            <p className="leading-relaxed">
              contato@eikenproject.com.br<br />
              +55 87 9 9999-9999
            </p>
          </div>
        </div>
        <div className="border-t border-paper/20 pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs uppercase tracking-[0.2em] text-paper/60">
          <div>© 2026 Eiken Project — Todos os direitos reservados</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-paper">Instagram</a>
            <a href="#" className="hover:text-paper">YouTube</a>
            <a href="#" className="hover:text-paper">Lei Paulo Gustavo</a>
          </div>
        </div>
      </div>
    </footer>
  );
}