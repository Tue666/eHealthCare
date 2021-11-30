import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

const propTypes = {
    children: PropTypes.node
};

const ECard = ({ children, sx, ...other }) => {
    return (
        <StyleCard
            sx={{ p: 3, ...sx }}
            {...other}
        >
            {children}
        </StyleCard>
    );
};

const StyleCard = styled(Card)(({ theme }) => ({
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(33, 43, 54)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    overflow: 'hidden',
    boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px',
    borderRadius: '16px',
    position: 'relative',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
    }
}));

ECard.propTypes = propTypes;

export default ECard;
