var express = require("express");
var router = express.Router();

router.get("/", async function(req, res) {
    res.render("index-tmpl", {
        title: "E-Commerce Web"
    });

});


module.exports = router;
