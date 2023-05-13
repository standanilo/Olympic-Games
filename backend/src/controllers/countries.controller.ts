import express from 'express';
import Countries from '../models/countries';

export class CountriesController{

    searchAllCountries = (req: express.Request, res: express.Response)=>{
        Countries.find({}, (err, countries)=>{
            if(err) console.log(err);
            else res.json(countries)
        })
    }

    addGoldMedal = (req: express.Request, res: express.Response) =>{
        let name = req.body.name;

        Countries.collection.updateOne({'name': name},
        {$inc: {'numGold':1}});
        res.json({poruka:'ok'})
    }

    addSilverMedal =(req: express.Request, res: express.Response) =>{
        let name = req.body.name;

        Countries.collection.updateOne({'name': name},
        {$inc: {'numSilver':1}});
        res.json({poruka:'ok'})
    }

    addBronzeMedal = (req: express.Request, res: express.Response) =>{
        let name = req.body.name;

        Countries.collection.updateOne({'name': name},
        {$inc: {'numBronze':1}});
        res.json({poruka:'ok'})
    }
    
    addMember = (req: express.Request, res: express.Response) =>{
        let name = req.body.name;

        Countries.collection.updateOne({'name': name},
        {$inc: {'numOfAthletes':1}});
        res.json({poruka:'ok'})
    }
}