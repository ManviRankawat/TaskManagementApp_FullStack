import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import Tasks from '../Components/Assets/Tasks.png';
import Important from '../Components/Assets/Important.png';
import Completed from '../Components/Assets/Complete.png';
import Incomplete from '../Components/Assets/In-progress.png';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import axios from 'axios';

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

const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = [
        {
            title: "All Tasks",
            icon: <img src={Tasks} width={24} height={24} />,
            link: "/allTasks",
        },
        {
            title: "Important tasks",
            icon: <img src={Important} width={24} height={24} />,
            link: "/importantTasks",
        },
        {
            title: "Completed tasks",
            icon: <img src={Completed} width={24} height={24} />,
            link: "/completedTasks",
        },
        {
            title: "Incomplete tasks",
            icon: <img src={Incomplete} width={24} height={24} />,
            link: "/incompleteTasks",
        }
    ];

    const logout = () => {
        dispatch(authActions.logout());
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const storedId = localStorage.getItem("id");
        const storedToken = localStorage.getItem("token");

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
        <div className="flex flex-col h-full p-4 bg-gray-800 text-white rounded-xl">
            {/* User Info */}
            {userData && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">{userData.username}</h2>
                    <h4 className="text-gray-300">{userData.email}</h4>
                    <hr className="mt-2 border-gray-500" />
                </div>
            )}
            {/* Navigation Links */}
            <nav className="flex flex-col gap-3">
                {data.map((items, i) => (
                    <Link
                        to={items.link}
                        className='flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition-all duration-300'
                        key={i}
                    >
                        {items.icon} <span>{items.title}</span>
                    </Link>
                ))}
            </nav>

            {/* Logout Button (Pinned to Bottom) */}
            <div className="mt-auto">
                <button className='bg-red-600 w-full p-2 rounded text-white hover:bg-red-700 transition' onClick={logout}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default SideBar;
