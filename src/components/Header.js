import React from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      rLoaded: null,
    };
  }

  async componentDidMount() {
    const user = await getUser();

    this.setState({
      rLoaded: user.name,
    });
  }

  render() {
    const { rLoaded } = this.state;

    return (
      <header data-testid="header-component">
        { rLoaded
          ? <h1 data-testid="header-user-name">{ rLoaded }</h1>
          : <Loading /> }
      </header>
    );
  }
}

export default Header;
