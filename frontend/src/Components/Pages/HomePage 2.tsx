import React from "react";
import SideBar from "./Sidebar";

const HomePage = () => {
    return (
        <div className="flex h-screen gap-3">
            <div className="w-1/6 border rounded-x1 p-3 flex flex-col justify-between">
                <SideBar />
            </div>
            <div className="w-5/6 border rounded-x1 p-3">
                hello2
            </div>
        </div>
    );
};

export default HomePage;