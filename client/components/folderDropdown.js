import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  addsRecipeToFolder,
  getAllFolders,
  deletesRecipeFromFolder
} from '../store/folders'
import {Dropdown, Button} from 'semantic-ui-react'
import {AddFolderModal} from '.'

export class FolderDropdown extends Component {
  constructor(props) {
    super(props)

    this.addToFolder = this.addToFolder.bind(this)
    this.removeFromFolder = this.removeFromFolder.bind(this)
  }

  componentDidMount() {
    this.props.getAllFolders()
  }

  addToFolder(folderId, recipeId) {
    this.props.addsRecipeToFolder(folderId, recipeId)
  }

  removeFromFolder(folderId, recipeId) {
    this.props.deletesRecipeFromFolder(folderId, recipeId)
  }

  render() {
    const {recipe} = this.props
    console.log('HELLO')
    return (
      <Dropdown
        className="button icon"
        floating
        icon="justify align"
        trigger={<React.Fragment />}
      >
        <Dropdown.Menu>
          <Dropdown.Header icon="folder" content="Add to a folder" />
          <Dropdown.Divider />
          {this.props.folders && this.props.folders.length
            ? this.props.folders.map(folder => {
                let exists = folder.recipes.filter(el => el.id === recipe.id)
                if (exists.length) {
                  return (
                    <Dropdown.Item
                      key={folder.title}
                      text={folder.title}
                      icon="check"
                      onClick={() =>
                        this.removeFromFolder(folder.id, recipe.id)
                      }
                    />
                  )
                } else {
                  return (
                    <Dropdown.Item
                      key={folder.title}
                      text={folder.title}
                      onClick={() => this.addToFolder(folder.id, recipe.id)}
                    />
                  )
                }
              })
            : null}

          <Dropdown.Divider />
          <Dropdown.Item icon="edit" text="New Folder">
            <AddFolderModal></AddFolderModal>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

const mapStateToProps = state => ({
  folders: state.folders.folders
})

const mapDispatchToProps = dispatch => ({
  getAllFolders: () => {
    dispatch(getAllFolders())
  },
  addsRecipeToFolder: (folderId, recipeId) => {
    dispatch(addsRecipeToFolder(folderId, recipeId))
  },
  deletesRecipeFromFolder: (folderId, recipeId) => {
    dispatch(deletesRecipeFromFolder(folderId, recipeId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FolderDropdown)
