import {TextInput} from 'react-native';
import React from 'react';
import {LocalResources} from '../../constants';
import PropTypes from 'prop-types';

export const AppTextInput = props => {
  const fontFamily = () => {
    if (!props.style) {
      return LocalResources.Fonts.regular;
    }
    switch (props.style.fontWeight) {
      case '100':
        return LocalResources.Fonts.thin;
      case '200':
        return LocalResources.Fonts.extraLight;
      case '300':
        return LocalResources.Fonts.light;
      case '400':
      case 'normal':
        return LocalResources.Fonts.regular;
      case '500':
        return LocalResources.Fonts.medium;
      case '600':
        return LocalResources.Fonts.semiBold;
      case '700':
      case 'bold':
        return LocalResources.Fonts.bold;
      case '800':
        return LocalResources.Fonts.extraBold;
      case '900':
        return LocalResources.Fonts.black;
      default:
        return LocalResources.Fonts.regular;
    }
  };

  return (
    <TextInput
      {...props}
      style={{...props.style, fontFamily: fontFamily(), fontWeight: 'normal'}}>
      {props.children}
    </TextInput>
  );
};

AppTextInput.propTypes = {
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

AppTextInput.defaultProps = {
  style: undefined,
};
