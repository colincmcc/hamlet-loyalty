import { css } from "styled-components";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

// HELPER FUNCTIONS
const hexToRgb = input => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("input is not a valid hex color.");
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase(input);
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};

const sizes = {
  large_up: 1800,
  desktop_up: 1200,
  tablet_landscape_up: 900,
  tablet_portrait_up: 600,
  phone_only: 599
};
const media = Object.keys(sizes).reduce((acc, label) => {
  if (acc[label] !== "phone_only") {
    acc[label] = (...args) => css`
      @media (min-width: ${sizes[label] / 16}em) {
        ${css(...args)}
      }
    `;
  } else {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css(...args)}
      }
    `;
  }
  return acc;
}, {});

const palette = {
  type: "dark",
  primary: {
    light: purple[300],
    main: purple[500],
    dark: purple[700]
  },
  secondary: {
    light: green[300],
    main: green[500],
    dark: green[700]
  },
  error: {
    light: red[300],
    main: red[500],
    dark: red[700]
  }
};

const typography = {
  useNextVariants: true,
  // Use the system font instead of the default Roboto font.
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(","),
  body: {},
  subtitle: {},
  button: {},
  h1: {},
  h2: {}
};

const fontSizes = {
  heading: {
    size: "40px",
    lineHeight: "50px",
    weight: 400
  },
  subHeading: {
    size: "22px",
    lineHeight: "33px",
    fontWeight: 600,
    letterSpacing: ".025em"
  },
  medium: {
    size: "19px",
    lineHeight: "28px",
    weight: 500
  },
  text: {
    size: "17px",
    lineHeight: "28px",
    weight: 400
  }
};

const fontStyles = {
  heading: css`
    font-size: 40px;
    line-height: 50px;
    font-weight: 800;
    font-family: "Gin Rough";
  `,
  subHeading: css`
    font-size: 24px;
    line-height: 33px;
    font-weight: 500;
    letter-spacing: 0.025em;
    font-family: "Gin Rough";
  `,
  large: css`
    font-size: 24px;
    line-height: 33px;
    font-weight: 500;
    letter-spacing: 0.025em;
    font-family: "Source Sans Pro";
  `,
  medium: css`
    font-size: 19px;
    line-height: 28px;
    font-weight: 500;
    line-height: 25px;
    font-family: "Source Sans Pro";
  `,
  text: css`
    font-size: 17px;
    line-height: 28px;
    font-weight: 400;
    font-family: "Source Sans Pro";
  `,
  smallHeading: css`
    font-size: 14px;
    line-height: 30px;
    font-weight: 500;
    letter-spacing: 0.025em;
  `,
  small: css`
    font-size: 15px;
    line-height: 30px;
    font-weight: 500;
  `
};

const colors = {
  theme: "#F6C120",
  darkTheme: "#5b470c",
  lightTheme: "#F6E420",
  lightAccent: "#F69C20",
  darkAccent: "#463217",
  blackTheme: "#110C02",
  whiteTheme: "#F4EDDC",
  darkGray: "#1d1e22",
  yellowGray: "#d7d5cd",
  darkBlue: "#051b3e",
  warning: "#F66020"
};

export { typography, palette, media };
