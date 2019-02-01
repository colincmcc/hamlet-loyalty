import { css } from 'styled-components';


const sizes = {
  large_up: 1800,
  desktop_up: 1200,
  tablet_landscape_up: 900,
  tablet_portrait_up: 600,
  phone_only: 599,
};

const colors = {
  theme: '#F6C120',
  darkTheme: '#5b470c',
  lightTheme: '#F6E420',
  lightAccent: '#F69C20',
  darkAccent: '#463217',
  blackTheme: '#110C02',
  whiteTheme: '#F4EDDC',
  darkGray: '#1d1e22',
  yellowGray: '#d7d5cd',
  darkBlue: '#051b3e',
  warning: '#F66020',
};

const fontSizes = {
  heading: {
    size: '40px',
    lineHeight: '50px',
    weight: 400,

  },
  subHeading: {
    size: '22px',
    lineHeight: '33px',
    fontWeight: 600,
    letterSpacing: '.025em',

  },
  medium: {
    size: '19px',
    lineHeight: '28px',
    weight: 500,
  },
  text: {
    size: '17px',
    lineHeight: '28px',
    weight: 400,

  },
};

const fontStyles = {
  heading: css`
  font-size: 40px;
  line-height: 50px;
  font-weight: 800;
  font-family: 'Gin Rough';
  `,
  subHeading: css`
  font-size: 24px;
  line-height: 33px;
  font-weight: 500;
  letter-spacing: .025em;
  font-family: 'Gin Rough';
  `,
  large: css`
    font-size: 24px;
  line-height: 33px;
  font-weight: 500;
  letter-spacing: .025em;
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
  letter-spacing: .025em;
  `,
  small: css`
  font-size: 15px;
  line-height: 30px;
  font-weight: 500;
  `,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  if (acc[label] !== 'phone_only') {
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

const styledComponents = {
  heading: css`
  ${fontStyles.heading}
  margin: auto;
  color: ${colors.whiteTheme};
  `,
  subHeading: css`
    ${fontStyles.subHeading}
  margin: auto;
  color: ${colors.theme};
  `,
  smallHeading: css`
    ${fontStyles.smallHeading}
  margin: auto;
  color: ${colors.theme};
  text-transform: uppercase;
  `,
  text: css`
  ${fontStyles.text}
margin: auto;
color: ${colors.whiteTheme};
`,
  small: css`
  ${fontStyles.small}
margin: auto;
color: ${colors.whiteTheme};
`,

};

const theme = {
  media,
  colors,
  fontSizes,
  fontStyles,
  components: styledComponents,
};

export default theme;
