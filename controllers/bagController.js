const db = require("../models");
const Bag = db.bags
const Letters = db.bagletters
//const user = db.users

// Create and Save a new Bag
exports.createBag = (req, res) => {
    // Validate request
    if (!req.body.bag_owner) {
      res.status(400).send({ message: "bag_owner can not be empty!" });
      return;
    }
  
    // Create a Bag
    const bag = new Bag({
      bag_owner: req.body.bag_owner,
      bag_letter: req.body.bag_letter
    });

    // Save Bag in the database
    bag
      .save(bag)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Bag."
        });
      });
  };
  
  // bag_owner_email로 검색
  exports.findAllBag = (req, res) => {
      const bag_owner = req.query.bag_owner;
      console.log("Bag_owner: ", bag_owner);
      
      var condition = bag_owner ? { bag_owner: { $regex: new RegExp(bag_owner), $options: "i" } } : {};
    
      Bag.find(condition)
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving bags."
          });
        });
  };
  
//   // bag Owner로 복주머니 검색
// exports.findMsgOneByBagOwner = (req, res) => {
//   const bag_owner = req.params.bag_owner;
//   // var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};
  
//   Bag.findOne({ bag_owner: bag_owner }).populate('bag_owner').exec((err, data) => {
//     if(err){
//       console.log(err)
//     }
//     else{
//       res.json(data);
//     }
//   })
//   };
  

// bagOwner로 bag 검색
exports.findBagByBagOwner = (req, res) => {
  const bag_owner = req.params.id;
  Bag.find({bag_owner: bag_owner})
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

  // Find a single Bag with an id
  exports.findOneBagById = (req, res) => {
      const id = req.params.id;
  
      Bag.findById(id)
        .then(data => {
          if (!data)
            res.status(404).send({ message: "Not found Bag with id " + id });
          else res.json(data);
        })
        .catch(err => {
          res
            .status(500)
            .send({ message: "Error retrieving Bag with id=" + id });
        });
  };
  
  // Update a Bag by the id in the request
  exports.updateBagById = (req, res) => {
      if (!req.body) {
          return res.status(400).send({
            message: "Data to update can not be empty!"
          });
        }
      
      const id = req.params.id;
      const update = Bag.find({bag_letter: `${id}`});
        Bag.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
          .then(data => {
            if (!data) {
              res.status(404).send({
                message: `Cannot update Bag with id=${id}. Maybe Bag was not found!`
              });
            } else res.send({ message: "Bag was updated successfully." });
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Bag with id=" + id
            });
          });
  };

// bag letter 
exports.createLetter = (req, res) => {
  // Validate request
  console.log(req.body);
  Bag.findById(req.params.id, function(err,foundBag){
    if(err){
      console.log(err);
      res.redirect("/api/bags");
    }else{
      var addedLetter = new Letters({
        santaid: req.body.bag_letter.santaid,
        santa_nickname: req.body.bag_letter.santa_nickname,
        bag_contents: req.body.bag_letter.bag_contents,
        bag_icon: req.body.bag_letter.bag_icon
      })
    };
    Letters.create(addedLetter, function(err, newLetter){
      if(err){
        console.log(err);
      }else{
        foundBag.bag_letter.push(newLetter);
        foundBag.save();
        res.redirect("/api/bags/" + req.params.id);
      }
    })
  })
};
