import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Item } from '../../models/item';
import { TvshowsService } from '../../services/tvshows.service';
import { mapTvShowToItem } from '../../models/tv';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  popularMovies: Item[] = [];
  upcomingMovies: Item[] = [];
  topRatedMovies: Item[] = [];
  popularTvShows: Item[] = [];
  constructor(
    private moviesService: MoviesService,
    private tvShowsService: TvshowsService
  ) {}

  ngOnInit(): void {
    this.moviesService.getMovies('upcoming').subscribe((movies) => {
      this.upcomingMovies = movies;
    });
    this.moviesService.getMovies('popular').subscribe((movies) => {
      this.popularMovies = movies;
    });
    this.moviesService.getMovies('top_rated').subscribe((movies) => {
      this.topRatedMovies = movies;
    });

    this.tvShowsService.getTvs('popular').subscribe((tvShows) => {
      this.popularTvShows = tvShows.map((tvshow) => mapTvShowToItem(tvshow));
    });
  }
}
