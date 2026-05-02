import Task from "../models/Task.js";

// ✅ Create Task
export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating task" });
  }
};

// ✅ Member → only their tasks
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate("assignedTo", "name");

    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// ✅ Update Task (only assigned user)
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).json({ msg: "Task not found" });

    if (task.assignedTo.toString() !== req.user.id)
      return res.status(403).json({ msg: "Not allowed" });

    task.status = req.body.status;
    await task.save();

    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating task" });
  }
};

// ✅ Admin → all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email role");

    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching all tasks" });
  }
};