import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { Toaster } from "react-hot-toast";

const appRouter = createBrowserRouter(router);

createRoot(document.getElementById("root")!).render(
  <div className="h-full w-full">
    <Toaster />
    <RouterProvider router={appRouter} />
  </div>
);
