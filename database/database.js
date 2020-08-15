const Pool = require('pg').Pool

//local
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'news',
  password: 'admin321',
  port: 5432,
});

//hosted site
// const pool = new Pool({
//   user: 'hmmhttvxjjtjoc',
//   host: 'ec2-18-232-143-90.compute-1.amazonaws.com',
//   database: 'd84kshiodli11c',
//   password: '41fbd1d4417fac6fb83b37c0b5652fd571ea56cd803e1cc800cf0599d00a9154',
//   port: 5432,
// });

// fetching question data from DB
const getAllUsers = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Deleting record from question table in DB
const deleteQuestion = (request, response) => {
  pool.query('DELETE FROM question WHERE id='+request.params.id, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
//Sign up user
const createSignup = (request, response) => {  
  pool.query('SELECT * FROM users WHERE email_id=$1',[request.body.emailId], (error, results) => {
        if(!results.rows.length){
              const query = {
                text: 'INSERT INTO users(first_name, last_name, email_id, password)VALUES($1, $2, $3, $4)',
                values: [request.body.firstName,request.body.lastName?request.body.lastName:'',request.body.emailId,request.body.password],
              }
              pool.query(query, (error, results) => {
                if (error) {
                  throw error
                }
                else{
                  response.status(200).json({status: 200, message: 'You have successfully signed up'});
                  response.end()
                }
              })
        }
        else{
                response.status(400).json({status: 400, message: 'Email Id already exist'});
            }
    })
}


const loginUser = (request, response) => {

  pool.query('SELECT id, first_name,last_name,email_id FROM users WHERE email_id=$1 AND password=$2',[request.body.email,request.body.password], (error, results) => {
    if (error) {
      throw error
    }
    if(results.rows.length)
    response.status(200).json({status: 200, message: 'Welcome',data : results.rows})
    else
    response.status(400).json({status: 400, message: "User doesn't exist"})
  })
}
// Deleting record from user table in DB
const deleteUser = (request, response) => {
  pool.query('DELETE FROM users WHERE id='+request.params.id, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json('User deleted')
  })
}
// fetching question data from DB
const getAllUserQuestion = (request, response) => {
  pool.query('SELECT id,question_text,options FROM question', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const userScores = (request, response) => {
  pool.query('select SUM(count) from score where user_id=$1 ',[request.body.id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({status: 200,data : results.rows})
  })
}



//Post question
const postQuestion = (request, response) => {  
      const query = {
        text: 'INSERT INTO question(question_text, options, correct_option)VALUES($1, $2, $3)',
        values: [request.body.question_text,request.body.options,request.body.correct_option],
      }
      console.log(query);

      pool.query(query, (error, results) => {
        console.log(results);
        if (error) {
          throw error
        }
        else{
          response.status(200).json({status: 200, message: 'Question Posted'});
          response.end()
        }
      })
}

//submit question
const submitQuestion = (request, response) => {  
  pool.query('SELECT * FROM question WHERE id=$1',[request.body.selectedID], (error, results) => {
    if(results.rows.length){
      if(results.rows[0].correct_option === request.body.optionSelected){        
          const query = {
            text: 'INSERT INTO score(user_id, count)VALUES($1, $2)',
            values: [request.body.user_id,10],
          }
          pool.query(query, (error, results) => {
            if (error) {
              throw error
            }
            else{
              response.status(200).json({status: 200, message: ''});
              response.end()
            }
          })
      }else{
        response.status(200).json({status: 200, message: ''});
      }
    }

  })
}


module.exports = {
  // getAllQuestion,
  // deleteQuestion,
  // createSignup,
  // loginUser,
  getAllUsers,
  // deleteUser,
  // getAllUserQuestion,
  // postQuestion,
  // submitQuestion,
  // userScores
}