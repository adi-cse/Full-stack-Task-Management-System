import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending"
  },
  dueDate: Date
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);