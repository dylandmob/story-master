import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Tag from '../../tags/Tag';
import CardPage from '../../cards/CardPage';
import { Text } from '@mantine/core';

interface WikiLayoutProps {
  campaign: Campaign;
}

export const WikiLayout = ({ campaign }: WikiLayoutProps) => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <Text style={{ whiteSpace: 'pre-wrap' }}>{campaign.description}</Text>
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
