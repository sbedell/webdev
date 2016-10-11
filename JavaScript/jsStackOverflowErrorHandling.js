try {
	throw "Grab title from page";
} catch(e) {
 	console.log(e);
	window.open("http://stackoverflow.com/search?q=[js] + " + e);
}
