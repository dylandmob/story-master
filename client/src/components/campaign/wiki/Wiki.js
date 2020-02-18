import React, { useContext, useEffect } from 'react';
import CampaignContext from '../../../context/campaign';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'shards-react';
import { Container, Icon, Grid, Loader } from 'semantic-ui-react';
import { WikiNav } from './WikiNav';

export default function Wiki() {
  const campaignContext = useContext(CampaignContext);
  const { campaign, getCampaignForId } = campaignContext;

  let { params } = useRouteMatch();

  useEffect(() => {
    if (params.id) {
      getCampaignForId(params.id);
    }
    // eslint-disable-next-line
  }, []);

  if (!campaign) {
    return <Loader>Loading...</Loader>;
  }

  return (
    <Container>
      <Card
        style={{
          minWidth: '500px',
          maxWidth: '90vw',
          height: 'calc(90vh - 70px)',
          marginTop: '5vh'
        }}
      >
        <CardBody style={{ height: '100%' }}>
          <CardTitle className="text-center">
            <h1>
              {campaign.name}
              {campaign.isAdmin && (
                <Link to={`/campaign/${campaign._id}/edit`}>
                  <Icon
                    name="pencil"
                    color="blue"
                    link
                    style={{ marginLeft: 15 }}
                  />
                </Link>
              )}
            </h1>
          </CardTitle>
          <Grid className="my-3" style={{ height: 'calc(100% - 50px)' }}>
            <Grid.Column width={4}>
              <WikiNav campaign={campaign} />
            </Grid.Column>
            <Grid.Column
              width={12}
              style={{
                height: '100%',
                overflow: 'auto'
              }}
            >
              <p style={{ whiteSpace: 'pre-wrap' }}>{campaign.description}</p>
            </Grid.Column>
          </Grid>
        </CardBody>
      </Card>
      <img
        src={campaign.imageUrl}
        alt="wiki background"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          minWidth: '1024px',
          minHeight: '100%',
          width: '100%',
          height: 'auto'
        }}
      ></img>
    </Container>
  );
}
