import React from 'react'
import {Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <div id="main-footer">
      <div className="footer-lists">
        <div className="footer-list">
          <h3>Our Supported Websites:</h3>
          <a
            href="https://www.epicurious.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Epicurious
          </a>
          <br></br>
          <a
            href="https://www.foodnetwork.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Food Network
          </a>
          <br></br>
        </div>
        <div className="footer-list">
          <h3>Appetized Chrome Extension:</h3>
          <a
            href="https://chrome.google.com/webstore/category/extensions"
            target="_blank"
            rel="noopener noreferrer"
          >
            At the Chrome Store Here
          </a>
          <br></br>
          <a
            href="https://chrome.google.com/webstore/category/extensions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Information
          </a>
          <br></br>
        </div>
        <div className="footer-list">
          <h3>Useful Links:</h3>
          <Link to="/">
            <span>FAQ</span>
          </Link>
          <br></br>
          <Link to="/">
            <span>Help</span>
          </Link>
          <br></br>
          <Link to="/">
            <span>Site Map</span>
          </Link>
        </div>
      </div>
      <div className="stay-connected">
        <h3>Stay connected</h3>
        <div className="social-links">
          <a>
            <Icon size="big" name="twitter"></Icon>
          </a>
          <a>
            <Icon size="big" name="facebook"></Icon>
          </a>
          <a>
            <Icon size="big" name="google"></Icon>
          </a>
          <a>
            <Icon size="big" name="instagram"></Icon>
          </a>
        </div>
      </div>
      <div className="copyrights">
        <span>©2019 Appetized All rights reserved.</span>
        <br></br>
        <span>©2019 Zachary Resnick</span>
      </div>
    </div>
  )
}
