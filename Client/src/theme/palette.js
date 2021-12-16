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

const WARNING = {
    lighter: '#FFE79E',
    light: '#FFDD78',
    main: '#EDDE62',
    dark: '#DFBD57',
    darker: '#C7A540',
    contrastText: '#fff'
};

const COMMON = {
    primary: { ...PRIMARY },
    secondary: { ...SECONDARY },
    error: { ...ERROR },
    warning: { ...WARNING }
};

const palette = {
    light: {
        ...COMMON,
        background: { paper: '#FFF', default: '#FFF' }
    },
    dark: {
        ...COMMON,
        background: { paper: '#312E2E', default: '#242424' }
    }
};

export default palette;
