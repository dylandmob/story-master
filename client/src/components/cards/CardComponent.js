import React from 'react';
// import { Link } from 'react-router-dom';
// import { Icon } from 'semantic-ui-react';
// import { Card, CardTitle, CardImg, CardBody, Tooltip } from 'shards-react';
import { Card, Container, Paper, Image, Group, Title, Badge, Button } from '@mantine/core';
import { createUseStyles } from 'react-jss';
import { theming } from '@mantine/core';

const useStyles = createUseStyles(
  (theme) => ({
    card: {
      position: 'relative',
      borderRadius: theme.radius.lg,
      margin: 20,
      overflow: 'hidden',
      width: '300px',
      '&:hover': {
        boxShadow: theme.shadows.hover,
      },
    },
  }),
  { theming }
);

const CardComponent = ({ data, path }) => {
  const { _id, name, imageUrl, hidden } = data;
  const classes = useStyles();

  return (
    <Paper className={classes.card} key={_id} shadow="sm">
      <Image
        src={imageUrl}
        height={300}
        fit='cover'
        style={{ margin: 0 }}
      />
      <Badge style={{ position: 'absolute', bottom: '8px', left: '8px', maxWidth: '90%' }}>{name}</Badge>
    </Paper>
  )

  // return (
  //   <Link to={path}>
  //     <Card
  //       key={_id}
  //       style={{
  //         minWidth: '175px',
  //         maxWidth: '175px',
  //         margin: 20,
  //         overflow: 'hidden',
  //         cursor: 'pointer',
  //       }}
  //     >
  //       <CardImg
  //         src={imageUrl}
  //         style={{ maxHeight: '200px', objectFit: 'cover' }}
  //       />
  //       {hidden && (
  //         <>
  //           <div
  //             id="hoverable"
  //             style={{
  //               position: 'absolute',
  //               display: 'flex',
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //               top: 0,
  //               left: 0,
  //               width: 175,
  //               height: 200,
  //               backgroundColor: 'rgba(255, 255, 255, 0.4)',
  //             }}
  //           >
  //             <Icon name="eye slash" size="huge" color="black" />
  //           </div>
  //           <Tooltip target="#hoverable">😁 Woo! I am a tooltip!</Tooltip>
  //         </>
  //       )}
  //       <CardBody>
  //         <CardTitle>{name}</CardTitle>
  //       </CardBody>
  //     </Card>
  //   </Link>
  // );
};

export default CardComponent;
