"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateServer;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_error_exception_1 = require("../exceptions/http-error.exception");
function generateServer() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.get("/ping", (req, res) => {
        res.send({
            message: "pong",
        });
    });
    app.all("*", () => {
        throw http_error_exception_1.HttpErrorException.NotFound();
    });
    // app.use(httpErrorHandlerMiddleware);
    return app;
}
//# sourceMappingURL=index.js.map