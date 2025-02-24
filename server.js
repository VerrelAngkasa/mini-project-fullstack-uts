const express = require("express");
const routes = require("./routes/router");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth/register", routes);
app.use("/auth/login", routes);
app.use("/auth/logout", routes);
app.use("/tasks", routes);
app.use('/tasks/:id', routes);
app.use('/tasks/:id', routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});