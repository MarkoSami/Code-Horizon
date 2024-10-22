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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/passport/localStartegyPassport.config");
require("./config/passport/jwtStartegyPassport.config");
const redis_config_1 = __importDefault(require("./config/redis.config"));
const dotenv_1 = require("dotenv");
const passport_1 = __importDefault(require("passport"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./config/swagger.json"));
const apis_routes_1 = __importDefault(require("./routes/apis.routes"));
const queryStringParser_1 = __importDefault(require("./middlewares/queryStringParser"));
const morgan_1 = __importDefault(require("morgan"));
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        (0, dotenv_1.config)();
        redis_config_1.default.connect();
        const PORT = process.env.PORT || 3001;
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use((0, morgan_1.default)("dev"));
        app.use(passport_1.default.initialize());
        // dev shit
        app.get("/", (req, res) => {
            res.send("Hello World");
        });
        // Routes 
        app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
        app.use(queryStringParser_1.default);
        // api routes
        app.use("/api", apis_routes_1.default);
        // Global error handing middleware
        app.use((err, req, res, next) => {
            console.log(err.message);
            res.status(500).json("Something went wrong");
        });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    });
}
Main();
//# sourceMappingURL=app.js.map