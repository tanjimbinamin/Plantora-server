"use strict";
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalsErrorHandler = void 0;
const config_1 = require("../config");
const zod_1 = require("zod");
const handleZodError_1 = require("../errors/handleZodError");
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleMongooseError_1 = require("../errors/handleMongooseError");
const globalsErrorHandler = (err, req, res, next) => {
    var _a;
    let statusCode = 500;
    let message = "Something went wrong";
    let errorSource = [
        {
            path: "",
            message: "something went wrong",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const zodError = (0, handleZodError_1.handleZodError)(err);
        statusCode = zodError.statusCode;
        message = zodError.message;
        errorSource = zodError.errorSource;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSource = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const simplifiedError = (0, handleMongooseError_1.handleMongooseError)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSource = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, handleMongooseError_1.handleMongooseCastError)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSource = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSource;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000 || ((_a = err === null || err === void 0 ? void 0 : err.erroData) === null || _a === void 0 ? void 0 : _a.code) === 11000) {
        const simplifiedError = (0, handleMongooseError_1.handleMongooseDuplicateError)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSource = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSource;
    }
    return res.status(statusCode).send({
        success: false,
        message: message,
        errorSource,
        stack: config_1.config.node_env == "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.globalsErrorHandler = globalsErrorHandler;
