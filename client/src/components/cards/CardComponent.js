import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Image, Badge, useMantineTheme } from '@mantine/core';
import { createUseStyles } from 'react-jss';
import { EyeNoneIcon } from '@radix-ui/react-icons';

const useStyles = createUseStyles(
  (theme) => ({
    card: {
      position: 'relative',
      borderRadius: theme.radius.lg,
      margin: 20,
      overflow: 'hidden',
      width: '200px',
      '&:hover': {
        boxShadow: theme.shadows.hover,
      },
    },
  }),
  { useMantineTheme }
);

const CardComponent = ({ data, path }) => {
  const { _id, name, imageUrl, hidden } = data;
  const classes = useStyles();

  return (
    <Link to={path}>
      <Paper className={classes.card} key={_id} shadow="sm">
        <Image src={imageUrl} height={300} fit="cover" style={{ margin: 0 }} />
        <Badge
          color="gray"
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            maxWidth: '90%',
          }}
        >
          {name}
        </Badge>
        {hidden && (
          <>
            <div
              id="hoverable"
              style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                top: 0,
                left: 0,
                width: 300,
                height: 300,
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              <EyeNoneIcon style={{ height: 50, width: 50 }} color="black" />
            </div>
          </>
        )}
      </Paper>
    </Link>
  );

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
