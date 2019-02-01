import React from 'react';

const WalletListComponent = (props) => {
  const { walletList } = props;

  return (
    <div>
      {walletList}
    </div>
  );
};

export default WalletListComponent;
