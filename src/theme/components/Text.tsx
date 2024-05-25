import {Text as RNText, TextProps} from 'react-native';
import React from 'react';
import {useTheme} from '../ThemeProvider.tsx';

export default function Text(props: Readonly<TextProps>): React.JSX.Element {
  const {theme} = useTheme();
  const {children, style, ...otherProps} = props;

  return (
    <RNText {...otherProps} style={[
      {
        color: theme.color.text.primary, 
        fontSize: theme.style.font.size.medium
      }, style]}>
      {children}
    </RNText>
  );
}
