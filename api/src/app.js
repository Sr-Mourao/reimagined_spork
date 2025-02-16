import { router } from "./routes/index.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["*"],
}));

app.use(express.json());
const PORT = 4000;

app.use(router);

app.listen(PORT, () => console.log(`Running app in port: ${PORT}`));
