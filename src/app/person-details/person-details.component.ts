import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from '../../services/actor.service';
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
  

  constructor(private actorService: ActorService, private route: ActivatedRoute, private location: Location, private router: Router) { }

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
    this.actorService.getPersonDetails(this.personId).subscribe(data => {
      this.person = data;
    })

    this.actorService.getPersonCredits(this.personId).subscribe(credits => {
      this.combinedCredits = [...credits.cast, ...credits.crew].filter(credit => credit.popularity).sort((a, b) => {
        return(b.popularity || 0) - (a.popularity || 0);
      }).slice(0, 15)
    })
  }

  goToMediaDetails(media: any) {
    const route = media.media_type === 'tv' ? '/tv' : '/movie'
    const title = media.title || media.name

    this.router.navigate([route, media.id, title])
  }

  goBack() {
    this.location.back()
  }
}