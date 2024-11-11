import React from 'react';


import { Text, TextProps, TextStyle } from 'react-native';
import { getTypographyVariants } from './fTypography.style';
export interface FTypographyInterface extends TextProps {
  variant?: keyof ReturnType<typeof getTypographyVariants>;
  style?: TextStyle;
  fontFamily?: 'Regular' | 'Medium' | 'Bold' | 'Thin' | 'Light' | 'Regular';
}

export const FTypography = ({
  variant = 'regular',
  fontFamily = 'Regular',
  style,
  ...rest
}: FTypographyInterface) => {

  const TypographyVariantStyles = getTypographyVariants({fontFamily });
  const TypographyVariantStyle = TypographyVariantStyles[variant];
  return <Text style={[TypographyVariantStyle, style]} {...rest} />;
};
