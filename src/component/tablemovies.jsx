import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import GenreFilter from './common/genrefilter';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class TableMovies extends Component {
    state = {
        movies: [],
        pageSize: 4,
        currentPage: 1,
        genres: [],
        sortColumn: { path: 'title', order: 'asc' }
    }

    componentDidMount() {
        const genres = [{ _id: '', name: "All Genres" }, ...getGenres()]
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

    handleSort = sortColumn => {
        this.setState({ sortColumn })
    }

    getPagedData = () => {
        const { pageSize, currentPage, sortColumn, selectedGenre, movies: allMovies } = this.state;

        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies }
    }

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn } = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>

        const { totalCount, data: movies } = this.getPagedData()

        return (
            <div className='row'>
                <div className="col-3">
                    <GenreFilter items={this.state.genres} onItemSelect={this.handleGenreSelect} selectedItem={this.state.selectedGenre} />
                </div>
                <div className="col">
                    {/* table.table>thead>tr>th*4 */}
                    <p>Showing {totalCount} movies in the database.</p>
                    {movies.length ? (
                        <div>
                            <MoviesTable movies={movies} onLike={this.handleLike} onDelete={this.handleDelete} sortColumn={sortColumn} onSort={this.handleSort} />

                            <Pagination itemsCount={totalCount} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage} />
                        </div>

                    ) : (
                        <div>There are no movies in the database</div>
                    )}</div>



            </div>
        );
    }
}

export default TableMovies;