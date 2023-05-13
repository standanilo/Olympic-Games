import express from 'express';
import User from '../models/user';

export class UserController{
    
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({'username':username, 'password': password},
            (err, user)=>{
                if(err) console.log(err);
                else res.json(user);
            })
    }

    register = (req: express.Request, res: express.Response) =>{
        let user = new User(req.body);

        user.save().then((user)=>{
            res.status(200).json({'message':'user added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })

        
    }

    changePassword = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let newPassword = req.body.newPassword;

        User.collection.updateOne({'username': username, 'password': password},
        {$set: {'password':newPassword}});
        res.json({message:'ok'})
    }

    searchAllCompDelegates = (req: express.Request, res: express.Response)=>{
        let search = "comp_delegate"
        User.find({'type': search}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    
    searchAllCompDelegatesAvail = (req: express.Request, res: express.Response)=>{
        let search = "comp_delegate"
        User.find({'type': search, 'numOfComp': {$lt:3}}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    
    searchCompDelegate = (req: express.Request, res: express.Response)=>{
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        User.collection.updateOne({'firstname': firstname, 'lastname': lastname},
        {$inc: {'numOfComp':1}});
        res.json({poruka:'ok'})
    }
    
    searchCountry = (req: express.Request, res: express.Response)=>{
        let type = "nat_delegate"
        let country = req.body.country;
        User.findOne({'type': type, 'country':country}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
}