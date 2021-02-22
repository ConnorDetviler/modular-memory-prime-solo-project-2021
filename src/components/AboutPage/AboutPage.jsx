import React from 'react';
import { useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Typography
} from '@material-ui/core';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {

  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <Box
    className="container"
    pt={13}
    maxWidth="600px"
    >
      <div>
        <Typography>Modular Memory is an app designed to make any synthesist's life easier. To upload a patch, 
          simply navigate to the patch-edit tab, use your favorite image hosting service, and link a photograph
          of your synthesizer's front panel with all of the switch, knob, and patch cable connections clearly visible</Typography>
      </div>

      {!user.id && (
        <Button onClick={() => history.push('/')} variant="outlined">Back to Login</Button>
      )}

    </Box>
  );
}

export default AboutPage;
