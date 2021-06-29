const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controller
const { createOrUpdateUser } = require("../controllers/auth");

router.post("/createorupdateuser", authCheck, createOrUpdateUser);

module.exports = router;
