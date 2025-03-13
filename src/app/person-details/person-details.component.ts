import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.css'
})
export class PersonDetailsComponent implements OnInit {
  personId!: number;
  person: any;
  private routeSub!: Subscription

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.personId = +params['id']
      this.getPersonDetails()
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe()
  }

  getPersonDetails() {
    this.tmdbService.getPersonDetails(this.personId).subscribe(data => {
      this.person = data;
    })
  }
}