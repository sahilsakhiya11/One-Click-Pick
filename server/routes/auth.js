const express = require("express");

const router = express.Router();
//route
router.get("/create-or-update-user", (req, res) => {
  res.json({
    data: "hit the create-or-update-user api endpoint",
  });
});

module.exports = router;