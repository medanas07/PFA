import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContinentService } from '../../../services/continent.service';
import { Continent } from '../../../models/continent.model';
import { NgIf } from '@angular/common';
import { HomeComponent } from '../../../home/home.component';
@Component({
  selector: 'app-continent-detail',
  templateUrl: './continent-detail.component.html',
  styleUrls: ['./continent-detail.component.css'],
  imports : [NgIf,HomeComponent]
})
export class ContinentDetailComponent implements OnInit {
  continent: Continent | undefined;

  constructor(
    private route: ActivatedRoute,
    private continentService: ContinentService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.continentService.getContinent(id).subscribe(data => {
      this.continent = data;
    });
  }
}