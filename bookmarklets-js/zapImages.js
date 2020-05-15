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

// Full function v2, this def works:
(function() {
  document.querySelectorAll('img').forEach(image => {
    let altText = document.createTextNode(image.alt);
    image.parentNode.replaceChild(altText, image);
  });
})();

// So this one liner should work:
// (function(){document.querySelectorAll('img').forEach(image => {let altText=document.createTextNode(image.alt);image.parentNode.replaceChild(altText,image);});})();