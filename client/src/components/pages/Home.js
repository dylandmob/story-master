import React from 'react';
import { Container } from 'shards-react';
import { Icon } from 'semantic-ui-react';
import CampaignCard from '../cards/CampaignCard';

const Home = () => {
  const campaigns = [
    {
      id: 0,
      name: 'Infinity: Origins',
      description: 'A really cool campaign that I love',
      photoUrl: 'https://i.imgur.com/BvtUCMb.jpg',
      chapters: [],
      characters: [],
      locations: []
    },
    {
      id: 1,
      name: 'Etheria: Shattered Memories',
      description: 'It is so much fun! I hope it continues soon!',
      photoUrl: 'https://i.imgur.com/Q3XMLmY.jpg',
      chapters: [],
      characters: [],
      locations: []
    }
  ];

  return (
    <Container className='text-center'>
      <h1 className='mt-5'>
        My Campaigns
        <Icon name='plus circle' color='blue' link style={{ marginLeft: 15 }} />
      </h1>
      <div
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        {campaigns.map(campaign => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
