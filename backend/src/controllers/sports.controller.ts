import express from 'express';
import Sports from '../models/sports';

export class SportsController{

    searchAllSports = (req: express.Request, res: express.Response)=>{
        Sports.find({}, (err, sports)=>{
            if(err) console.log(err);
            else res.json(sports)
        })
    }

    searchSport = (req: express.Request, res: express.Response)=>{
        let name = req.body.name;

        Sports.findOne({'name':name},
        (err, sports)=>{
            if(err) console.log(err);
            else res.json(sports);
        }).exec();
    }

    addSport = (req: express.Request, res: express.Response)=>{
        let sport = new Sports(req.body);

        sport.save().then((sport)=>{
            res.status(200).json({'message':'sport added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })
    }
}