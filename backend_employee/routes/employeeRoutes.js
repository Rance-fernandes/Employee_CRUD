const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");


// Add a new employee
router.post("/", async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);

    if (payload) {
      let isAlreadyExist = await Employee.findOne({ email: payload.email });
      if (isAlreadyExist) {
        return res.send("user already exist");
      }
      const emp = new Employee(payload);
      emp["id"] = (await Employee.countDocuments()) + 1;
      const savedUser = await emp.save();
      if (savedUser) {
        return res.send("user saved successfully");
      } else {
        return res.send("error savind data");
      }
    } else {
      throw new Error("user data is required");
    }
  } catch (error) {
    console.log(error);
  }
});

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an employee
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { id: req.params.id }, // Use your custom `id` field here
      req.body,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an employee
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete({
      id: req.params.id,
    }); // Use your custom `id` field here

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
