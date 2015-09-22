#Object - contract

Represents an agreement between user and patron for a specific event

| Fields        | Type          | Description
| ------------- | -------       | ------------|
| title         | String        | Title of the contract |
| description   | String        | Description of the contract |
| customer      | customer      | Primary customer to associated with contract |
| event         | event         | Event object describing the contracts event (see below)|
| rentalItems   | [rentalItem]  | collection of rentalItem Objects needed for the contract event|
| menuItems     | [menuItem]    | collection of menuItems served at the event |
| commLog       | [commItem]    | collection of communications about the event |
| status        | enum          | A contract may be in one of serveral statues (init, bid, contract, completed) |
| notes         | String        | Other related information about the contract |

#Object - Event

| Fields        | Type          | Description
| ------------- | -------       | ------------|
| Date          | Date          | Date of the event |
| startTime     | Date          | Event start time |
| endTime       | Date          | Event end time |
| numOfPeople   | number        | number of people attending the event |
| venue         | venue         | location of the event |

#Object - commItem
A single communication interaction with a customer (e.g. emails, calls, in person meetings)

| Fields        | Type          | Description
| ------------- | -------       | ------------|
| Date          | Date          | Date of the communication |
| commType      | Enum          | what mode of communication was used? (email, call, in person) |
| rep           | String        | Which employee represented the restaurant during the communication |
| description   | String        | Summary of the communication with the customer |



##Other Notes

**contract**
- I lost the document we collaborated on last thursday, this is the best I could do from memory.
- Do we need a deposit field on contracts object
- How should "Sequence of events be implemented"? Do we need a sequence object to do this?
- Should we have custom fields for customizable contracts to fit each restaurants needs? How would we implement this?
- We will evenutally implement "employees" or "staff" field to assign staff to a contract

**Events**
- Events are broken out as a sperate object, is this effective? Are the fields assigned to the appropriate objects?

**commItem**
- Old town dining has commType implemented as a enum drop down list. Is this how we should implement it for Banquet Ninja?

##Pending changes

**contracts**
  - Initial review and implementation

**events**
  - Initial review and implementation

**commItem**
  - Intial review and implementation
