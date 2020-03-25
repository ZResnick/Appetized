import React from 'react'
import {Link} from 'react-router-dom'
import {Form, Icon} from 'semantic-ui-react'

export default function SiteList() {
  return (
    <div id="auth-form-body">
      <Link to="/home">
        <h1 className="auth-major-title"></h1>
        <text className="auth-minor-title"></text>
      </Link>
      <div id="information-page">
        <div className="content-section">
          <h1 className="content-header">Our Supported Sites:</h1>
          <ul>
            <li>
              <a
                href="https://www.epicurious.com"
                target="_blank"
                rel="noopener noreferrer"
                className="site-link"
              >
                Epicurious
              </a>
            </li>
            <li>
              <a
                href="https://www.foodnetwork.com"
                target="_blank"
                rel="noopener noreferrer"
                className="site-link"
              >
                Food Network
              </a>
            </li>
            <li>
              <a
                href="https://www.bonappetit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="site-link"
              >
                Bon Appetit
              </a>
            </li>
            <li>
              <a
                href="https://cooking.nytimes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="site-link"
              >
                New York Times Cooking
              </a>
            </li>
            <li>
              <a
                href="https://sallysbakingaddiction.com"
                target="_blank"
                rel="noopener noreferrer"
                className="site-link"
              >
                Sally's Baking Addiction
              </a>
            </li>
            <li>
              <a
                href="https://www.allrecipes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="site-link"
              >
                All Recipes
              </a>
            </li>
            <li>
              <a
                href="https://www.chowhound.com"
                target="_blank"
                rel="noopener noreferrer"
                className="site-link"
              >
                Chow Hound
              </a>
            </li>
            <li>
              <a
                href="https://www.simplyrecipes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="site-link"
              >
                Simply Recipes
              </a>
            </li>
          </ul>
          <br></br>
          <span className="copy">
            Appetized is able to accept recipes submitted from any of the above
            sites. If there are any sites you'd like to see added to this list,
            feel free to send an email to our team at
            <a href="email:AppetizedRecipeManager@Gmail.com">
              {' '}
              AppetizedRecipeManager@Gmail.com
            </a>
            .
          </span>
        </div>
      </div>
    </div>
  )
}
