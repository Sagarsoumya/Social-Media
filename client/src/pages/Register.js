import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
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

  function registerUser() {
    addUser();
  }

  const createStars = () => {
    const stars = [];
    for(let i = 0; i < 100; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        '--duration': `${Math.random() * 3 + 1}s`
      };
      stars.push(<div key={`star-${i}`} className="register-stars" style={style} />);
    }
    return stars;
  };

  const createOrbitingPlanets = () => {
    const planets = [
      { size: '50px', color: '#ff4d4d', orbitRadius: '150px', duration: '15s' },
      { size: '40px', color: '#ffcc00', orbitRadius: '250px', duration: '20s' },
      { size: '60px', color: '#9933ff', orbitRadius: '350px', duration: '25s' }
    ];

    return planets.map((planet, index) => (
      <div
        key={`planet-${index}`}
        className="orbiting-planet"
        style={{
          '--size': planet.size,
          '--color': planet.color,
          '--orbit-radius': planet.orbitRadius,
          '--orbit-duration': planet.duration
        }}
      />
    ));
  };

  return (
    <>
      <div className="register-cosmos">
        {createStars()}
        <div className="planet-system">
          <div className="main-planet" />
          <div className="planet-ring" />
          {createOrbitingPlanets()}
        </div>
      </div>
      <div className="form-container">
        <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
          <h1>Register</h1>
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
            label="Email"
            placeholder="Email.."
            name="email"
            type="email"
            value={values.email}
            error={errors.email ? true : false}
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
          <Form.Input
            label="Confirm Password"
            placeholder="Confirm Password.."
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            error={errors.confirmPassword ? true : false}
            onChange={onChange}
          />
          <Button type="submit" primary>
            Register
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
