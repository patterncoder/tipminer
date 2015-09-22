#Object - Customer
Restaurant patron

| Fields        | Type           | Description
| ------------- | -------        | ------------|
| firstName     | String         | First name of customer |
| lastName      | Number         | Last name of customer |
| address       | [address]      | collection of address associated with a customer |
| emails        | [email]        | collection of emails associated with a customer |
| contactNumbers| [contactNumber]| collection of phone numbers associated with a customer |
| contracts     | [contractID]   | ID's of contract objects associated with a customer |

#Object - address
Address

| Fields        | Type           | Description
| ------------- | -------        | ------------|
| addressType   | String         | Type of address |
| primary       | Boolean        | Is this the primary address |
| address1      | String         | address line 1 |
| address2      | String         | address line 2 |
| city          | String         | City |
| State         | String         | State |
| Zip           | String         | Zip |

#Object - email
Email address

| Fields        | Type           | Description
| ------------- | -------        | ------------|
| emailType     | Enum           | type of email |
| primary       | Boolean        | Is this the primary email |
| email         | String         | email address |

#Object - contactNumber
Email address

| Fields        | Type           | Description
| ------------- | -------        | ------------|
| contactType   | Enum           | type of phone number |
| primary       | Boolean        | Is this the primary contact number |
| number        | String         | phone number |

##Other Notes
 - none
  
##Pending changes

  - Initial review

