import { Schema, model } from "mongoose";

const analiticsSchema = new Schema(
  {
    room: String,
    alarmCode: [{
      type: String
    }],
    activateTime: Date,
    incidentCareTime: Date,
    timeElapsed: Date,
    report: String,
    terminated: Boolean
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default model('Analitics', analiticsSchema);
