// Importa o componente Link do React Router.
// Ele permite navegar para outra página do site sem recarregar a página.
import { Link } from 'react-router-dom';

// Importa o motion da biblioteca framer-motion.
// Ele permite criar animações nos elementos.
import { motion } from 'framer-motion';

// Importa ícones da biblioteca lucide-react.
// Gauge → ícone de quilometragem
// Calendar → ícone de ano
// MessageCircle → ícone do WhatsApp
import { Gauge, Calendar, MessageCircle } from 'lucide-react';

// Importa o tipo Vehicle.
// Ele define a estrutura de um veículo (marca, modelo, preço, fotos, etc).
import type { Vehicle } from '@/data/types';

// Importa o número de WhatsApp do arquivo de dados.
import { WHATSAPP_NUMBER } from '@/data/mockData';


// Função para formatar o preço no padrão brasileiro.
// Exemplo: 45000 → R$ 45.000,00
function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


// Função para formatar quilometragem.
// Exemplo: 45000 → 45.000 km
function formatKm(value: number) {
  return value.toLocaleString('pt-BR') + ' km';
}


// Função que cria a URL amigável (SEO) do carro.
// Exemplo:
// /carros/fiat-uno-2018-abc123
function slug(v: Vehicle) {
  return `/carros/${v.marca.toLowerCase()}-${v.modelo.toLowerCase().replace(/\s+/g, '-')}-${v.ano}-${v.id.toLowerCase()}`;
}


// Componente principal do card de veículo.
// Ele recebe um objeto vehicle como propriedade.
export default function CarCard({ vehicle }: { vehicle: any }) {

  // Cria uma mensagem automática para o WhatsApp.
  const whatsappMsg = encodeURIComponent(`Olá, tenho interesse neste veículo: ${vehicle.titulo} (ID ${vehicle.id}).`);

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >

      <div className="rounded-xl overflow-hidden bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border">

        {/* ============================= */}
        {/* IMAGEM DO CARRO */}
        {/* ============================= */}

        <Link to={slug(vehicle)} className="block">

          <div className="relative aspect-[4/3] overflow-hidden">

            {/* 🔥 CORREÇÃO AQUI */}
            <img
              src={
                vehicle.fotos?.[0] ||
                vehicle.vehicle_images?.[0]?.url ||
                '/placeholder.jpg'
              }
              alt={vehicle.titulo}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />

            {vehicle.badge === 'novo' && (
              <span className="absolute top-3 left-3 badge-novo">Novo</span>
            )}

            {vehicle.badge === 'vendido' && (
              <span className="absolute top-3 left-3 badge-vendido">Vendido</span>
            )}

          </div>

        </Link>


        {/* ============================= */}
        {/* INFORMAÇÕES DO CARRO */}
        {/* ============================= */}

        <div className="p-4 md:p-5">

          <h3 className="font-heading font-semibold text-foreground text-base md:text-lg line-clamp-1 mb-2">
            {vehicle.titulo}
          </h3>

          <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground mb-3">

            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {vehicle.ano}
            </span>

            <span className="flex items-center gap-1">
              <Gauge className="h-3.5 w-3.5" /> {formatKm(vehicle.quilometragem)}
            </span>

          </div>

          <p className="font-heading font-bold text-xl md:text-2xl text-accent mb-4">
            {formatPrice(vehicle.preco)}
          </p>

          <div className="flex gap-2">

            <Link
              to={slug(vehicle)}
              className="flex-1 text-center py-2.5 md:py-3 rounded-lg bg-secondary text-foreground font-semibold text-sm md:text-base hover:bg-secondary/80 transition-colors"
            >
              Ver detalhes
            </Link>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 md:py-3 rounded-lg bg-success text-success-foreground font-semibold text-sm md:text-base hover:opacity-90 transition-opacity"
            >

              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>

            </a>

          </div>

        </div>

      </div>

    </motion.div>
  );
}