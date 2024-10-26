import mongoose, { Schema } from "mongoose";

const ClassroomSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Classroom name is required']
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    resources: [{
        type: mongoose.Types.ObjectId,
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
