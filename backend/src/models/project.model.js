import mongoose from "mongoose";

const projectschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

const Project = mongoose.model("Project", projectschema);
export default Project;