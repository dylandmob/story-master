import React, { useContext, useEffect } from 'react';
import CampaignContext from '../../../context/campaign';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import EditCampaign from './EditCampaign';
import CampaignNavbar from './CampaignNavbar';
import CreateCard from '../../cards/CreateCard';
import EditCard from '../../cards/EditCard';
import Tag from '../../tags/Tag';
import CreateTag from '../../tags/CreateTag';
import EditTag from '../../tags/EditTag';

const Campaign = () => {
  const campaignContext = useContext(CampaignContext);
  const { campaign, getCampaignForId, getTags } = campaignContext;

  let { path, params } = useRouteMatch();

  useEffect(() => {
    if (params.id) {
      getCampaignForId(params.id);
      getTags(params.id);
    }
    // eslint-disable-next-line
  }, []);

  return campaign ? (
    <React.Fragment>
      <CampaignNavbar campaign={campaign} />
      <Container
        style={{
          marginLeft: '160px',
          padding: '0px 10px',
        }}
      >
        <Switch>
          <Route exact path={path}>
            <EditCampaign />
          </Route>
          <Route exact path={`${path}/tag/new`}>
            <CreateTag />
          </Route>
          <Route exact path={`${path}/tag/:tagId/edit`}>
            <EditTag />
          </Route>
          <Route path={`${path}/tag/:tagId`}>
            <Tag campaign={campaign} />
          </Route>
          <Route exact path={`${path}/card/new`}>
            <CreateCard />
          </Route>
          <Route exact path={`${path}/card/:cardId`}>
            <EditCard />
          </Route>
        </Switch>
      </Container>
    </React.Fragment>
  ) : (
    <Container>
      <h1 className="mt-5">No campaign found here!</h1>
    </Container>
  );
};

export default Campaign;
