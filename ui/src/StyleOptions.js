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
        backgroundColor:"rgb(249,231,204)",
    },
    slider:{
        "&.MuiSlider-marked": {
          marginBottom: 12,
        },
        // marginRight:theme.spacing(3)
    },
    zoomSliderBox:{
        width:"80px",
        display: "flex",
        alignItems: "center",
        height:"10px"
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
    zoomStackTypo: {
        flex: 2,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        // paddingBottom: theme.spacing(1.5),
        display: "flex",
        alignItems: "center"
    },
    rateStack: {
        flex: 2,
    },
    zoomTsne: {
        flex: 0.5,
    },
    zoomTsneTitle: {
        marginRight: "25px",
        marginBottom: "-5px"
    },
    zoomTitle1: {
        
    },
    zoomTitle2: {
        paddingLeft: theme.spacing(1),
    },
    zoomTitle3: {
        paddingLeft: theme.spacing(0.5),
    },
    zoomTypo: {
        flex: 0.7
    },
    entityNum: {
        flex: 0.7,
        marginRight: theme.spacing(1.5),
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
        alignItems: "center",
    },
    zoomStack: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    zoomSliderStack: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: theme.spacing(2),
        minWidth:"100px"
        
    },
    zoomSlider: {
        minWidth:"50px"
    },
    zoomSliderInnerStack: {
        display: "flex",
        minWidth:"100%",
        alignItems: "center",
        justifyContent: "space-between",
        // paddingRight: theme.spacing(2),
        
    },
    zoomGrid: {
        display: "flex",
        alignItems: "center"
    },
    toolbarGrid: {
        display:"flex",
        alignItems:"center",
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
        alignItems:"center"
    },
    pairSearchGrid: {
        display: "flex",
        alignItems: "center"
    },
    searchButtonGrid: {
        display: "flex",
    },
    searchButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: theme.spacing(2.5),
        width: theme.spacing(10.5),
        marginTop: theme.spacing(0.5),
        marginRight: theme.spacing(1),
        paddingLeft: 0,
        paddingRight: theme.spacing(1),
        borderRadius: 8,
    },
    submitButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: theme.spacing(2.5),
        width: theme.spacing(10),
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
        marginRight: theme.spacing(1),
        paddingLeft: 0,
        paddingRight: theme.spacing(1),
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    objectChipUn: {
        "& .MuiChip-label":{
            paddingLeft:0,
            paddingRight:10,
        },
        marginLeft:10,
        marginBottom:4,
        marginTop:2,
        height:14,
        backgroundColor:"rgb(194,211,235)"

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
    objectChip2Un: {
        "& .MuiChip-label":{
            paddingLeft:0,
            paddingRight:10,
        },
        marginLeft:4,
        marginBottom:4,
        height:14,
        backgroundColor:"rgb(194,211,235)"

    },
    autoChip: {
        "& .MuiChip-label":{
            paddingLeft:0,
            paddingRight:10,
        },
        root:{
            backgroundColor:"red"
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft:3
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