import React, { useContext, useEffect } from 'react';
import CampaignContext from '../../../context/campaign';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'shards-react';
import { Container, Icon, Grid, Loader } from 'semantic-ui-react';
import { WikiNav } from './WikiNav';

export default function Wiki() {
  const campaignContext = useContext(CampaignContext);
  const { campaign, getCampaignForId } = campaignContext;

  let { path, params } = useRouteMatch();

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
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '80%',
          minWidth: '500px',
          maxWidth: '90%'
        }}
      >
        <CardBody>
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
          <Grid>
            <Grid.Column width={4}>
              <WikiNav campaign={campaign} />
            </Grid.Column>
            <Grid.Column width={12}>
              <p style={{ whiteSpace: 'pre-wrap' }}>{campaign.description}</p>
            </Grid.Column>
          </Grid>
        </CardBody>
      </Card>
      <img
        src={campaign.imageUrl}
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
