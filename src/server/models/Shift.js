import { Schema, model } from "mongoose";

const shiftSchema = new Schema({
  startDate: {
    type: Number,
    //default: Date.now(),
    required: true
  },
  endDate: {
    type: Number,
    //default: Date.now(),
    required: true
  },
  chief: {
    type: String,
    required: true
  }, 
  doctor: {
    type: String,
    required: true
  }
});

export default model('Shift', shiftSchema);