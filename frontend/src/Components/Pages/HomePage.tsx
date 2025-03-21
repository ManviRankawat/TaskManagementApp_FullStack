import React from "react";
import SideBar from "../Sidebar";
import { Outlet } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="flex h-screen gap-3">
            <div className="w-6/6 border rounded-xl p-3 flex flex-col center">
                <SideBar />
            </div>
            <div className="w-5/6 border rounded-xl p-3">
                <Outlet />
            </div>
        </div>
    );
};

export default HomePage;