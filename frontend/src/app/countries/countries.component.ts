import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Countries } from '../models/countries';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private countriesService : CountriesService) { }

  ngOnInit(): void {
    this.countriesService.searchAllCountries().subscribe((data: Countries[])=>{
      this.countries = data;
      this.countries.sort((a,b) => a.name > b.name ? 1 : -1)
    })
  }

  p: number = 1;
  n: number = 10;
  countries: Countries[];
  
}
