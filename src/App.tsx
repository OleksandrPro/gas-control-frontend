import { Routes, Route } from 'react-router-dom'

import { Header } from './components/Header'
import { HomePage } from './pages/Home'
import { CardDetailsPage } from './pages/CardDetails'
import { DictionariesPage } from './pages/Dictionaries'

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dictionaries" element={<DictionariesPage/>} />
        <Route path="/card-details/:id" element={<CardDetailsPage/>} />
      </Routes>
    </div>
  )
}

export default App