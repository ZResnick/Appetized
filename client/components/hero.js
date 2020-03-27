import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'
import history from '../history'

export default function Hero(props) {
  return (
    <div id="hero">
      <div className="hero-head">
        <div>
          <h1 className="hero-title">Appetized</h1>
        </div>
        <div>
          <Link to="/login">
            <div className="hero-login-button">
              <h3 className="hero-login-text">LOGIN HERE</h3>
            </div>
          </Link>
        </div>
      </div>
      <div className="hero-content">
        <p className="hero-content-text">
          {' '}
          Easy to use <br></br> Fast to organize <br></br> Get recipes, get
          cookin' <br></br>{' '}
          <span className="hero-caption">
            <span style={{fontWeight: 'bold'}}>Appetized...</span> recipes
            without the nonsense
          </span>
        </p>
        <Button color="teal">
          <Link to="/login">
            <h3 className="start-cooking-button">START COOKING NOW</h3>
          </Link>
        </Button>
      </div>
      <div></div>
    </div>
  )
}
