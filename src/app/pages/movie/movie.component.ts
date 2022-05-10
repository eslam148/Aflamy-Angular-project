import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Movie,
  MovieCredits,
  MovieImages,
  MovieVideo,
} from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { first } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  movieDetails: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  similarMovies: Movie[] = [];
  readonly imagesSizes = IMAGES_SIZES;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovie(id);
      this.getMoviesVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getSimilarMovies(id);
    });
  }
  getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe((movie) => {
      this.movieDetails = movie;
    });
  }
  getMoviesVideos(id: string) {
    this.moviesService.getMoviesVideos(id).subscribe((videoData) => {
      this.movieVideos = videoData;
    });
  }
  getMovieImages(id: string) {
    this.moviesService.getMovieImages(id).subscribe((imagesData) => {
      this.movieImages = imagesData;
    });
  }
  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id).subscribe((movieCreditsData) => {
      this.movieCredits = movieCreditsData;
    });
  }
  getSimilarMovies(id: string) {
    this.moviesService.getSimilarMovies(id).subscribe((similar) => {
      this.similarMovies = similar;
    });
  }
}
