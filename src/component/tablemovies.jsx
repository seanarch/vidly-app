import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';

class TableMovies extends Component {
    state = {
        movies: getMovies()
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

    render() {
        return (
            <div>
                {/* table.table>thead>tr>th*4 */}
                {this.state.movies.length ? (
                    <div>
                        <div>Showing {this.state.movies.length} movies in the database.</div>
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
                                {this.state.movies.map((movie) => (
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
                    </div>


                ) : (
                    <div>There are no movies in the database</div>
                )}


            </div>
        );
    }
}

export default TableMovies;