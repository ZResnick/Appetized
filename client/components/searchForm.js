import _ from 'lodash'
import React, {Component} from 'react'
import {Search, Grid, Header, Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getSearchedByTitle} from '../store/recipes'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    }
    this.resetComponent = this.resetComponent.bind(this)
    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => {
    this.setState({isLoading: false, results: [], value: ''})
  }

  handleResultSelect = (e, {result}) => {
    this.setState({value: result.title})
    this.resetComponent()
  }

  handleSearchChange = (e, {value}) => {
    this.setState({isLoading: true, value})

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.props.getSearchedByTitle(this.state.value)
      let recipes = this.props.searchedByTitle.slice(0, 5)

      //apparently the search function overrides the id with 0,1,2,3 so the below adds a new key:value to persist the realID
      recipes.forEach(recipe => {
        recipe.realID = recipe.id
      })

      this.setState({
        isLoading: false,
        results: _.filter(recipes, isMatch)
      })
    }, 300)
  }

  render() {
    const {isLoading, value, results} = this.state
    return (
      <div className="search-bar-in-nav">
        <Grid>
          <Grid.Column width={6}>
            <Search
              placeholder="Search recipes here"
              size="big"
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true
              })}
              results={results}
              value={value}
              {...this.props}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searchedByTitle: state.recipes.searchedByTitle
})

const mapDispatchToProps = dispatch => {
  return {
    getSearchedByTitle: searchQuery => {
      dispatch(getSearchedByTitle(searchQuery))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
