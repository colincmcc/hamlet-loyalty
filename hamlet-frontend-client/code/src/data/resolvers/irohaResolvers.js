const irohaResolvers = {
  defaults: {
    selectedAccount: [],
  },
  resolvers: {
    Mutation: {
      selectAccount: (_, { selectedAccount }, { cache }) => {
        cache.writeData({ data: { selectedAccount } });
        return null;
      },
    },
  },
};

export default irohaResolvers;
