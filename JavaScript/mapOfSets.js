var maptoSet = new Map();
var stopObj = {
	name: "Stop 1",
  routes: new Set()
}
stopObj.routes.add("route1");
stopObj.routes.add("route2");
stopObj.routes.add("route1");

maptoSet.set("firstStop", stopObj);

console.log(maptoSet.get("firstStop"));
//console.dir(maptoSet.get("firstStop"));
console.log(maptoSet.get("firstStop").routes);