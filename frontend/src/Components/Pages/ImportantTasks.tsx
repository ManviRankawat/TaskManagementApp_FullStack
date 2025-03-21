import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../Cards";

interface Task {
  _id: string;
  title: string;
  desc: string;
  isImportant: boolean; // Make sure this matches backend field name!
}

const ImportantTasks: React.FC = () => {
  const [userData, setUserData] = useState<Task[]>([]);

  const storedId = localStorage.getItem("id");
  const storedToken = localStorage.getItem("token");

  const headers = {
    id: storedId,
    Authorization: `Bearer ${storedToken}`,
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v2/get-important-task",
          { headers }
        );

        if (response.status === 200) {
          const tasks: Task[] = response.data.data.tasks || [];
          
          // ✅ Filter only tasks where `important === true`
          const importantTasks = tasks.filter(task => task.important);

          setUserData(importantTasks);
          console.log("Filtered Important Tasks:", importantTasks);
        } else {
          console.error("Failed to fetch tasks, Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchUserData();
  }, []); // Runs once on mount

  return (
    <div>
      <Cards home="false" userData={userData} />
    </div>
  );
};

export default ImportantTasks;
