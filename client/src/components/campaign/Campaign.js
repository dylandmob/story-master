import React, { useContext, useEffect } from 'react';
import CampaignContext from '../../context/campaign';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import EditCampaign from './EditCampaign';
import CampaignNavbar from './CampaignNavbar';
import CreateForm from './CreateForm';
import CreateCard from './CreateCard';
import Tag from './Tag';
import CardPage from '../cards/CardPage';
import EditCard from '../cards/EditCard';

const Campaign = () => {
  const campaignContext = useContext(CampaignContext);
  const { campaign, getCampaignForId, createTag } = campaignContext;

  let { path, params } = useRouteMatch();

  useEffect(() => {
    if (params.id) {
      getCampaignForId(params.id);
    }

    // eslint-disable-next-line
  }, []);

  const onCreateTag = tag => {
    console.log('Creating a new tag', tag);
    createTag(campaign._id, tag);
  };

  const onCreateChapter = chapter => {
    console.log('Creating a new chapter', chapter);
  };

  return campaign ? (
    <React.Fragment>
      <CampaignNavbar campaign={campaign} />
      <Container
        style={{
          marginLeft: '160px',
          padding: '0px 10px'
        }}
      >
        <Switch>
          <Route exact path={`${path}/chapters/:chapterId/act/:actId`}>
            {/* <Act act={campaign.chapters[0].acts[0]} /> */}
          </Route>

          <Route exact path={path}>
            <EditCampaign />
          </Route>
          <Route exact path={`${path}/chapter/new`}>
            <CreateForm type="chapter" onCreate={onCreateChapter} />
          </Route>
          <Route exact path={`${path}/tag/new`}>
            <CreateForm type="tag" onCreate={onCreateTag} />
          </Route>
          <Route path={`${path}/tag/:tagId`}>
            <Tag campaign={campaign} />
          </Route>
          <Route exact path={`${path}/card/new`}>
            <CreateCard />
          </Route>
          <Route exact path={`${path}/card/:cardId`}>
            <CardPage />
          </Route>
          <Route exact path={`${path}/card/:cardId/edit`}>
            <EditCard />
          </Route>
          <Route path="/chapters/:id">
            {/* <Chapters /> */}
            <h3>Chapter!</h3>
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
