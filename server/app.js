// Integração da autenticação back-front
// Relacionamentos mongoose
// Deletar a referencia da review do room
// Detectar usuário e permissões

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("combined"));

const db = require("./config/db.config");
db()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Servidor rodando na porta ", process.env.PORT);
    });
  })
  .catch((err) => console.error(err));

const userRouter = require("./routers/user.router");
const roomRouter = require("./routers/room.router");
const reviewRouter = require("./routers/review.router");

app.use("/", userRouter);
app.use("/", roomRouter);
app.use("/", reviewRouter);
