const mongoose = require('mongoose')
export class DbConnect {
    constructor() { }
    startUp = async () => {
        try {
            // let url = `mongodb://${}:${}/${}`;
            await mongoose.connect("mongodb://localhost:27017/note-express", { useNewUrlParser: true, useUnifiedTopology: true })
            console.log('connected')
        } catch (error) {
          console.log(error)  
        }
    }
}