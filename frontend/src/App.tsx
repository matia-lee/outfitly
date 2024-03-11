import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './components/AuthContext'; 
import WelcomePage from "./components/WelcomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Upload from "./components/Upload";
import Create from "./components/Create";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
