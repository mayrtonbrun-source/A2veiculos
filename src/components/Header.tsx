// Importa o hook useState do React.
// Ele é usado para criar estados dentro do componente.
// Aqui ele controla se o menu mobile está aberto ou fechado.
import { useState } from 'react';

// Importa ferramentas do React Router.
// Link → usado para navegar entre páginas sem recarregar o site.
// useLocation → permite saber em qual página o usuário está atualmente.
import { Link, useLocation } from 'react-router-dom';

// Importa ícones da biblioteca lucide-react.
// Menu → ícone de menu (☰)
// X → ícone de fechar
// MessageCircle → ícone do WhatsApp
import { Menu, X, MessageCircle } from 'lucide-react';

// Importa componentes da biblioteca framer-motion.
// AnimatePresence → permite animações quando elementos aparecem/desaparecem.
// motion → permite aplicar animações em elementos HTML.
import { AnimatePresence, motion } from 'framer-motion';

// Importa a logo da loja.
import logo from '@/assets/logo-a2.png';

// Importa o número do WhatsApp do arquivo de dados do site.
import { WHATSAPP_NUMBER } from '@/data/mockData';


// Lista de links que aparecerão no menu do site.
// Cada objeto representa um item do menu.
const navLinks = [
  { label: 'Estoque', path: '/estoque' },
  { label: 'Quem somos', path: '/sobre' },
];


// Componente principal do Header (menu superior do site)
export default function Header() {

  // Estado que controla se o menu mobile está aberto ou fechado.
  const [open, setOpen] = useState(false);

  // Hook que retorna informações da rota atual.
  // Usado para saber qual página está ativa.
  const location = useLocation();

  return (

    // Header principal do site.
    // sticky → mantém o header fixo no topo da tela.
    // top-0 → posição no topo.
    // z-50 → garante que o header fique acima de outros elementos.
    <header className="sticky top-0 z-50 bg-primary border-b border-border backdrop-blur-sm">

      {/* Container central do menu */}
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">

        {/* Logo da loja que leva para a página inicial */}
        <Link to="/" className="flex items-center gap-3">

          {/* Imagem da logo */}
          <img src={logo} alt="A2 Veículos e Seguros" className="h-10 w-10 md:h-12 md:w-12 object-contain" />

          {/* Nome da loja ao lado da logo */}
          <span className="font-heading font-bold text-lg md:text-xl text-accent">A2 Veículos</span>

        </Link>


        {/* ============================= */}
        {/* MENU DESKTOP */}
        {/* ============================= */}

        {/* Esse menu só aparece em telas médias ou maiores */}
        <nav className="hidden md:flex items-center gap-8">

          {/* Percorre a lista de links e cria os itens do menu */}
          {navLinks.map((link) => (

            <Link
              key={link.path}
              to={link.path}

              // Classe dinâmica que muda a cor do link
              // dependendo da página atual
              className={`font-medium text-sm tracking-wide transition-colors hover:text-accent ${
                location.pathname === link.path ? 'text-accent' : 'text-foreground/70'
              }`}
            >
              {link.label}
            </Link>

          ))}
        </nav>


        {/* ============================= */}
        {/* BOTÃO WHATSAPP DESKTOP */}
        {/* ============================= */}

        {/* Esse botão só aparece no desktop */}
        <div className="hidden md:flex items-center">

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`} // link direto para WhatsApp
            target="_blank"
            rel="noopener noreferrer"

            // classes de estilo do botão
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-success text-success-foreground text-sm font-semibold transition-transform hover:scale-105"
          >

            {/* Ícone do WhatsApp */}
            <MessageCircle className="h-4 w-4" />

            WhatsApp

          </a>

        </div>


        {/* ============================= */}
        {/* BOTÃO MENU MOBILE */}
        {/* ============================= */}

        {/* Botão que abre/fecha o menu no celular */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">

          {/* Se o menu estiver aberto mostra o X */}
          {/* Se estiver fechado mostra o ícone de menu */}
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}

        </button>

      </div>


      {/* ============================= */}
      {/* MENU MOBILE */}
      {/* ============================= */}

      {/* AnimatePresence permite animar a entrada e saída do menu */}
      <AnimatePresence>

        {/* O menu só aparece se open = true */}
        {open && (

          <motion.nav

            // Animação inicial
            initial={{ height: 0, opacity: 0 }}

            // Animação quando aparece
            animate={{ height: 'auto', opacity: 1 }}

            // Animação quando desaparece
            exit={{ height: 0, opacity: 0 }}

            // classes de estilo
            className="md:hidden bg-primary overflow-hidden"
          >

            {/* Container do menu mobile */}
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">

              {/* Links do menu mobile */}
              {navLinks.map((link) => (

                <Link
                  key={link.path}
                  to={link.path}

                  // Fecha o menu após clicar
                  onClick={() => setOpen(false)}

                  // classe dinâmica para destacar página ativa
                  className={`font-medium text-base py-2 border-b border-border transition-colors ${
                    location.pathname === link.path ? 'text-accent' : 'text-foreground/70'
                  }`}
                >
                  {link.label}
                </Link>

              ))}


              {/* Botão WhatsApp no menu mobile */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-success text-success-foreground text-base font-semibold"
              >

                {/* Ícone do WhatsApp */}
                <MessageCircle className="h-5 w-5" />

                WhatsApp

              </a>

            </div>

          </motion.nav>

        )}

      </AnimatePresence>

    </header>

  );
}