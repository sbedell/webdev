function isPrime(n) {
  if (n % 2 == 0) {
    return (n == 2);
  } else if (n % 3 == 0) {
    return (n == 3);
  }

  for (var i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}