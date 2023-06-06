import { Schema, model } from "mongoose";

const analiticsSchema = new Schema({
    room: String,
    alarmCode: {
        type: Array,
        default: [],
        required: true,
    },
    activateTime: {
        type: Array,
        default: [],
        required: true,
    },
    incidentCareTime: Date,
    timeElapsed: Number,
    report: String,
    terminated: Boolean
}, {
    timestamps: true,
    versionKey: false,
})

export default model('Report', analiticsSchema);