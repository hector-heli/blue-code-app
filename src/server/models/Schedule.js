import { Schema, model } from "mongoose";

const shiftSchema = new Schema({
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
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