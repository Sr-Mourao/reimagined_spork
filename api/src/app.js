import express from "express";
import cors from "cors";
import { connection } from './database.js'

const app = express();
const PORT = 4000;

app.use(cors());

app.get("/heroes", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM heroes");
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

app.listen(PORT, () => console.log(`Running app in port: ${PORT}`));
