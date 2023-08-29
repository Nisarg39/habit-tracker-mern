const HabitsList = require('../models/habits');
const cron = require('node-cron');  // node cron library for scheduling task (use node cron guru website for quickly getting tenplates for interval)

module.exports.home = async function(req,res){

    // using node cron scheduler to insert a new date for tracking of habits

    cron.schedule('0 0 * * *', async () => {
        const d = new Date();
        var day = d.getDate();
        var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
        var year = d.getFullYear();

        // making date object similar to our dates array object in HabitsLits and populating it with new date
        const date= { 
            day: day,
            month: month,
            year: year, 
            status: "none"
            };

            const filter = { };
            const options = { upsert: true };
            const updateDoc = {
            $addToSet: {
              dates: date
            },
          };
          const result = await HabitsList.updateMany(filter, updateDoc, options);

            console.log('updated a new date after 12 am');
      });


    const data = await HabitsList.find();

    // for(habit in data){
        // console.log(data[habit].name);   //traversing our HabitsList array object
        // console.log(data[habit].dates[0].year);  // browsing our dates array object inside habitsListObject
    // }

        return res.render('homePage',{
            title:"Home",
            HabitsList: data

        })
}

module.exports.add = async function(req, res){
    console.log(req.body.habit);
    const d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();
    // console.log("Date -" , date, " month -", month, " Year", year);
    let isHabit= await HabitsList.create({
        name: req.body.habit,
        desc: req.body.desc,
        dates : {
            day: day,
            month: month,
            year: year,
            status : "none"}
    });

    if(isHabit){
        console.log('updated to mongodb');
    }else{
        console.log('not updated to mongodb');
    }
    return res.redirect('back')
}

module.exports.status = async function(req, res){
    const { habit_id, date_id, mark} = req.params
    // console.log(mark);
    // console.log(req.params);
    
    const isHabit = await HabitsList.find({_id: habit_id});
    let dates;
    isHabit.forEach(element => {
        dates = element.dates;
    });

    objIndex = dates.findIndex((obj => obj._id == date_id));

    dates[objIndex].status = mark;

    if(isHabit){
        const filter = { _id: habit_id };
        const options = { upsert: true };
        const updateDoc = {
            $set: {
              dates: dates
            },
          };
          const result = await HabitsList.updateOne(filter, updateDoc, options);    //updating status in date array of HabitsList
        //   console.log(result);
    }

    return res.redirect('back');
}

module.exports.deleteTask = async function(req,res){
    console.log(req.params.id);  
    // HabitsList.deleteOne( { "_id": req.params.id } );
    await HabitsList.findByIdAndRemove(req.params.id);
    return res.redirect('back');
}