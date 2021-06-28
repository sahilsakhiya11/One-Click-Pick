const express = require("express");

const router = express.Router();
//route
router.get("/user", (req, res) => {
  res.json({
    data: "hit user api endpoint",
  });
});

module.exports = router;