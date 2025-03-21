import React, { useEffect, useState } from 'react';
import Cards from '../Cards';
import axios from 'axios';
import addTask from '../Assets/add.png';
import InputData from '../inputData';

interface CardItem {
  _id: string;
  title: string;
  desc: string;
  status: "Incomplete" | "Complete";
}
interface UserData {
  username: string;
  email: string;
  tasks: CardItem[];
}

const AllTasks: React.FC = () => {
  const [visibility, setVisibility] = useState<"hidden" | "fixed">("hidden");
  const [UpdatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    description: "",
})
  // Toggle modal visibility
  const toggleModal = () => {
    setVisibility(visibility === "hidden" ? "fixed" : "hidden");
  };
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
      const storedId = localStorage.getItem("id");
      const storedToken = localStorage.getItem("token");

      console.log("Stored ID in Sidebar:", storedId);
      console.log("Stored Token in Sidebar:", storedToken);

      if (!storedId || !storedToken) {
          console.error("Missing ID or Token in Local Storage");
          return;
      }

      const headers = {
          id: storedId,
          Authorization: `Bearer ${storedToken}`, // ✅ Fixed template literal
      };

      const fetchUserData = async () => {
          try {
              const response = await axios.get(
                  "http://localhost:1000/api/v2/get-all-tasks",
                  { headers: headers }
              );

              if (response.status === 200) {
                  setUserData(response.data.data);
                  console.log("Fetched Data:", response.data);
              } else {
                  console.error("Failed to fetch tasks, Status:", response.status);
              }
          } catch (error) {
              console.error("Error fetching tasks:", error);
          }
      };

      fetchUserData();
  }, []);

  return (
    <>
      <div>
        {/* Add Task Button */}
        <div className="w-full flex justify-end p-4">
          <button onClick={toggleModal}>
            <img src={addTask} alt="Add tasks" width={20} height={20} />
          </button>
        </div>

        {/* Display Cards */}
        {userData && <Cards home="true" setVisibility={setVisibility} data={userData.tasks} setUpdatedData={setUpdatedData} />}
      </div>

      {/* InputData Modal */}
      <InputData 
      visibility={visibility} 
      setVisibility={setVisibility}
      UpdatedData={UpdatedData}
       />
    </>
  );
};

export default AllTasks;
