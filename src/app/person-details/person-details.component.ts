import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

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
  combinedCredits: any[] = [];
  private routeSub!: Subscription

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute, private location: Location) { }

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

    this.tmdbService.getPersonCombinedCredits(this.personId).subscribe(credits => {
      this.combinedCredits = credits.cast.sort((a: any, b: any) => 
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      )
    })
  }

  goBack() {
    this.location.back()
  }
}