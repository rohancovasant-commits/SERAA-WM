import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { navItems } from './data/navigation'
import { OpportunityPage } from './pages/OpportunityPage'
import { PositionPage } from './pages/PositionPage'
import { OfferingsPage } from './pages/OfferingsPage'
import { ReadinessPage } from './pages/ReadinessPage'
import { GrowthPage } from './pages/GrowthPage'
import { DecisionsPage } from './pages/DecisionsPage'
import { IntroPage } from './pages/IntroPage'
import { PlaceholderPage } from './pages/PlaceholderPage'

export default function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/intro" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/opportunity" element={<OpportunityPage />} />
        <Route path="/position" element={<PositionPage />} />
        <Route path="/offerings" element={<OfferingsPage />} />
        <Route path="/readiness" element={<ReadinessPage />} />
        <Route path="/growth" element={<GrowthPage />} />
        <Route path="/decisions" element={<DecisionsPage />} />
        {navItems
          .filter((item) => item.status === 'placeholder')
          .map((item) => (
            <Route key={item.path} path={item.path} element={<PlaceholderPage item={item} />} />
          ))}
        <Route path="*" element={<Navigate to="/opportunity" replace />} />
      </Route>
    </Routes>
  )
}
