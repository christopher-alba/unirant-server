"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtCheck = void 0;
var auth_1 = __importDefault(require("./routes/auth"));
var server_1 = __importDefault(require("./server"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
require("./mongodb");
var profile_1 = __importDefault(require("./routes/profile"));
var express_jwt_1 = require("express-jwt");
var jwks_rsa_1 = __importDefault(require("jwks-rsa"));
var community_1 = __importDefault(require("./routes/community"));
var jsonParser = body_parser_1.default.json({ limit: "50mb" });
var urlencondedParser = body_parser_1.default.urlencoded({
    limit: "50mb",
    extended: false,
});
server_1.default.use(jsonParser);
server_1.default.use(urlencondedParser);
var corsConfig = {
    origin: process.env.NODE_ENV === "production"
        ? "https://unirant.netlify.app"
        : "http://localhost:3000",
    credentials: true,
};
server_1.default.use((0, cors_1.default)(corsConfig));
server_1.default.options("*", (0, cors_1.default)(corsConfig));
server_1.default.enable("trust proxy");
exports.jwtCheck = (0, express_jwt_1.expressjwt)({
    secret: jwks_rsa_1.default.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://chris-alba-dev.au.auth0.com/.well-known/jwks.json",
    }),
    audience: "https://chris-alba-dev.au.auth0.com/api/v2/",
    issuer: "https://chris-alba-dev.au.auth0.com/",
    algorithms: ["RS256"],
});
var port = process.env.PORT || 5000;
server_1.default.use("/api/v1", auth_1.default);
server_1.default.use("/api/v1", profile_1.default);
server_1.default.use("/api/v1", community_1.default);
server_1.default.listen(port, function () {
    console.log("Listening on port", port);
});
