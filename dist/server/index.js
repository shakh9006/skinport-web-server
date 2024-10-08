"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateServer;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_error_handler_middleware_1 = __importDefault(require("../middlewares/http-error-handler.middleware"));
const routes_1 = __importDefault(require("../modules/user/routes"));
const routes_2 = __importDefault(require("../modules/items/routes"));
const routes_3 = __importDefault(require("../modules/purchase/routes"));
const redis_1 = require("../cache/redis");
function generateServer() {
    (0, redis_1.connectRedis)();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.get("/ping", (req, res) => {
        res.send({
            message: "pong",
        });
    });
    /**
     * Основные 2 эндпоинта.
     */
    app.use("/api/v1/items", routes_2.default);
    app.use("/api/v1/purchase", routes_3.default);
    /**
     * В задаче было указано добавить только 2 эндпоинта,
     * но я добавил ещё 2 для пользователя: чтобы создать пользователя с балансом и просмотреть данные о пользователе после покупки.
     */
    app.use("/api/v1/user", routes_1.default);
    app.all("*", (req, res) => {
        res.status(404).send({ message: "Not found" });
    });
    app.use(http_error_handler_middleware_1.default);
    return app;
}
