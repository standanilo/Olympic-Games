import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Countries } from '../models/countries';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-medals',
  templateUrl: './medals.component.html',
  styleUrls: ['./medals.component.css']
})
export class MedalsComponent implements OnInit {

  constructor(private countriesService : CountriesService) { }

  ngOnInit(): void {
    this.countriesService.searchAllCountries().subscribe((data: Countries[])=>{
    this.countries = data;
    this.countries.sort((a,b) => {
      let formattedNumberA1 = a.numGold.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
      let formattedNumberB1 = b.numGold.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
      let formattedNumberA2 = a.numSilver.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
      let formattedNumberB2 = b.numSilver.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
      let formattedNumberA3 = a.numBronze.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
      let formattedNumberB3 = b.numBronze.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
      formattedNumberA1 = formattedNumberA1 + formattedNumberA2 + formattedNumberA3;
      formattedNumberB1 = formattedNumberB1 + formattedNumberB2 + formattedNumberB3;
      return formattedNumberA1 < formattedNumberB1 ? 1 : -1;
    });
    for(let i = 0; i < this.countries.length; i++){
      this.names[i] = this.countries[i].name;
      this.medals[i] = this.countries[i].numGold + this.countries[i].numSilver + this.countries[i].numBronze;
      this.gold[i] = this.countries[i].numGold;
      this.silver[i] = this.countries[i].numSilver;
      this.bronze[i] = this.countries[i].numBronze;
    }
  })
  }

  // sortMedals(a: Countries, b: Countries){
  //   if(a.numGold > b.numGold) return -1;
  //   else if(a.numSilver > b.numSilver) return -1;
  //   else if(a.numBronze > b.numBronze) return -1;
  //   else return 1;
  // }

  p: number = 1;
  n: number = 10;
  countries: Countries[];
  names: string[] = [];
  medals: number[] = [];
  gold: number[] = [];
  silver: number[] = [];
  bronze: number[] = [];
  table: number = 0;
  
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Total medals', backgroundColor: '#CB4F6E', hoverBackgroundColor: '#B11D33', borderColor: 'white', borderWidth: 1, hoverBorderColor: 'black'},
    { data: [], label: 'Gold medals', backgroundColor: '#D4AF37', hoverBackgroundColor: '#AB8D3F', borderColor: 'white', borderWidth: 1, hoverBorderColor: 'black'},
    { data: [], label: 'Silver medals', backgroundColor: '#D0D2D1', hoverBackgroundColor: '#A8A9AD', borderColor: 'white', borderWidth: 1, hoverBorderColor: 'black'},
    { data: [], label: 'Bronze medals', backgroundColor: '#B08D57', hoverBackgroundColor: '#A97142', borderColor: 'white', borderWidth: 1, hoverBorderColor: 'black'}
  ];

  public update(): void {
    this.barChartLabels = this.names;
    this.barChartData[0].data = this.medals;
    this.barChartData[1].data = this.gold;
    this.barChartData[2].data = this.silver;
    this.barChartData[3].data = this.bronze;
    this.table = 1;
  }
}
