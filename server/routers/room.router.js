const router = require("express").Router();
const Room = require("../models/Room.model");
const Review = require("../models/Review.model");
const UserModel = require("../models/User.model");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/room", isAuthenticated, async (req, res) => {
  try {
    // Extraindo o id do usuário logado
    const { _id } = req.user;

    // Cria a nova acomodação
    const result = await Room.create({ ...req.body, ownerId: _id });

    // Salvar a referência dela no modelo de usuário
    await UserModel.updateOne({ _id }, { $push: { rooms: result._id } }); // Como não precisamos incluir na resposta o resultado dessa consulta, podemos usar o updateOne que tem a sintaxe mais simples do que o findOneAndUpdate

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

router.get("/room", isAuthenticated, async (req, res) => {
  try {
    const result = await Room.find();

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

router.get("/room/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;

    const result = await Room.findOne({ _id })
      .populate("reviews") // carregar todos os objetos de review no lugar de somente os ids
      .populate({
        path: "reviews",
        populate: { path: "authorId", model: "User", select: "-passwordHash" },
      }) // Aqui estamos fazendo um populate aninhado, ou seja, populando o campo authorId dentro do campo reviews, que também precisa ser populado
      .populate("ownerId", "-passwordHash"); // carregar todos os dados de usuário no lugar de somente o id, porém não enviar a senha

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

router.patch("/room/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;

    const result = await Room.findOneAndUpdate(
      { _id, ownerId: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

router.delete("/room/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;

    // Deleta a acomodação
    const result = await Room.findOneAndDelete(
      { _id, ownerId: req.user._id },
      { new: true }
    );

    // Deleta todos os reviews dessa acomodação
    await Review.deleteMany({ roomId: _id });

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

module.exports = router;
