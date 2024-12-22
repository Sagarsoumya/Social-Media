import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = data && data.getPosts ? data.getPosts : [];

  const createHomeStars = () => {
    const stars = [];
    for(let i = 0; i < 50; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        '--size': `${Math.random() * 3 + 1}px`,
        '--duration': `${Math.random() * 3 + 1}s`
      };
      stars.push(<div key={`home-star-${i}`} className="home-star" style={style} />);
    }
    return stars;
  };

  const createAsteroids = () => {
    const asteroids = [];
    for(let i = 0; i < 20; i++) {
      const size = Math.random() * 10 + 5;
      const style = {
        width: `${size}px`,
        height: `${size}px`,
        '--startX': `${Math.random() * 100}vw`,
        '--startY': `${Math.random() * 100}vh`,
        '--endX': `${Math.random() * 100}vw`,
        '--endY': `${Math.random() * 100}vh`,
        '--duration': `${Math.random() * 20 + 10}s`
      };
      asteroids.push(<div key={`asteroid-${i}`} className="home-asteroid" style={style} />);
    }
    return asteroids;
  };

  return (
    <>
      <div className="home-galaxy">
        <div className="infinity-logo">♾️</div>

        <div className="galaxy" style={{
          left: '30%',
          top: '50%'
        }}/>
        <div className="galaxy" style={{
          left: '70%',
          top: '30%',
          transform: 'rotate(45deg)'
        }}/>
        <div className="galaxy-dust"/>
        {createHomeStars()}
        {createAsteroids()}
      </div>
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1 className="animated-text" style={{
            animation: 'typing 5s steps(16)',
            width: '16ch',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            background: 'linear-gradient(90deg, #ff00ff, #00ffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            borderRight: '3px solid #ff00ff',
            animation: `
              typing 5s steps(16),
              blink-caret .75s step-end infinite
            `
          }}>Galaxy Media App</h1>
          <h5>Recent Posts</h5>

        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <h1>Loading posts..</h1>
          ) : (
            <Transition.Group>
              {posts &&
                posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Home;
