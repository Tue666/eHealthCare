import { withStyles } from '@mui/styles';

const GlobalStyles = withStyles((theme) => ({
    '@global': {
        'html': {
            scrollBehavior: 'smooth'
        },
        '::-webkit-scrollbar': {
            width: '11px',
            height: '11px'
        },
        '::-webkit-scrollbar-thumb': {
            background: 'gray',
            borderRadius: '10px',
            border: `2px solid ${theme.palette.background.default}`
        },
        '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bbb'
        },
        '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            fontFamily: 'Quicksand',
            listStyle: 'none'
        },
        a: {
            textDecoration: 'none',
            color: theme.palette.text.primary
        },
        '.wide-container': {
            padding: '0 5px !important'
        },
        [theme.breakpoints.down('md')]: {
            '.wide-container': {
                padding: '0 20px !important'
            },
        }
    }
}))(() => null);

export default GlobalStyles;
