function isPrime(n) {
  if (n % 2 == 0) {
    return (n == 2);
  } else if (n % 3 == 0) {
    return (n == 3);
  }

  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

function getPrimeFactors(num) {
	let primeFactors = new Set();

	if (num % 2 == 0) { 
  	primeFactors.add(2);
  }
	// only looping thru odd numbers since
  // no even numbers are prime except 2
	for (let i = 3; i <= num; i += 2) {
  	if (isPrime(i)) {
    	if (num % i == 0) {
      	primeFactors.add(i);
      }
    }
  }
  
  return primeFactors;
}

let start = new Date().getTime();
console.log(getPrimeFactors(10));
console.log(getPrimeFactors(300));
console.log(getPrimeFactors(6));
console.log(getPrimeFactors(49583));
let end = new Date().getTime();
console.log(end - start);