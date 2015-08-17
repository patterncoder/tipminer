// states: created > editing > published > active


// editing state indicates user must meet all of the prerequisites
    // pre-reqs include all menus published
// published state indicates all pre-reqs met and the menuGroup is ready to be set to active
// active state indicates it is the only active menuGroup and the previous active must be set to inactive
//

// Actions for state editing 
// Edit menuGroup: editing allowed
// Publish menuGroup: Change to state Pubished if pre-req cleared
// Set active menuGroup: Not allowed

// Actions for state published
// Edit menuGroup: set state to editing 
// Publish menuGroup: not allowed 
// Set active menuGroup: clear the other active menuGroup and change state to active

// Actions 
// Edit menuGroup:
// Publish menuGroup:
// Set active menuGroup:


