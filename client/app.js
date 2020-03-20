// import React from 'react'

// import {Navbar} from './components'
// import Routes from './routes'

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <Routes />
//     </div>
//   )
// }

// export default App

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Navbar, Footer} from './components'
import Routes from './routes'

export class App extends Component {
  render() {
    return !this.props.isLoggedIn ? (
      <div>
        <Routes />
        <Footer />
      </div>
    ) : (
      <div>
        <Navbar />
        <div className="routes-container">
          <Routes />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
})

export default connect(mapStateToProps)(App)
