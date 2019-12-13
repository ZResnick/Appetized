/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {getRecipes} from '../store/recipes'
import {getSingleFolder} from '../store/folders'
import {Card} from 'semantic-ui-react'
import {RecipeCard} from './index'

class FolderRecipes extends React.Component {
  componentDidMount() {
    let pathnameArr = this.props.location.pathname.split('/')
    let id = pathnameArr[pathnameArr.length - 1]
    this.props.getSingleFolder(id)
  }

  // componentDidUpdate() {
  //   let pathnameArr = this.props.location.pathname.split('/')
  //   let id = pathnameArr[pathnameArr.length - 1]
  //   this.props.getSingleFolder(id)
  // }

  render() {
    // console.log(this.props)
    let recipes, folder
    if (this.props.folder) {
      if (this.props.folder.length) {
        folder = this.props.folder[0]
        recipes = this.props.folder[0].recipes
      }
    }

    // recipes && console.log('recipes', recipes)

    return (
      <div className="all-recipes">
        {!recipes ? (
          <h1>It doesn't look like you have any recipes.</h1>
        ) : (
          <div>
            <div>
              <h3>{folder.title}</h3>
            </div>
            <Card.Group centered>
              {recipes.map(recipe => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </Card.Group>
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
