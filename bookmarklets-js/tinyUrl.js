// Original version, this just opens it in the same tab and navigates you away from the page you're on. Not always ideal.
javascript:document.location="https://tinyurl.com/create.php?url="+document.location.href;

// Open it in a new window entirely, need to wrap in an IEFE:
javascript:(function(){window.open("https://tinyurl.com/create.php?url="+document.location.href);})();
