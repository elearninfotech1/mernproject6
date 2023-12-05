let express = require("express");
let connection = require("./db1");
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

app.post("/studentmysql", (req, res) => {
  let { sno, name, address } = req.body;
  let eq = `insert into student(sno,name,address) values ("${sno}","${name}","${address}")`;
  let user = connection.query(eq, (err, data) => {
    if (err) {
      res.send("unable to add student data found");
    } else {
      res.send(data);
    }
  });
});

app.delete("/studentmysql/:id", (req, res) => {
  let id = req.params.id;
  let eq = `delete from student where sno="${id}"`;
  let user = connection.query(eq, (err, data) => {
    if (err) {
      res.send("unable to delete student data found");
    } else {
      res.send(data);
    }
  });
});

app.get("/studentmysql/:id", (req, res) => {
  let id = req.params.id;
  let eq = `select * from student where sno="${id}"`;
  let user = connection.query(eq, (err, data) => {
    if (err) {
      res.send("no data found");
    } else {
      res.send(data);
    }
  });
});

app.put("/studentmysql/:id", (req, res) => {
  let id = req.params.id;
  let { sno, name, address } = req.body;
  let eq = `update student set sno="${sno}",name="${name}",address="${address}" where sno="${id}"`;
  let user = connection.query(eq, (err, data) => {
    if (err) {
      res.send("unable to update student data found");
    } else {
      res.send(data);
    }
  });
});

app.post("/signup", (req, res) => {
  let { id, name, email, password, phone, address } = req.body;
  let eq = `insert into signup(id,name,email,password,phone,address) values ("${id}","${name}","${email}","${password}","${phone}","${address}")`;
  let user = connection.query(eq, (err, data) => {
    if (err) {
      res.send("unable to add user data found");
    } else {
      res.send(data);
    }
  });
});

app.post("/login", (req, res) => {
  let { email, password } = req.body;
  let eq = `select * from signup where email="${email}" and password="${password}"`;
  let user = connection.query(eq, (err, data) => {
    if (err) {
      res.send("no user data found");
    } else {
      res.send(data);
    }
  });
});

app.get("*", (req, res) => {
  res.send("<h1>Invalid URL</h1>");
});

app.listen(4000);
