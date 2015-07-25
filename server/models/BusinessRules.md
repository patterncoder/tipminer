Business Rules

Company
    Overview: master document for Tipminer customers
        Company Info
        Billing info
        Users
        Employees
        Stores
        Schedules
    Dependencies
        Users
        Employees
    

Contract 
    Overview (document for storing all things related to contract...document should have all data to print a contract..no joining)
        Customer Info
        Event Info
        Menu Items
        Sequence of Events
        Rental Items
        Table Map
        Notes
        Assigned Staff
    Dependencies
        Customer
        MenuItems (menu item pick lists would be populated by catalog or master menu item list)
        Workflow(order of execution by events manager and checklist of items to do (tell guest no outside wine, etc.))
            Different workflows for different types of events, ie. outside catering vs. inhouse buffet?
        Calendar: add event to a calendar colors or some other visual cue to determine booked vs pending
    Create
        This process is kicked off by adding or finding a customer.  Need good searching here for past guests.
        Set the pending or contract flag
        mongoose population for dependent records vs. copying the data (at a minimum set a id link in the doc)
    Read
        Should be pretty simple as one document per event
    Update
        Figure out how to handle the myriad of permutations for menu items (customer wants to sub this for that, etc.)
    Delete
        Set delete flag but don't remove

Customer
    Overview: document to keep personal info and track customer history
        Tie in with outside loyalty programs

