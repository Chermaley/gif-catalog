import React from 'react';
import './App.css';
import {Actions} from './components/actions/Actions';
import {makeStyles} from '@material-ui/core/styles';
import { GifsContainer } from './components/gifs/gifsContainer';


const useStyles = makeStyles(theme => ({
    actions: {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px auto',
    },
    gifContainer: {
        padding: 30,
    }
}));

function App() {
      const classes = useStyles();
      return (
        <div className="App">
          <Actions classes={classes}/>
          <GifsContainer classes={classes}/>
        </div>
      );
}

export default App;
