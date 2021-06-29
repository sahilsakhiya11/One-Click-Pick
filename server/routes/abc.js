const express = require("express");

const router = express.Router();

router.get("/abc", (req, res) => {
  res.json({
    data: "hey you hit ABC API endpoint",
  });
});

module.exports = router;
