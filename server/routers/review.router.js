const router = require("express").Router();

const ReviewModel = require("../models/Review.model");
const RoomModel = require("../models/Room.model");
const UserModel = require("../models/User.model");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/review", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.user;

    const { roomId } = req.body;

    // Verifica se a acomodação que vai receber o review não é de propriedade do usuário logado
    const user = await UserModel.findOne({
      _id,
      rooms: { $not: { $in: [roomId] } },
    });

    console.log(user);

    // Usuários não podem fazer um review de uma acomodação que são donos
    if (user) {
      const result = await ReviewModel.create({ ...req.body, authorId: _id });

      // Adicionar referência do review criado no modelo da acomodação

      await RoomModel.updateOne(
        { _id: roomId },
        { $push: { reviews: result._id } }
      ); // Como não precisamos incluir na resposta o resultado dessa consulta, podemos usar o updateOne que tem a sintaxe mais simples do que o findOneAndUpdate

      // Adicionar referência do review criado no modelo do usuário

      await UserModel.updateOne({ _id }, { $push: { reviews: result._id } });

      return res.status(201).json(result);
    }

    // 400: Bad Request
    return res
      .status(400)
      .json({ msg: "Você não pode avaliar sua própria acomodação!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

router.delete("/review/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;

    // 1. Deletar o review
    const result = await ReviewModel.findOneAndDelete({ _id });

    if (!result) {
      return res.status(404).json({ msg: "Review não encontrado." });
    }

    // 2. Deletar a referência do review do Usuário
    await UserModel.updateOne(
      { _id: req.user._id },
      { $pull: { reviews: _id } }
    );

    // 3. Deletar a referência do review da Acomodação
    await RoomModel.updateOne(
      { _id: result.roomId },
      { $pull: { reviews: _id } }
    );

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

module.exports = router;
