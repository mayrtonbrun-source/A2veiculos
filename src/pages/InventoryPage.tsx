// Importa hooks do React
import { useState, useMemo, useEffect } from 'react';

// Hook do React Router
import { useSearchParams } from 'react-router-dom';

// Supabase
import { supabase } from '@/lib/supabase';

// Ícones
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

// Componentes
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';

// Tipos
import { MARCAS, MODELOS_POR_MARCA } from '@/data/types';

type SortKey = 'preco_asc' | 'preco_desc' | 'ano_desc' | 'ano_asc' | 'km_asc';

export default function InventoryPage() {

  const [searchParams] = useSearchParams();

  // 🔥 NOVO: estado vindo do banco
  const [carros, setCarros] = useState<any[]>([]);

  // Estados filtros
  const [marca, setMarca] = useState(searchParams.get('marca') || '');
  const [modelo, setModelo] = useState(searchParams.get('modelo') || '');
  const [precoMax, setPrecoMax] = useState(searchParams.get('precoMax') || '');
  const [anoMin, setAnoMin] = useState(searchParams.get('anoMin') || '');

  const [sort, setSort] = useState<SortKey>('preco_asc');
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);

  const modelos = marca ? MODELOS_POR_MARCA[marca] || [] : [];

  // 🚀 BUSCAR DO SUPABASE
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('vehicles')
        .select(`
          *,
          vehicle_images (*)
        `);

      if (error) {
        console.error(error);
        return;
      }

      // 🔥 transforma imagens
      const formatted = data.map((v: any) => ({
        ...v,
        fotos: v.vehicle_images?.map((img: any) => img.url) || []
      }));

      console.log('Estoque:', formatted);

      setCarros(formatted);
    }

    fetchData();
  }, []);

  // 🔥 FILTROS + ORDENAÇÃO
  const filtered = useMemo(() => {

    let result = carros.filter((v) => v.status === 'publicado');

    if (marca) result = result.filter((v) => v.marca === marca);
    if (modelo) result = result.filter((v) => v.modelo === modelo);
    if (precoMax) result = result.filter((v) => v.preco <= Number(precoMax));
    if (anoMin) result = result.filter((v) => v.ano >= Number(anoMin));

    switch (sort) {
      case 'preco_asc':
        result.sort((a, b) => a.preco - b.preco);
        break;
      case 'preco_desc':
        result.sort((a, b) => b.preco - a.preco);
        break;
      case 'ano_desc':
        result.sort((a, b) => b.ano - a.ano);
        break;
      case 'ano_asc':
        result.sort((a, b) => a.ano - b.ano);
        break;
      case 'km_asc':
        result.sort((a, b) => a.quilometragem - b.quilometragem);
        break;
    }

    return result;

  }, [carros, marca, modelo, precoMax, anoMin, sort]);

  const visible = filtered.slice(0, visibleCount);

  const selectClass =
    'w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground text-base outline-none focus:ring-2 focus:ring-accent/50';

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">

        <div className="gradient-hero py-10 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
              Nosso Estoque
            </h1>
            <p className="text-muted-foreground mt-2 text-base">
              Encontre o veículo ideal para você
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-base font-medium hover:bg-card transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filtros
              </button>

              <span className="text-sm text-muted-foreground">
                {filtered.length} veículo(s)
              </span>
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className={selectClass + ' w-auto'}
            >
              <option value="preco_asc">Menor preço</option>
              <option value="preco_desc">Maior preço</option>
              <option value="ano_desc">Mais novo</option>
              <option value="ano_asc">Mais antigo</option>
              <option value="km_asc">Menor km</option>
            </select>

          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-5 bg-card rounded-xl shadow-card mb-8 border border-border">

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Marca
                </label>
                <select
                  value={marca}
                  onChange={(e) => { setMarca(e.target.value); setModelo(''); }}
                  className={selectClass}
                >
                  <option value="">Todas</option>
                  {MARCAS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Modelo
                </label>
                <select
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  className={selectClass}
                  disabled={!marca}
                >
                  <option value="">Todos</option>
                  {modelos.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Ano mín.
                </label>
                <select
                  value={anoMin}
                  onChange={(e) => setAnoMin(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Todos</option>
                  {Array.from({ length: 15 }, (_, i) => 2026 - i).map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Preço até
                </label>
                <select
                  value={precoMax}
                  onChange={(e) => setPrecoMax(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Todos</option>
                  <option value="50000">R$ 50.000</option>
                  <option value="80000">R$ 80.000</option>
                  <option value="100000">R$ 100.000</option>
                  <option value="150000">R$ 150.000</option>
                  <option value="200000">R$ 200.000</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => { setMarca(''); setModelo(''); setPrecoMax(''); setAnoMin(''); }}
                  className="w-full px-4 py-3 rounded-lg text-base font-medium border border-destructive text-destructive hover:bg-destructive/10 transition-colors"
                >
                  Limpar
                </button>
              </div>

            </div>
          )}

          {visible.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Nenhum veículo encontrado.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Tente alterar os filtros.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map((v) => (
                  <CarCard key={v.id} vehicle={v} />
                ))}
              </div>

              {visibleCount < filtered.length && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setVisibleCount((c) => c + 9)}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-accent text-accent font-semibold text-base hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Carregar mais <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}

        </div>

      </main>

      <Footer />
    </>
  );
}