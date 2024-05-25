import {Text as RNText, TextProps} from 'react-native';
import React from 'react';
import {useTheme} from '../../theme/ThemeProvider.tsx';

export default function Text(props: TextProps): React.JSX.Element {
  const {theme} = useTheme();
  const {children, style, ...otherProps} = props;

  return (
    <RNText {...otherProps} style={[style, {color: theme.color.text.primary}]}>
      {children}
    </RNText>
  );
}
