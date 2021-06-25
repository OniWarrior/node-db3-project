const Scheme = require('./scheme-model')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  
     Scheme.findById(req.params.scheme_id)
    .then(scheme=>{
      if(!scheme){
        next({status:404,message:`scheme with scheme_id ${req.params.scheme_id} not found`})
      }
      else{
        req.scheme = scheme          
        next()
      }
      
    })
  
 }

    



/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async(req, res, next) => {
  try{
    const {scheme_name}  = req.body
    if(!scheme_name || scheme_name === " " || !isNaN(scheme_name)  ){
      next({status:400, message:'invalid scheme_name'})
    }
    else{
      next()
    }
  }catch(error){
    next(error)
  }

}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = async(req, res, next) => {
  try{
    const {instructions,step_number} = req.body
    if(!instructions        ||  instructions===" " || 
       !isNaN(instructions) || isNaN(step_number) ||
       step_number < 1){

           next({status:400,message: "invalid step"})
    }
    else{
      next()
    }
  }catch(error){
    next(error)
  }


}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
