const path = require('path');
const express = require('express'); 
const hbs = require('hbs');
const {geocode,forecast} = require('./utils');
//function
const app = express();
const port = process.env.PORT || 3000

//define paths for express config
const viewsPth = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')));//customise your server

//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPth)//handle setup.It expects all the html files to exist in a folder called roots
hbs.registerPartials(partialsPath);
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name: 'Naela Tarannum'

    })
});
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Naela Tarannum'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Naela Tarannum'
    })
})
app.get('/weather',(req,res)=>{
  const address = req.query.address;
  if(!address){
      return res.send({
          error:'You must provide an address'
      })
  }
    geocode(address,(error,{lat,long}={})=>{
        if(error){
            return res.send({
                error
            });
        }
        forecast(lat, long, (error, data) => {
            if(error){
                return res.send({
                    error
                })
            }
            return res.send({
                address,
                temperature: data
            })
          })
    });
})
app.get('/products',(req,res)=>{
//    console.log(req)
    if(!req.query.search) {
        returnres.status(400).send({
            error:'You must provide a search term'
        })
       
    }
});
app.get('/help/*',(req,res)=>{
    res.render('notfound',{
        title:'help',
        name:'Naela Tarannum',
        error:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('notfound',{
        title:'help',
        name:'Naela Tarannum',
        error:'The page you are looking for was not found'
    })
})
app.listen(port,()=>{
    console.log('Server Started')
})