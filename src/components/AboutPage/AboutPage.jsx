import React from 'react';
import { useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {

  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>
      </div>

      {!user.id && (
        <Button onClick={() => history.push('/')} variant="outlined">Back to Login</Button>
      )}

    </div>
  );
}

export default AboutPage;
