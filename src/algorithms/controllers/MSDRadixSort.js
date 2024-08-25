import { bottomNavigationActionClasses } from '@mui/material';
import ArrayTracer from '../../components/DataStructures/Array/Array1DTracer';
import { ALGO_THEME_1 } from '../../components/top/helper';
import { areExpanded } from './collapseChunkPlugin';

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

const bitAtIndex = (num, index) => {
    return (num & (1 << index)) >> index;
};

const getMaximumBit = (A) => {
    let maxNumber = Math.max(...A)
    let maxBit = -1;
    while (maxNumber > 0) {
        maxNumber = Math.floor(maxNumber / 2);
        maxBit++;
    }
    return maxBit
}

const swap = (array, i, j) => {
  const temp = array[i]
  array[i] = array[j]
  array[j] = temp
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
      const mask = getMaximumBit(A)

      const msdRadixSortRecursive = (A, left, right, mask) => {
        console.log(`MSD Radix Sort Recursive ${left} ${right} ${mask}`)
        // If there are less than two elements in the array segment, or no bits left, do nothing
        if (left < right && mask > 0) {
          // Set index i to the left of the array segment and j at the right
          let i = left
          let j = right
          while (i < j) {
            while(bitAtIndex(A[i], mask) == 0 && i < j) {
              console.log(`A[i] is ${A[i]}, Bit At Index is ${bitAtIndex(A[i], mask)}`)
              i++
            }
            while(bitAtIndex(A[j], mask) == 1 && j > i) {
              console.log(`A[j] is ${A[j]}, Bit At Index is ${bitAtIndex(A[j], mask)}`)
              j--
            }
            break;
          }

          console.log(`i: ${i}, j: ${j}`)
          // while (i < j) {
          //   // repeatedly increment i until i >= j or A[i] has the mask bit
          //   // repeatedly decrement j until j <= i or A[j] has 0 as the mask bit
          //   if (j > i) {
          //     swap(A, i, j)
          //   }
          // }
        }
      }

      msdRadixSortRecursive(A, 0, n-1, mask)

      chunker.add(SRS_BOOKMARKS.radix_sort,
        (vis, array) => {
            vis.array.set(array, 'MSDRadixSort');
        },
        [nodes]
      );

      return A;
    }
};
