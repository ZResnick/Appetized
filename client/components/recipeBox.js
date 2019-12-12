import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {UserRecipes} from '../components'

export class RecipeBox extends Component {
  render() {
    return (
      <div className="recipe-box">
        <div className="sideBar">
          <div className="sidebar-section">
            <Link to=""> ALL RECIPES</Link>
          </div>
          <div className="sidebar-section">
            <Link to="/recipeBox">Your Recipes</Link>
          </div>
        </div>
        <div className="recipes-in-folder">
          <Route exact path="/recipeBox" render={() => <UserRecipes />} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeBox)
