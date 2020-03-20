import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSearchedByTitle} from '../store/recipes'
import {Form, Dropdown, Image, Icon} from 'semantic-ui-react'

export class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this)
  }

  handleChange() {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmitSearch() {
    event.preventDefault()
    let temp = this.state.searchQuery
    this.setState({
      searchQuery: ''
    })
    this.props.getSearchedByTitle(temp)
  }

  render() {
    const {searchedByTitle} = this.props
    return (
      <div>
        <h1>Hello {searchedByTitle}</h1>
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
