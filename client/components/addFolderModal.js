import React from 'react'
import {Button, Modal, Icon, Form} from 'semantic-ui-react'
import {addAFolder} from '../store/folders'
import {connect} from 'react-redux'

class AddFolderModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      open: false
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
      title: '',
      open: false
    })
    this.props.addAFolder(temp)
  }

  detectSpacePresent = e => {
    if (e.keyCode === 32) {
      let prevTitle = this.state.title
      this.setState({
        title: `${prevTitle} `
      })
    }
  }

  render() {
    const {open} = this.state

    return (
      <Modal
        open={open}
        size="small"
        closeIcon
        onClose={() => {
          this.setState({title: '', open: false})
        }}
        trigger={
          <button
            type="button"
            className="add-new-folder-modal-button"
            onClick={() => {
              this.setState({open: true})
            }}
          >
            <Icon name="plus" />
            Create New Folder
          </button>
        }
      >
        <Modal.Header>
          <h5 className="grocery-modal-header">Add a folder</h5>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field width={10}>
                  <label htmlFor="title"></label>
                  <input
                    placeholder="Write the name of your folder here"
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                    onKeyDown={this.detectSpacePresent}
                  />
                </Form.Field>
              </Form>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {this.state.title ? (
            <Button onClick={this.handleSubmit} color="teal">
              <Icon name="checkmark" /> Done
            </Button>
          ) : (
            <Button disabled onClick={this.handleSubmit} color="teal">
              <Icon name="checkmark" /> Done
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addAFolder: title => {
      dispatch(addAFolder(title))
    }
  }
}

export default connect(null, mapDispatch)(AddFolderModal)
