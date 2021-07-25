// workaround for https://github.com/expo/expo/issues/9004
// see https://github.com/joaogn/React-Native-on-Web-PoC/tree/main/src/components/Image

import React from 'react';

export interface ImageProps {
  source: any;
  className?: string;
  style?: any;
}

const ImageForWeb = ({ source, ...rest }: ImageProps) => {
  return <img data-testid="image" src={source} alt="test" {...rest} />;
};

export default ImageForWeb;