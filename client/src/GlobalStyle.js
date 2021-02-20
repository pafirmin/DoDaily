import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
}
*:focus {
  outline: none;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
  font-family: 'Lato', sans-serif;
  color: #1d1d1d;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
button {
  background: none;
  cursor: pointer;
  font: inherit;
  color: inherit;
  -webkit-tap-highlight-color: none;
}
button:focus {
    outline: none;
    outline-offset: 0;
    transform: none;
}
button:active {
}
a {
  text-decoration: none;
}
a:visited {
  font: inherit;
  color: inherit;
} 
h2 {
  font-size: 1.8em;
}
.react-datepicker-wrapper {
  width: 100%;
}
.date-picker {
  width: 100%;
}

`;

export const MainTheme = {
  headerHeight: '70px',
  primaryColour: '#672a6c',
  secondaryColour: '#5e6aaa',
};

export default GlobalStyle;
