import React from 'react'
import {Button, Modal, Icon, Form} from 'semantic-ui-react'
import {addNewRecipe} from '../store/recipes'
import {connect} from 'react-redux'

class AddRecipeModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      open: false,
      submitted: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit() {
    event.preventDefault()
    let temp = this.state.url
    this.setState({
      submitted: true
    })
    this.props.addNewRecipe(temp)
  }

  render() {
    const {open} = this.state

    return (
      <Modal
        open={open}
        size="small"
        closeIcon
        onClose={() => {
          this.setState({open: false})
        }}
        trigger={
          <button
            type="button"
            className="add-recipe-modal-button"
            onClick={() => {
              this.setState({open: true})
            }}
          >
            <Icon name="plus" />
            Add a New Recipe
          </button>
        }
      >
        <Modal.Header>
          <h5 className="grocery-modal-header">Add a new recipe</h5>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field width={10}>
                  <label htmlFor="url"></label>
                  <input
                    placeholder="Add a recipe from one of our supported sites here!"
                    type="text"
                    name="url"
                    value={this.state.url}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form>
            </div>
            <br></br>
            <div>
              <p className="modal-caption">
                Alternatively, add the{' '}
                <a
                  href="https://chrome.google.com/webstore/detail/appetized-recipe-manager/fonefhjcpmipemnobojdmphjljlcgeia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bold"
                >
                  Appetized Chrome Extension{' '}
                </a>
                to your browser to quickly add recipes without having to copy
                and paste the link!
              </p>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {this.state.url ? (
            !this.state.submitted ? (
              <Button onClick={this.handleSubmit} color="teal">
                <Icon name="checkmark" /> Submit
              </Button>
            ) : (
              <Button loading color="teal">
                Adding
              </Button>
            )
          ) : (
            <Button disabled color="teal">
              <Icon name="checkmark" /> Submit
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addNewRecipe: url => {
      dispatch(addNewRecipe(url))
    }
  }
}

export default connect(null, mapDispatch)(AddRecipeModal)
