const db = require("../models");
const Letters = db.bagletters;
const Bags = db.bags;
// 모든 letter 조회
exports.findAllLetter = (req, res) => {
  const santa_nickname = req.query.santa_nickname;
  var condition = santa_nickname ? { santa_nickname: { $regex: new RegExp(santa_nickname), $options: "i" } } : {};

  Letters.find(condition)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bagletters."
      });
    });
};

// 닉네임으로 검색
exports.findLetterOneByNickname = (req, res) => {
const santa_nickname = req.params.santa_nickname;
// var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

Letters.findOne({ santa_nickname: santa_nickname }).populate('santa_nickname').exec((err, data) => {
  if(err){
    console.log(err)
  }
  else{
    res.json(data);
  }
})
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Letters.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

//   // bag의 object id로 letter 모두 검색
// exports.findLetterByBagId = (req, res) => {
//   const id = req.params.id;
//   Letters.find({id: id})
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving msg."
//         });
//       });
//   };

  // 산타 id로 letter 모두 검색
  exports.findLetterBySantaId = (req, res) => {
    const santaid = req.params.santaid;
    Letters.find({santaid: santaid})
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving msg."
          });
        });
    };