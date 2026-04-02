// Importa o QueryClient e o Provider da biblioteca React Query.
// React Query é usado para gerenciar requisições de dados (APIs),
// cache de dados e atualizações automáticas no React.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Importa componentes de navegação da biblioteca React Router.
// BrowserRouter controla as rotas do site.
// Route define uma rota específica.
// Routes agrupa todas as rotas.
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Importa um sistema de notificações (toast) da biblioteca Sonner.
// Toasts são aquelas mensagens pequenas que aparecem na tela.
import { Toaster as Sonner } from "@/components/ui/sonner";

// Importa outro componente de notificações usado pelo sistema UI.
import { Toaster } from "@/components/ui/toaster";

// Importa o provedor de Tooltips.
// Tooltips são aquelas mensagens que aparecem quando você passa o mouse
// sobre um botão ou elemento.
import { TooltipProvider } from "@/components/ui/tooltip";

// Importa as páginas principais do site
// Cada uma representa uma página diferente do site.
import Index from "./pages/Index";
import InventoryPage from "./pages/InventoryPage";
import CarDetailPage from "./pages/CarDetailPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

// Cria uma instância do QueryClient.
// Essa instância será usada pelo React Query para gerenciar
// todas as requisições de dados do site.
const queryClient = new QueryClient();

// Componente principal da aplicação.
// Esse componente envolve todo o site e define a estrutura global.
const App = () => (
  
  // QueryClientProvider disponibiliza o React Query
  // para toda a aplicação React.
  <QueryClientProvider client={queryClient}>

    {/* TooltipProvider permite que qualquer parte do site
        utilize tooltips */}
    <TooltipProvider>

      {/* Sistema de notificações padrão do site */}
      <Toaster />

      {/* Sistema de notificações da biblioteca Sonner */}
      <Sonner />

      {/* BrowserRouter controla toda a navegação do site */}
      <BrowserRouter>

        {/* Routes contém todas as rotas disponíveis */}
        <Routes>

          {/* Página inicial do site */}
          <Route path="/" element={<Index />} />

          {/* Página que lista todos os carros disponíveis no estoque */}
          <Route path="/estoque" element={<InventoryPage />} />

          {/* Página individual de cada carro.
              O :slug indica um identificador dinâmico.
              Exemplo de URL:
              /carros/toyota-corolla-2022
          */}
          <Route path="/carros/:slug" element={<CarDetailPage />} />

          {/* Página institucional da empresa */}
          <Route path="/sobre" element={<AboutPage />} />

          {/* Rota curinga.
              Se o usuário acessar uma URL que não existe,
              essa página será exibida (erro 404). */}
          <Route path="*" element={<NotFound />} />

        </Routes>

      </BrowserRouter>

    </TooltipProvider>

  </QueryClientProvider>
);

// Exporta o componente App para que ele possa ser usado
// em outros arquivos do projeto.
export default App;