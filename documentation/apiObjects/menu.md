# Object - menu

Colleciton of menuItem objects representing a menu.


| Fields        | Type          | Description
| ------------- | -------       | ------------|
| name          | String        | Name of the menu (for internal restaurant use/identification |
| title         | String        | Title of menu for restaurant guests   |
| description   | String        | Description of menus purpose |
| subtitle      | String        | Subtitle of menu for restaurnt guests |
| sections      | [menuSection] | Sections of the menu |
| footer        | String        | Footer of the menu |



#Object - menuSection

One section of a menu

| Fields        | Type          | Description
| ------------- | -------       | ------------|
| title         | String        | Title of the section |
| subtitle      | String        | Subtitle of the section |
| items         | [menuItem]    | Collection of menuItems in the section |
| footer        | String        | Footer for the section |


##Other Notes

-

###Pending changes

- none 
