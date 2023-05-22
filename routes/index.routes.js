const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/home", (req, res, next) => {
  res.render("auth/home");
});

router.get("/create", (req, res, next) => {
  res.render("auth/create");
});

router.get("/edit", (req, res, next) => {
  res.render("edit/:vibeId");
});

router.get("/delete", (req, res, next) => {
  res.render("delete/:vibeId");
});

module.exports = router;

