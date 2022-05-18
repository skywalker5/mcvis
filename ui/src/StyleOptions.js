export const useStyles = (theme => ({
    gridColumn: {
        padding: theme.spacing(0.5),
    },
    grid: {
        padding: theme.spacing(0),
    },
    navText: {
        paddingLeft: theme.spacing(0.5),
    },
    gridItem: {
        padding: theme.spacing(0),
    },
    upperItem: {
        paddingBottom: theme.spacing(0.6),
    },
    grow: {
        flexGrow: 1,
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
    embeddingPaper: {
        padding: theme.spacing(0),
        height: "40vh",
    },
    zoomPaper: {
        padding: theme.spacing(0),
        height: "44vh",
    },
    searchPaper: {
        padding: theme.spacing(0),
        height: "44vh",
    },
    recomPaper: {
        padding: theme.spacing(0),
        height: "27.5vh",
    },
    ratePaper: {
        padding: theme.spacing(0),
        height: "23vh",
    },
    detailPaper: {
        padding: theme.spacing(0),
        height: "40vh",
    },
    historyPaper: {
        padding: theme.spacing(0),
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
        padding: theme.spacing(0.5),
    },
    panelTitle: {
        minWidth:"200px",
        paddingLeft: theme.spacing(1),
    },
    entityType: {
        paddingLeft: theme.spacing(0.5),
    },
    entityControlLabel: {
        fontSize:11,
        paddingLeft: 5,
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
    toolbarGrid: {
        display:"flex",
        justifyContent: "space-between",
        minHeight:theme.spacing(4),
    },
    titleTypo: {
        flex:1,
    },
    datasetTypo: {
        flex:1.3,
        display:"flex",
    },
    nonzeroTypo: {
        flex:2.8
    },
    exportTypo: {
        display:"flex",
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
    objectChip: {
        "& .MuiChip-label":{
            paddingLeft:0,
            paddingRight:10,
        },
        marginLeft:10,
        marginBottom:8,
        height:14,

    },
    formLabel: {
        // "& .MuiFormControlLabel-label":{
        //     "vertical-align":null,
        // },
        marginLeft:0,
        marginRight:0,
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