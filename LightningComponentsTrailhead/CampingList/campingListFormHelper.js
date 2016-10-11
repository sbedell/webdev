// The campingListFormHelper JavaScript helper creates an addItem event
    //  with the item to be added and then fires the event.
    // It then resets the newItem value provider with a blank
    //  sObjectType of type Camping_Item__c.
    //  
    //  var updateEvent = component.getEvent("updateExpense");
        //updateEvent.setParams({ "expense": expense });
       // updateEvent.fire();
({
    addItem: function(component, newItem) {
        // grab the event, set params, then fire event:
        var addItemEvent = component.getItem("addItem");
        addItemEvent.setParams({"item": newItem});
        addItemEvent.fire();
        
        // reset the form:
        component.set("v.newItem", {
            'sobjectType': 'Camping_Item__c',
            'Name': '',
            'Price__c': 0,
            'Quantity__c': 0,
            'Packed__c': false
        });
    },
    
    createItem : function(component, item) {
		var action = component.get("c.saveItem");
        
        action.setParams({
            "campingItem": item
        });
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var items = component.get("v.items");
                items.push(response.getReturnValue());
                component.set("v.items", items);
            }
        });
        
        $A.enqueueAction(action);
    },
    
    validateItem: function(campingItem) {
        // Simplistic error checking
        var validItem = true;
    
        // Name must not be blank
        var nameField = component.find("itemName");
        var itemName = nameField.get("v.value");
        if ($A.util.isEmpty(itemName)){
            validItem = false;
            nameField.set("v.errors", [{message:"Camping Item name can't be blank."}]);
        } else {
            nameField.set("v.errors", null);
        }
        
        // Check Quantity
        var quantityField = component.find("quantity");
        var quantityValue = quantityField.get("v.value");
        if (quantityValue <= 0 || Number.isNaN(quantityValue) || $A.util.isEmpty(quantityValue)) {
            validItem = false;
            quantityField.set("v.errors", [{message: "Quantity cannot be 0 or blank."}]);
        } else {
            quantityField.set("v.errors", null);
        }
        
        // Check Price
        var priceField = component.find("price");
	    var priceValue = priceField.get("v.value");
        if ($A.util.isEmpty(priceValue) || priceValue <= 0 || Number.isNaN(priceValue)) {
            validItem = false;
            priceField.set("v.errors", [{message : "Price cannot less than 0 or blank."}]);
        } else {
            priceField.set("v.errors", null);
        }
        
        return(validExpense);
    }
})
