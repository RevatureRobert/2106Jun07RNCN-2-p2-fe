/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import ImageProps from './types';

const Image = ({ source, ...rest }: ImageProps) => {
  return <img data-testid="image" src={source} alt="test" {...rest} />;
};

export default Image;