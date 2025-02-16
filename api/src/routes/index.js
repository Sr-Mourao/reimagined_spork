import { Router } from "express";
import { HeroModel } from "../models/heroModel.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
})

router.route("/heroes")
    .get(async (req, res) => {
        try {
            const allHeroes = await HeroModel.getAllHeroes();
            return res.json(allHeroes);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    })
    .post(async (req, res) => {
        try {
            const { name, imagem } = req.body;

            const idHeroCreated = await HeroModel.createHero(name, imagem);
            const hero = await HeroModel.getHeroById(idHeroCreated);

            return res.status(201).json(hero);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    })
    .put(async (req, res) => {
        try {
            const { id, name, imagem } = req.body;

            const existingHero = await HeroModel.getHeroById(id);
            if (!existingHero) {
                return res.status(404).json({ error: "Hero not found." });
            }
            const updatedHero = await HeroModel.updateHero(id, name, imagem);
            return res.json(updatedHero);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    })
    .delete(async (req, res) => {
        try {
            const { id } = req.body;
            const existingHero = await HeroModel.getHeroById(id);
            if (!existingHero) {
                return res.status(404).json({ error: "Hero not found." });
            }
            await HeroModel.deleteHero(id);
            return res.json({ message: "Hero deleted successfully." });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

export { router };