import React, {Fragment, useEffect} from 'react'
import {Grid, ImageList, ImageListItem, ImageListItemBar, Paper, Table, TableContainer} from "@material-ui/core";
import './Home.css'

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

const Home = ()=>{
    const[movieList, setMovieList] = React.useState(null);
    invokeMovieControllerAPI(movieList, setMovieList, null);
    let dummyMovieList = [
        {
            "id": "7d174a25-ba31-45a8-85b4-b06ffc9d5f8f",
            "title": "Sanju",
            "storyline": "Coming from a family of cinematic legends, East Indian actor Sanjay Dutt reaches dizzying heights of success -- but also battles numerous addictions and other personal demons",
            "genres": [],
            "duration": 162,
            "poster_url": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Sanju_-_Theatrical_poster.jpg/220px-Sanju_-_Theatrical_poster.jpg",
            "trailer_url": "https://www.youtube.com/watch?v=1J76wN0TPI4",
            "wiki_url": "https://en.wikipedia.org/wiki/Sanju",
            "release_date": "2018-06-29",
            "censor_board_rating": "UA",
            "rating": 4.0,
            "status": "RELEASED",
            "artists": null
        },
        {
            "id": "009ae262-a234-11e8-b475-720006ceb890",
            "title": "The Godfather",
            "storyline": "A chilling portrait of the Corleone familys rise and near fall from power in America along with balancing the story of the Sicilian clans ugly crime business in which they are engaged.",
            "genres": [],
            "duration": 177,
            "poster_url": "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
            "trailer_url": "https://www.youtube.com/watch/?v=sY1S34973zA",
            "wiki_url": "https://en.wikipedia.org/wiki/The_Godfather",
            "release_date": "1972-03-15",
            "censor_board_rating": "A",
            "rating": 9.2,
            "status": "RELEASED",
            "artists": null
        },
        {
            "id": "00ae33e8-a235-11e8-9077-720006ceb890",
            "title": "The Revenant",
            "storyline": "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.",
            "genres": [],
            "duration": 156,
            "poster_url": "https://upload.wikimedia.org/wikipedia/en/b/b6/The_Revenant_2015_film_poster.jpg",
            "trailer_url": "https://www.youtube.com/watch?v=LoebZZ8K5N0",
            "wiki_url": "https://en.wikipedia.org/wiki/The_Revenant_(2015_film)",
            "release_date": "2015-12-16",
            "censor_board_rating": "UA",
            "rating": 8.0,
            "status": "RELEASED",
            "artists": null
        },
        {
            "id": "066e720c-a235-11e8-9077-720006ceb890",
            "title": "Annabelle: Creation",
            "storyline": "12 years after the tragic death of their little girl, a dollmaker and his wife welcome a nun and several girls from a shuttered orphanage into their home, where they soon become the target of the dollmakers possessed creation, Annabelle.",
            "genres": [],
            "duration": 109,
            "poster_url": "https://upload.wikimedia.org/wikipedia/en/0/08/Annabelle_Creation.jpg",
            "trailer_url": "https://www.youtube.com/watch?v=KisPhy7T__Q",
            "wiki_url": "https://en.wikipedia.org/wiki/Annabelle:_Creation",
            "release_date": "2017-08-11",
            "censor_board_rating": "A",
            "rating": 6.6,
            "status": "RELEASED",
            "artists": null
        },
        {
            "id": "0c364cd2-a235-11e8-9077-720006ceb890",
            "title": "Shahid",
            "storyline": "Shahid Azmi becomes an unlikely champion of human rights, particularly for Indias Muslim minority.",
            "genres": [],
            "duration": 129,
            "poster_url": "https://upload.wikimedia.org/wikipedia/en/c/cd/Shahid_Poster_%282013%29.jpg",
            "trailer_url": "https://www.youtube.com/watch?v=XiQXmIn7qbI",
            "wiki_url": "https://en.wikipedia.org/wiki/Shahid_(film)",
            "release_date": "2013-10-18",
            "censor_board_rating": "U",
            "rating": 8.6,
            "status": "RELEASED",
            "artists": null
        },
        {
            "id": "52974690-a235-11e8-9077-720006ceb890",
            "title": "The Dark Knight",
            "storyline": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            "genres": [],
            "duration": 152,
            "poster_url": "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg",
            "trailer_url": "https://www.youtube.com/watch?v=EXeTwQWrcwY",
            "wiki_url": "https://en.wikipedia.org/wiki/The_Dark_Knight_(film)",
            "release_date": "2008-07-18",
            "censor_board_rating": "A",
            "rating": 9.0,
            "status": "RELEASED",
            "artists": null
        }
    ];
    return(
        <Fragment>
            <Grid container spacing={3}>
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
            </Grid>
        </Fragment>
    );
}

export default Home;