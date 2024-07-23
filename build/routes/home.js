"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, resp) => {
    resp.json({
        success: true,
        time_stamp: Date.now(),
        data: "please refer our doc for more details('https://github.com/AniCrad/indian-rail-api')",
    });
});
exports.default = router;
