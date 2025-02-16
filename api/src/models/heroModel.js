import { connection } from "../database.js";

export const HeroModel = {
    async getAllHeroes() {
        const [heroes] = await connection.query("SELECT * FROM heroes");
        return heroes;
    },

    async getHeroById(id) {
        const [hero] = await connection.query("SELECT * FROM heroes WHERE id = ?", [id]);
        return hero.length ? hero[0] : null;
    },

    async createHero(name, imagem) {
        const [result] = await connection.query("INSERT INTO heroes (name, imagem) VALUES (?, ?)", [name, imagem]);
        return result.insertId;
    },

    async updateHero(id, name, imagem) {
        await connection.query("UPDATE heroes SET name = ?, imagem = ? WHERE id = ?", [name, imagem, id]);
        return await HeroModel.getHeroById(id);
    },

    async deleteHero(id) {
        await connection.query("DELETE FROM heroes WHERE id = ?", [id]);
    }
};
