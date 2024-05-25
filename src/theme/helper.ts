import {IColorScheme, IStyleScheme, ITheme} from '../../types/theme/ITheme.ts';

export const createTheme = (
  styleTheme: IStyleScheme,
  colorTheme: IColorScheme,
): ITheme => {
  return {
    style: styleTheme,
    color: colorTheme,
  };
};
