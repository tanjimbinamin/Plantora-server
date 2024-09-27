import express from "express";
import cors from "cors";
import router from "./app/routes/route";
import { globalsErrorHandler } from "./app/middleware/globalsErrorHandler";
import { notFound } from "./app/utils/notFound";
const app = express();
app.use(express.json());
const corsOptions = {
  origin: [
    "https://plantora.vercel.app/",
    "https://endearing-griffin-080f42.netlify.app",
    
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  
};
app.use(cors(corsOptions));

app.use("/api/v1/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalsErrorHandler);
app.use(notFound);
export default app;
