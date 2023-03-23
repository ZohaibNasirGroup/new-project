const express = require("express");
const adminController = require("../Controller/adminController");
const fetchUser = require("../Controller/auth-token");
const router = express.Router();

router.get("/Api/v1", adminController.users);
router.post("/Api/v1/signUp", adminController.signUp);
router.post("/Api/v1/loginViaEmail", adminController.loginViaEmail);
router.post("/Api/v1/loginViaContact", adminController.loginViaContact);
//router.post("/Api/v1/resetPassword", adminController.reset);
router.post("/Api/v1/resetPassword",fetchUser, adminController.resetPassword);

module.exports = router;
