import React from 'react';
import Navbar from '../../components/Navigation/navbar';
import Footer from '../../components/Footer/footer';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({}));

export default function Production(props) {
  const classes = useStyles();

  return (
    <Aux>
      <Navbar />
      <p>Production works!</p>
      <Footer />
    </Aux>
  );
}
