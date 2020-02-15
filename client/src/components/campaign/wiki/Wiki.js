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
      <Card className="my-5">
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
          {/* Edit Campaign Button show only if admin */}
          <Grid>
            <Grid.Column width={3}>
              <WikiNav campaign={campaign} />
            </Grid.Column>
            <Grid.Column width={13}>
              <p style={{ whiteSpace: 'pre-wrap' }}>{campaign.description}</p>
            </Grid.Column>
          </Grid>
        </CardBody>
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
      </Card>
    </Container>
  );
}
