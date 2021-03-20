const mongoose = require('mongoose')
const { model, Schema } = mongoose
const connectionString = 'mongodb+srv://admin:root@cluster0.suojn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('Database connected')
    }).catch(err => {
        console.error(err)
    })

const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = model('Note', noteSchema)

const note = new Note({
    content: 'MongoDB es incrible',
    date: new Date(),
    important: true
})

note.save()
    .then(result => {
        console.log(result)
        mongoose.connection.close()
    })
    .cacth(err => {
        console.error(err)
    })
