import { Component, OnInit } from '@angular/core';
import { TvshowsService } from 'src/app/services/tvshows.service';
import { Genre } from '../../models/genre';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  genreDetails: Genre[] = [];
  tvShowGenres: Genre[] = [];
  constructor(
    private moviesService: MoviesService,
    private tvShowsService: TvshowsService
  ) {}

  ngOnInit(): void {
    this.moviesService.getMoviesGenres().subscribe((genre) => {
      this.genreDetails = genre;
    });
    this.tvShowsService.getTvShowsGenres().subscribe((genresData) => {
      this.tvShowGenres = genresData;
    });
  }
}
