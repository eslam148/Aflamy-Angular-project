import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Movie,
  MovieCredits,
  MovieDto,
  MovieImages,
  MovieVideoDto,
} from '../models/movie';
import { GenresDto } from '../models/genre';
import { of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  _URL = 'https://api.themoviedb.org/3';
  apiKey = '4f1a7cb7726c85f40710754d05ef8228';
  constructor(private http: HttpClient) {}

  getMovies(type: string = 'upcoming', count: number = 12) {
    return this.http
      .get<MovieDto>(`${this._URL}/movie/${type}?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }

  searchMovies(page: number, searchValue?: string) {
    const URLS = searchValue ? '/search/movie' : '/movie/popular';
    return this.http
      .get<MovieDto>(
        `${this._URL}${URLS}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
  getMovie(id: string) {
    return this.http.get<Movie>(
      `${this._URL}/movie/${id}?api_key=${this.apiKey}`
    );
  }
  getMoviesVideos(id: string) {
    return this.http
      .get<MovieVideoDto>(
        `${this._URL}/movie/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
  getMovieImages(id: string) {
    return this.http.get<MovieImages>(
      `${this._URL}/movie/${id}/images?api_key=${this.apiKey}`
    );
  }
  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(
      `${this._URL}/movie/${id}/credits?api_key=${this.apiKey}`
    );
  }
  getSimilarMovies(id: string) {
    return this.http
      .get<MovieDto>(`${this._URL}/movie/${id}/similar?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, 12));
        })
      );
  }

  getMoviesGenres() {
    return this.http
      .get<GenresDto>(`${this._URL}/genre/movie/list?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.genres);
        })
      );
  }

  getMoviesByGenre(genreId: string, pageNumber: number) {
    return this.http
      .get<MovieDto>(
        `${this._URL}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
}
