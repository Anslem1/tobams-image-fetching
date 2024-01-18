"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = exports.errorHandler = void 0;
class CustomError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
        };
    }
}
exports.CustomError = CustomError;
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    if (res.status) {
        return res.status(status).json({ error: err.message });
    }
    else {
        // If res.status is not available, use res.json directly
        return res.json({ error: err.message });
    }
};
exports.errorHandler = errorHandler;
