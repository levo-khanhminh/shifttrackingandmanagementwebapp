import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
function App() {
  //use States :
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
  const [currentUserInfor, setCurrentUserInfor] = useState(
    localStorage.getItem("userInfor")
  );
  // handlers
  function handleSignOut() {
    setCurrentUser(null);
    localStorage.clear();
  }
  return (
    <div className={`App ${currentUser ? "dashboard" : ""}`}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          ></Route>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                user={currentUser}
                handleSignOut={handleSignOut}
                userInfor={currentUserInfor}
                setCurrentUser={setCurrentUser}
                setCurrentUserInfor={setCurrentUserInfor}
              >
                <NavBar className={"nav-bar"} />
              </Dashboard>
            }
          ></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
