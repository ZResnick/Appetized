/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {getSingleFolder} from '../store/folders'
import {Card} from 'semantic-ui-react'
import {RecipeCard} from './index'

class FolderRecipes extends React.Component {
  componentDidMount() {
    let pathnameArr = this.props.location.pathname.split('/')
    let id = pathnameArr[pathnameArr.length - 1]
    this.props.getSingleFolder(id)
  }

  render() {
    let recipes, folder
    if (this.props.folder) {
      if (this.props.folder.length) {
        folder = this.props.folder[0]
        recipes = this.props.folder[0].recipes
      }
    }

    return (
      <div className="saved-recipes">
        {!recipes ? (
          <h1>It doesn't look like you have any recipes.</h1>
        ) : (
          <div>
            <div className="recipe-box-category-section">
              <h2 className="recipe-box-category">{folder.title}</h2>
              {recipes.length === 1 ? (
                <h4 className="recipe-box-category-count">
                  {recipes.length} recipe
                </h4>
              ) : (
                <h4 className="recipe-box-category-count">
                  {recipes.length} recipes
                </h4>
              )}
            </div>
            <div className="category-cards">
              <Card.Group>
                {recipes.map(recipe => (
                  <RecipeCard key={recipe.id} {...recipe} />
                ))}
              </Card.Group>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  folder: state.folders.singleFolder
})

const mapDispatchToProps = dispatch => ({
  getSingleFolder: id => {
    dispatch(getSingleFolder(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FolderRecipes)
