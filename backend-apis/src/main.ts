import express from "express";
import dotenv from "dotenv";
import router from "./api";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use("/api", router);


app.get("/", (_req, res) => {
    res.send("✅ Starknet Backend is running!");
});


app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
