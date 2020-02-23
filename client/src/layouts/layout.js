import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import NavBar from './navbar/navbar.js';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Layout({children}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <NavBar/>
        <Grid container>
            <Grid item xs={6}>
                {children}
            </Grid>
            <Grid item xs={6}>
                <div>
                    Output Area:
                </div>
            </Grid>
        </Grid>
    </div>
  );
}