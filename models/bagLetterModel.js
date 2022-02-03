module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        santaid: { // 주는 사람
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        },
        santa_nickname:{ // 주는 사람 닉네임
            type: String,
        },
        bag_contents:{ // 편지 내용
            type: String,
            trim: true,
            default: ''
        },
        bag_icon: { // 선물 아이콘
            type: Number
        }
      }
    );
    
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Letter = mongoose.model("bagLetter", schema);
    return Letter;
    };