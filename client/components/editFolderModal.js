import React from 'react'
import {Button, Modal, Icon, Form} from 'semantic-ui-react'
import {deleteFolder, updateFolder} from '../store/folders'
import {connect} from 'react-redux'

class EditFolderModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      open: false,
      deleteMode: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    this.setState({[event.target.name]: event.target.value})
  }

  toggleDelete = () => {
    let current = this.state.deleteMode
    this.setState({
      deleteMode: !current
    })
  }

  handleSubmit() {
    event.preventDefault()
    let temp = this.state.title
    this.setState({
      title: this.props.currentTitle,
      open: false
    })
    this.props.updateFolder(this.props.currentFolderId, temp)
  }

  handleDelete = () => {
    this.props.deleteFolder(this.props.currentFolderId)
    this.setState({
      deleteMode: false,
      open: false
    })
  }

  componentDidMount() {
    this.setState({
      title: this.props.currentTitle
    })
  }

  render() {
    const {open} = this.state
    return (
      <Modal
        open={open}
        size="small"
        closeIcon
        onClose={() => {
          this.setState({title: this.props.currentTitle, open: false})
        }}
        trigger={
          <Icon
            onClick={() => {
              this.setState({open: true})
            }}
            style={{cursor: 'pointer'}}
            name="pencil alternate"
            className="edit-folder-icon"
            // color="teal"
          />
        }
      >
        <Modal.Header>
          {this.state.deleteMode ? (
            <h5 className="grocery-modal-header">
              Are you sure you want to delete the folder{' '}
              <span className="bold">{this.props.currentTitle}</span>?
            </h5>
          ) : (
            <h5 className="grocery-modal-header">Rename Your Folder</h5>
          )}
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {this.state.deleteMode ? (
              <span>
                Worried about losing these recipes? Not to worry! All the
                recipes that were in this folder will still be saved in your
                “Saved Recipes.”
              </span>
            ) : (
              <div>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field width={10}>
                    <label htmlFor="title"></label>
                    <input
                      placeholder="Write the name of your folder here"
                      type="text"
                      name="title"
                      // value={this.state.title}
                      defaultValue={this.props.currentTitle}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form>
              </div>
            )}
          </Modal.Description>
        </Modal.Content>
        {this.state.deleteMode ? (
          <Modal.Actions>
            <Button onClick={this.handleDelete} color="red">
              <Icon name="trash" /> Confirm
            </Button>
            <Button onClick={this.toggleDelete} color="red" inverted>
              <Icon flipped="horizontally" name="redo" /> Go Back
            </Button>
          </Modal.Actions>
        ) : (
          <Modal.Actions>
            <Button onClick={this.toggleDelete} color="red">
              <Icon name="trash" /> Delete
            </Button>
            {this.state.title ? (
              <Button onClick={this.handleSubmit} color="teal">
                <Icon name="checkmark" /> Update Title
              </Button>
            ) : (
              <Button disabled onClick={this.handleSubmit} color="teal">
                <Icon name="checkmark" /> Update Title
              </Button>
            )}
          </Modal.Actions>
        )}
      </Modal>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    deleteFolder: id => {
      dispatch(deleteFolder(id))
    },
    updateFolder: (id, title) => {
      dispatch(updateFolder(id, title))
    }
  }
}

export default connect(null, mapDispatch)(EditFolderModal)
