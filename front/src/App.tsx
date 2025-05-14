
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Calc from './pages/calc/Calculadora';
import Navbar from './components/navbar/navbar';
import Agenda from './pages/agenda/todo.tsx'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Calculadora" element={<Calc />} />
        <Route path="/todo" element={<Agenda />} />
      </Routes>
    </Router>
  );
}

export default App;
