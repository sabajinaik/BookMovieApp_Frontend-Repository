import React, {Fragment, useEffect} from 'react'
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import {Grid, ImageList, ImageListItem, ImageListItemBar, Paper, Table, TableContainer} from "@material-ui/core";
import './Home.css'
import {TabPanel} from "@material-ui/lab";

const invokeMovieControllerAPI = (movieList, setMovieList, dependencyList, filterCriteria=`&limit=6`)=> {
    useEffect(()=>{
        fetch(`http://localhost:8085/api/v1/movies?page=${filterCriteria}`,{
            method: 'GET',
            headers:{
                "Accept": "application/json",
            }
        })
            .then(response=>response.json())
            .then(result=>{
                const movieListArray = result["movies"];
                if (movieListArray !== null && movieListArray.length > 0){
                    setMovieList(movieListArray);
                }
            })
            .catch(error=>console.log('error', error))
    },[dependencyList]);
}

const searchMoviesUsingAPI = async (filterCriteria) =>{
    let response = await fetch(`http://localhost:3000/api/v1/movies?page=${filterCriteria}`,{
        method: 'GET',
        headers:{
            "Accept": "application/json",
        }
    });

    if (response.ok){
        const result = await response.json();
        return await result["movies"];
    }
    else{
        return null;
    }
}

const movieSearchHandler = () => {

}

const Home = ()=>{
    const[movieList, setMovieList] = React.useState([]);
    let dummyMovieList = [];
    useEffect(()=>{
        searchMoviesUsingAPI("&limit=6")
            .then(response => {
                dummyMovieList = response;
                setMovieList({...response})
            })
            .catch(error=>console.log('error', error));

    },[]);

    console.log(Object.entries(movieList));

    return(
        <Fragment>
            <Grid container spacing={15}>
                <Grid className="home-header-formatting" item xs={12}>
                    Upcoming Movies
                </Grid>
                <Grid item xs={12}>
                    <ImageList className="upcoming-movies"
                               style={{flexWrap:"nowrap",
                                   transform: "translateZ(0)",
                                   height: "180px",
                                   width: "100%"}}
                               cols={4}
                    onScroll={()=>{
                        //implement get method to fetch more movies
                    }}>
                        {dummyMovieList.map((movie) => (
                            <ImageListItem key={movie.id} onClick={()=>{alert("clicked")}}>
                                <img src={movie.poster_url} alt={`{movie.title} Poster`}/>
                                <ImageListItemBar title={movie.title}>
                                </ImageListItemBar>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
                <Grid item xs={9}>
                    left side
                </Grid>
                <Grid item xs={3}>
                    <ValidatorForm onSubmit={movieSearchHandler}>
                        <TextValidator
                            id="title"
                            label="Movie Name"
                            type="text"
                            name="title"
                            /*onChange={}*/
                            value="Movie Name">
                        </TextValidator>
                        <br/><br/>
                        <TextValidator
                            id="generes"
                            label="Generes"
                            type="text"
                            name="genres"
                            /*onChange={}*/
                            value="Generes">
                        </TextValidator>
                        <br/><br/>
                        <TextValidator
                            id="artists"
                            label="Artists"
                            type="text"
                            name="artists"
                            /*onChange={}*/
                            value="Artists">
                        </TextValidator>
                        <br/><br/>
                        <TextValidator
                            id="release_date_start"
                            label="Release Date Start"
                            type="date"
                            name="release_date_start"
                            /*onChange={}*/>
                        </TextValidator>
                        <br/><br/>
                        <TextValidator
                            id="release_date_end"
                            label="Release Date End"
                            type="date"
                            name="release_date_end"
                            /*onChange={}*/>
                        </TextValidator>
                        <br/><br/>
                        <Button type="submit" color="primary">Apply</Button>
                    </ValidatorForm>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default Home;