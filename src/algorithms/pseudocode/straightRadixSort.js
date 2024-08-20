import parse from '../../pseudocode/parse';

export default parse(`
\\Note{ REAL specification of radix exchange sort
Modified quicksort code: will need extra bookmarks for top level plus
NOTE that j can start off the RHS of the array.
\\Note}

\\Code{
Main
Radixsort(A, n) // Sort array A[1]..A[n] in ascending order. \\B 1

    Find maximum bit used    \\Ref MaximumBit
    \\Expl{  maxBit is the most significant position in which we see a "1" in
      the binary representation of the numbers. We used this as a threshold
      to stop iteratively sorting the array.
      This can be determined from the word size used to represent
      the data or by scanning through the data (we do the latter here
      because only small examples are used).
    \\Expl}

    for each bit up to maximum bit    \\Ref RSFor
    \\Expl{  We stop at the maximum bit so that we do not waste time
      looking at bits that we know will be 0.
    \\Expl}
    \\In{
        Countingsort(A, k, n)    \\Ref Countingsort
        \\Expl{  Straight Radix Sort uses Counting Sort to stably sort the
          array treating each bit of the number as the number in Counting
          Sort.
        \\Expl}
    \\In}

// Done \\B 11
\\Code}

\\Code{
MaximumBit
maxNumber <- max(A) \\B 2
maxBit <- 0
while maxNumber > 0
\\In{
    maxNumber <- maxNumber/2
    maxBit <- maxBit+1
\\In}
\\Code}

\\Code{
RSFor
for i <- 0 to maxBit \\B 3
\\Code}

\\Code{
Countingsort
// Countingsort(A, k, n) \\B 4
Count number of 1s and 0s in B    \\Ref CountNums
\\Expl{  We count the number of 1s and 0s as these are the only two
  digits we are concerned with in each iteration of counting sort.
\\Expl}
Cumulatively sum counts    \\Ref CumSum
\\Expl{  Counting sort requires us to add the previous count to each
  successive count so that we know the correct place to put each element
  in the final array.
\\Expl}
Populate new array C with sorted numbers    \\Ref Populate
\\Expl{  We place each element in the count-1 spot of the new array as
  this is the correct placement for each element sorted in respect to
  the current significant bit.
\\Expl}
Copy C back to A \\B 10
\\Code}

\\Code{
CountNums
// Count number of 1s and 0s in B \\B 5
for num in A \\B 13
\\In{
    bit <- kth bit in num    \\Ref KthBit
    \\Expl{  We use a mask to isolate the kth bit we want to look at
      (as a bitwise and operation with a 1 bit-shifted left k times 
      isolates that digit), and then bit-shift that right k times so
      that the value of the number will be either 0 or 1 depending what
      the significant bit was.
    \\Expl}
    B[bit] <- B[bit]+1 \\B 12
\\In}
\\Code}

\\Code{
KthBit
bit <- (num & (1 << i)) >> i
\\Code}

\\Code{
CumSum
// Cumulatively sum counts \\B 6
B[1] = B[0] + B[1]
\\Code}

\\Code{
Populate
// Populate new array C with sorted numbers \\B 7
for each num in A in reverse order    \\Ref PopFor
\\Expl{  We go in reverse order so that we preserve the order of each number.
  This is CRUCIAL in radix sort as the counting sort MUST be stable.
\\Expl}
\\In{
    bit <- kth bit in num    \\Ref KthBit
    \\Expl{  We use a mask to isolate the kth bit we want to look at
      (as a bitwise and operation with a 1 bit-shifted left k times 
      isolates that digit), and then bit-shift that right k times so
      that the value of the number will be either 0 or 1 depending what
      the significant bit was.
    \\Expl}
    B[bit] = B[bit]-1
    C[B[bit]] = num \\B 9
\\In}
\\Code}

\\Code{
PopFor
for j <- n-1 downto 0 \\B 8
\\In{
    num <- A[j]
\\In}
\\Code}

`);
