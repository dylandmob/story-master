import React, { useEffect, useContext } from 'react';
import CampaignContext from '../../context/campaign';
import AuthContext from '../../context/auth';
import { SIGNED_IN } from '../../context/types';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { Title, Text, Container } from '@mantine/core';
import CardComponent from '../cards/CardComponent';
import AnimatedCard from '../cards/AnimatedCard';

const Home = () => {
  const campaignContext = useContext(CampaignContext);
  const authContext = useContext(AuthContext);
  const { authStatus } = authContext;

  const { getCampaigns, campaigns, getMyCampaigns, myCampaigns } =
    campaignContext;

  useEffect(() => {
    getCampaigns();
    if (authStatus === SIGNED_IN) getMyCampaigns();
    // eslint-disable-next-line
  }, [authStatus]);

  return (
    <Container className="text-center">
      {authStatus === SIGNED_IN && (
        <>
          <Title className="mt-5">
            My Campaigns
            <Link to="campaign/new">
              <Icon
                name="plus circle"
                color="blue"
                link
                style={{ marginLeft: 15 }}
              />
            </Link>
          </Title>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {myCampaigns.length === 0 ? (
              <Text order={4}>
                No campaigns yet? Create one by hitting the plus icon!
              </Text>
            ) : (
              myCampaigns.map((campaign) => (
                <CardComponent
                  key={campaign._id}
                  path={`/campaign/${campaign._id}`}
                  data={campaign}
                />
              ))
            )}
            {campaigns.map((c) => (
              <AnimatedCard key={c._id} path={`/campaign/${c._id}`} data={c} />
            ))}
          </div>
        </>
      )}
      <Title className="mt-5">Campaigns</Title>
      <div
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        {campaigns.map((campaign) => (
          <CardComponent
            key={campaign._id}
            path={`/campaign/${campaign._id}`}
            data={campaign}
          />
        ))}
        {campaigns.map((c) => (
          <AnimatedCard key={c._id} path={`/campaign/${c._id}`} data={c} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
