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
    saveIcon:{
        transform:"scale(0.7)"
    },
    ssIcon:{
        transform:"scale(0.6)"
    },
    submitIcon:{
        transform:"scale(0.6)"
    },
    sqIcon:{
        transform:"scale(0.7)"
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
    recomTableCont: {
        flex: 1,
        overflow: "auto",
    },
    recomTable: {
        
    },
    recomTableArrowCol: {
        minWidth:30,
    },
    recomTableIDCol: {
        minWidth:45,
    },
    recomTableTypeCol: {
        minWidth:40,
    },
    recomTableNameCol: {
        minWidth:"calc(100%-240px)",
    },
    recomTableClusterCol : {
        minWidth:45,
    },
    recomTableRatingCol : {
        minWidth:80,
    },
    detailTableCluCol: {
        minWidth:45,
    },
    recomTableRow:{
        backgroundColor:"rgb(244,230,198)",
    },
    slider:{
        "&.MuiSlider-marked": {
          marginBottom: 12,
        },
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
        // minWidth:"200px",
        paddingLeft: theme.spacing(1),
    },
    entityType: {
        paddingLeft: theme.spacing(0.5),
    },
    entityControlLabel: {
        fontSize:11,
        paddingLeft: 5,
    },
    autocomLabel: {
        fontSize:11,
    },
    queryControlLabel: {
        
    },
    searchGridOuter: {
        height: "100%",
        display: "flex",
        padding: theme.spacing(0),
        paddingBottom: 4,
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
    zoomStack: {
        flex: 2,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1.5),
    },
    rateStack: {
        flex: 2,
    },
    zoomTsne: {
        flex: 0.5,
    },
    zoomTitle1: {
        
    },
    zoomTitle2: {
        paddingLeft: theme.spacing(1),
    },
    zoomTypo: {
        flex: 0.7
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
    zoomGrid: {
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
    nameTypo: {
        marginLeft:4,
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
    searchButtonGrid: {
        display: "flex",
    },
    searchButton: {
        height: theme.spacing(2.5),
        width: theme.spacing(10.5),
        marginTop: theme.spacing(0.5),
        marginRight: theme.spacing(1),
        borderRadius: 8,
    },
    submitButton: {
        height: theme.spacing(2.5),
        width: theme.spacing(10.5),
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
        marginRight: theme.spacing(1),
        borderRadius: 8,
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
        marginBottom:4,
        marginTop:2,
        height:14,

    },
    objectChip2: {
        "& .MuiChip-label":{
            paddingLeft:0,
            paddingRight:10,
        },
        marginLeft:4,
        marginBottom:4,
        height:14,

    },
    autoChip: {
        "& .MuiChip-label":{
            paddingLeft:0,
            paddingRight:10,
        },
        marginLeft:4,
        marginBottom:4,
        height:14,

    },
    formLabel: {
        // "& .MuiFormControlLabel-label":{
        //     "vertical-align":null,
        // },
        marginLeft:0,
        marginRight:0,
    },
    queryFormLabel: {
        marginLeft: -8,
        marginRight: 0,
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