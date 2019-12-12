import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {UserRecipes} from '../components'
import {Icon} from 'semantic-ui-react'

export class RecipeBox extends Component {
  render() {
    return (
      <div className="recipe-box">
        <div className="sideBar">
          <Link to="/recipeBox">
            <div className="sidebar-section">
              <h1 className="sidebar-header">
                <Icon name="star" /> Your Recipes
              </h1>
            </div>
          </Link>
          <div className="folder-section">
            <div>
              <h3 className="folder-header-text">YOUR FOLDERS</h3>
            </div>
          </div>
        </div>

        <Route exact path="/recipeBox" render={() => <UserRecipes />} />
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeBox)
