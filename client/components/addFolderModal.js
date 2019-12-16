import React from 'react'
import {Button, Modal, Icon, Form} from 'semantic-ui-react'
import {addAFolder} from '../store/folders'
import {connect} from 'react-redux'

class AddFolderModal extends React.Component {
  constructor() {
    super()
    this.state = {
      title: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit() {
    event.preventDefault()
    let temp = this.state.title
    this.setState({
      title: ''
    })
    this.props.addAFolder(temp)
  }

  render() {
    return (
      <Modal size="small" trigger={<Button>Create new folder</Button>}>
        <Modal.Header>
          <h5 className="grocery-modal-header">Add a folder</h5>
        </Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <div className="add-recipe-nav-form">
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label htmlFor="title"></label>
                  <input
                    placeholder="Write the name of your folder here"
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleSubmit} color="teal">
            <Icon name="checkmark" /> Done
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

/**
 * CONTAINER
 */

const mapDispatch = dispatch => {
  return {
    addAFolder: title => {
      dispatch(addAFolder(title))
    }
  }
}

export default connect(null, mapDispatch)(AddFolderModal)
