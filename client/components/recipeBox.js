import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {
  UserRecipes,
  FolderRecipes,
  AddFolderModal,
  AddAndSearch
} from '../components'
import {Icon} from 'semantic-ui-react'
import {getAllFolders} from '../store/folders'

export class RecipeBox extends Component {
  componentDidMount() {
    this.props.getAllFolders()
  }

  render() {
    let folders
    if (this.props.folders) folders = this.props.folders

    return (
      <div className="recipe-box">
        <div className="sideBar">
          <Link to="/recipeBox">
            <div className="sidebar-section">
              <h1 className="sidebar-header">
                {/* <Icon name="star" />  */}
                All Saved Recipes
              </h1>
            </div>
          </Link>
          <div className="folder-section">
            <div>
              <h3 className="folder-header-text">YOUR FOLDERS</h3>
            </div>
            <div id="folder-titles-section">
              {!folders
                ? null
                : folders.map(folder => {
                    console.log(folder.recipes.length)
                    return (
                      <Link
                        key={folder.id}
                        to={`/recipeBox/folder/${folder.id}`}
                      >
                        <div className="folder-and-count">
                          <div>
                            <h3 className="folder-title-recipeBox-sideBar">
                              <Icon name="folder outline" />
                              {folder.title}
                            </h3>
                          </div>
                          <div>
                            <h4 className="folder-recipe-count">
                              {folder.recipes.length}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
              <br />
              <AddFolderModal />
            </div>
          </div>
        </div>
        <div className="right-side-of-recipe-box">
          <AddAndSearch />
          <Route exact path="/recipeBox" render={() => <UserRecipes />} />
          {!folders
            ? null
            : folders.map(folder => {
                return (
                  <Route
                    key={folder.id}
                    exact
                    path={`/recipeBox/folder/${folder.id}`}
                    render={props => <FolderRecipes {...props} />}
                  />
                )
              })}
        </div>
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
