let n = 1;

search: while(true) {
  n++;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
      continue search;
    }
  }
      
  // found a prime!
  postMessage(n);
}