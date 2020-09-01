import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.css';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div className='login_nav_wrapper'>
        <span className='login_link'>
          {this.context.user.name}
        </span>
        <nav>
          <Link
            className='sign_up_link'
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav className='login_nav_wrapper'>
        <div className=''><Link to='/login' className='login_link'>Login</Link></div>

        <div className=''><Link to='/register' className='sign_up_link'>Sign up</Link></div>
      </nav>
    );
  }

  render() {
    return (
      <header className='header_nav'>
        <h1>
          <Link to='/' className='Header_logo'>
            Codificación
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header;
