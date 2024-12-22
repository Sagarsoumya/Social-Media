import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import ShareButton from './ShareButton';
import MyPopup from '../util/MyPopup';

// Array of 30 verified working avatars
const avatars = [
  'https://semantic-ui.com/images/avatar2/large/kristy.png',
  'https://semantic-ui.com/images/avatar2/large/matthew.png',
  'https://semantic-ui.com/images/avatar2/large/molly.png',
  'https://semantic-ui.com/images/avatar2/large/elyse.png',
  'https://semantic-ui.com/images/avatar/large/elliot.jpg',
  'https://semantic-ui.com/images/avatar/large/jenny.jpg',
  'https://semantic-ui.com/images/avatar/large/joe.jpg',
  'https://semantic-ui.com/images/avatar/large/justen.jpg',
  'https://semantic-ui.com/images/avatar/large/laura.jpg',
  'https://semantic-ui.com/images/avatar/large/matt.jpg',
  'https://semantic-ui.com/images/avatar/large/nan.jpg',
  'https://semantic-ui.com/images/avatar/large/steve.jpg',
  'https://semantic-ui.com/images/avatar/large/stevie.jpg',
  'https://semantic-ui.com/images/avatar/large/veronika.jpg',
  'https://semantic-ui.com/images/avatar/large/daniel.jpg',
  'https://semantic-ui.com/images/avatar2/large/mark.png',
  'https://semantic-ui.com/images/avatar2/large/rachel.png',
  'https://semantic-ui.com/images/avatar2/large/lindsay.png',
  'https://semantic-ui.com/images/avatar2/large/patrick.png',
  'https://semantic-ui.com/images/avatar2/large/eve.png',
  'https://semantic-ui.com/images/avatar/large/helen.jpg',
  'https://semantic-ui.com/images/avatar/large/christian.jpg',
  'https://semantic-ui.com/images/avatar/large/tom.jpg',
  'https://semantic-ui.com/images/avatar2/large/lena.png',
  'https://semantic-ui.com/images/avatar/large/chris.jpg',
  'https://semantic-ui.com/images/avatar/large/bob.jpg',
  'https://semantic-ui.com/images/avatar2/large/ade.jpg',
  'https://semantic-ui.com/images/avatar/large/zoe.jpg',
  'https://semantic-ui.com/images/avatar/large/paul.jpg',
  'https://semantic-ui.com/images/avatar/large/jerry.png'
];

// Function to get consistent avatar for a username
function getAvatarForUsername(username) {
  // Add error handling for the avatar selection
  try {
    const index = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatars[index % avatars.length] || avatars[0]; // Fallback to first avatar if calculation fails
  } catch (error) {
    return avatars[0]; // Default to first avatar in case of any error
  }
}

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid style={{ borderRadius: '20px' }}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={getAvatarForUsername(username)}
          circular
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = avatars[0];
          }}
        />
        <Card.Header as={Link} to={`/profile/${username}`} style={{ cursor: 'pointer' }}>
          {username}
        </Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {/* Button container */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <MyPopup content="Comment on post">
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button style={{ borderRadius: '50%' }} color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </MyPopup>
          <ShareButton postId={id} />
        </div>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;

