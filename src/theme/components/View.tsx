import {View as RNView, ViewProps} from 'react-native';
import React from 'react';
import {useTheme} from '../../theme/ThemeProvider.tsx';

export default function View(props: ViewProps): React.JSX.Element {
  const {theme} = useTheme();
  const {children, style, ...otherProps} = props;

  return (
    <RNView
      {...otherProps}
      style={[style, {backgroundColor: theme.color.background.secondary}]}>
      {children}
    </RNView>
  );
}
