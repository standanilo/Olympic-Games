import express from 'express';
import Requests from '../models/requests';

export class RequestsController{

    register = (req: express.Request, res: express.Response) =>{
        let requests = new Requests(req.body);

        requests.save().then((requests)=>{
            res.status(200).json({'message':'request added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })

        
    }

    searchAllRequests = (req: express.Request, res: express.Response)=>{
        Requests.find({}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }

    removeRequest = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        Requests.findOneAndDelete({'username': username}, (err, request)=>{
            if(err) console.log(err);
            else res.json(request)
        })
    }
    
    searchRequest = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        Requests.findOne({'username': username}, (err, request)=>{
            if(err) console.log(err);
            else res.json(request)
        })
    }
}