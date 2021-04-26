import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

import { makeStyles } from '@material-ui/core/styles';
import { NavbarSignin } from '../../components/Navigation/navbar';
import Footer from '../../components/Footer/footer';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import { Container, Button, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  button: {
    width: '60%',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    color: '#8a8a8a',
    '&:hover': {
      backgroundColor: '#98DDCA !important',
    },
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    borderWidth: '2px',
    borderColor: '#98DDCA',
    borderStyle: 'solid',
    height: '420px',
    minWidth: '280px',
    maxWidth: '400px',
    direction: 'column',
    marginTop: '8%',
    marginBottom: '10%',
  },
  form: {},
  input: {
    margin: theme.spacing(2),
  },
  title: {
    fontSize: '22px',
    textTransform: 'uppercase',
    color: '#8a8a8a',
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
}));

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const classes = useStyles();

  useEffect(() => {
    if (localStorage.getItem('authentication-token')) {
      history.push('/production');
    }
  }, [history]);

  const loginHandler = async e => {
    e.preventDefault();

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        'http://localhost:5000/auth/login',
        { email, password },
        config
      );

      localStorage.setItem('authentication-token', data.token);

      history.push('/production');
    } catch (error) {
      setError('Username or password are incorrect');
    }
  };

  return (
    <Aux>
      {NavbarSignin()}
      <Container align='center' className={classes.container}>
        <form
          className={classes.form}
          autoComplete='off'
          onSubmit={loginHandler}
        >
          <Typography className={classes.title}>Sign in</Typography>
          {error && <Alert variant='danger'>{error}</Alert>}
          {/* NEED TO CHANGE THE COLOUR OF THE HIGHLIGHT SO IT AIN'T STANDARD BLUE. COSMETIC, NOT NECESSARY */}
          {/* FIX: TEXTFIELDS NOT ALIGNED VERTICALLY WHEN MAXIMISED WINDOW. */}
          <TextField
            type='email'
            required
            id='username'
            label='Username'
            className={classes.input}
            onChange={e => setEmail(e.target.value)}
            value={email}
          ></TextField>
          <TextField
            required
            id='password'
            type='password'
            label='Password'
            className={classes.input}
            onChange={e => setPassword(e.target.value)}
            value={password}
          ></TextField>
          <Button className={classes.button} type='submit'>
            Sign in
          </Button>
        </form>
      </Container>
      <Footer />
    </Aux>
  );
}
