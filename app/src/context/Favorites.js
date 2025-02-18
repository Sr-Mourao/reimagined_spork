import { createContext, useContext, useState } from "react";

export const FavoritesContext = createContext();
FavoritesContext.displayName = "Favorites";

export default function FavoritesProvider({ children }) {
    const [favorite, setFavorite] = useState([]);

    return (
        <FavoritesContext.Provider value={{ favorite, setFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavoritesContext() {
    const { favorite, setFavorite } = useContext(FavoritesContext);

    function addFavorite(newFavorite) {
        setFavorite((prevFavorites) => {
            const isFavorite = prevFavorites.some(item => item.id === newFavorite.id);

            if (isFavorite) {
                return prevFavorites.filter(item => item.id !== newFavorite.id);
            } else {
                return [...prevFavorites, newFavorite];
            }
        });
    }

    return {
        favorite,
        addFavorite,
    };
}
