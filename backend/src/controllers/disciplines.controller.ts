import express from 'express';
import Disciplines from '../models/disciplines';

export class DisciplinesController{

    searchAllDisciplines = (req: express.Request, res: express.Response)=>{
        Disciplines.find({}, (err, disciplines)=>{
            if(err) console.log(err);
            else res.json(disciplines)
        })
    }

    searchDiscipline = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let discipline = req.body.discipline;

        Disciplines.findOne({'sport':sport, 'discipline':discipline},
        (err, disciplines)=>{
            if(err) console.log(err);
            else res.json(disciplines);
        }).exec();
    }

    searchDisciplineSport = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;

        Disciplines.find({'sport':sport},
        (err, disciplines)=>{
            if(err) console.log(err);
            else res.json(disciplines);
        }).exec();
    }

    addDiscipline = (req: express.Request, res: express.Response)=>{
        let discipline = new Disciplines(req.body);

        discipline.save().then((discipline)=>{
            res.status(200).json({'message':'discipline added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })
    }
}