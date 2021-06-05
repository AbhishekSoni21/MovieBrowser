import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  spinner = true;
  constructor(
    private mService: MoviesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      let id = param['imdbID'];
      this.spinner = true;
      this.mService.getMovieDetails(id).subscribe(
        (data) => {
          this.movie = data;
          this.spinner = false;
        },
        (error) => {
          this.spinner = false;
        }
      );
    });
  }

  goBack() {
    window.history.back();
  }
}
