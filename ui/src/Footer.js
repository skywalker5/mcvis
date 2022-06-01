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
        background:theme.palette.secondary.main,
        minHeight:theme.spacing(3),
    },
}));

function Footer(props) {
    const classes = useStyles();
    return (
        <Toolbar variant="dense" className={classes.footer}>
        </Toolbar>
    );
}

export default Footer;