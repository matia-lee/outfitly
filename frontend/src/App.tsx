import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './components/AuthContext'; 
import WelcomePage from "./components/WelcomePage";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
