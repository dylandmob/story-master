import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Tag from '../Tag';
import CardPage from '../../cards/CardPage';

export const WikiLayout = ({ campaign }) => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <p style={{ whiteSpace: 'pre-wrap' }}>{campaign.description}</p>
      </Route>
      <Route path={`${path}/tag/:tagId`}>
        <Tag campaign={campaign} readOnly />
      </Route>
      <Route exact path={`${path}/card/:cardId`}>
        <CardPage campaign={campaign} />
      </Route>
    </Switch>
  );
};
