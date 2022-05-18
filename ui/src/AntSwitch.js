import Switch from '@material-ui/core/Switch';
import styled from 'styled-components';

const AntSwitch = styled(Switch)(({ theme }) => ({
width: 18,
height: 8,
padding: 0,
display: 'flex',
'&:active': {
    '& .MuiSwitch-thumb': {
    width: 6,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
    transform: 'translateX(9px)',
    },
},
'& .MuiSwitch-switchBase': {
    padding: 1,
    '&.Mui-checked': {
    transform: 'translateX(10px)',
    color: '#fff',
    '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'rgb(44,56,87)',
    },
    },
},
'& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 6,
    height: 6,
    borderRadius: 3,
},
'& .MuiSwitch-track': {
    borderRadius: 8 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
},
}));

export default AntSwitch;