// Importa o hook useState do React para controle de estado do componente
import { useState } from 'react';

// Importa ícones usados nos botões da galeria
import { ChevronLeft, ChevronRight, X, ZoomIn, Download } from 'lucide-react';

// Importa componentes de animação do Framer Motion
import { AnimatePresence, motion } from 'framer-motion';

// Interface TypeScript que define as propriedades que o componente recebe
interface GalleryProps {
  images: string[]; // Lista de URLs das imagens do veículo
  title: string; // Título do veículo (usado no alt das imagens)
}

// Componente principal da galeria de imagens
export default function Gallery({ images, title }: GalleryProps) {

  // Estado que controla qual imagem está sendo exibida atualmente
  const [current, setCurrent] = useState(0);

  // Estado que controla se o lightbox (visualização ampliada) está aberto
  const [lightbox, setLightbox] = useState(false);

  // Função para ir para a imagem anterior
  // Se estiver na primeira, volta para a última
  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));

  // Função para ir para a próxima imagem
  // Se estiver na última, volta para a primeira
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div>

      {/* Main Image - imagem principal da galeria */}
      <div 
        className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted cursor-pointer group"
        onClick={() => setLightbox(true)} // abre o lightbox ao clicar
      >

        {/* Imagem atual da galeria */}
        <img 
          src={images[current]} 
          alt={`${title} - foto ${current + 1}`} 
          className="w-full h-full object-cover" 
        />

        {/* Overlay com ícone de zoom ao passar o mouse */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
          <ZoomIn className="h-8 w-8 text-card opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Botões de navegação (só aparecem se houver mais de uma imagem) */}
        {images.length > 1 && (
          <>

            {/* Botão imagem anterior */}
            <button 
              onClick={(e) => { 
                e.stopPropagation(); // impede abrir o lightbox
                prev(); 
              }} 
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-foreground/30 text-card hover:bg-foreground/50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Botão próxima imagem */}
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                next(); 
              }} 
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-foreground/30 text-card hover:bg-foreground/50 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

          </>
        )}
      </div>

      {/* Thumbnails - miniaturas das imagens */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">

          {/* Percorre todas as imagens para gerar miniaturas */}
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)} // muda para a imagem clicada
              className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                i === current 
                  ? 'border-gold' // miniatura ativa
                  : 'border-transparent opacity-60 hover:opacity-100' // miniaturas normais
              }`}
            >

              {/* Imagem da miniatura */}
              <img 
                src={img} 
                alt={`Thumbnail ${i + 1}`} 
                className="w-full h-full object-cover" 
              />

            </button>
          ))}

        </div>
      )}

      {/* Lightbox - visualização ampliada das imagens */}
      <AnimatePresence>

        {/* Renderiza apenas quando lightbox estiver ativo */}
        {lightbox && (

          <motion.div
            initial={{ opacity: 0 }} // animação inicial
            animate={{ opacity: 1 }} // animação ao aparecer
            exit={{ opacity: 0 }} // animação ao sair
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center"
            onClick={() => setLightbox(false)} // fecha ao clicar fora
          >

            {/* Botões superiores */}
            <div className="absolute top-4 right-4 flex gap-2">

              {/* Botão de download da imagem */}
              <a
                href={images[current]}
                download
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-full bg-card/20 text-card hover:bg-card/40 transition-colors"
              >
                <Download className="h-5 w-5" />
              </a>

              {/* Botão de fechar */}
              <button 
                onClick={() => setLightbox(false)} 
                className="p-2 rounded-full bg-card/20 text-card hover:bg-card/40 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            {/* Botão imagem anterior no lightbox */}
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                prev(); 
              }} 
              className="absolute left-4 p-3 rounded-full bg-card/20 text-card hover:bg-card/40 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Imagem ampliada */}
            <img
              src={images[current]}
              alt={`${title} - foto ${current + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Botão próxima imagem no lightbox */}
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                next(); 
              }} 
              className="absolute right-4 p-3 rounded-full bg-card/20 text-card hover:bg-card/40 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Indicador de posição da imagem */}
            <div className="absolute bottom-4 text-card text-sm">
              {current + 1} / {images.length}
            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </div>
  );
}