import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {UserRecipes, FolderRecipes} from '../components'
import {Icon} from 'semantic-ui-react'
import {getAllFolders} from '../store/folders'

export class RecipeBox extends Component {
  componentDidMount() {
    this.props.getAllFolders()
  }

  render() {
    console.log(this.props)
    let folders
    if (this.props.folders) folders = this.props.folders

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
            {!folders
              ? null
              : folders.map(folder => {
                  return (
                    <Link key={folder.id} to={`/recipeBox/folder/${folder.id}`}>
                      <h3>{folder.title}</h3>
                    </Link>
                  )
                })}
          </div>
        </div>
        <Route exact path="/recipeBox" render={() => <UserRecipes />} />
        <Route
          exact
          path="/recipeBox/folder/:id"
          render={props => <FolderRecipes {...props} />}
        />
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
