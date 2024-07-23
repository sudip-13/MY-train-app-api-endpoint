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
const express_1 = require("express");
const Amadeus = require('amadeus');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const router = (0, express_1.Router)();
const API = `api`;
// Amadeus client initialization
const amadeus = new Amadeus({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});
// Endpoint for airport search
router.get(`/${API}/airports`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, subType, keyword } = req.query;
    try {
        // API call with params we requested from client app
        const response = yield amadeus.client.get("/v1/reference-data/locations", {
            keyword,
            subType,
            "page[offset]": Number(page) * 10
        });
        // Sending response for client
        res.json(JSON.parse(response.body));
    }
    catch (err) {
        res.json(err);
    }
}));
// Endpoint for flight availability search
router.post(`/${API}/flightavailabilities`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.CLIENT_ID);
    const { sourceCode, destinationCode, selectedDate, adult, children, infants } = req.body;
    try {
        const response = yield amadeus.shopping.flightOffersSearch.get({
            originLocationCode: sourceCode,
            destinationLocationCode: destinationCode,
            departureDate: selectedDate,
            adults: adult,
            children: children,
            infants: infants
        });
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: error });
        console.log(error);
    }
}));
module.exports = router;
exports.default = router;
