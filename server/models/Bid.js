// This was copied from Contract and needs to be updated

var mongoose = require('mongoose');

var bidSchema = mongoose.Schema({
    //customer: {}
    //BidID: { type: Number }
    //bidID: { type: Number },
    //customerID: { type: Number },
    //initialContactDate: { type: Date },
    //bidDate: { type: Date },
    //bidEventName: { type: String },
    //bidPeopleLow: { type: Number },
    //bidPeopleHi: { type: Number },
    //bidNature: { type: String },
    //menuItems: [{
    //             menuItemId: { type: Number }
    //            , menuLName: { type: String }
    //            , foodPrice: { type: Number }
    //            , foodAmount: { type: Number }
    //            , printOrder: { type: Number }
    //            }],
    //names: [{ name: { type: String, required: '{PATH} is required!' } }],

    //date: {type:Date, required:'{PATH} is required!'},
    //contract: {type:Boolean, required:'{PATH} is required!'},
    //nature: {type:String, required:'{PATH} is required!'},
    //tags: [String]
});
//, {collection:'bids'}
var Bid = mongoose.model('Bid', bidSchema);

//function createDefaultContracts() {
//    Contract.find({}).exec(function(err, collection){

//        if(collection.length===0){
//            Contract.create({name:'Johnson Party', date:'11/6/1969', contract:true, nature:'Plated Dinner', tags:['nice customer','repeat visit']})
//            Contract.create({name:'Smith Party', date:'12/6/1968', contract:true, nature:'Plated Dinner', tags:['nice customer','repeat visit']})
//            Contract.create({name:'Baily Party', date:'1/6/1967', contract:true, nature:'Plated Dinner', tags:['nice customer','repeat visit']})
//            Contract.create({name:'Nolan Party', date:'2/6/1965', contract:true, nature:'Plated Dinner', tags:['nice customer','repeat visit']})
//            Contract.create({name:'Clark Party', date:'3/6/1965', contract:true, nature:'Plated Dinner', tags:['nice customer','aaa']})
//            Contract.create({name:'Carter Party', date:'4/6/1965', contract:true, nature:'Plated Dinner', tags:['nice customer','repeat visit']})
//            Contract.create({name:'Reagan Party', date:'5/6/1964', contract:true, nature:'Plated Dinner', tags:['nice customer','repeat visit']})
//            Contract.create({name:'Roberts Party', date:'6/6/1963', contract:true, nature:'Plated Dinner', tags:['ccc','repeat visit']})
//            Contract.create({name:'Nixon Party', date:'7/6/1962', contract:true, nature:'Plated Dinner', tags:['nice customer','repeat visit']})
//            Contract.create({name:'Clinton Party', date:'8/6/1961', contract:true, nature:'Plated Dinner', tags:['nice customer','repeat visit']})
//            Contract.create({name:'Bush Party', date:'9/6/1961', contract:true, nature:'Plated Dinner', tags:['xhr','repeat visit']})
//            Contract.create({name:'Obama Party', date:'10/6/1961', contract:true, nature:'Plated Dinner', tags:['nice customer','repeat visit']})
//            Contract.create({name:'Limbaugh Party', date:'11/6/1961', contract:true, nature:'Plated Dinner', tags:['nice customer','repeat visit']})
//            Contract.create({name:'Washington Party', date:'12/6/1961', contract:true, nature:'Plated Dinner', tags:['nice customer','xhr']})
//        }
//    })
//}

//exports.createDefaultContracts = createDefaultContracts;