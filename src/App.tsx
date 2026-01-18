import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ROUTES } from './constants'
import { FinanceProvider } from './contexts/FinanceContext'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Cards from './pages/Cards'
import Transactions from './pages/Transactions'
import Profile from './pages/Profile'

function App() {
  return (
    <FinanceProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.CARDS} element={<Cards />} />
            <Route path={ROUTES.TRANSACTIONS} element={<Transactions />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </FinanceProvider>
  )
}

export default App
