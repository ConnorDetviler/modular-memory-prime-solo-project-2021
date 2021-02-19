import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/patch-view/0">
        <h2 className="nav-title">Modular Memory</h2>
      </Link>
      <div>

        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/patch-view/0">
              Patch View
            </Link>

            <Link className="navLink" to="/patch-edit/0">
              Patch Edit
            </Link>

            <Link className="navLink" to="/patch-manager">
              Patch Manager
            </Link>
            {/* <Link className="navLink" to="/info">
              Info Page
            </Link> */}
            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
