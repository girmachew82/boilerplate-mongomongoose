require('dotenv').config();
const { application } = require('express');
let mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected"))
.catch((err, res)=>console.log("Error"+err))

const Schema = mongoose.Schema;
const personSchema = new Schema({
    name:{type:String, required: true},
    age:{type:Number},
    favoriteFoods :{type:[String]}
})

const Person = mongoose.model('Person',personSchema)


const createAndSavePerson = (done) => {
  const abebe = new Person({name:"Abebe", age: 25, favoriteFoods:["Bread", "Enjera"]})
  abebe.save(function(err, data) {
    if(err) return console.log(err)
    done(null, data );
  })

};
const createManyPeople = function(arrayOfPeople, done) {
      Person.create(arrayOfPeople,function (err, people) {
      if (err) return console.log(err);
      done(null, people);
    });
  
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  const person = Person.findById({personId})

  done(null, person);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
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
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
