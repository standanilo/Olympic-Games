import express from 'express';
import athletes from '../models/athletes';
import Athletes from '../models/athletes';

export class AthletesController{


    searchAthletesForComp = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let discipline = req.body.discipline;
        let gender = req.body.gender;

        Athletes.find({'sport': sport, 'discipline': discipline, 'gender': gender}, (err, athletes)=>{
            if(err) console.log(err);
            else res.json(athletes)
        })
    }
    
    searchAthletes = (req: express.Request, res: express.Response)=>{
        let fullname = req.body.fullname;
        let country = req.body.country;
        let sport = req.body.sport;
        // let discipline = req.body.discipline;
        let gender = req.body.gender;
        let a = 0;
        if(fullname=="") a = a + 1;
        if(country=="") a = a + 10;
        if(sport=="") a = a + 100;
        // if(discipline=="") a = a + 1000;
        // if(!gender) a = a + 10000;

        if(gender!=""){
            switch(a) {
                case 0: {
                    Athletes.find({'fullname': fullname, 'country': country, 'sport': sport, 'gender': gender}, (err, athletes)=>{
                        if(err) console.log(err);
                        else res.json(athletes)
                    })
                    break; 
                }
                case 1: {
                    Athletes.find({'country': country, 'sport': sport, 'gender': gender}, (err, athletes)=>{
                        if(err) console.log(err);
                        else res.json(athletes)
                    })
                break; 
                } 
                case 10: {
                    Athletes.find({'fullname': fullname, 'sport': sport, 'gender': gender}, (err, athletes)=>{
                        if(err) console.log(err);
                        else res.json(athletes)
                    })
                break; 
                } 
                case 100: {
                    Athletes.find({'fullname': fullname, 'country': country, 'gender': gender}, (err, athletes)=>{
                        if(err) console.log(err);
                        else res.json(athletes)
                    })
                    break; 
                }
                case 11: {
                    Athletes.find({'sport': sport, 'gender': gender}, (err, athletes)=>{
                        if(err) console.log(err);
                        else res.json(athletes)
                    })
                    break; 
                }
                case 101: {
                    Athletes.find({'country': country, 'gender': gender}, (err, athletes)=>{
                    if(err) console.log(err);
                    else res.json(athletes)
                })
                    break; 
                }
                case 110: {
                    Athletes.find({'fullname': fullname, 'gender': gender}, (err, athletes)=>{
                    if(err) console.log(err);
                    else res.json(athletes)
                }) 
                    break; 
                }
                // case 1000: {
                //     Athletes.find({'fullname': fullname}, (err, athletes)=>{
                //     if(err) console.log(err);
                //     else res.json(athletes)
                // }) 
                //     break; 
                // }
                // case 1001: {
                //     Athletes.find({'fullname': fullname}, (err, athletes)=>{
                //     if(err) console.log(err);
                //     else res.json(athletes)
                // }) 
                //     break; 
                // }
                // case 1010: {
                //     Athletes.find({'fullname': fullname}, (err, athletes)=>{
                //     if(err) console.log(err);
                //     else res.json(athletes)
                // }) 
                //     break; 
                // }
                // case 1100: {
                //     Athletes.find({'fullname': fullname}, (err, athletes)=>{
                //     if(err) console.log(err);
                //     else res.json(athletes)
                // }) 
                //     break; 
                // }
                // case 1011: {
                //     Athletes.find({'fullname': fullname}, (err, athletes)=>{
                //     if(err) console.log(err);
                //     else res.json(athletes)
                // }) 
                //     break; 
                // }
                // case 1101: {
                //     Athletes.find({'fullname': fullname}, (err, athletes)=>{
                //     if(err) console.log(err);
                //     else res.json(athletes)
                // }) 
                //     break; 
                // }
                // case 1110: {
                //     Athletes.find({'fullname': fullname}, (err, athletes)=>{
                //     if(err) console.log(err);
                //     else res.json(athletes)
                // }) 
                //     break; 
                // }
                default: {
                    Athletes.find({'gender':gender}, (err, athletes)=>{
                    if(err) console.log(err);
                    else res.json(athletes)
                })
                break; 
                } 
            }
        }
        else {
            switch(a) {
                case 0: {
                    Athletes.find({'fullname': fullname, 'country': country, 'sport': sport}, (err, athletes)=>{
                        if(err) console.log(err);
                        else res.json(athletes)
                    })
                    break; 
                }
                case 1: {
                    Athletes.find({'country': country, 'sport': sport}, (err, athletes)=>{
                        if(err) console.log(err);
                        else res.json(athletes)
                    })
                   break; 
                } 
                case 10: {
                    Athletes.find({'fullname': fullname, 'sport': sport}, (err, athletes)=>{
                        if(err) console.log(err);
                        else res.json(athletes)
                    })
                   break; 
                } 
                case 100: {
                    Athletes.find({'fullname': fullname, 'country': country}, (err, athletes)=>{
                        if(err) console.log(err);
                        else res.json(athletes)
                    })
                    break; 
                }
                case 11: {
                    Athletes.find({'sport': sport}, (err, athletes)=>{
                        if(err) console.log(err);
                        else res.json(athletes)
                    })
                    break; 
                }
                case 101: {
                    Athletes.find({'country': country}, (err, athletes)=>{
                    if(err) console.log(err);
                    else res.json(athletes)
                })
                    break; 
                }
                case 110: {
                    Athletes.find({'fullname': fullname}, (err, athletes)=>{
                    if(err) console.log(err);
                    else res.json(athletes)
                }) 
                    break; 
                }
                // case 1000: {
                //     Athletes.find({'fullname': fullname}, (err, athletes)=>{
                //     if(err) console.log(err);
                //     else res.json(athletes)
                // }) 
                //     break; 
                // }
                // case 1001: {
                //     Athletes.find({'fullname': fullname}, (err, athletes)=>{
                //     if(err) console.log(err);
                //     else res.json(athletes)
                // }) 
                //     break; 
                // }
                // case 1010: {
                //     Athletes.find({'fullname': fullname}, (err, athletes)=>{
                //     if(err) console.log(err);
                //     else res.json(athletes)
                // }) 
                //     break; 
                // }
                // case 1100: {
                //     Athletes.find({'fullname': fullname}, (err, athletes)=>{
                //     if(err) console.log(err);
                //     else res.json(athletes)
                // }) 
                //     break; 
                // }
                // case 1011: {
                //     Athletes.find({'fullname': fullname}, (err, athletes)=>{
                //     if(err) console.log(err);
                //     else res.json(athletes)
                // }) 
                //     break; 
                // }
                // case 1101: {
                //     Athletes.find({'fullname': fullname}, (err, athletes)=>{
                //     if(err) console.log(err);
                //     else res.json(athletes)
                // }) 
                //     break; 
                // }
                // case 1110: {
                //     Athletes.find({'fullname': fullname}, (err, athletes)=>{
                //     if(err) console.log(err);
                //     else res.json(athletes)
                // }) 
                //     break; 
                // }
                default: {
                    Athletes.find({}, (err, athletes)=>{
                    if(err) console.log(err);
                    else res.json(athletes)
                })
                   break; 
                } 
            }
        }
    }

    updateIndex = (req: express.Request, res: express.Response)=>{
        let fullname = req.body.fullname;
        let discipline = req.body.discipline;
        let index = req.body.index;

        Athletes.findOneAndUpdate({'fullname': fullname, 'discipline': discipline}, {$set:{'index':index}}, (err, athletes)=>{
            if(err) console.log(err);
            else res.json(athletes)
        })
    }

    searchAthlete = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let gender = req.body.gender;
        let fullname = req.body.fullname;
        let country = req.body.country;


        Athletes.findOne({'fullname': fullname, 'sport': sport, 'gender': gender, 'country': country}, (err, athletes)=>{
            if(err) console.log(err);
            else res.json(athletes)
        })
    }

    searchAthletesDiscipline = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let discipline = req.body.discipline;
        let country = req.body.country;


        Athletes.find({'sport': sport, 'discipline': discipline, 'country': country}, (err, athletes)=>{
            if(err) console.log(err);
            else res.json(athletes)
        })
    }
    
    updateDiscipline = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let gender = req.body.gender;
        let fullname = req.body.fullname;
        let country = req.body.country;
        let discipline = req.body.discipline;

        Athletes.collection.updateOne({'fullname': fullname, 'sport': sport, 'gender': gender, 'country': country},
        {$push: {'discipline':discipline}});
        res.json({poruka:'ok'})
    }

    updateMedals = (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        let gender = req.body.gender;
        let fullname = req.body.fullname;
        let country = req.body.country;

        Athletes.collection.updateOne({'fullname': fullname, 'sport': sport, 'gender': gender, 'country': country},
        {$inc: {'medals':1}});
        res.json({poruka:'ok'})
    }
    
    addAthlete = (req: express.Request, res: express.Response)=>{
        let athletes = new Athletes(req.body);


        athletes.save().then((result)=>{
            res.status(200).json({'message':'athlete added'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })
    }
}