"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    searchMethod(searchField) {
        const searchTerm = this.query.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchField.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" },
                })),
            });
        }
        return this;
    }
    filterMethod() {
        const queryobject = Object.assign({}, this.query);
        const excludeFiled = ["searchTerm", "sort", "limit", "page", "field"];
        excludeFiled.forEach((el) => delete queryobject[el]);
        this.modelQuery = this.modelQuery.find(queryobject);
        return this;
    }
    sortMethod() {
        var _a, _b, _c, _d;
        // let sort = this.query?.sort || '-createdAt'; for single sort value
        const sort = ((_c = (_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(",")) === null || _c === void 0 ? void 0 : _c.join(" ")) || "-price";
        this.modelQuery = (_d = this.modelQuery) === null || _d === void 0 ? void 0 : _d.sort(sort);
        return this;
    }
    paginateMethod() {
        var _a, _b;
        const page = Number((_a = this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fieldLimitMethod() {
        var _a, _b, _c;
        const field = ((_c = (_b = (_a = this.query) === null || _a === void 0 ? void 0 : _a.field) === null || _b === void 0 ? void 0 : _b.split(",")) === null || _c === void 0 ? void 0 : _c.join(" ")) || "-__v";
        this.modelQuery.select(field);
        return this;
    }
}
exports.default = QueryBuilder;
