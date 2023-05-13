import express from 'express';
import Schedules from '../models/schedules';

export class SchedulesController{

    private static i : number = 0;
    searchSchedule = (req: express.Request, res: express.Response)=>{
        let date = req.body.date;
        let hour = req.body.hour;
        let location = req.body.location;

        Schedules.findOne({'date':date, 'hour': hour, 'location': location},
            (err, schedule)=>{
                if(err) console.log(err);
                else res.json(schedule);
            })
    }

    searchScheduleForResults = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let gender = req.body.gender;
        let round = req.body.round;

        Schedules.findOne({'sport':sport, 'gender': gender, 'round': round, 'finished': false},
            (err, schedule)=>{
                if(err) console.log(err);
                else res.json(schedule);
            })
    }

    addSchedule = (req: express.Request, res: express.Response) =>{
        let schedule = new Schedules(req.body);

        schedule.save().then((schedule)=>{
            res.status(200).json({'message':'schedule added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })
    }

    finishSchedule = (req: express.Request, res: express.Response) =>{
        let sport = req.body.sport;
        let gender = req.body.gender;
        let round = req.body.round;
        let teams = req.body.teams;

        Schedules.findOneAndUpdate({'sport': sport, 'gender': gender, 'round': round, 'teams': teams}, {$set:{'finished':true}}, (err, schedule)=>{
            if(err) console.log(err);
            else res.json(schedule)
        }) 
    }
    
    updateSchedule = (req: express.Request, res: express.Response) =>{
        let sport = req.body.sport;
        let gender = req.body.gender;
        let round = req.body.round;
        let teams = req.body.teams;

        if(SchedulesController.i < 2){
            SchedulesController.i = (SchedulesController.i + 1)%4;
            Schedules.findOneAndUpdate({'sport': sport, 'gender': gender, 'round': round, 'teams': []}, {$push:{'teams':teams}}, (err, schedule)=>{
                if(err) console.log(err);
                else res.json(schedule)
            })
        }
        else {
            SchedulesController.i = (SchedulesController.i + 1)%4;
            Schedules.findOneAndUpdate({'sport': sport, 'gender': gender, 'round': round, 'teams': {$size: 1}}, {$push:{'teams':teams}}, (err, schedule)=>{
                if(err) console.log(err);
                else res.json(schedule)
            })
        }
        
    }
}