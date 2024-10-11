import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Saved from "./components/Saved";
import History from "./components/History";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/history" element={<History />} />
      </Routes> 
    </Router>
  );
}

export default App;
