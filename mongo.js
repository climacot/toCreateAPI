const mongoose = required('mongoose')

const connectionString = `mongodb+srv://admin:root@cluster0.suojn.
                    mongodb.net/notes?retryWrites=true&w=majority`
                    
//conexion a mongodb
mongoose.connect(connectionString)
  .then(() => {
      console.log('Database connect')
  }).catch(err => {
      console.error(err)
  })                   