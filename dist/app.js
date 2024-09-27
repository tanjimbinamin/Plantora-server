"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./app/routes/route"));
const globalsErrorHandler_1 = require("./app/middleware/globalsErrorHandler");
const notFound_1 = require("./app/utils/notFound");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: [
        "https://plantora.vercel.app/",
        "https://endearing-griffin-080f42.netlify.app",
        "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, cors_1.default)(corsOptions));
app.use("/api/v1/", route_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(globalsErrorHandler_1.globalsErrorHandler);
app.use(notFound_1.notFound);
exports.default = app;
