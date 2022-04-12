import { makeStyles } from '@material-ui/core/styles';
import { margin } from '@mui/system';

export const useStyles = (theme => ({
    grid: {
        // padding: theme.spacing(1),
    },
    dia:{
        transformBox: "fill-box",
        transformOrigin: "center",
        transform:"rotate(45deg)"
    },
    diaSelected:{
        transformBox: "fill-box",
        transformOrigin: "center",
        transform:"rotate(45deg)",
        zIndex:1
    },
    ssIcon:{
        transform:"scale(0.8)"
    },
    ellip:{
        transformBox: "fill-box",
        transformOrigin:"center",
    },
    grow: {
      flexGrow: 1,
    },
    embeddingPaper: {
        padding: theme.spacing(1),
        height: "40vh",
    },
    zoomPaper: {
        padding: theme.spacing(1),
        height: "46vh",
    },
    searchPaper: {
        padding: theme.spacing(1),
        height: "46vh",
    },
    recomPaper: {
        padding: theme.spacing(1),
        height: "30vh",
    },
    ratePaper: {
        padding: theme.spacing(1),
        height: "22vh",
    },
    detailPaper: {
        padding: theme.spacing(1),
        height: "40vh",
    },
    historyPaper: {
        padding: theme.spacing(1),
        height: "32.5vh",
    },
    searchList: {
        flex: 1,
        maxHeight: "100%",
        overflow:"auto"
        // height: "75%",
    },
    queryPaper: {
        flex: 1,
        maxHeight: "100%",
        overflow:"auto"
    },
    recomTable: {
        flex: 1,
        overflow: "auto"
    },
    slider:{
        // marginRight:theme.spacing(3)
    },
    sliderBox:{
        paddingLeft:theme.spacing(2),
        paddingRight:theme.spacing(2)
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    panelTitle: {
        minWidth:"200px",
        paddingLeft: theme.spacing(1),
    },
    entityType: {
        paddingLeft: theme.spacing(0.5),
    },
    entityControlLabel: {
        fontSize:"0.9rem"
    },
    queryControlLabel: {
        fontSize:"0.8rem"
    },
    searchGridOuter: {
        height: "100%",
        display: "flex",
        padding: theme.spacing(0),
        paddingBottom: theme.spacing(1),
    },
    recomGridOuter: {
        height: "100%",
        display: "flex",
        padding: theme.spacing(0)
    },
    autoCom: {
        flex: 2,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1.5),
    },
    entityNum: {
        flex: 0.7
    },
    autoComLeft: {
        flex: 2,
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(1.5),
    },
    autoComRight: {
        flex: 2,
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(1.5),
    },
    searchGrid: {
        display: "flex",
        alignItems: "center"
    },
    pairSearchGrid: {
        display: "flex",
        alignItems: "center"
    },
    searchButton: {
        height: theme.spacing(4),
        maxHeight: theme.spacing(4),
        marginTop: theme.spacing(0.5),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    submitButton: {
        height: theme.spacing(4),
        maxHeight: theme.spacing(4),
        marginTop: theme.spacing(0.5),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    zoomButton: {
        height: theme.spacing(3.5),
        flex: 1,
        marginLeft: theme.spacing(8),
    },
    searchTextField: {
        // paddingBottom:"5px",
    },
    clusterChart: {
        flex: 1,
    },
    selectSymbol: {
        zIndex: 1,
    },
    stackChip: {
        marginLeft:'auto',
        marginRight:'auto',
    },
    historyChip: {
        height: theme.spacing(5),
        maxWidth: theme.spacing(15),
        alignItems: "center",
        margintop: theme.spacing(2)
    }
}));
export default useStyles;