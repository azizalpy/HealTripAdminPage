import './App.css';
import LoginPage from './login/LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Home'; 

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
