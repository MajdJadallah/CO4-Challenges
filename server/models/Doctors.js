const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({

name:{
type: String, required: true
},
phone:{
    type: Number, required: true
},
gender:{
    type: String, required: true
},
health_issue:{
    type: String, required: true
},
birthday:{
    type:Date ,required: true
},
avatar:{
    type: String, required: true
}
});

const doctorModel=mongoose.model('doctors',DoctorSchema);

module.exports = doctorModel;