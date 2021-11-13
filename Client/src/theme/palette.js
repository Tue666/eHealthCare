const PRIMARY = {
    lighter: '#C8FACD',
    light: '#5BE584',
    main: '#00AB55',
    dark: '#007B55',
    darker: '#005249',
    contrastText: '#fff'
};

const SECONDARY = {
    light: '#84A9FF',
    main: '#e255fa',
    dark: '#FE4CF6',
    contrastText: '#FFF'
};

const ERROR = {
    lighter: '#FFA48D',
    light: '#FF867B',
    main: '#F53D2D',
    dark: '#D35449',
    darker: '#B72136',
    contrastText: '#FFF'
};

const COMMON = {
    primary: { ...PRIMARY },
    secondary: { ...SECONDARY },
    error: { ...ERROR }
};

const palette = {
    light: {
        ...COMMON,
        background: { paper: '#F5F8Fa', default: '#FFF' }
    },
    dark: {
        ...COMMON,
        background: { paper: '#312E2E', default: '#242424' }
    }
};

export default palette;
