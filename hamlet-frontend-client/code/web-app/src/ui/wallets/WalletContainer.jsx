import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

import shortid from 'shortid';

import { IROHA_WALLETS, IROHA_WALLET } from './wallet-graphql';
import WalletListComponent from './WalletListComponent';

const WalletContainer = (props) => {
  const { walletData } = props;


  return (
    <Query query={IROHA_WALLETS}>
      {({ loading, error, data }) => {
        return (
          <WalletListComponent data={data} loading={loading} error={error} />
        );
      }}
    </Query>  );
};

export default WalletContainer;
