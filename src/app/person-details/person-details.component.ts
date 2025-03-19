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
    });
  
    this.actorService.getPersonCredits(this.personId).subscribe(credits => {
      const creditMap = new Map();
  
      [...credits.cast, ...credits.crew].forEach(credit => {
        const key = `${credit.media_type}-${credit.id}`;
        
        if (creditMap.has(key)) {
          const existing = creditMap.get(key);
          existing.roles.push(credit.character || credit.job);
          if ((credit.popularity || 0) > (existing.popularity || 0)) {
            existing.popularity = credit.popularity;
          }
        } else {
          creditMap.set(key, {
            ...credit,
            roles: [credit.character || credit.job],
            popularity: credit.popularity || 0
          });
        }
      });
  
      this.combinedCredits = Array.from(creditMap.values())
        .filter(credit => credit.popularity)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 15);
    });
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