import React from 'react'
import {Grid, GridList, Paper} from "@material-ui/core";

const Home = ()=>{
    return(
        <Grid>
            <Grid item xs={12}>
                <Paper>Header Goes Here</Paper>
            </Grid>
            <Grid>
                <Paper>Remaining</Paper>
            </Grid>
        </Grid>
    );
}

export default Home;