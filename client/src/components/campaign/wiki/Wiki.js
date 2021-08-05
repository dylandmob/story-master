import React, { useContext, useEffect } from 'react';
import CampaignContext from '../../../context/campaign';
import { Link, useRouteMatch } from 'react-router-dom';
import { Icon, Grid, Loader } from 'semantic-ui-react';
import { Container, Paper, Title, theming } from '@mantine/core';
import { WikiNav } from './WikiNav';
import { WikiLayout } from './WikiLayout';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  (theme) => ({
    paper: {
      minWidth: '70vw',
      maxWidth: '90vw',
      width: '100%',
      height: 'calc(90vh - 70px)',
      marginTop: '5vh',
      backgroundColor: theme.colors.wikiBackgroundColor,
    },
  }),
  { theming }
);

export default function Wiki() {
  const campaignContext = useContext(CampaignContext);
  const { campaign, getCampaignForId, getTags } = campaignContext;

  const styles = useStyles();

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
        justifyContent: 'center',
      }}
    >
      <Paper className={styles.paper} padding="md" radius="lg">
        <div style={{ height: '100%' }}>
          <Title className="text-center">
            {/* <h1 style={{ whiteSpace: 'nowrap' }}> */}
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
            {/* </h1> */}
          </Title>
          <Grid className="my-3" style={{ height: 'calc(100% - 50px)' }}>
            <Grid.Column width={4}>
              <WikiNav campaign={campaign} />
            </Grid.Column>
            <Grid.Column
              width={12}
              style={{
                height: '100%',
                overflow: 'auto',
              }}
            >
              <WikiLayout campaign={campaign} />
            </Grid.Column>
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
