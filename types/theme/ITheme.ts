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

export enum ThemeType {
    light,
    dark,
}

export interface IColorScheme {
    type: ThemeType;

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
        width: number;
        radius: number;
        outlineWidth: string;
        strokeWidth: string;
    };
    font: {
        family: string;
        size: {
            small: number;
            medium: number;
            large: number;
        };
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

export interface ITheme {
    color: IColorScheme;
    style: IStyleScheme;
}
