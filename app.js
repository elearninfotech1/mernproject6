let express = require("express");
require("./db");
let connection = require("./db1");
let User = require("./model/Person");
let Employee = require("./model/Employee");
let Signup = require("./model/Signup");
let employeeRouting = require("./routing/employee");
let cors = require("cors");

let app = express();

app.use(cors());
app.use(express.json());

app.get("/studentmysql", (req, res) => {
  let eq = "select * from student";
  let user = connection.query(eq, (err, data) => {
    if (err) {
      res.send("no data found");
    } else {
      res.send(data);
    }
  });
});

//employee api
app.use("/employee", employeeRouting);
//employee api

app.get("/student", async (req, res) => {
  let user = await User.find();
  if (user.length > 0) {
    res.send(user);
  } else {
    res.send("no data found");
  }
});

app.post("/student", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

app.delete("/student/:id", async (req, res) => {
  let user = await User.deleteOne({ _id: req.params.id });
  res.send(user);
});

app.get("/student/:id", async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });
  res.send(user);
});

app.put("/student/:id", async (req, res) => {
  let user = await User.updateOne({ _id: req.params.id }, { $set: req.body });
  res.send(user);
});

app.get("/search/:key", async (req, res) => {
  let user = await User.find({
    $or: [
      { name: { $regex: req.params.key } },
      { email: { $regex: req.params.key } },
      { address: { $regex: req.params.key } },
    ],
  });
  res.send(user);
});

app.post("/signup", async (req, res) => {
  let user = new Signup(req.body);
  let result = await user.save();
  res.send(result);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await Signup.findOne({ email: email });
  if (user.password == password) {
    res.send(user);
  } else {
    res.send("no data found");
  }
});

app.get("*", (req, res) => {
  res.send("<h1>Invalid URL</h1>");
});

app.listen(4000);
