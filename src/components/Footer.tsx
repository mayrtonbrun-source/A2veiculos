// Importa o componente Link do React Router.
// Ele permite navegar entre páginas do site sem recarregar a página.
import { Link } from 'react-router-dom';

// Importa ícones da biblioteca lucide-react.
// MessageCircle → ícone do WhatsApp
// Instagram → ícone do Instagram
import { MessageCircle, Instagram } from 'lucide-react';

// Importa dados da loja definidos no mockData.
// DEALER_INFO → informações da loja (nome, instagram etc)
// WHATSAPP_NUMBER → número do WhatsApp usado para gerar o link.
import { DEALER_INFO, WHATSAPP_NUMBER } from '@/data/mockData';

// Importa a logo da loja.
import logo from '@/assets/logo-a2.png';


// Componente principal do rodapé do site
export default function Footer() {

  return (

    // Elemento footer do site.
    // bg-primary → cor de fundo do tema
    // border-t → borda superior
    // border-border → cor da borda
    <footer className="bg-primary border-t border-border">

      {/* Container central que limita a largura do conteúdo */}
      <div className="container mx-auto px-4 py-10">

        {/* Layout principal do rodapé */}
        {/* flex-col no mobile e flex-row no desktop */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

          {/* ============================= */}
          {/* BRAND / LOGO DA EMPRESA */}
          {/* ============================= */}

          {/* Área da logo e nome da empresa */}
          <div className="flex flex-col items-center md:items-start gap-3">

            {/* Link que leva para a página inicial */}
            <Link to="/" className="flex items-center gap-3">

              {/* Imagem da logo */}
              <img src={logo} alt="A2 Veículos e Seguros" className="h-10 w-10 object-contain" />

              {/* Nome da empresa vindo do arquivo de dados */}
              <span className="font-heading font-bold text-lg text-accent">
                {DEALER_INFO.nome}
              </span>

            </Link>

          </div>


          {/* ============================= */}
          {/* LINKS DE NAVEGAÇÃO */}
          {/* ============================= */}

          {/* Seção com links para navegar pelo site */}
          <div className="flex flex-col items-center md:items-start gap-2">

            {/* Título da seção */}
            <h4 className="font-heading font-semibold text-sm text-accent mb-1">
              Navegação
            </h4>

            {/* Link para a página inicial */}
            <Link
              to="/"
              className="text-sm text-foreground/60 hover:text-accent transition-colors"
            >
              Início
            </Link>

            {/* Link para a página de estoque */}
            <Link
              to="/estoque"
              className="text-sm text-foreground/60 hover:text-accent transition-colors"
            >
              Estoque
            </Link>

            {/* Link para a página sobre */}
            <Link
              to="/sobre"
              className="text-sm text-foreground/60 hover:text-accent transition-colors"
            >
              Sobre
            </Link>

          </div>


          {/* ============================= */}
          {/* CONTATO */}
          {/* ============================= */}

          {/* Seção com formas de contato */}
          <div className="flex flex-col items-center md:items-start gap-3">

            {/* Título da seção */}
            <h4 className="font-heading font-semibold text-sm text-accent mb-1">
              Contato
            </h4>

            {/* Link para WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`} // cria o link direto para WhatsApp
              target="_blank" // abre em nova aba
              rel="noopener noreferrer" // segurança ao abrir nova aba
              className="flex items-center gap-2 text-sm text-foreground/60 hover:text-accent transition-colors"
            >

              {/* Ícone do WhatsApp */}
              <MessageCircle className="h-4 w-4" />

              {/* Número do WhatsApp vindo do mockData */}
              {DEALER_INFO.whatsapp}

            </a>


            {/* Link para Instagram */}
            <a
              href={DEALER_INFO.instagram} // URL do Instagram da loja
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-foreground/60 hover:text-accent transition-colors"
            >

              {/* Ícone do Instagram */}
              <Instagram className="h-4 w-4" />

              Instagram

            </a>

          </div>

        </div>


        {/* ============================= */}
        {/* COPYRIGHT */}
        {/* ============================= */}

        {/* Linha inferior com direitos autorais */}
        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-foreground/30">

          {/* new Date().getFullYear() pega automaticamente o ano atual */}
          © {new Date().getFullYear()} {DEALER_INFO.nome}. Todos os direitos reservados.

        </div>

      </div>

    </footer>
  );
}