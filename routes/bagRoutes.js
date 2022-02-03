module.exports = app => {
    const bags = require("../controllers/bagController");
    var router = require("express").Router();
  
    // 복주머니 생성
    router.post("/", bags.createBag);

    // 모든 복주머니 검색(조회)
    router.get("/", bags.findAllBag);

    // bag Owner로 복주머니 검색
    router.get("/owner/:id", bags.findBagByBagOwner);

    // object id로 복주머니 검색
    router.get("/:id", bags.findOneBagById);
  
    // object id로 복주머니 수정
    router.put("/:id", bags.updateBagById);
    
    // letter 추가
    router.post("/:id", bags.createLetter);

    app.use('/api/bags', router);
  };