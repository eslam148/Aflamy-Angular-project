import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;
  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getPagesMovies(1);
      }
    });
  }

  getPagesMovies(page: number, searchKeyWord?: string) {
    this.moviesService.searchMovies(page, searchKeyWord).subscribe((movies) => {
      this.movies = movies;
    });
  }
  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagesMovies(pageNumber, this.searchValue);
      } else {
        this.getPagesMovies(pageNumber);
      }
    }
  }
  getMoviesByGenre(genreId: string, pageNumber: number) {
    this.moviesService
      .getMoviesByGenre(genreId, pageNumber)
      .subscribe((movies) => {
        this.movies = movies;
      });
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPagesMovies(1, this.searchValue);
    }
  }
}
