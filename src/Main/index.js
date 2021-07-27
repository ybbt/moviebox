import React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';

import Film from '../Film';
import Pagination from '../Pagination';

import style from './style.module.css'

class Main extends React.Component {

  render() {

    return (
      <div className={style.main}>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Redirect from="/" to="/1" /> */}
          <Route path="/film/:id_film" component={FilmDetails} />
          <Route path="/:region" component={Region} />
        </Switch>

      </div>

    );

  }
}

function Home() {

  return (
    <Redirect from="/" to="/ALL/1" />
  );

}

function Region(props) {

  return (
    <Switch>
      <Route exact path="/:region" component={RegionRedirect} />
      <Route path="/:region/:page" component={Page} />
    </Switch>
  )
}

function RegionRedirect(props) {
  return (
    <Redirect from={`/${props.match.params.region}`} to={`/${props.match.params.region}/1`} />
  );

}

function ApiService(responseString, setStateFunc) {
  fetch(responseString/* , { mode: 'no-cors' } */)
    .then(
      response => response.ok ? response.json() : Promise.reject(Error('Failed to load'))
    )
    .then(
      setStateFunc,
      error => console.log(error)
    );
}

class FilmDetails extends React.Component {
  stringPathOrig = 'https://image.tmdb.org/t/p/original/';
  stringPathAlt = 'http://via.placeholder.com/500x750png?text=image+is+missing';
  stringPath = null;

  state = {
    film: {},
  }

  setStateDetails(result) {
    this.setState({
      film: result,
    })
  }

  componentDidMount() {
    console.log("hully");
    console.log(this.props.match.params.id_film);

    // this.setState({ region: this.props.match.params.region });
    // let regionString = this.props.match.params.region === "ALL" ? "" : `&region=${this.props.match.params.region}`;

    /* this. */ApiService(`https://api.themoviedb.org/3/movie/${this.props.match.params.id_film}?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA`, this.setStateDetails.bind(this));
  }

  render() {
    console.log(this.state.film);
    this.state.film.poster_path ? this.stringPath = `${this.stringPathOrig}${this.state.film.poster_path}` : this.stringPath = this.stringPathAlt;
    return (
      <div className="style.filmDetail">
        <img src={this.stringPath} alt="sorry" className={style.image} />
      </div>
    );
  }
}

class Page extends React.Component {

  state = {
    movies: [],
    pages: 1,
    genres: {},
    region: "ALL",
  };

  setStateMovies(result) {
    this.setState({
      movies: result.results,
      pages: result.total_pages,
    });
  }

  setStateGenres(result) {
    let temp = {};
    result.genres.map(item => temp[item.id] = item.name);
    this.setState({
      genres: temp,
    });
  }

  componentDidMount() {
    console.log("helly");

    this.setState({ region: this.props.match.params.region });

    let page = this.props.match.params.page ? this.props.match.params.page : 1;
    let regionString = this.props.match.params.region === "ALL" ? "" : `&region=${this.props.match.params.region}`

    /* this. */ApiService(`https://api.themoviedb.org/3/movie/now_playing?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA&page=${page}${regionString}`, this.setStateMovies.bind(this));

    /* this. */ApiService('https://api.themoviedb.org/3/genre/movie/list?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA', this.setStateGenres.bind(this));
  }

  componentDidUpdate(prevProps) {

    if (prevProps.match.params.page !== this.props.match.params.page || prevProps.match.params.region !== this.props.match.params.region) {
      console.log(this.props.match.params.page);
      // console.log(this.props.match.params.region);
      this.setState({ region: this.props.match.params.region });

      let page = this.props.match.params.page ? this.props.match.params.page : 1;
      let regionString = this.props.match.params.region === "ALL" ? "" : `&region=${this.props.match.params.region}`

      /* this. */ApiService(`https://api.themoviedb.org/3/movie/now_playing?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA&page=${page}${regionString}`, this.setStateMovies.bind(this));

      /* this. */ApiService('https://api.themoviedb.org/3/genre/movie/list?api_key=399a504355fb64900d932566782c9bb5&language=uk-UA', this.setStateGenres.bind(this));
    }
  }


  render() {
    return (
      <div >
        <div className={style.films}>
          {this.state.movies.map(item => {
            return (
              <div key={item.id} className={style.film}>
                <Film id={item.id} src={item.backdrop_path} year={item.release_date} name={item.title} voteAvarage={item.vote_average} genre={item.genre_ids.map(id => this.state.genres[id])} />
              </div>
            )
          })}
        </div>
        <Pagination
          pages={this.state.pages}
          activePage={this.props.match.params.page}
          region={this.state.region}
          visiblePages={3}
          firstEndVisiblePage={2}
        />
      </div>
    );
  }
}

export default Main;

