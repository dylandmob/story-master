import React, { useState } from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal'
};

const Link = props => {
  const [className, setClassName] = useState(STATUS.NORMAL);

  const _onMouseEnter = () => setClassName(STATUS.HOVERED);

  const _onMouseLeave = () => setClassName(STATUS.NORMAL);

  return (
    <a
      className={className}
      href={props.page || '#'}
      onMouseEnter={_onMouseEnter}
      onMouseLeave={_onMouseLeave}
    >
      {props.children}
    </a>
  );
};

export default Link;
