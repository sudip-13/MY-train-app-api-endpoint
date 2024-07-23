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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const flight_1 = __importDefault(require("../routes/flight"));
const home_1 = __importDefault(require("../routes/home"));
const getTrains_1 = __importDefault(require("../routes/getTrains"));
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const PORT = process.env.PORT;
        if (!PORT) {
            console.error("Environment variables and PORT must be provided.");
            return;
        }
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use((0, cookie_parser_1.default)());
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(body_parser_1.default.json());
        app.use("/flight", flight_1.default);
        app.use("/", home_1.default);
        app.use("/trains", getTrains_1.default);
        app.listen(PORT, () => {
            console.log(`server is running on http://localhost:${PORT}`);
        });
    });
}
init();
