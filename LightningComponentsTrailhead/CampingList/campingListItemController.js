({
	packItem: function(component, event, helper) {
        var item = component.get("v.item");
		item.Packed__c = true;
        component.set("v.item", item)
        
        var btnClicked = event.getSource();
        component.set("v.disabled", true);
    }
})
