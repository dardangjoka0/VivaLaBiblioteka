const express=require('express');
const app=express();
const log=require('./middleware/logger');
const authenticate=require('./middleware/authenticating');
const helmet=require('helmet');
const morgan=require('morgan');
//const config=require('config');
const gender=require('./routes/genders');
//using Json middleware to hande req.body as json
app.use(express.json());
app.use(helmet());
app.use('/api/genders/', gender);
app.set('view engine', 'pug');
app.set('views', './views');

if(process.env.NODE_ENV==='development')
//app.use(morgan('dev'));
//app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
//app.use(log);
//app.use(authenticate);
app.get('/', (req, res)=>{

    res.render('index', {title: 'My express app', message: 'Hello World'});
});

const port = process.env.PORT || 4000;
app.listen(4000, ()=> console.log(`listening on port ${port}`));


