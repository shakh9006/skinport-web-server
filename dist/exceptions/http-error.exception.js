"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorException = void 0;
class HttpErrorException extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
    static BadRequest(message = "Bad request", statusCode = 400) {
        return new HttpErrorException(message, statusCode);
    }
    static InternalError(message = "Server error", statusCode = 500) {
        return new HttpErrorException(message, statusCode);
    }
    static NotFound(message = "Not found", statusCode = 404) {
        return new HttpErrorException(message, statusCode);
    }
    static Unauthorized(message = "Access denied", statusCode = 403) {
        return new HttpErrorException(message, statusCode);
    }
}
exports.HttpErrorException = HttpErrorException;
