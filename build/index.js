"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = __importDefault(require("./routes/auth"));
var server_1 = __importDefault(require("./server"));
require("./mongodb");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var jsonParser = body_parser_1.default.json();
var urlencondedParser = body_parser_1.default.urlencoded({ extended: false });
server_1.default.use(jsonParser);
server_1.default.use(urlencondedParser);
server_1.default.use((0, cors_1.default)({
    origin: "*",
}));
var port = process.env.PORT || 5000;
server_1.default.use("/api/v1", auth_1.default);
server_1.default.listen(port, function () {
    console.log("Listening on port", port);
});
