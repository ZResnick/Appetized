import React from 'react'
import {Link} from 'react-router-dom'
import {Form, Icon} from 'semantic-ui-react'

export default function SiteList() {
  return (
    <div id="auth-form-body">
      <Link to="/home">
        <h1 className="auth-major-title">Appetized</h1>
        <text className="auth-minor-title">Get recipes, get cookin'</text>
      </Link>
      <div id="information-page">
        <div>
          <h1>Hello</h1>
        </div>
      </div>
    </div>
  )
}
