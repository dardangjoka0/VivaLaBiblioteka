const express=require('express');
const Joi=require('joi');

const genderRoute=express.Router();


const genres=[{ id:1, name:'Action' }, {id:2, name: 'SciFi'}, {id: 3, name: 'Comedy' }];

genderRoute.get('/', (req, res)=>{
    res.send(genres);
});

genderRoute.get('/:id', (req, res)=>{
const genre= genres.find(c=> c.id===parseInt(req.params.id));
 if(!genre) return  res.status(404).send('genre with id: ' +req.params.id+ 'does not exist');
 genres.push(genre);
 res.send(genre);
});

genderRoute.post('/', (req, res)=>{
 const {error}=validGender(req.body);
 if(error) return res.status(400).send(error.details[0].message);
 const genre= { id: genres.length+1, name: req.body.name};
 genres.push(genre);
 res.status(201).send(genre);
});

genderRoute.put('/:id', (req, res)=>{
    const {error}=validGender(req.body);
    const genre=genres.find(c=> c.id===parseInt(req.params.id));
    if(!genre) return  res.status(404).send('genre with id: ' +req.params.id+ 'does not exist');
    if(error) return res.status(400).send(error.details[0].message);
    genre.name=req.body.name;
    genres[req.params.id-1]=genre;
    res.status(200).send(genres);
});

genderRoute.delete('/:id', (req, res)=>{
    const genre=genres.find(c=> c.id===parseInt(req.params.id));
    if(!genre) return  res.status(404).send('genre with id: ' +req.params.id+ 'does not exist');
    genres.splice(genres.indexOf(genre), 1);
    res.status(200).send(genres);
});
const validGender=(reqBody)=>{
    const result=Joi.object({name: Joi.string().min(3).required()});
    return result.validate(reqBody);
}// s

module.exports=genderRoute;