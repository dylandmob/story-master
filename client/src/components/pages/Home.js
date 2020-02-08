import React, { useEffect, useContext } from 'react';
import CampaignContext from '../../context/campaign';
import { Link } from 'react-router-dom';
import { Container } from 'shards-react';
import { Icon } from 'semantic-ui-react';
import CampaignCard from '../cards/CampaignCard';

const Home = () => {
  const campaignContext = useContext(CampaignContext);
  const { getMyCampaigns, myCampaigns } = campaignContext;

  useEffect(() => {
    getMyCampaigns();
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="text-center">
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
      <a href="/auth/google">Sign In with Google</a>
      <div
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        {myCampaigns.map(campaign => (
          <CampaignCard key={campaign._id} campaign={campaign} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
