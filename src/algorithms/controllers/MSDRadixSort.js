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

// Helper function to determine the number of bits needed
function getMaximumBit(arr) {
    let max = Math.max(...arr);
    return Math.floor(Math.log2(max)) + 1;
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
      let A = [...nodes]

      chunker.add(SRS_BOOKMARKS.radix_sort,
        (vis, array) => {
            vis.array.set(array, 'MSDRadixSort');
        },
        [nodes]
      );


      function msdRadixSortRecursive(arr, bitPosition) {
          // Base case: If the array has 1 or fewer elements or bitPosition is less than 0, return the array
          if (arr.length <= 1 || bitPosition < 0) {
              return arr;
          }

          const zeros = [];
          const ones = [];

          for (let num of arr) {
              if ((num >> bitPosition) & 1) {
                  ones.push(num);
              } else {
                  zeros.push(num);
              }
          }

          const sortedZeros = msdRadixSortRecursive(zeros, bitPosition - 1);
          const sortedOnes = msdRadixSortRecursive(ones, bitPosition - 1);

          return [...sortedZeros, ...sortedOnes];
      }


      console.log(`Array Before: ${A}`);
      const maxBitLength = getMaximumBit(A);
      const sortedArray = msdRadixSortRecursive(A, maxBitLength - 1);
      console.log(`Array After: ${sortedArray}`);

      return A;
    }
};
