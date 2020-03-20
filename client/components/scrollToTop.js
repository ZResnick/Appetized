/*
This file scrolls all pages to the top so that if you click any link
that is down a ways, it will automatically bring you to the top of the
page you click on.

Note that this component is imported directly into client/app.js
*/
import React from 'react'
import {withRouter} from 'react-router-dom'

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return null
  }
}

export default withRouter(ScrollToTop)
