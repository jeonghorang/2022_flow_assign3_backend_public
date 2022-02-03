module.exports = app => {
    const messages = require("../controllers/msgController.js");

    var router = require("express").Router();

    // 메시지 생성
    router.post("/", messages.create);

    // 모든 msg 조회
    router.get("/", messages.findAllMsg);

    // toId으로 검색
    router.get("/to/:id", messages.findMsgByToId);

    // fromId으로 검색
    router.get("/from/:id", messages.findMsgByFromId);

    // id로 검색
    router.get("/id/:id", messages.findOne);

    app.use('/api/msg', router);
  };