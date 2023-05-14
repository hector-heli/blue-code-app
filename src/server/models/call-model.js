import mongoose from "mongoose";

const { Schema } = mongoose;

const callSchema = new Schema({
  epochTime: {
    type: String,
    required: true
  },
  CallType:{
    type: String,
    required: true
  }, 
  ElapsedTime: {
    type: String,
    required: true
  },
  DesactivedBy: {
    type: String,
    required: true
  }, 
  Responsable: {
    type: String,
    required: true
  }, 
});

export default mongoose.model('Call', callSchema);