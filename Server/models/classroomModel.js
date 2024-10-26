import mongoose, { Schema } from "mongoose";

const ClassroomSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Classroom name is required']
    },
    admin: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    resources: [{
        type: Schema.Types.ObjectId,
        ref: 'Resources'
    }],
    code: {
        type: String,
        required: [true, 'Code is required'],
        unique: true
    },
}, {
    timestamps: true
});

const Classroom = mongoose.model("Classroom", ClassroomSchema);

export default Classroom;
