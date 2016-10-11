// IEFE version:
(function() {
    var textNode;
    var walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    while (textNode = walk.nextNode()) {
        textNode.nodeValue = textNode.nodeValue.replace(/Trump/g, "Drumpf");
    }
})();

/* minified version:
var textNode,walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(textNode=walk.nextNode()){textNode.nodeValue=textNode.nodeValue.replace(/Donald Trump/g,"Donald Drumpf");}
*/

/* innerHTML version:
document.body.innerHTML=document.body.innerHTML.replace(/Donald Trump/g, 'Donald Drumpf');
*/

// one liner iefe versions:
(function(){document.body.innerHTML=document.body.innerHTML.replace(/Trump/g, 'Drumpf');document.title=document.title.replace(/Trump/g, 'Drumpf');
})();

(function(){document.body.innerHTML=document.body.innerHTML.replace(/Trump/g,'Drumpf');})();