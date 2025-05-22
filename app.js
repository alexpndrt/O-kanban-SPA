import "dotenv/config";
import { join } from "node:path";
import express from "express";
import cors from "cors";
const app = express();

// ? on branche le middleware cors, on lui passe en argument une étoile : * veut dire que tout le monde peut requêter notre api
// app.use(
//     cors('*')
// );

// ? on restreint les sites autorisés à nous requêter
app.use(
  cors({
    // Les URL autorisés à nous requêter
    origin: [
      "http://localhost:5500",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5174",
    ],
  })
);

app.set("port", process.env.PORT || 3000);
app.set("base_url", process.env.BASE_URL || "http://localhost");
app.set("db_url", process.env.DB_URL);

app.use(express.static(join(import.meta.dirname, "dist")));

// ? on obtient req.body : que l'on envoie du json ou un formulaire
// ? permet de comprendre le header application/json
app.use(express.json());
// ? permet de comprendre le header application/x-www-form-urlencoded
// ? express v5 : { extended: false } par défaut
app.use(express.urlencoded());

export { app };
