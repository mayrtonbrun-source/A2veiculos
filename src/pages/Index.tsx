import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'

import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';

import { MARCAS, MODELOS_POR_MARCA } from '@/data/types';

// ✅ SUA IMAGEM CERTA
import fachadaImg from '@/assets/faixadaA2.jpeg';

export default function HomePage() {

  const navigate = useNavigate();

  const [carros, setCarros] = useState<any[]>([]);

  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('vehicles')
        .select(`
          *,
          vehicle_images (*)
        `)

      if (error) {
        console.error('Erro ao buscar:', error);
        return;
      }

      setCarros(data || []);
    }

    fetchData();
  }, []);

  const modelos = marca ? MODELOS_POR_MARCA[marca] || [] : [];

  const novidades = carros
    .map((v: any) => ({
      ...v,
      fotos: v.vehicle_images?.map((img: any) => img.url) || []
    }))
    .filter((v: any) => v.status === 'publicado')
    .sort((a: any, b: any) =>
      (b.criadoEm || '').toString().localeCompare((a.criadoEm || '').toString())
    )
    .slice(0, 4);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (marca) params.set('marca', marca);
    if (modelo) params.set('modelo', modelo);
    if (ano) params.set('anoMin', ano);
    if (preco) params.set('precoMax', preco);

    navigate(`/estoque?${params.toString()}`);
  };

  const selectClass =
    'w-full px-4 py-3 md:py-4 rounded-lg bg-card border border-border text-foreground text-base outline-none focus:ring-2 focus:ring-accent/50';

  return (
    <>
      <Header />

      <main>

        {/* HERO */}
        <section className="relative min-h-[80vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">

          {/* IMAGEM */}
          <div
  className="absolute inset-0 bg-cover md:bg-cover bg-top md:bg-center bg-no-repeat opacity-60"
  style={{ backgroundImage: `url(${fachadaImg})` }}
/>

          {/* ESCURECE */}
          <div className="absolute inset-0 bg-black/70" />

          {/* CONTEÚDO */}
          <div className="relative container mx-auto px-4 text-center max-w-3xl">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight"
            >
              <span className="text-accent">A2 Veículos</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-foreground/70 text-lg md:text-xl mb-8 max-w-xl mx-auto"
            >
              Veículos seminovos com transparência, segurança e qualidade.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Link
                to="/estoque"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl gradient-gold text-accent-foreground font-heading font-bold"
              >
                Ver estoque
              </Link>
            </motion.div>

          </div>
        </section>


        {/* FILTROS */}
        <section className="py-10 md:py-14 bg-card border-y border-border">
          <div className="container mx-auto px-4">

            <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-8">
              Buscar veículo
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">

              <select value={marca} onChange={(e) => { setMarca(e.target.value); setModelo(''); }} className={selectClass}>
                <option value="">Marca</option>
                {MARCAS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>

              <select value={modelo} onChange={(e) => setModelo(e.target.value)} className={selectClass} disabled={!marca}>
                <option value="">Modelo</option>
                {modelos.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>

              <select value={ano} onChange={(e) => setAno(e.target.value)} className={selectClass}>
                <option value="">Ano</option>
                {Array.from({ length: 15 }, (_, i) => 2026 - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>

              <select value={preco} onChange={(e) => setPreco(e.target.value)} className={selectClass}>
                <option value="">Preço até</option>
                <option value="50000">R$ 50.000</option>
                <option value="80000">R$ 80.000</option>
                <option value="100000">R$ 100.000</option>
                <option value="150000">R$ 150.000</option>
                <option value="200000">R$ 200.000</option>
              </select>

              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg gradient-gold font-bold"
              >
                <Search className="h-5 w-5" />
                Buscar veículo
              </button>

            </div>
          </div>
        </section>

        {/* NOVIDADES */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">

            <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-2">
              Novidades do estoque
            </h2>

            <p className="text-muted-foreground text-center mb-10">
              Veículos adicionados recentemente
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {novidades.map((v) => (
                <CarCard key={v.id} vehicle={v} />
              ))}
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}