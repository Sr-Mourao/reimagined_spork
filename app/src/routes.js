import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/index";
import { Favoritos } from "./pages/favoritos";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <div className="flex items-center flex-col text-center p-10 bg-gray-900 rounded-lg shadow-lg w-8/12 h-[calc(100vh-100px)] mt-8 ml-auto mr-auto">
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/favoritos" element={<Favoritos />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
