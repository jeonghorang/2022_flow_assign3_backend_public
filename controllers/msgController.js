const db = require("../models");
const Messages = db.msgs;

// Create and Save a new msg
exports.create = (req, res) => {
    // Validate request
    if (!req.body.msgContents) {
      res.status(400).send({ message: "msgContents can not be empty!" });
      return;
    }
  
    // Create a msg
    const msg = new Messages({
      fromId: req.body.fromId,
      toId: req.body.toId,
      fromNickname: req.body.fromNickname,
      toNickname: req.body.toNickname,
      msgContents: req.body.msgContents,
    });
  
    // Save msg in the database
    msg
      .save(msg)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Message."
        });
      });
  };

// 모든 Msg 조회
exports.findAllMsg = (req, res) => {
  const toId = req.query.toId;
  var condition = toId ? { toId: { $regex: new RegExp(toId), $options: "i" } } : {};

  Messages.find(condition)
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

// toId으로 검색
exports.findMsgByToId = (req, res) => {
const toId = req.params.id;
Messages.find({toId: toId})
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

    // 모든 Msg 조회
exports.findMsgByFromId = (req, res) => {
  const fromId = req.params.id;

  Messages.find({fromId: fromId})
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

// Find a single message with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Messages.findById(id)
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
