// Importa a função createRoot da biblioteca React DOM.
// Essa função é usada para inicializar a aplicação React
// dentro do HTML principal do site.
import { createRoot } from "react-dom/client";

// Importa o componente principal da aplicação.
import App from "./App.tsx";

// Importa o arquivo de estilos global do site.
// Esse arquivo geralmente contém configurações do Tailwind
// e estilos básicos do projeto.
import "./index.css";

// Aqui estamos pegando o elemento HTML com id="root"
// que está dentro do arquivo index.html.
createRoot(document.getElementById("root")!).render(

  // Renderiza o componente principal do site dentro da página HTML.
  // A partir daqui todo o site React começa a funcionar.
  <App />

);