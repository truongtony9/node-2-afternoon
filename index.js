require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const pc = require("./products_controller");

const app = express();
const port = 3000;

app.use(json());

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.post("/api/product", pc.create);
app.get("/api/products", pc.getAll);
app.get("/api/product/:id", pc.getOne);
app.put("/api/product/:id", pc.update);
app.delete("/api/product/:id", pc.delete);

app.listen(port, () => {
  console.log(`The server is listening at ${port}`);
});
