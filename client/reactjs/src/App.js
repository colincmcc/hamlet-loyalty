import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import { blue, indigo } from '@material-ui/core/colors';
import Routes from './routes';
import { persistor, apolloClient, cacheStorage } from './common/apollo';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900],
    },
    primary: {
      main: indigo[700],
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif',
    ].join(','),
  },
});


const SCHEMA_VERSION = '2';
const SCHEMA_VERSION_KEY = 'apollo-schema-version';


class App extends Component {
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
      await persistor.purge();
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

  render() {
    const { client, loaded } = this.state;
    if (!loaded) return <div>Loading...</div>;


    return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
