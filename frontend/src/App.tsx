import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import Profile from './pages/ProfilePage'
import RawMaterialSection from './pages/StageDataEdit/RawMaterial/RawMaterialSection'
import ManufacturingSection from './pages/StageDataEdit/Manufacturing/Manufacturing'
import DistributionSection from './pages/StageDataEdit/Distribution'
import ProductInfoSection from './pages/ProductInfo/ProductInfoSection'

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/stage-data-edit/raw-material" element={<RawMaterialSection />} />
      <Route path="/stage-data-edit/manufacturing" element={<ManufacturingSection />} />
      <Route path="/stage-data-edit/distribution" element={<DistributionSection/>} />
      <Route path="/productInfo" element={<ProductInfoSection/>} />
    </Routes>
  </Router>
)

export default App
