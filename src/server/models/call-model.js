import mongoose from "mongoose";

const { Schema } = mongoose;

const callSchema = new Schema({
  epochTime: {
    type: String,
    required: true
  },
  Room: {
    type: String,
    required: true
  },
  CallType:{
    type: String,
    required: true
  }, 
  CancelTime: {type: String,}
});

export default mongoose.model('Call', callSchema);