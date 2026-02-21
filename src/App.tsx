import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/HomePage';
import { CardDetails } from './pages/CardDetailsPage';
import { Dictionaries } from './pages/DictionariesPage';
import './App.css'

function App() {
  return (
    <div>
      <Navbar/>
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card-details/:id" element={<CardDetails/>} />
          <Route path="/dictionaries" element={<Dictionaries />} />
        </Routes>
      </div>
    </div>
    
  );
}

export default App
