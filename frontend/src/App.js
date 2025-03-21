import { Routes, Route, useNavigate } from "react-router-dom";
import LoginSignup from "./Components/LoginSignupPage/LoginSignup";
import HomePage from "./Components/Pages/HomePage";
import AllTasks from "./Components/Pages/AllTasks";
import ImportantTasks from "./Components/Pages/ImportantTasks";
import CompletedTasks from "./Components/Pages/CompletedTasks";
import IncompleteTasks from "./Components/Pages/IncompleteTasks";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { authActions } from "./store/auth";

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (isLoggedIn === false) {
      navigate("/login");
    }
  }, []);

  return (
    
      <Routes>
        <Route path="/login" element={<LoginSignup />} />

        {/* HomePage with Nested Routes */}
        <Route path="/" element={<HomePage />}>
          <Route path="allTasks" element={<AllTasks />} />
          <Route path="importantTasks" element={<ImportantTasks />} />
          <Route path="completedTasks" element={<CompletedTasks />} />
          <Route path="incompleteTasks" element={<IncompleteTasks />} />
        </Route>
      </Routes>
    
  );
}

export default App;
