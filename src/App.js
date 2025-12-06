import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Registration";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import MFA from "./components/MFA";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<PublicRoute><Login /> </PublicRoute>}/>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/home" element={ <ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path="/mfa" element={<MFA/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;