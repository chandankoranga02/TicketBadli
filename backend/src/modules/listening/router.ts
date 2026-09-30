const { Router } = require("express");
const router = Router();

const { create, deletelistening  , edit , getall } = require(".controller");
const getAll = require("./search.controller")

// creating listening by user
router.delete("/delete/:id", deletelistening);
router.patch("/edit/:id", edit);
router.post("/create", create);
router.get("/getallMy", getall);

// search listening db api
router.get("/search/getall" , getAll);

module.exports = router;