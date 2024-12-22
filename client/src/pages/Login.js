import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

  const createStars = () => {
    const stars = [];
    for(let i = 0; i < 100; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        '--duration': `${Math.random() * 3 + 1}s`
      };
      stars.push(<div key={`star-${i}`} className="star" style={style} />);
    }
    return stars;
  };

  const createShootingStars = () => {
    const stars = [];
    for(let i = 0; i < 10; i++) {
      const style = {
        top: `${Math.random() * 100}%`,
        left: '0',
        '--duration': `${Math.random() * 3 + 2}s`,
        '--angle': `${Math.random() * 45}deg`,
        animationDelay: `${Math.random() * 5}s`
      };
      stars.push(
        <div 
          key={`shooting-star-${i}`} 
          className="shooting-star-login" 
          style={style} 
        />
      );
    }
    return stars;
  };

  return (
    <>
      <div className="moon-landing">
        {createStars()}
        {createShootingStars()}
        <div className="moon"></div>
        <div className="satellite"></div>
      </div>
      <div className="form-container">
        <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
          <h1>Login</h1>
          <Form.Input
            label="Username"
            placeholder="Username.."
            name="username"
            type="text"
            value={values.username}
            error={errors.username ? true : false}
            onChange={onChange}
          />
          <Form.Input
            label="Password"
            placeholder="Password.."
            name="password"
            type="password"
            value={values.password}
            error={errors.password ? true : false}
            onChange={onChange}
          />
          <Button type="submit" primary>
            Login
          </Button>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
