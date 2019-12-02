import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getRecipes} from '../store/recipes'
import {Card, Image} from 'semantic-ui-react'

class AllRecipes extends React.Component {
  componentDidMount() {
    this.props.getRecipes()
  }

  render() {
    const {recipes} = this.props
    recipes.length && console.log(recipes)

    return (
      <div>
        {!recipes.length ? (
          <h1>Loading</h1>
        ) : (
          <div>
            <Card.Group>
              {recipes.map(recipe => (
                <Card key={recipe.id}>
                  <Card.Content>
                    <Image floated="right" size="mini" src={recipe.imageUrl} />
                    <Card.Header>
                      <Link to={`/singleRecipe/${recipe.id}`}>
                        {recipe.title}
                      </Link>
                    </Card.Header>

                    <Card.Meta>
                      {recipe.author} from {recipe.site}
                    </Card.Meta>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.all
})

const mapDispatchToProps = dispatch => ({
  getRecipes: () => {
    dispatch(getRecipes())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes)

//<Link to={`/singleRecipe/${recipe.id}`}>
