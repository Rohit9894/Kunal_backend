const express = require("express");

const { addBank, get, editAmount, transfer } = require("../../Controllers/userControllers");
const { getBankDetails } = require("../../Controllers/userControllers");
const router = express.Router();
router.route("/add_account").post(addBank);
router.route("/getBankDetails").post(getBankDetails)
router.route("/editAccount").patch(editAmount)
router.route("/transfer").patch(transfer)

module.exports = router;
