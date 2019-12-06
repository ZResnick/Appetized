import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function RecipeCard(props) {
  const {id, imageUrl, title, site, author, url} = props
  return (
    <Card as={Link} to={`/singleRecipe/${id}`}>
      <Image src={imageUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className="date">Original recipe by {author}</span>
        </Card.Meta>
        <Card.Description>Recipe originally found at {site}.</Card.Description>
      </Card.Content>
    </Card>
  )
}
