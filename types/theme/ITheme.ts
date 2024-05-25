type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type HSL = `hsl(${string})`;
type HSLA = `hsla(${string})`;
type VAR = `var(${string})`;

export type Color = RGB | RGBA | HEX | HSL | HSLA | VAR;

export interface IColor {
  name: string;
  color: Color;
}

interface IColorSet {
  primary: Color;
  secondary: Color;
  tertiary: Color;
}

export interface IColorScheme {
  accent: {
    active: IColor;
    available: IColor[];
  };

  text: IColorSet & {
    success: Color;
    error: Color;
  };

  background: IColorSet;
  overlay: IColorSet;
  surface: IColorSet;
}

export interface IStyleScheme {
  border: {
    width: string;
    radius: string;
    outlineWidth: string;
    strokeWidth: string;
  };
  font: {
    family: string;
    size: string;
    scale: string;
  };
  text: {
    size: string;
    weight: string;
    scale: string;
    decoration: string;
  };
  spacing: {
    padding: string;
    margin: string;
  };
}

export interface Theme {
  color: IColorScheme;
  style: IStyleScheme;
}
