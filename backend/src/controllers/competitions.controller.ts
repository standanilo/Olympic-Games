import express from 'express';
import Competitions from '../models/competitions';

export class CompetitionsController{

    searchCompetition = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let discipline = req.body.discipline;
        let gender = req.body.gender;

        Competitions.findOne({'sport': sport, 'discipline': discipline, 'gender': gender},
        (err, competitions)=>{
            if(err) console.log(err);
            else res.json(competitions);
        }).exec();
    }
    
    searchAllCompetitions = (req: express.Request, res: express.Response)=>{

        Competitions.find({},
        (err, competitions)=>{
            if(err) console.log(err);
            else res.json(competitions);
        })
    }

    searchAllCompetitionsDelegate = (req: express.Request, res: express.Response)=>{
        let delegate = req.body.delegate;
        Competitions.find({'delegate': delegate},
        (err, competitions)=>{
            if(err) console.log(err);
            else res.json(competitions);
        })
    }

    addCompetition = (req: express.Request, res: express.Response)=>{
        let competition = new Competitions(req.body);

        competition.save().then((competition)=>{
            res.status(200).json({'message':'competition added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })
    }

    endCompetition = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let discipline = req.body.discipline;
        let gender = req.body.gender;

        Competitions.findOneAndUpdate({'sport': sport, 'discipline': discipline, 'gender': gender}, {$set: {'finished': true}},
        (err, competitions)=>{
            if(err) console.log(err);
            else res.json(competitions);
        })
    }
}