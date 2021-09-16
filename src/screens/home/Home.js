import React, {Fragment, useEffect} from 'react'
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import {
    Checkbox,
    Grid,
    ImageList,
    ImageListItem,
    ImageListItemBar, Input, InputLabel, ListItemText, MenuItem,
    Paper, Select,
    Table,
    TableContainer,
    TextField
} from "@material-ui/core";
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

const invokeRESTAPI = async (baseUrl, element, suffix, filterCriteria, method, headers) =>{
    let response = await fetch(`${baseUrl}${element}${suffix}${filterCriteria}`,{
        method: method,
        headers:headers
    });
    if (response.ok){
        const result = await response.json();
        return await result;
    }
    else return null;
}

const getUpcomingMovieList = async () =>{
    return await invokeRESTAPI("http://localhost:3000/api/v1",
        "/movies",
        "?",
        "page=1&limit=6",
        "GET",
        {"Accept": "application/json"});
}


//async function will return a promise
const getGenres = async () => {
    return await invokeRESTAPI("http://localhost:3000/api/v1",
                                            "/genres",
                                            "",
                                            "",
                                            "GET",
                                            {"Accept": "application/json"});
}

const movieSearchHandler = () => {

}

const Home = ()=>{
    const[movieList, setMovieList] = React.useState({movies:[]});
    const[genreList, setGenreList] = React.useState({genres:[]});
    useEffect(()=>{
        getUpcomingMovieList()
            .then(response => setMovieList(response))
            .catch(error=>console.log('error', error));
    },[]);
    useEffect(()=>{
        getGenres()
            .then(response => setGenreList(response))
            .catch(error=>console.log('error',error));
    },[]);
    return(
        <Fragment>
            <Grid container>
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
                        {movieList.movies.map((movie) => (
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
                    <form onSubmit={movieSearchHandler}>
                        <br/><br/>
                        <TextField
                            id="title"
                            label="Movie Name"
                            type="text"
                            name="title"
                            /*onChange={}*/>
                        </TextField>
                        <br/><br/>
                        <InputLabel id="filter-genres">Genres</InputLabel>
                        <Select
                            labelId="filter-genres"
                            id="filter-genres-multiple"
                            multiple
                            value={genreList.genres}
                            /*onChange={}*/
                            input={<Input/>}>
                            {genreList.genres.map((eachGenre)=>(
                                <MenuItem key={eachGenre.genre} value={eachGenre.genre}>
                                    <Checkbox checked={eachGenre.genre.indexOf(eachGenre.genre) > -1} />
                                    <ListItemText primary={eachGenre.genre}/>
                                </MenuItem>
                            ))}
                        </Select>
                        <br/><br/>
                        <TextField
                            id="artists"
                            label="Artists"
                            type="text"
                            name="artists"
                            /*onChange={}*/>
                        </TextField>
                        <br/><br/>
                        <TextField
                            id="release_date_start"
                            label="Release Date Start"
                            type="date"
                            name="release_date_start"
                            InputLabelProps={{ shrink: true }}
                            /*onChange={}*/>
                        </TextField>
                        <br/><br/>
                        <TextField
                            id="release_date_end"
                            label="Release Date End"
                            type="date"
                            name="release_date_end"
                            InputLabelProps={{ shrink: true }}
                            /*onChange={}*/>
                        </TextField>
                        <br/><br/>
                        <Button type="submit" color="primary">Apply</Button>
                    </form>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default Home;