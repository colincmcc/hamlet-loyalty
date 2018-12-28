import React, { Component } from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import gql from 'graphql-tag';
import { persistor, apolloClient, cacheStorage } from './data/apolloClient';
import { LoadingComponent, ErrorComponent, asyncComponent } from './ui/components';

import './App.css';
import theme from './assets/theme';

const AsyncLogin = asyncComponent(() => import('./ui/login/LoginComponent'));

const AsyncDashboard = asyncComponent(() => import('./ui/dashboard/DashboardComponent'));


const SCHEMA_VERSION = '1';
const SCHEMA_VERSION_KEY = 'apollo-schema-version';


const CACHED_STATE = gql`
  {
    currentLocation @client
    allLocations {
    title {
      rendered
    }
    acf {
      loc_num
      loc_symbol
    }
  }
  }
`;

class App extends Component {
  previousLocation = this.props.location;

  constructor(props) {
    super(props);
    this.state = {
      client: null,
      loaded: false,
    };
  }

  async componentDidMount() {
    const currentVersion = await cacheStorage.getItem(SCHEMA_VERSION_KEY);
    if (currentVersion === SCHEMA_VERSION) {
      // If the current version matches the latest version,
      // we're good to go and can restore the cache.
      await persistor.restore();
    } else {
      // Otherwise, we'll want to purge the outdated persisted cache
      // and mark ourselves as having updated to the latest version.
      await persistor.purge();
      await cacheStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
    }

    this.setState({
      client: apolloClient,
      loaded: true,
    });
  }

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP'
      && (!location.state || !location.state.modal)
    ) {
      this.previousLocation = location;
    }
  }

  render() {
    const { client, loaded } = this.state;
    const { location } = this.props;

    if (!loaded) return <LoadingComponent />;

    const isModal = !!(
      location.state
      && location.state.modal
      && this.previousLocation !== location
    );
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Query query={CACHED_STATE}>
            {
            ({ loading, error }) => {
              if (loading) return <LoadingComponent />;
              if (error) return <ErrorComponent />;
              return (
                <div>

                  <Switch location={isModal ? this.previousLocation : location}>
                    <Route exact path="/" redirect="/login" />
                    <Route path="/login" component={AsyncLogin} />
                    <Route path="/dashboard" component={AsyncDashboard} />
                    <Route path="/summary" component={AsyncDashboard} />
                    <Route path="/dashboard" component={AsyncDashboard} />

                  </Switch>

                  {isModal ? <Route component={AsyncDashboard} path="/:section*/#Menu" /> : null}
                </div>
              );
            }
            }

          </Query>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withRouter(App);
