const express = require("express");
const app = express();

require("dotenv").config();
require("./conn/conn");

const cors = require("cors");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", UserAPI);
app.use("/api/v2", TaskAPI);

// Health check
app.use("/", (req, res) => {
    res.send("Hello from backend");
});

// 404 handler for missing routes
app.use((req, res) => {
    res.status(404).send("Route not found");
});

const PORT = 1000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
