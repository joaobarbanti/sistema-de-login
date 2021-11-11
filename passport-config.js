const LocalStrategy = require  ('passport-local').Strategy
const bcrypt = require('bcryptjs')

function initialize(passport,getUserByEmail,getUserById) {
    const autheticateUser = async (email,password,done) => {
       const user = await getUserByEmail(email)
       if(user == null){

         return done(null,false, {message:"nao tem usuario com esse email"});
    }

       try{
           if(await bcrypt.compare(password,user.password)){

               return done(null,user)
            
           }else{
           return done(null,false, {message:"senha incorreta"})
         }
        }catch(err){
         return done(e)
       }
    }
    passport.use(new LocalStrategy({ usernameField:"email" }, autheticateUser))
  passport.serializeUser((user,done) => done(null, user.id))
  passport.deserializeUser(async(id,done) => {

       return done(null, await getUserById(id));

  })
}
module.exports = initialize