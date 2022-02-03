module.exports = app => {
    const users = require("../controllers/userController");
  
    var router = require("express").Router();
  
    // 유저 생성
    router.post("/", users.create);
  
    // 모든 유저 검색
    router.get("/", users.findAll);

    // 이메일로 유저 검색
    router.get("/email/:email", users.findOneByEmail);

    // object id로 유저 검색
    router.get("/id/:id", users.findOne);
  
    // object id로 유저 정보 수정
    router.put("/:id", users.update);

    app.use('/api/users', router);
  };