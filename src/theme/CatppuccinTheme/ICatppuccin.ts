import {Color} from '../../../types/theme/ITheme.ts';

export default interface ICatppuccin {
  accent: {
    [key: string]: Color;
    RoseWater: Color;
    Flamingo: Color;
    Pink: Color;
    Mauve: Color;
    Red: Color;
    Maroon: Color;
    Peach: Color;
    Yellow: Color;
    Green: Color;
    Teal: Color;
    Sky: Color;
    Sapphire: Color;
    Blue: Color;
    Lavender: Color;
  };
  text: {
    Text: Color;
    Subtext1: Color;
    Subtext0: Color;
  };
  overlay: {
    Overlay2: Color;
    Overlay1: Color;
    Overlay0: Color;
  };
  surface: {
    Surface2: Color;
    Surface1: Color;
    Surface0: Color;
  };
  background: {
    Base: Color;
    Mantle: Color;
    Crust: Color;
  };
}
