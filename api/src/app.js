import { router } from "./routes/index.js";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(router);
app.use(cors());

app.listen(PORT, () => console.log(`Running app in port: ${PORT}`));
