import ArrayTracer from '../../components/DataStructures/Array/Array1DTracer';

const SRS_BOOKMARKS = {
    radix_sort: 1,
    max_number: 2,
    counting_sort_for_loop: 3,
    counting_sort: 4,
    count_nums: 5,
    cumulative_sum: 6,
    populate_array: 7,
    populate_for_loop: 8,
    insert_into_array: 9,
    copy: 10,
    done: 11,
};

const highlight = (vis, index, isPrimaryColor = true) => {
    if (isPrimaryColor) {
        vis.array.select(index);
    } else {
        vis.array.patch(index);
    }
};

const unhighlight = (vis, index, isPrimaryColor = true) => {
    if (isPrimaryColor) {
        vis.array.deselect(index);
    } else {
        vis.array.depatch(index);
    }
};

// Helper function to determine the number of bits needed
function getMaximumBit(arr) {
    let max = Math.max(...arr);
    let maxBit = -1;

    while (max > 0) {
        max = Math.floor(max / 2);
        maxBit++;
    }

    return maxBit
}

export default {
    initVisualisers() {
        return {
            array: {
                instance: new ArrayTracer('array', null, 'Array view', { arrayItemMagnitudes: true }), // Label the input array as array view
                order: 0,
            },
        }
    },

    /**
     *
     * @param {object} chunker
     * @param {array} nodes array of numbers needs to be sorted
     */
    run(chunker, { nodes }) {
      // let A = [...nodes]
      let A = [5, 3, 8, 6, 2, 7, 4, 1]
      let n = A.length

      chunker.add(SRS_BOOKMARKS.radix_sort,
        (vis, array) => {
            vis.array.set(array, 'MSDRadixSort');
        },
        [nodes]
      );

      function partition(arr, left, right, mask) {
        let i = left
        let j = right
        while (i <= j) {
          // Build the left group until it reaches the mask (find the big element)
          while (i <= right && ((arr[i] >> mask & 1)) === 0) {
            i++
          }
          // Build the right group until it fails the mask (find the small element)
          while (j >= left && ((arr[j] >> mask & 1)) === 1) {
            j--
          }

          console.log(`i: ${i}, j: ${j}`)
          // Swap if the bigger element is not in the right place
          if (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            i++
            j--
          }
        }
        return i
      }

      function msdRadixSortRecursive(arr, left, right, mask) {
          // Base case: If the array has 1 or fewer elements or mask is less than 0, stop
          if (left >= right || mask < 0) {
              return
          }

          const mid = partition(arr, left, right, mask)

          console.log(`Mid is ${mid}`)

          msdRadixSortRecursive(arr, left, mid - 1, mask - 1)
          msdRadixSortRecursive(arr, mid, right, mask - 1)
      }


      console.log(`Array Before: ${A}`);
      const mask = getMaximumBit(A);
      msdRadixSortRecursive(A, 0, n-1, mask);
      console.log(`Array After: ${A}`);

      return A;
    }
};
