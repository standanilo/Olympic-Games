import express from 'express';
import Results from '../models/results';

export class ResultsController{

    addResult = (req: express.Request, res: express.Response)=>{
        let result = new Results(req.body);

        result.save().then((result)=>{
            res.status(200).json({'message':'result added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })
    }
    
    searchResults = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let discipline = req.body.discipline;
        let gender = req.body.gender;
        let round = req.body.round;

        Results.find({'sport': sport, 'discipline': discipline, 'gender': gender, 'round': round},
        (err, result)=>{
            if(err) console.log(err);
            else res.json(result);
        }).sort({'result': 1})
    }
}