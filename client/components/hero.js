import React from 'react'
import {Link} from 'react-router-dom'

export default function Hero() {
  return (
    <div>
      <div className="hero-head">
        <h1>Appetized</h1>
        <Link to="/login">
          <h3>Login Here</h3>
        </Link>
      </div>
      <div className="hero-content">
        <h1> Easy to use</h1>
        <h1> Easy to personlize</h1>
        <h1> Get recipes, get cookin'</h1>
        <p>Appetized, recipes without the nonsense</p>
      </div>
      <div>
        <Link to="/login">
          <h3>START COOKING NOW</h3>
        </Link>
      </div>
    </div>
  )
}
