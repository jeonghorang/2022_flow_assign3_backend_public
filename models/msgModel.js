module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        fromId : { // 메시지 주는 사람
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        toId:{ // 메시지 받는 사람
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        fromNickname: {
          type: String
        },
        toNickname: {
          type: String
        },
        msgContents:{ // 메시지 내용
          type: String,
          trim: true,
          default: ''
      }
      }
    );
    
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Msg = mongoose.model("msg", schema);
    return Msg;
    };