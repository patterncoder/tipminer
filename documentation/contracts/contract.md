# Contract

## Fields


| Fields        | Type           |
| ------------- | -------------- |
| Customer | {type: ObjId, firstName: String, lastName: String, address: String, city: String, state: String} |
| Event | {date: Date, startTime: Time, endTime: Time, nature: String, venue: String, guestCount: String} |
| Notes | String | 
| MenuItems | [{itemId: ObjId, name: String, description: String, notes: String, quan: Number, price: Number }] |
| CommLog | [{date: Date, time: Time, employee: String, notes: String}] |
| RentalItems | [{itemId: ObjId, name: String, description: String, quan: Number, price: Number }] |
| SequenceOfEvents | [{start: Time, end: Time, name: String, description: String}] |

