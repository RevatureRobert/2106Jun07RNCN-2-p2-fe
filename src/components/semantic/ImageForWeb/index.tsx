import React from 'react';
import { Image as ImageOrig } from 'react-native';
import ImageProps from './types';

// workaround for https://github.com/expo/expo/issues/9004

const Image = ({ source, style }: ImageProps) => {
  return <ImageOrig testID="image" source={source} style={style} />;
};

export default Image;