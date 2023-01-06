import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import GenreFilter from './common/genrefilter';
import { getGenres } from '../services/fakeGenreService';

class TableMovies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
    }

    componentDidMount() {
        const genres = [{ name: "All Genres" }, ...getGenres()]
        this.setState({ movies: getMovies(), genres })
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({ movies });
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    handlePageChange = page => {
        this.setState({ currentPage: page })
    }

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 })

    }

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, selectedGenre, movies: allMovies } = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const movies = paginate(filtered, currentPage, pageSize);

        return (
            <div className='row'>
                <div className="col-3">
                    <GenreFilter items={this.state.genres} onItemSelect={this.handleGenreSelect} selectedItem={this.state.selectedGenre} />
                </div>
                <div className="col">
                    {/* table.table>thead>tr>th*4 */}
                    <p>Showing {filtered.length} movies in the database.</p>
                    {movies.length ? (
                        <div>

                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Rate</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {movies.map((movie) => (
                                        <tr key={movie._id}>
                                            <th scope="row">{movie.title}</th>
                                            <td>{movie.genre.name}</td>
                                            <td>{movie.numberInStock}</td>
                                            <td>{movie.dailyRentalRate}</td>
                                            <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)} /></td>
                                            <td>
                                                <button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination itemsCount={filtered.length} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage} />
                        </div>

                    ) : (
                        <div>There are no movies in the database</div>
                    )}</div>



            </div>
        );
    }
}

export default TableMovies;