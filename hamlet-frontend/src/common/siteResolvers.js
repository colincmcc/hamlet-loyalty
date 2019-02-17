
const siteResolvers = {
  defaults: {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: true,
    },
    isLoggedIn: false,
    mobileMenuOpen: false,
  },
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_, { isConnected }, { cache }) => {
        const data = {
          networkStatus: {
            __typename: 'NetworkStatus',
            isConnected,
          },
        };
        cache.writeData({ data });
        return null;
      },
      updateMobileMenuStatus: (_, { mobileMenuOpen }, { cache }) => {
        cache.writeData({ data: { mobileMenuOpen } });
        return null;
      },
    },
  },
};

export default siteResolvers;
