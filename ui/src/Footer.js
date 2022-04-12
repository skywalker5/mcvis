import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
    footer: {
        position:'fixed',
        bottom:0,
        left:0,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        background:theme.palette.primary.main,
    },
}));

function Footer(props) {
    const classes = useStyles();
    return (
        <Toolbar variant="dense" className={classes.footer} color={'primary'}>
        </Toolbar>
    );
}

export default Footer;