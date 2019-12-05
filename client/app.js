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
import {Navbar} from './components'
import Routes from './routes'

export class App extends Component {
  render() {
    return !this.props.isLoggedIn ? (
      <div>
        <Routes />
      </div>
    ) : (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id
})

export default connect(mapStateToProps)(App)
