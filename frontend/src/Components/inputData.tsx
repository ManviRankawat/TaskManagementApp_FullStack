import React, { useEffect, useState } from "react";
import axios from "axios";

interface UpdatedDataProps {
  title: string;
  desc: string;
}

interface InputDataProps {
  visibility: "hidden" | "fixed";
  setVisibility: React.Dispatch<React.SetStateAction<"hidden" | "fixed">>;
  UpdatedData: UpdatedDataProps;
}

const InputData: React.FC<InputDataProps> = ({ visibility, setVisibility, UpdatedData }) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  useEffect(() => {
    // Pre-fill fields when UpdatedData is provided
    if (UpdatedData) {
      setData({ title: UpdatedData.title, desc: UpdatedData.desc });
    }
  }, [UpdatedData]);

  const storedId = localStorage.getItem("id") || "";
  const storedToken = localStorage.getItem("token") || "";

  const headers = {
    id: storedId,
    Authorization: `Bearer ${storedToken}`,
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitData = async () => {
    if (Data.title.trim() === "" || Data.desc.trim() === "") {
      alert("All fields are required");
      return;
    }

    try {
      console.log("Submitting:", Data);
      console.log("Headers:", headers);
  
      const res = await axios.post("http://localhost:1000/api/v2/create-task", Data, { headers });
      
      console.log("Response:", res.data);
  
      setData({ title: "", desc: "" });
      setVisibility("hidden");
    } catch (error: any) {
      console.error("Error creating task:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Task creation failed.");
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div className={`${visibility === "fixed" ? "fixed" : "hidden"} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>

      {/* Centered Modal */}
      <div className={`${visibility === "fixed" ? "fixed" : "hidden"} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className="w-3/6 bg-gray-900 p-6 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={Data.title}
            onChange={onChange}
            className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500 mb-3"
          />

          <textarea
            name="desc"
            placeholder="Description"
            value={Data.desc}
            onChange={onChange}
            className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
            rows={5}
          ></textarea>

          <div className="flex justify-end mt-4">
            <button className="px-4 py-2 bg-red-500 text-white rounded mr-2" onClick={() => setVisibility("hidden")}>
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={submitData}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputData;
