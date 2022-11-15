const { sign } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')

//import db.js
const db = require('./db')



const register = (username, acno, password) => {
    //asynchronous function  //delay in response
    return db.User.findOne({
        acno
    }).then(user => {
        console.log(user);
        if (user) {
            return {
                status: false,
                message: "Already registered...please Log In",
                statusCode: 401
            }

        }
        else { //insert in db
            const newUser = new db.User({
                acno,
                username,
                password,
                
                event: []    //objects defined


            })
            newUser.save()    //to store in mongodb
            return {
                status: true,
                message: "registered successfully",
                statusCode: 200

            }

        }

    })

}


const login = (acno, pswd) => {

    return db.User.findOne({
        acno,
        password: pswd
    }).then(user => {
        if (user) {
            console.log(user);

            currentUser = user.username
            currentAcno = acno
            //token generation
            token = jwt.sign({
                //store account number inside token
                currentAcno: acno
            }, 'supersecretkey12345')

            return {
                status: true,
                message: "Log In successfully",
                statusCode: 200,
                currentUser,
                currentAcno,
                token

            }

        }
        else {
            return {
                status: false,
                message: "invalid account number or password!!!",
                statusCode: 401
            }
        }
    })
}

const addEvent = (req,date,ed)=>{
  let currentAcno=req.currentAcno
    return db.User.findOne({
      acno:currentAcno
    }).then(user=>{
      if(user){
        user.event.push({
          date:date,
          ed:ed
        })
        user.save()
        
        console.log(db);
        return{
          status:true,
          message:"event added",
          statusCode:200
  
        }
  
  
      }
      else{
        return{
          status:false,
          message:"invalid account number or password!!!",
          statusCode:401
        }
  
  
      }
    })
  
      }  

      const getEvent = (acno)=>{
        return db.User.findOne({
          acno
        }).then(user=>{
          if(user){
           return{
             status:true,
             statusCode:200,
             event:user.event
     
           }
   
 
          }
          else{
           return{
             status:false,
             message:"user does not exist",
             statusCode:401
           }
   
   
         }
   
        })
         
     
     
       }
 
  
  










module.exports = {
    register,
    login,
    addEvent,
    getEvent
}

