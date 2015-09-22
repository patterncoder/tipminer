#Object - rentalItem
An item that may be rented by a patron.
Fully Implemented - 9/18/15

| Fields        | Type          | Description
| ------------- | -------       | ------------|
| Name          | String        | Name of the item |
| Price         | Number        | Price to rent the item |
| inHouse       | Boolean       | Is the item stored in house (true), or is it kept with a third party (false) |
| contact       | Contact       | Contact object to be used if the rentalItem is kept with a third party |

#Object - Contact
conctact information of third party that keeps a rental item

| Fields        | Type          | Description
| ------------- | -------       | ------------|
| Name          | String        | Name of the contact |
| phone         | Number        | Phone number of contact |
| email         | Boolean       | email of contact |



##Other Notes
 
  - Should there be a third party rental price in the case that the third party rents the item to the restaurant?
  - Third party contacts are abstracted, is this a good idead?
  
##Pending changes


