module.exports = app => {
    const letters = require("../controllers/bagLetterControllers");

    var router = require("express").Router();

    // 모든 letter 조회
    router.get("/", letters.findAllLetter);

    // 닉네임으로 편지 검색
    router.get("/santaName/:santa_nickname", letters.findLetterOneByNickname);

    // bag의 object Id로 편지 검색
    router.get("/id/:id", letters.findOne);
    
    // 산타 id로 편지 모두 검색
    router.get("/santaId/:santaid", letters.findLetterBySantaId);
  
    app.use('/api/letters', router);
  };