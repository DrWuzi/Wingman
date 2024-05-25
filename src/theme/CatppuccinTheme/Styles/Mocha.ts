import {CatppuccinGlobalTheme} from './CatppuccinGlobalTheme.ts';
import ICatppuccin from '../ICatppuccin.ts';
import {
  IColor,
  IColorScheme,
  ITheme,
  ThemeType,
} from '../../../../types/theme/ITheme.ts';
import {createTheme} from '../../helper.ts';

const mochaColorPalette: ICatppuccin = {
  accent: {
    RoseWater: '#f5e0dc',
    Flamingo: '#f2cdcd',
    Pink: '#f5c2e7',
    Mauve: '#cba6f7',
    Red: '#f38ba8',
    Maroon: '#eba0ac',
    Peach: '#fab387',
    Yellow: '#f9e2af',
    Green: '#a6e3a1',
    Teal: '#94e2d5',
    Sky: '#89dceb',
    Sapphire: '#74c7ec',
    Blue: '#89b4fa',
    Lavender: '#b4befe',
  },
  text: {
    Text: '#cdd6f4',
    Subtext1: '#bac2de',
    Subtext0: '#a6adc8',
  },
  overlay: {
    Overlay2: '#9399b2',
    Overlay1: '#7f849c',
    Overlay0: '#6c7086',
  },
  surface: {
    Surface2: '#585b70',
    Surface1: '#45475a',
    Surface0: '#313244',
  },
  background: {
    Base: '#1e1e2e',
    Mantle: '#181825',
    Crust: '#11111b',
  },
};

const availableColors: IColor[] = Object.keys(mochaColorPalette.accent).map(
  colorName => ({
    name: colorName,
    color: mochaColorPalette.accent[colorName],
  }),
);

const mocha: IColorScheme = {
  type: ThemeType.dark,
  accent: {
    active: availableColors[0],
    available: availableColors,
  },
  text: {
    success: '#66FF77',
    error: '#FF2400',
    primary: mochaColorPalette.text.Text,
    secondary: mochaColorPalette.text.Subtext0,
    tertiary: mochaColorPalette.text.Subtext1,
  },
  overlay: {
    primary: mochaColorPalette.overlay.Overlay0,
    secondary: mochaColorPalette.overlay.Overlay1,
    tertiary: mochaColorPalette.overlay.Overlay2,
  },
  surface: {
    primary: mochaColorPalette.surface.Surface0,
    secondary: mochaColorPalette.surface.Surface1,
    tertiary: mochaColorPalette.surface.Surface2,
  },
  background: {
    primary: mochaColorPalette.background.Crust,
    secondary: mochaColorPalette.background.Mantle,
    tertiary: mochaColorPalette.background.Base,
  },
};

export const Mocha: ITheme = createTheme(CatppuccinGlobalTheme, mocha);
