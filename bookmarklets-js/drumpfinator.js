// https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker

(function() {
    let textNode;
    // ("root" = document, "whatToShow" = Text)
    let walk = document.createTreeWalker(document, NodeFilter.SHOW_TEXT);

    while (textNode = walk.nextNode()) {
        textNode.nodeValue = textNode.nodeValue.replace(/Trump/g, "Drumpf");
    }
})();

// One Liner IEFE bookmarklet:
(function(){let textNode,walk=document.createTreeWalker(document,NodeFilter.SHOW_TEXT);while(textNode=walk.nextNode()){textNode.nodeValue=textNode.nodeValue.replace(/Trump/g,"Drumpf");}})();

// one liner IEFE innerHTML version:
// This messes up images if they contain the word "Trump" lol. I think that's why the TreeWalker thing is better. 
(function(){document.body.innerHTML=document.body.innerHTML.replace(/Trump/g, 'Drumpf');document.title=document.title.replace(/Trump/g, 'Drumpf');
})();
