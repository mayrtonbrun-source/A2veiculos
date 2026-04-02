// Importa hooks de rota do react-router
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Supabase
import { supabase } from '@/lib/supabase';

// Ícones
import { MessageCircle, Gauge, Calendar, Fuel, Palette, Settings, Zap, DoorOpen, ArrowLeft } from 'lucide-react';

// Componentes
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import CarCard from '@/components/CarCard';

// Dados
import { WHATSAPP_NUMBER } from '@/data/mockData';

// Funções
function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatKm(value: number) {
  return value.toLocaleString('pt-BR') + ' km';
}

export default function CarDetailPage() {

  const { slug } = useParams();

  // ✅ CORREÇÃO AQUI (ID em maiúsculo)
  const id = slug?.split('-').pop()?.toUpperCase();

  const [vehicle, setVehicle] = useState<any>(null);
  const [similar, setSimilar] = useState<any[]>([]);

  // 🔥 BUSCAR CARRO NO SUPABASE
  useEffect(() => {
    async function fetchVehicle() {

      const { data, error } = await supabase
        .from('vehicles')
        .select(`
          *,
          vehicle_images (*)
        `)
        .eq('id', id)
        .maybeSingle();

      console.log('ID da URL:', id);
      console.log('Resultado do banco:', data);

      if (error) {
        console.error(error);
        return;
      }

      // ✅ CORREÇÃO: evitar crash se vier null
      if (!data) {
        console.log('Veículo não encontrado');
        return;
      }

      // 🔥 FORMATA IMAGENS
      const formatted = {
        ...data,
        fotos: data.vehicle_images?.map((img: any) => img.url) || []
      };

      setVehicle(formatted);

      // 🔥 BUSCAR SEMELHANTES
      const { data: similares } = await supabase
        .from('vehicles')
        .select(`
          *,
          vehicle_images (*)
        `)
        .eq('marca', data.marca)
        .neq('id', data.id)
        .limit(3);

      if (similares) {
        const formattedSimilares = similares.map((v: any) => ({
          ...v,
          fotos: v.vehicle_images?.map((img: any) => img.url) || []
        }));

        setSimilar(formattedSimilares);
      }
    }

    if (id) fetchVehicle();
  }, [id]);

  // 🔴 loading
  if (!vehicle) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-muted-foreground">Carregando veículo...</p>
        </div>
        <Footer />
      </>
    );
  }

  const whatsappMsg = encodeURIComponent(
    `Olá, tenho interesse no veículo ${vehicle.titulo}. Pode me passar mais informações?`
  );

  return (
    <>
      <Header />

      <main className="bg-background min-h-screen pb-20 md:pb-0">

        <div className="container mx-auto px-4 py-6">

          <Link to="/estoque" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Voltar ao estoque
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* 🔥 GALERIA */}
            <div className="lg:col-span-3">
              <Gallery images={vehicle.fotos} title={vehicle.titulo} />
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-24">

                <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-2">
                  {vehicle.titulo}
                </h1>

                <div className="bg-card rounded-xl p-5 shadow-card border border-border mb-4">
                  <p className="font-heading font-black text-3xl md:text-4xl text-accent">
                    {formatPrice(vehicle.preco)}
                  </p>
                </div>
                {/* TEXTO DE INTERESSE */}

  <div className="bg-card border border-border rounded-xl p-4 mb-4 text-center shadow-card">
  <p className="font-heading font-bold text-xl md:text-2xl text-foreground">
    Tem interesse no veículo?
  </p>
  <p className="text-sm md:text-base text-foreground font-medium">
    Entre em contato com um de nossos consultores de venda!
  </p>
</div>

                {/*  ATENDIMENTO - 2 VENDEDORES */}
<div className="grid grid-cols-2 gap-3 mb-4">

  {/* Evaldo */}
  <a
    href={`https://wa.me/5586999184852?text=${whatsappMsg}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-success text-success-foreground font-heading font-bold text-sm hover:opacity-90 transition-opacity"
  >
    <MessageCircle className="h-4 w-4" />
    Evaldo
  </a>

  {/* João Vitor */}
  <a
    href={`https://wa.me/5586995462237?text=${whatsappMsg}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-success text-success-foreground font-heading font-bold text-sm hover:opacity-90 transition-opacity"
  >
    <MessageCircle className="h-4 w-4" />
    João Vitor
  </a>

</div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: Calendar, label: 'Ano', value: vehicle.ano },
                    { icon: Gauge, label: 'Km', value: formatKm(vehicle.quilometragem) },
                    { icon: Fuel, label: 'Combustível', value: vehicle.combustivel },
                    { icon: Palette, label: 'Cor', value: vehicle.cor },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <item.icon className="h-4 w-4 text-accent shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-semibold text-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h3 className="font-heading font-bold text-sm uppercase text-foreground mb-2">Descrição</h3>
                  <p className="text-base text-muted-foreground">{vehicle.descricao}</p>
                </div>

              </div>
            </div>

          </div>

          {/* 🔥 SIMILARES */}
          {similar.length > 0 && (
            <section className="mt-16">

              <h2 className="font-heading font-bold text-xl text-foreground mb-6">
                Veículos semelhantes
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similar.map((v) => (
                  <CarCard key={v.id} vehicle={v} />
                ))}
              </div>

            </section>
          )}
        </div>

      </main>

      <Footer />
    </>
  );
}