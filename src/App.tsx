import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import Profile from './pages/ProfilePage'
import RawMaterialSection from './pages/StageDataEdit/RawMaterial'
import ManufacturingSection from './pages/StageDataEdit/Manufacturing'
import DistributionSection from './pages/StageDataEdit/Distribution'

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/stage-data-edit/raw-material" element={<RawMaterialSection />} />
      <Route path="/stage-data-edit/manufacturing" element={<ManufacturingSection />} />
      <Route path="/stage-data-edit/distribution" element={<DistributionSection/>} />
    </Routes>
  </Router>
)

export default App
