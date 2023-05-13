import { Component, OnInit } from '@angular/core';
import { Records } from '../models/records';
import { RecordsService } from '../records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  constructor(private recordsService : RecordsService) { }

  ngOnInit(): void {
    this.recordsService.searchAllMales().subscribe((data: Records[])=>{
      this.males = data;
    })
    this.recordsService.searchAllFemales().subscribe((data: Records[])=>{
      this.females = data;
    })
  }


  females: Records[];
  males: Records[];
  
  p1: number = 1;
  n1: number = 10;
  p: number = 1;
  n: number = 10;


}
