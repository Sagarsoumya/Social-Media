import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { FETCH_USER_QUERY } from '../util/graphql';
import { Card, Grid, Image, Loader, Divider, Button } from 'semantic-ui-react';

function UserProfile() {
  const { username } = useParams(); // Get username from the URL

  const { loading, data, error } = useQuery(FETCH_USER_QUERY, {
    variables: { username },
  });

  if (loading) return <Loader active inline="centered" content="Loading user profile..." />;
  if (error) return <h4 style={{ color: 'red' }}>Error: {error.message}</h4>;

  const { getUser } = data;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}>
          {/* User Card */}
          <Card>
            <Image
              src={`https://ui-avatars.com/api/?name=${getUser.username}&background=random`}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>{getUser.username}</Card.Header>
              <Card.Meta>
                <span>Joined: {new Date(getUser.createdAt).toDateString()}</span>
              </Card.Meta>
              <Card.Description>
                <strong>Email:</strong> {getUser.email}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <strong>Posts Created: {getUser.postCount}</strong>
            </Card.Content>
          </Card>
        </Grid.Column>

        {/* User's Posts */}
        <Grid.Column width={12}>
          <h2>Posts by {getUser.username}</h2>
          <Divider />
          {getUser.posts.length > 0 ? (
            getUser.posts.map((post) => (
              <Card fluid key={post.id}>
                <Card.Content>
                  <Card.Header>{post.body}</Card.Header>
                  <Card.Meta>Posted on {new Date(post.createdAt).toLocaleString()}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Button basic color="blue" content={`Likes: ${post.likeCount}`} />
                  <Button basic color="green" content={`Comments: ${post.commentCount}`} />
                </Card.Content>
              </Card>
            ))
          ) : (
            <p>No posts created by this user yet.</p>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default UserProfile;
