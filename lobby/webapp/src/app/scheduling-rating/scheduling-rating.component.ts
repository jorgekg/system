import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SchedulingService, Rating } from 'src/app/core/entities/scheduling/scheduling.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduling-rating',
  templateUrl: './scheduling-rating.component.html',
  styleUrls: ['./scheduling-rating.component.css']
})
export class SchedulingRatingComponent implements OnInit {

  private rating: Rating;

  public form: FormGroup;
  public isSave = false;

  constructor(
    private schedulingService: SchedulingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      const rt = await this.schedulingService.getRatingyLink(params.id).toPromise();
      if (rt && rt.contents.length > 0) {
        [this.rating] = rt.contents;
        if (this.rating.rating) {
          this.router.navigate(['error/400']);
        }
      } else {
        this.router.navigate(['error/400']);
      }
    });
    this.form = this.formBuilder.group({
      rating: '1',
      description: []
    });
  }

  public async save() {
    const form = this.form.getRawValue();
    this.rating.rating = form.rating;
    this.rating.description = form.description;
    this.isSave = true;
    await this.schedulingService.putRating(this.rating).toPromise();
  }

}
