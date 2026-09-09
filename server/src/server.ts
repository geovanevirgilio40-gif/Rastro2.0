import express from "express";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Rastro API",
  });
});

app.use("/auth", authRoutes);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Rastro API a correr na porta ${PORT}`);
});
