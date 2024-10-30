const Employee = require("../models/Employee"); 

exports.addEmployee = async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);

    if (payload) {
      let isAlreadyExist = await Employee.findOne({ email: payload.email });
      if (isAlreadyExist) {
        return res.status(400).send("User already exists");
      }

      const emp = new Employee(payload);
      emp["id"] = (await Employee.countDocuments()) + 1;
      emp["userId"] = req.user.id;

      const savedUser = await emp.save();

      if (savedUser) {
        return res.status(201).send("User saved successfully");
      } else {
        return res.status(500).send("Error saving data");
      }
    } else {
      throw new Error("User data is required");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


exports.getAllEmployees = async (req, res) => {
  try {
    // console.log(req);
    
    const employees = await Employee.find({userId: req.user.id});

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { id: req.params.id, userId: req.user.id }, // Match by id and userId
      req.body,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found or you are not authorized to update this employee" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete({
      id: req.params.id,
      userId: req.user.id 

    });

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
