import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import SignInPage from "./User/SignInPage";
import SignUpPage from "./User/SignUpPage";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<SignInPage />}></Route>
        <Route path="/signuppage" element={<SignUpPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
