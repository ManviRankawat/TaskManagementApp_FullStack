import React, { useState } from 'react';
import emptyHeart from './Assets/heart.png';
import whiteHeart from './Assets/whiteHeart.png';
import dustbin from './Assets/delete.png';
import edit from './Assets/edit-white-icon.png';
import addTask from './Assets/add.png';
import axios from 'axios';

interface CardsProps {
    home: string;
    setVisibility: React.Dispatch<React.SetStateAction<"hidden" | "fixed">>;
    data: { _id: string; title: string; desc: string; complete: boolean; important: boolean }[];
}

const Cards: React.FC<CardsProps> = ({ home, setVisibility, data, setUpdatedData }) => {
    const [tasks, setTasks] = useState(data);
   
    const storedId = localStorage.getItem("id") || "";
    const storedToken = localStorage.getItem("token") || "";

    const headers = {
        id: storedId,
        Authorization: `Bearer ${storedToken}`,
    };

    const handleCompleteTask = async (id: string) => {
        try {
            await axios.put(
                `http://localhost:1000/api/v2/update-complete-task/${id}`,
                {},
                { headers }
            );

            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task._id === id ? { ...task, complete: !task.complete } : task
                )
            );
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleImportant = async (id: string) => {
        try {
            await axios.put(
                `http://localhost:1000/api/v2/update-important-task/${id}`,
                {},
                { headers }
            );

            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task._id === id ? { ...task, important: !task.important } : task
                )
            );
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleUpdate = async (id: string, title: string, desc: string) => {
        setVisibility("fixed");
        setUpdatedData({ id: id, title: title, desc: desc });
    }
    
    const deleteTask = async (id: string) => {
        try {
            await axios.delete(
                `http://localhost:1000/api/v2/delete-task/${id}`,
                { headers }
            );
            
            setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
            console.log("Task deleted successfully");
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            {tasks.map((item) => (
                <div key={item._id} className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-3">
                    <h3 className="text-white text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-300 my-2">{item.desc}</p>
                    <div className="mt-4 w-full flex items-center">
                        <button
                            className={`${item.complete ? "bg-green-700" : "bg-red-400"} p-2 rounded w-3/6`}
                            onClick={() => handleCompleteTask(item._id)}
                        >
                            {item.complete ? "Completed" : "Incomplete"}
                        </button>
                        <div className="textwhite-800 p-2 w-3/6 text-2xl font-semibold flex justify-around">
                            <button onClick={() => handleImportant(item._id)}>
                                {item.important ? 
                                    (<img src={whiteHeart} alt="Important" width={25} height={25} />) : 
                                    (<img src={emptyHeart} alt="Heart Icon" width={25} height={25} />)
                                }
                            </button>

                            <button onClick={()=>handleUpdate(item._id, item.title, item.desc)}>
                                <img src={edit} alt="Edit Icon" width={25} height={25} />
                            </button>

                            <button onClick={() => deleteTask(item._id)}>
                                <img src={dustbin} alt="Delete Icon" width={25} height={25} />
                            </button>
                        </div> 
                    </div>
                </div>
            ))}
            {home === "true" && (
                <button
                    className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-3 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
                    onClick={() => setVisibility("fixed")}
                >
                    <img src={addTask} alt="Add tasks" width={24} height={24} />
                    <h2 className="text-2xl mt-4">Add Task</h2>
                </button>
            )}
        </div>
    );
};

export default Cards;
