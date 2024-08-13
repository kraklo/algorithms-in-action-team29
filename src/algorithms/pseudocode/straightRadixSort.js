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
    \\Expl{  test
    \\Expl}
    \\In{
        Countingsort(A, k, n)    \\Ref Countingsort
        \\Expl{  test
        \\Expl}
    \\In}

// Done \\B 9
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
for i <- maxBit downto 0
\\Code}

\\Code{
Countingsort
// Countingsort(A, k, n) \\B 3
Count number of 1s and 0s in B    \\Ref CountNums
\\Expl{  test
\\Expl}
Cumulatively sum counts    \\Ref CumSum
\\Expl{  test
\\Expl}
Populate new array C with sorted numbers    \\Ref Populate
\\Expl{  test
\\Expl}
Copy C back to A
\\Code}

\\Code{
CountNums
// Count number of 1s and 0s in B \\B 4
for num in A
\\In{
    bit <- kth bit in num    \\Ref KthBit
    \\Expl{  test
    \\Expl}
    B[bit] <- B[bit]+1
\\In}
\\Code}

\\Code{
KthBit
bit <- (num & (1 << i)) >> i
\\Code}

\\Code{
CumSum
// Cumulatively sum counts \\B 5
B[1] = B[0] + B[1]
\\Code}

\\Code{
Populate
// Populate new array C with sorted numbers \\B 6
for each num in A in reverse order    \\Ref PopFor
\\Expl{  test
\\Expl}
\\In{
    bit <- kth bit in num    \\Ref KthBit
    \\Expl{  test
    \\Expl}
    B[bit] = B[bit]-1
    C[B[bit]] = num \\B 8
\\In}
\\Code}

\\Code{
PopFor
for j <- n-1 downto 0 \\B 7
\\In{
    num <- A[j]
\\In}
\\Code}

`);
