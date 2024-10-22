"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_config_1 = require("../config/pagination.config");
exports.default = (req, res, next) => {
    const _a = req.query, { page, limit, sortBy, order } = _a, query = __rest(_a, ["page", "limit", "sortBy", "order"]);
    if (query.title) {
        query.title = query.title.toString().toLowerCase();
    }
    let options = {
        page: Number(page) || 1,
        limit: Number(limit) || pagination_config_1.PaginationConfig.MAX_PAGE_SIZE,
        sortBy: (sortBy ? sortBy : "").toString(),
        order: order === 'desc' ? 'desc' : 'asc',
        query: query || {}
    };
    res.locals.options = options;
    next();
};
//# sourceMappingURL=queryStringParser.js.map