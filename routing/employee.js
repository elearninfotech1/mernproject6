let express = require("express");
let Employee = require("../model/Employee");
let employeeRouting = express.Router();

employeeRouting.post("/", async (req, res) => {
  let user = new Employee(req.body);
  let result = await user.save();
  res.send(result);
});

employeeRouting.get("/", async (req, res) => {
  let user = await Employee.find();
  if (user.length > 0) {
    res.send(user);
  } else {
    res.send("no data found");
  }
});

employeeRouting.delete("/:id", async (req, res) => {
  let user = await Employee.deleteOne({ _id: req.params.id });
  res.send(user);
});

module.exports = employeeRouting;
