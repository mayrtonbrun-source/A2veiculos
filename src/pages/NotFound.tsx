// Importa hook que permite acessar informações da rota atual
import { useLocation } from "react-router-dom";

// Importa hook para executar efeitos colaterais no React
import { useEffect } from "react";

// Componente da página de erro 404 (rota não encontrada)
const NotFound = () => {

  // Pega informações da URL atual que o usuário tentou acessar
  const location = useLocation();

  // Executa um efeito quando o componente é carregado
  useEffect(() => {

    // Mostra no console um erro informando qual rota inexistente foi acessada
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

  }, [location.pathname]); // roda novamente se a rota mudar

  return (
    // Container principal centralizando o conteúdo na tela
    <div className="flex min-h-screen items-center justify-center bg-muted">

      {/* Conteúdo central da página */}
      <div className="text-center">

        {/* Código de erro */}
        <h1 className="mb-4 text-4xl font-bold">404</h1>

        {/* Mensagem informando que a página não foi encontrada */}
        <p className="mb-4 text-xl text-muted-foreground">
          Oops! Page not found
        </p>

        {/* Link para voltar para a página inicial */}
        <a
          href="/"
          className="text-primary underline hover:text-primary/90"
        >
          Return to Home
        </a>

      </div>
    </div>
  );
};

// Exporta o componente para ser usado no sistema de rotas
export default NotFound;