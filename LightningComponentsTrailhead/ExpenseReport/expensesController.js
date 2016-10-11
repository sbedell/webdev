({
    // Load expenses from Salesforce
    doInit: function(component, event, helper) {
        // Create the action
        // The "c" here represents the Apex controller
        var action = component.get("c.getExpenses");
    
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.expenses", response.getReturnValue());
            } else {
                console.log("Failed with state: " + state);
            }
        });
    
        // Send action off to be executed
        $A.enqueueAction(action);
    },
    
    handleCreateExpense: function(component, event, helper) {
        var newExpense = event.getParam("expense");
        helper.createExpense(component, newExpense);
    },
    
    handleUpdateExpense: function(component, event, helper) {
    	var updatedExpense = event.getParam("expense");
    	helper.updateExpense(component, updatedExpense);
	}
})
