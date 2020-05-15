// v1, works well, replaces images with their alt text:
// javascript:(function(){function%20toArray%20(c){var%20a,%20k;a=new%20Array;for%20(k=0;%20k%20<%20c.length;%20++k)a[k]=c[k];return%20a;}var%20images,%20img,%20altText;images=toArray(document.images);for%20(var%20i=0;%20i%20<%20images.length;%20++i){img=images[i];altText=document.createTextNode(img.alt);img.parentNode.replaceChild(altText,%20img)}})();

// Full function v1 pretty printed:
(function() {
  function toArray(c) {
      var a, k;
      a = new Array;
      for (k = 0; k < c.length; ++k) a[k] = c[k];
      return a;
  }
  var images, img, altText;
  images = toArray(document.images);
  for (var i = 0; i < images.length; ++i) {
    img = images[i];
    altText = document.createTextNode(img.alt);
    img.parentNode.replaceChild(altText, img)
  }
})();

// v2, kinda buggy?
// javascript:(function(){%20%20%20for%20(var%20i%20in%20document.getElementsByTagName('img'))%20{%20%20%20var%20img=document.getElementsByTagName('img')[i];%20%20%20%20%20var%20altText%20=%20document.createTextNode(img.alt);%20%20%20%20%20img.parentNode.replaceChild(altText,img);%20%20%20}%20})();

// Full function pretty print of v2:
(function() {
  for (let img in document.getElementsByTagName('img')) {
    var altText = document.createTextNode(img.alt) || "";
    img.parentNode.replaceChild(altText, img);
  }
})();
