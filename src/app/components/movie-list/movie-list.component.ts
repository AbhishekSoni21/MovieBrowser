import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: any[];
  errorMsg: '';
  spinner = true;
  constructor(
    private mService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((qparams) => {
      this.mService.searchMovies(qparams['q']).subscribe(
        (data) => {
          if (data['Search']) {
            this.movies = data['Search'];
            this.errorMsg = '';
          } else {
            this.movies = [];
            this.errorMsg = data['Error'];
          }
          this.spinner = false;
        },
        (error) => {
          this.spinner = false;
        }
      );
    });
  }
}
