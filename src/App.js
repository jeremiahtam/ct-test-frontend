import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<HomeScreen />} />
    </Routes>
  );
}

export default App;
