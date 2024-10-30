const express = require("express");
const router = express.Router(); 
const employeeController = require("../controllers/employeeController");
const validateToken = require("../middleware/validateHandler");

router.post("/",validateToken, employeeController.addEmployee);

router.get("/",validateToken,employeeController.getAllEmployees);

router.put("/:id",validateToken, employeeController.updateEmployee);

router.delete("/:id",validateToken, employeeController.deleteEmployee);

module.exports = router;
