import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Navbar } from './components/UI/Navbar/Navbar';
import { About } from './pages/About';
import { Error } from './pages/Error';
import Posts from './pages/Posts';

import './styles/App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/error" element={<Error />} />
      </Routes>
      <Navigate to="/error" />
    </>
  );
}

export default App;
