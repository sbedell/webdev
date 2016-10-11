({
    // This loads Camping Items from Salesforce
	doInit: function(component, event, helper) {
        // Create the action
        var action = component.get("c.getItems");
        
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.items", response.getReturnValue());
            } else {
                console.log("Failed with state: " + state);
            }
        });
    
        // Send action off to be executed
        $A.enqueueAction(action);
    },

	//  The handleAdditem method saves the record to the database 
    //  and adds the record to the items value provider.    
    handleAddItem: function(component, event, helper) {    
        var newItem = event.getParam("item");
        helper.createItem(component, newItem);
        
        // Gets the saveItem method from the Apex Controller:
        var action = component.get("c.saveItem");
        action.setParams({"item": newItem});
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
            	var items = component.get("v.items");
            	items.push(response.getReturnValue());
            	component.set("v.items", items);
            }
        });
        
        $A.enqueueAction(action);
    }
})
