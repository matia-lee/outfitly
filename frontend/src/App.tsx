import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './components/AuthContext'; 
import WelcomePage from "./components/WelcomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Upload from "./components/Upload";
import Create from "./components/Create";
import Closet from "./components/Closet";
import ClosetClothes from "./components/ClosetClothes";
import ClosetFits from "./components/ClosetFits";

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
            <Route path="/closet" element={<Closet />} />
            <Route path="/closet/clothes" element={<ClosetClothes />} />
            <Route path="/closet/fits" element={<ClosetFits />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
