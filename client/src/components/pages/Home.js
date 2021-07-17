import React, { useEffect, useContext } from 'react';
import CampaignContext from '../../context/campaign';
import AuthContext from '../../context/auth';
import { SIGNED_IN } from '../../context/types';
import { Link } from 'react-router-dom';
import { Container } from 'shards-react';
import { Icon } from 'semantic-ui-react';
import CampaignCard from '../cards/CampaignCard';
import { Button } from '@mantine/core';

const Home = () => {
  const campaignContext = useContext(CampaignContext);
  const authContext = useContext(AuthContext);
  const { authStatus } = authContext;

  const {
    getCampaigns,
    campaigns,
    getMyCampaigns,
    myCampaigns,
  } = campaignContext;

  useEffect(() => {
    getCampaigns();
    if (authStatus === SIGNED_IN) getMyCampaigns();
    // eslint-disable-next-line
  }, [authStatus]);

  return (
    <Container className="text-center">
      {authStatus === SIGNED_IN && (
        <>
          <Button disabled>Redesign coming soon!</Button>
          <h1 className="mt-5">
            My Campaigns
            <Link to="campaign/new">
              <Icon
                name="plus circle"
                color="blue"
                link
                style={{ marginLeft: 15 }}
              />
            </Link>
          </h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {myCampaigns.length === 0 ? (
              <h4>No campaigns yet? Create one by hitting the plus icon!</h4>
            ) : (
              myCampaigns.map((campaign) => (
                <CampaignCard key={campaign._id} campaign={campaign} />
              ))
            )}
          </div>
        </>
      )}
      <h1 className="mt-5">Campaigns</h1>
      <div
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
