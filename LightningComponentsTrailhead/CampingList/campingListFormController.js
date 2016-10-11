({
    // Previously Called createCampingItem
	submitForm: function(component, event, helper) {        
        if (helper.validateItem(component)) {
            var item = component.get("v.newItem");
            helper.createItem(component, item);
        }
    },
})
