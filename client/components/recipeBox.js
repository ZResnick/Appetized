import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {UserRecipes} from '../components'
import {Icon} from 'semantic-ui-react'
import {getAllFolders} from '../store/folders'

export class RecipeBox extends Component {
  componentDidMount() {
    this.props.getAllFolders()
  }

  render() {
    let folders
    if (this.props.folders) folders = this.props.folders
    folders && console.log(folders)

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

const mapStateToProps = state => ({
  folders: state.folders.folders
})

const mapDispatchToProps = dispatch => ({
  getAllFolders: () => {
    dispatch(getAllFolders())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(RecipeBox)
