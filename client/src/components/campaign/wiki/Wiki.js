import React, { useContext, useEffect } from 'react';
import CampaignContext from '../../../context/campaign';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'shards-react';
import { Container, Icon, Grid, Loader } from 'semantic-ui-react';
import { WikiNav } from './WikiNav';
import { WikiLayout } from './WikiLayout';

export default function Wiki() {
  const campaignContext = useContext(CampaignContext);
  const { campaign, getCampaignForId, getTags } = campaignContext;

  let { params } = useRouteMatch();

  useEffect(() => {
    if (params.id) {
      getCampaignForId(params.id);
      getTags(params.id);
    }
    // eslint-disable-next-line
  }, []);

  if (!campaign) {
    return <Loader>Loading...</Loader>;
  }

  return (
    <Container
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Card
        style={{
          minWidth: '70vw',
          maxWidth: '90vw',
          width: '100%',
          height: 'calc(90vh - 70px)',
          marginTop: '5vh'
        }}
      >
        <CardBody style={{ height: '100%' }}>
          <CardTitle className="text-center">
            <h1 style={{ whiteSpace: 'nowrap' }}>
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
              <WikiLayout campaign={campaign} />
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
