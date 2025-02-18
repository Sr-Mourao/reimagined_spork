import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/index";
import { Favoritos } from "./pages/favoritos";
import FavoritesProvider from "./context/Favorites";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <div className="flex items-center flex-col text-center p-10 bg-gray-900 rounded-lg shadow-lg w-8/12 h-[calc(100vh-100px)] mt-8 ml-auto mr-auto">
                <FavoritesProvider>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/favoritos" element={<Favoritos />} />
                    </Routes>
                </FavoritesProvider>
            </div>
        </BrowserRouter>
    )
}
