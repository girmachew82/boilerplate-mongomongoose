require('dotenv').config();
const { application } = require('express');
let mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("Connected"))
.catch((err, res)=>console.log("Error"+err))
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
console.log("Hello")
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name:{type:String, required: true},
    age:{type:Number},
    favoriteFoods :{type:[String]}
})

const Person = mongoose.model('Person',personSchema)

let arrayOfPeople = [
  {
    name:"Abebe",
    age:28,
    favoriteFoods:["Bread"]
  }
]

const createAndSavePerson = function  (arrayOfPeople, done) {
  const abebe = new Person({name:"Abebe", age: 25, favoriteFoods:["Bread", "Enjera"]})
  abebe.save(function(err, data) {
    if(err) return console.log(err)
    done(null, data );
  })

};


var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err, arrayOfResult) =>{
    if(err)
      console.log(err)
    else{
      done(null , arrayOfResult);
    }
   
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err, arrayOfResult) =>{
    if(err)
      console.log(err)
    else{
      done(null , arrayOfResult);
    }
   
  })
};


const findPersonById = (personId, done) => {
  Person.findById(personId, (err, arrayOfResult) =>{
    if(err)
      console.log(err)
    else{
      done(null , arrayOfResult);
    }
   
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, arrayOfResult) =>{
    if(err)
      console.log(err)
    else{
      arrayOfResult.favoriteFoods.push(foodToAdd)
      arrayOfResult.save((err, updateFood)=>{
        if(err)
        console.log(err)
      else{
      done(null , arrayOfResult);
      }
    })
  }
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name:personName},{age: ageToSet},{new:true}, (err, updateResult) =>{
    if(err)
      console.log(err)
       done(null , updateResult);
    })
};

const removeById = (personId, done) =>{
  Person.findOneAndRemove({_id:personId}, (err, removedPerson) => {
      if(err) 
         return console.log(err);
      done(null, removedPerson);
    }
  ); 
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err, JSONStatus)=>{
    if(err)
    console.log(err)
  else
    done(null , JSONStatus);
  })
 
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
//exports.createAndSavePerson = createAndSavePerson;
//exports.findPeopleByName = findPeopleByName;
//exports.findOneByFood = findOneByFood;
//exports.findPersonById = findPersonById;
//exports.findEditThenSave = findEditThenSave;
//exports.findAndUpdate = findAndUpdate;
//exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
