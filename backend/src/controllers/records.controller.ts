import express from 'express';
import Records from '../models/records';

export class RecordsController{

    searchAllMales = (req: express.Request, res: express.Response)=>{
        let a = "male"
        Records.find({'gender': a}, (err, records)=>{
            if(err) console.log(err);
            else res.json(records)
        })
    }

    searchAllFemales = (req: express.Request, res: express.Response)=>{
        let a = "female"
        Records.find({'gender': a}, (err, records)=>{
            if(err) console.log(err);
            else res.json(records)
        })
    }
}