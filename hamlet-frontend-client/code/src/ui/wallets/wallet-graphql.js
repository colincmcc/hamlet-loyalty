import gql from 'graphql-tag';

export const IROHA_WALLETS = gql`
  {
    wallets: allWallets {
      id
     name
    }
  }
`;

export const IROHA_WALLET = gql`
  query Wallet($walletId: Int!) {
    walletById(walletId: $walletId) {
      id
      }
  }
  `;
