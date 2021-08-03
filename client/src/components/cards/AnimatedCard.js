import React, { useRef, useEffect } from 'react';
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';
import { Image, Paper, Badge, theming } from '@mantine/core';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles(
  (theme) => ({
    paper: {
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
  { theming }
);

export default function AnimatedCard({ data, path }) {
  const { _id, name, imageUrl, hidden } = data;

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener('gesturestart', preventDefault);
    document.addEventListener('gesturechange', preventDefault);

    return () => {
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
    };
  }, []);

  const styles = useStyles();

  const domTarget = useRef(null);
  const [{ zoom, scale }, api] = useSpring(() => ({
    scale: 1,
    zoom: 0,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  useGesture(
    {
      onMove: () =>
        api({
          scale: 1.05,
        }),
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
    },
    { domTarget, eventOptions: { passive: false } }
  );

  return (
    <div key={_id}>
      <animated.div
        ref={domTarget}
        style={{
          scale: to([scale, zoom], (s, z) => s + z),
        }}
      >
        <Link to={path}>
          <Paper className={styles.paper} shadow="sm">
            <Image src={imageUrl} height={300} fit="cover" />
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
          </Paper>
        </Link>
      </animated.div>
    </div>
  );
}
