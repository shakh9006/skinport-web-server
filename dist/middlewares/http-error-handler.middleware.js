"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpErrorHandlerMiddleware = httpErrorHandlerMiddleware;
const http_error_exception_1 = require("../exceptions/http-error.exception");
function httpErrorHandlerMiddleware(err, req, res, next) {
    if (err instanceof http_error_exception_1.HttpErrorException) {
        return res.status(err.statusCode).send({
            message: err.message,
            success: false,
            statusCode: err.statusCode,
        });
    }
    console.log("Server Error: ", err.message);
    return res.status(500).send({ message: "Something went wrong" });
}
//# sourceMappingURL=http-error-handler.middleware.js.map