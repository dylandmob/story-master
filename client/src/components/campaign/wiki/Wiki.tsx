import React, { useContext, useEffect } from 'react';
import CampaignContext from '../../../context/campaign';
import { Link, useRouteMatch } from 'react-router-dom';
import { Icon, Loader } from 'semantic-ui-react';
import { createStyles, Container, Paper, Title, Grid } from '@mantine/core';
import { WikiNav } from './WikiNav';
import { WikiLayout } from './WikiLayout';

const useStyles = createStyles((theme) => ({
  paper: {
    minWidth: '70vw',
    maxWidth: '90vw',
    width: '100%',
    height: 'calc(90vh - 70px)',
    marginTop: '5vh',
    backgroundColor: theme.colors.wikiBackgroundColor,
  },
}));

export default function Wiki() {
  const campaignContext = useContext(CampaignContext);
  const { campaign, getCampaignForId, getTags } = campaignContext;

  const { classes } = useStyles();

  let { params } = useRouteMatch<{ id: string }>();

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
        justifyContent: 'center',
      }}
    >
      <Paper className={classes.paper} p="md" radius="lg">
        <div style={{ height: '100%' }}>
          <Title className="text-center">
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
          </Title>
          <Grid className="my-3" style={{ height: 'calc(100% - 50px)' }}>
            <Grid.Col span={3}>
              <WikiNav campaign={campaign} />
            </Grid.Col>
            <Grid.Col
              span={9}
              style={{
                height: '100%',
                overflow: 'auto',
              }}
            >
              <WikiLayout campaign={campaign} />
            </Grid.Col>
          </Grid>
        </div>
      </Paper>
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
          height: 'auto',
        }}
      ></img>
    </Container>
  );
}
