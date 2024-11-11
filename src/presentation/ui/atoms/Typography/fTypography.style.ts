import { StyleSheet } from 'react-native';

type TypographyType = {};

export const getTypographyVariants = ({}: TypographyType) => {
  return StyleSheet.create({
    h1: {
      fontSize: 28, // Large title
    },
    h2: {
      fontSize: 24, // Section title
    },
    h3: {
      fontSize: 20, // Subsection title
    },
    h4: {
      fontSize: 18, // Small headers
    },
    h5: {
      fontSize: 16, // Smaller headers or larger body text
    },
    h6: {
      fontSize: 14, // Standard body text or small headers
    },
    regular: {
      fontSize: 16, // Regular body text
    },
    semiRegular: {
      fontSize: 14, // Secondary body text
    },
    small: {
      fontSize: 12, // Caption text
    },
    extraSmall: {
      fontSize: 10, // Small captions or secondary details
    },
    tiny: {
      fontSize: 8, // Tiny details, rarely used
    },
  });
};
