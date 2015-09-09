# Contract

## Fields


| Fields        | Type           |  Description
| ------------- | -------------- | ------------- |
| Customer | type: Number, ref: 'Customer' | description |
| Event | {date: Date, startTime: Time, endTime: Time, nature: String, venue: String, guestCount: String} | description |
| Notes | String | description |
| MenuItems | [{itemId: ObjId, name: String, description: String, notes: String, quan: Number, price: Number }] | description |
| CommLog | [{date: Date, time: Time, employee: String, notes: String}] | description |
| RentalItems | [{itemId: ObjId, name: String, description: String, quan: Number, price: Number }] | description |
| SequenceOfEvents | [{start: Time, end: Time, name: String, description: String}] | description |

