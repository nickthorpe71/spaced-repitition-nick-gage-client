import React, { Component } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => { },
    },
  };

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    return (
      <div className='reg_wrap' aria-live="polite">
        <p className='reg_intro'>
          Practice learning a language with the spaced reptition revision technique.
        </p>
        <section className='reg_log_form_wrap'>
          <h2 className='reg_log_header'>Sign up</h2>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
          />
        </section>
      </div>
    );
  }
}

export default RegistrationRoute;
