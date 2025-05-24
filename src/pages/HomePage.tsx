import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => (
  <div>
    <h2>Home Page</h2>
    <Link to="/about">Go to About</Link>
  </div>
)

export default Home
