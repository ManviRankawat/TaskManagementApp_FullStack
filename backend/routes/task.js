const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");
const authenticateToken = require("./auth"); // Import authentication middleware

// Create Task
router.post("/create-task", authenticateToken, async (req, res) => {
    try {
        const { title, desc } = req.body;
        const { id } = req.headers;  // Get user ID from authenticated token

        // Create new task
        const newTask = new Task({ title, desc });
        const saveTask = await newTask.save();
        const taskId = saveTask._id;
        // Push task ID to user's task list
        await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });

        res.status(200).json({ message: "Task Created" });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});

// Get all tasks for a user
router.get("/get-all-tasks", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;  // Get user ID from authenticated token
        const userData = await User.findById(id).populate({
            path: "tasks",
            options: { sort: { createdAt: -1 } },
         });
        res.status(200).json({ data: userData });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});

// Delete task
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId,{$pull:{tasks:id}});
        res.status(200).json({ message: "Task Deleted Successfully" });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});

//Update Task
router.put("/update-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc } = req.body;
        await Task.findByIdAndUpdate(id, { title: title, desc: desc});
        
        res.status(200).json({ message: "Task Updated Successfully" });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});

//Update Important Task
router.put("/update-important-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const TaskData = await Task.findById(id);
        const ImpTask = TaskData.important;
        await Task.findByIdAndUpdate(id, { important: !ImpTask });
        res.status(200).json({ message: "Task Updated Successfully" });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});

//Update Complete Task
router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const TaskData = await Task.findById(id);
        const CompleteTask = TaskData.important;
        await Task.findByIdAndUpdate(id, { complete: !CompleteTask });
        res.status(200).json({ message: "Task Updated Successfully" });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});

//Get Important Task
router.get("/get-important-task", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; 
        const Data = await User.findById(id).populate({
            path: "tasks",
            match:{ important: true },
            options: { sort: { createdAt: -1 } },
        });
        const ImpTaskData = Data.tasks;
        res.status(200).json({ data: ImpTaskData });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});

//Get Completed Task
router.get("/get-complete-task", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; 
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: { complete: true },
            options: { sort: { createdAt: -1 } },
        });
        const CompTaskData = Data.tasks;
        res.status(200).json({ data: CompTaskData });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});

//Get InComplete Task
router.get("/get-incomplete-task", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; 
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: { complete: false },
            options: { sort: { createdAt: -1 } },
        });
        const CompTaskData = Data.tasks;
        res.status(200).json({ data: CompTaskData });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(400).json({ message: "Internal Server Error" });
    }
});
module.exports = router;
