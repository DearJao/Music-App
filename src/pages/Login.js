import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loginName: '',
      isLoginButtonDisable: true,
      loading: false,
      logged: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      loginName: target.value,
    }, () => {
      this.handleCheckLength();
    });
  }

  handleCheckLength = () => {
    const { loginName } = this.state;

    const minCaractersNumber = 3;

    if (loginName.length >= minCaractersNumber) {
      this.setState({
        isLoginButtonDisable: false,
      }, () => {});
    } else {
      this.setState({
        isLoginButtonDisable: true,
      }, () => {});
    }
  };

  handleLogin = () => {
    const { loginName } = this.state;

    this.setState({
      loading: true,
    });

    createUser({ name: loginName })
      .then(() => this.setState({
        loading: false,
        logged: true,
      }));
  }

  render() {
    const { loginName, isLoginButtonDisable, loading, logged } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (logged) {
      return <Redirect to="./search" />;
    }

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            name="loginName"
            value={ loginName }
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ isLoginButtonDisable }
            onClick={ this.handleLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
