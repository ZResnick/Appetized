import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Page} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  AllRecipes,
  SingleRecipe,
  Hero,
  RecipeBox,
  SiteList,
  SearchResults,
  Error404Page
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/siteList" component={SiteList} />
        <Route exact path="/" component={isLoggedIn ? AllRecipes : Hero} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route
              path="/allRecipes/:pageNum"
              render={props => (
                <AllRecipes key={props.match.params.pageNum} {...props} />
              )}
            />
            <Route path="/allRecipes" component={AllRecipes} />
            <Route
              path="/searchResults/page/:pageNum"
              render={props => (
                <SearchResults
                  /*this key ensures that the page will update with a change in
                  either the query or the page number.  So when you click the next page,
                  the component will update, or when you search a new term, the component will
                  update*/
                  key={`query:${props.location.search}/page:${props.match.params.pageNum}`}
                  {...props}
                />
              )}
            />
            <Route path="/recipeBox" component={RecipeBox} />
            <Route
              path="/singleRecipe/:id"
              render={props => (
                <SingleRecipe key={props.match.params.id} {...props} />
              )}
            />
            <Route path="/" component={Error404Page} />
          </Switch>
        )}
        {/* Displays our Hero component as a fallback */}
        <Route component={isLoggedIn ? AllRecipes : Hero} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
