import { Router } from "express";
import { connection } from "../database.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
})

router.get("/heroes", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM heroes");
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}).post("/heroes", async (req, res) => {
    try {
        const { name, imagem } = req.body;
        const [rows] = await connection.query("INSERT INTO heroes (name, imagem) VALUES (?, ?)", [name, imagem]);
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export { router };