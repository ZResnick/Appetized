/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getRecipes, addNewRecipe} from '../store/recipes'
import {Card, Image} from 'semantic-ui-react'

class AllRecipes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getRecipes()
  }

  handleChange() {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit() {
    event.preventDefault()
    let temp = this.state.url
    this.setState({
      url: ''
    })
    this.props.addNewRecipe(temp)
  }

  render() {
    const {recipes} = this.props
    recipes.length && console.log(recipes)

    return (
      <div>
        <form className="forms" onSubmit={this.handleSubmit}>
          <label htmlFor="url">URL: </label>
          <input
            placeholder="Recipe URL"
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
          />
          <button type="submit" disabled={!this.state.url}>
            Submit
          </button>
        </form>
        {!recipes.length ? (
          <h1>It doesn't look like you have any recipes.</h1>
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
  },
  addNewRecipe: url => {
    dispatch(addNewRecipe(url))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes)

//<Link to={`/singleRecipe/${recipe.id}`}>
