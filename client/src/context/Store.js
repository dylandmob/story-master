import React from 'react';
import AuthState from './auth/AuthState';
import UserState from './user/UserState';
import CampaignState from './campaign/CampaignState';
import CardState from './cards/CardState';

const Store = ({ children }) => {
  return (
    <AuthState>
      <UserState>
        <CampaignState>
          <CardState>{children}</CardState>
        </CampaignState>
      </UserState>
    </AuthState>
  );
};

export default Store;
