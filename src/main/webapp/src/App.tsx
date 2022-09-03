import React from 'react';
import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import DashboardPage from "./pages/DashboardPage";
function App() {

    const navigate = useNavigate();

    return (
        <div className={"tw-flex tw-h-screen"}>
            <nav className={"tw-basis-1/12 tw-bg-slate-700 tw-text-white tw-border-r-2"}>
                <div
                    className={"tw-cursor-pointer tw-border-b-2 tw-border-white tw-p-2"}
                    onClick={() => navigate("/")}
                >
                    Dashboard
                </div>
                <div
                    className={"tw-border-b-2 tw-border-white tw-cursor-pointer tw-p-2"}
                    onClick={() => navigate("tasks")}
                >
                    Tasks
                </div>
            </nav>
            <div className={"tw-basis-11/12"}>
                <Routes>
                    <Route path="/" element={
                        <DashboardPage/>
                    }/>
                    <Route path="/tasks/" element={
                        <TasksPage/>
                    }/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
