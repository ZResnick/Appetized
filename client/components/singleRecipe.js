import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleRecipe} from '../store/recipes'

export class SingleRecipe extends Component {
  componentDidMount() {
    this.props.getSingleRecipe(this.props.match.params.id)
  }

  render() {
    let recipe = undefined
    if (this.props.recipe) {
      if (this.props.recipe.length) recipe = this.props.recipe[0]
    }

    return (
      <div>
        {!recipe ? (
          <div>
            <h1>Sorry, there doesnt seem to be anything here yet...</h1>
          </div>
        ) : (
          <div>
            <div className="recipe-header-section">
              <div>
                <h1 className="recipe-title">{recipe.title}</h1>
                {recipe.author ? (
                  <span className="recipe-caption">
                    By {recipe.author}, {recipe.site}
                  </span>
                ) : (
                  <span className="recipe-caption">By {recipe.site}</span>
                )}
              </div>
              <img src={recipe.imageUrl}></img>
            </div>
            <div className="ingredients-and-instructions">
              <div className="recipe-ingredients">
                <h4>Ingredients</h4>
                {recipe.ingredients.map(ing => {
                  return <p key={`ingredient${ing.id}`}>{ing.title}</p>
                })}
              </div>
              <div className="recipe-instructions">
                <h4>Instructions</h4>
                {recipe.instructions.map(ins => {
                  return (
                    <p key={ins.slice(0, 5)} className="instructions">
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
  recipe: state.recipes.single
})

const mapDispatchToProps = dispatch => ({
  getSingleRecipe: id => {
    dispatch(getSingleRecipe(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe)
