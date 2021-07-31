import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  field: string;
  valid: boolean;
}

const ValidationIconComponent: React.FC<Props> = (props: Props) => {
  let icon = 'checkbox-blank-circle-outline';
  let iconcolor = '#333333';

  (() => {
    if (props.field !== '') {
      if (props.valid) {
        icon = 'check';
        iconcolor = '#71ff97';
      } else {
        icon = 'close';
        iconcolor = '#ff5555';
      }
    } else {
      icon = 'checkbox-blank-circle-outline';
      iconcolor = '#333333';
    }
  })();

  return (
    <MaterialCommunityIcons
      name={icon}
      color={iconcolor}
      size={25}
      style={{ paddingLeft: 5, alignSelf: 'center' }}
    />
  );
};

export default ValidationIconComponent;
