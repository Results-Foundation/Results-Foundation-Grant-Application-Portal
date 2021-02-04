import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

export default function Nav() {
  const user = useSelector(state => state.user);
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null && user.admin === false) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  } else if (user.admin === true){
    loginLinkData.path = '/admin';
    loginLinkData.text = 'Admin Dashboard';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">RESULTS FOUNDATION</h2>
      </Link>
      <div className="nav-right">
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        {!user.id &&
          <Link className="nav-link" to="/home">
            About
          </Link>
        }
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {user.id && (
          <>

            {user.admin ?
              <>
                <Link className="nav-link" to="/grantwindow">
                  Grant Window Settings
                </Link>
                <Link className="nav-link" to="/questionmanagement">
                  Question Management
                </Link>
              </>
              :
              <Link className="nav-link" to="/grantapplication">
                Grant Application
              </Link>
            }
            <LogOutButton className="nav-link" />
          </>
        )}
      </div>
    </div>
  );
};

