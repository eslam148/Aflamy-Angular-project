import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { GenresDto } from '../models/genre';
import {
  TvShow,
  TvShowCredits,
  TvShowDto,
  TvShowImages,
  TvShowVideoDto,
} from '../models/tv';

@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  _URL = 'https://api.themoviedb.org/3';
  apiKey = '4f1a7cb7726c85f40710754d05ef8228';
  constructor(private http: HttpClient) {}
  getTvShows(type: string = 'upcoming', count: number = 12) {
    return this.http
      .get<TvShowDto>(`${this._URL}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }

  getTvShow(id: string) {
    return this.http.get<TvShow>(
      `${this._URL}/tv/${id}?api_key=${this.apiKey}`
    );
  }

  getTvShowVideos(id: string) {
    return this.http
      .get<TvShowVideoDto>(
        `${this._URL}/tv/${id}/videos?api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getTvShowsGenres() {
    return this.http
      .get<GenresDto>(`${this._URL}/genre/tv/list?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.genres);
        })
      );
  }

  getTvShowsByGenre(genreId: string, pageNumber: number) {
    return this.http
      .get<TvShowDto>(
        `${this._URL}/discover/tv?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getTvShowImages(id: string) {
    return this.http.get<TvShowImages>(
      `${this._URL}/tv/${id}/images?api_key=${this.apiKey}`
    );
  }

  getTvShowCredits(id: string) {
    return this.http.get<TvShowCredits>(
      `${this._URL}/tv/${id}/credits?api_key=${this.apiKey}`
    );
  }

  getTvShowSimilar(id: string) {
    return this.http
      .get<TvShowDto>(`${this._URL}/tv/${id}/similar?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, 12));
        })
      );
  }

  searchTvShows(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/tv' : '/tv/popular';
    return this.http
      .get<TvShowDto>(
        `${this._URL}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`
      )
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getTvs(type: string = 'latest', count: number = 12) {
    return this.http
      .get<TvShowDto>(`${this._URL}/tv/${type}?api_key=${this.apiKey}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }
}
