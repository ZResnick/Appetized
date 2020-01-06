/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getSingleRecipe,
  saveRecipeToBox,
  getUserRecipes,
  deleteRecipeFromBox
} from '../store/recipes'
import {addNewRecipeToGroceryList} from '../store/groceryList'
import {Button} from 'semantic-ui-react'
import {FolderDropdown} from './index'

export class SingleRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdded: false,
      isOwned: true
    }
    this.addToGroceryClick = this.addToGroceryClick.bind(this)
    this.saveRecipe = this.saveRecipe.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
  }

  componentDidMount() {
    this.props.getSingleRecipe(this.props.match.params.id)
    this.props.getUserRecipes()
  }

  addToGroceryClick() {
    this.props.addNewRecipeToGroceryList(this.props.match.params.id)
    this.setState({isAdded: true})
  }

  saveRecipe(url) {
    this.props.saveRecipeToBox(url)
    this.props.recipe.ownership = true
    this.setState({isOwned: true})
  }

  deleteRecipe(id) {
    this.props.deleteRecipeFromBox(id)
    this.props.recipe.ownership = false
    this.setState({isOwned: false})
  }

  render() {
    let recipe = undefined
    const {userRecipes} = this.props
    if (this.props.recipe.ingredients) {
      recipe = this.props.recipe
    }
    if (this.props.recipe.ingredients && userRecipes.length >= 0) {
      if (userRecipes.find(userRecipe => userRecipe.id === recipe.id)) {
        recipe.ownership = true
      }
    }

    recipe && console.log(this.props)

    return (
      <div>
        {!recipe ? (
          <div>
            <h1>Sorry, there doesn't seem to be anything here yet...</h1>
          </div>
        ) : (
          <div>
            <div className="recipe-header-section">
              <div className="title-and-site">
                <h1 className="recipe-title">{recipe.title}</h1>
                {recipe.author ? (
                  <span className="recipe-caption">
                    By {recipe.author}, {recipe.site}
                  </span>
                ) : (
                  <span className="recipe-caption">From {recipe.site}</span>
                )}
                <br></br>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                  Find the original recipe here.
                </a>
                <br></br>
                <br></br>
                {recipe.ownership && this.state.isOwned ? (
                  <div className="save-recipe-div">
                    <Button.Group fluid color="teal">
                      <Button onClick={() => this.deleteRecipe(recipe.id)}>
                        Saved!
                      </Button>
                      <FolderDropdown recipe={recipe} />
                    </Button.Group>
                  </div>
                ) : (
                  <div className="save-recipe-div">
                    <Button
                      fluid
                      color="teal"
                      onClick={() => this.saveRecipe(recipe.url)}
                    >
                      Save This Recipe
                    </Button>
                  </div>
                )}
              </div>
              <img className="recipe-img" src={recipe.imageUrl}></img>
            </div>
            <div className="ingredients-and-instructions">
              <div className="recipe-ingredients">
                <h4>Ingredients</h4>
                {recipe.ingredients.map(ing => {
                  return <p key={`ingredient${ing.id}`}>{ing.title}</p>
                })}
                {this.state.isAdded ? (
                  <div>
                    <h3 className="added-to-grocery-text">Added!</h3>
                  </div>
                ) : (
                  <div
                    className="add-to-grocery-button"
                    onClick={this.addToGroceryClick}
                  >
                    <h3 className="add-to-grocery-text">Add to Grocery List</h3>
                  </div>
                )}
              </div>
              <div className="recipe-instructions">
                <h4>Instructions</h4>
                {recipe.instructions.map(ins => {
                  return (
                    <p key={ins.slice(1)} className="instructions">
                      {ins}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  recipe: state.recipes.single,
  userRecipes: state.recipes.userRecipes,
  folders: state.folders.folders
})

const mapDispatchToProps = dispatch => ({
  getSingleRecipe: id => {
    dispatch(getSingleRecipe(id))
  },
  addNewRecipeToGroceryList: id => {
    dispatch(addNewRecipeToGroceryList(id))
  },
  saveRecipeToBox: url => {
    dispatch(saveRecipeToBox(url))
  },
  getUserRecipes: () => {
    dispatch(getUserRecipes())
  },
  deleteRecipeFromBox: id => {
    dispatch(deleteRecipeFromBox(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe)
