"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("./product.model");
const createSingleProductIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(data);
    return result;
});
const getAllProductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const prodctQuery = new QueryBuilder_1.default(product_model_1.Product.find(), query)
        .searchMethod(["title", "category"])
        .filterMethod()
        .sortMethod();
    const result = yield prodctQuery.modelQuery;
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
const updateSingleProductFromDB = (data, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const { availability } = data, remainData = __rest(data, ["availability"]);
    const modifiedData = Object.assign({}, remainData);
    if (availability && Object.keys(availability).length) {
        for (const [key, value] of Object.entries(availability)) {
            modifiedData[`availability.${key}`] = value;
        }
    }
    const result = yield product_model_1.Product.findByIdAndUpdate({ _id }, modifiedData, {
        new: true,
    });
    return result;
});
const deleteSingleProductFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield product_model_1.Product.findById(_id);
    if (!isExist) {
        throw new AppError_1.default(404, "Item Not Found to Delete");
    }
    const result = yield product_model_1.Product.findByIdAndDelete(_id);
    return result;
});
const getAllCategoryFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
exports.productService = {
    getAllProductFromDB,
    createSingleProductIntoDB,
    updateSingleProductFromDB,
    deleteSingleProductFromDB,
    getSingleProductFromDB,
    getAllCategoryFromDB,
};
