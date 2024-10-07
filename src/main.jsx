import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Error from "./routes/Error.jsx";
import Home from "./routes/Home.jsx";
import CarMonitor from "./components/CarMonitor.jsx";

// Função que cria as rotas

const router = createBrowserRouter([
  {
    //Elementos Pai
    path: "/",
    element: <App />,
    errorElement: <Error />,

    //Elementos Filho
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      {path: "/wokwi", element:<CarMonitor/>}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
