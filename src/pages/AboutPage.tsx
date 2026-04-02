// Importa ícones usados nos botões da página
import { MessageCircle, Instagram } from 'lucide-react';

// Importar a imagem da faixada
import fachada from '@/assets/faixadaA2.jpeg';

// Importa componentes globais do site
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Importa informações da loja e número do WhatsApp
import { DEALER_INFO, WHATSAPP_NUMBER } from '@/data/mockData';

// Importa o logo da empresa
import logo from '@/assets/logo-a2.png';

// Componente da página "Sobre"
export default function AboutPage() {
  return (
    <>
      {/* Cabeçalho do site */}
      <Header />

      {/* Conteúdo principal da página */}
      <main className="relative min-h-screen">

        {/* FUNDO GLOBAL */}
        <div
          className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
          style={{ backgroundImage: `url(${fachada})` }}
        />

        {/* CAMADA ESCURA GLOBAL */}
        <div className="fixed inset-0 bg-black/80 -z-10" />

        {/* Hero - seção principal de apresentação */}
        <section className="relative w-full h-[70vh] md:h-[90vh] flex items-center justify-center overflow-hidden">

          {/* CONTEÚDO */}
          <div className="relative z-10 text-center px-4">

            {/* Título principal da página */}
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4">
              Sobre a <span className="text-accent">A2 Veículos</span>
            </h1>

            {/* Subtítulo explicando o negócio */}
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
              Especializada na revenda de veículos seminovos em Teresina
            </p>

          </div>

        </section>

        {/* About text - texto explicando a empresa */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-3xl text-center">

            {/* Descrição da empresa */}
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              A A2 Veículos e Seguros é especializada na revenda de veículos seminovos,
              sempre priorizando transparência, segurança e conforto para nossos clientes.
            </p>

          </div>
        </section>

        {/* CTA section - chamada para ação */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">

            {/* Card central com informações da empresa */}
            <div className="max-w-lg mx-auto bg-card/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-border shadow-card text-center">

              {/* Logo da empresa */}
              <img 
                src={logo} 
                alt="A2 Veículos e Seguros" 
                className="h-20 w-20 mx-auto mb-6 object-contain" 
              />

              {/* Nome da empresa vindo do mockData */}
              <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-3">
                {DEALER_INFO.nome}
              </h2>

              {/* Descrição curta da empresa */}
              <p className="text-muted-foreground text-base mb-8">
                Vendemos e compramos veículos seminovos com transparência e segurança.
              </p>

              {/* Botões de contato */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">

                {/* Botão para abrir conversa no WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-success text-success-foreground font-bold text-base hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="h-5 w-5" /> Falar no WhatsApp
                </a>

                {/* Botão para abrir Instagram da loja */}
                <a
                  href={DEALER_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-accent text-accent font-bold text-base hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Instagram className="h-5 w-5" /> Ver no Instagram
                </a>

              </div>

            </div>

          </div>
        </section>

      </main>

      {/* Rodapé do site */}
      <Footer />
    </>
  );
}