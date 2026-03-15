import { Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { Header } from './components/layout/Header'
import { HomePage } from './pages/Home'
import { CardDetailsPage } from './pages/CardDetails'
import { DictionariesPage } from './pages/Dictionaries'

export const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dictionaries" element={<DictionariesPage/>} />
        <Route path="/card-details/:id" element={<CardDetailsPage/>} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App