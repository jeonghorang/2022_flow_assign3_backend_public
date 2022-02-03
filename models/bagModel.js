module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      bag_owner: { // 복주머니 주인
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      bag_letter: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bagLetter'
      }],
    }
  );
  
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Bag = mongoose.model("bag", schema);
  return Bag;
  };