"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_error_exception_1 = require("../exceptions/http-error.exception");
function httpErrorHandlerMiddleware(err, req, res, next) {
    if (err instanceof http_error_exception_1.HttpErrorException) {
        return res.status(err.statusCode).send({
            message: err.message,
            success: false,
            statusCode: err.statusCode,
        });
    }
    return res.status(500).send({ message: "Something went wrong" });
}
exports.default = httpErrorHandlerMiddleware;
