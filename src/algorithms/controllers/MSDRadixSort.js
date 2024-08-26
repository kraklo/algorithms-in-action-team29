import ArrayTracer from '../../components/DataStructures/Array/Array1DTracer';

const MSD_BOOKMARKS = {
  start: 1,

  get_mask: 100,
  first_pass: 200,
  base_case: 300,
  set_i: 301,
  set_j: 302,
  partition_while: 303,
  partition_left: 304,
  partition_right: 305,
  swap_condition: 309,
  swap: 310,
  sort_left: 400,
  sort_right: 500,
  done: 5000
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
const getMaximumBit = (arr) => {
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
      let A = [...nodes]
      let n = A.length

      function partition(arr, left, right, mask) {
        let i = left
        chunker.add(MSD_BOOKMARKS.set_i)
        let j = right
        chunker.add(MSD_BOOKMARKS.set_j)
        while (i <= j) {
          chunker.add(MSD_BOOKMARKS.partition_left)
          // Build the left group until it reaches the mask (find the big element)
          while (i <= right && ((arr[i] >> mask & 1)) === 0) {
            i++
          }
          chunker.add(MSD_BOOKMARKS.partition_right)
          // Build the right group until it fails the mask (find the small element)
          while (j >= left && ((arr[j] >> mask & 1)) === 1) {
            j--
          }

          // Swap if the bigger element is not in the right place
          if (j > i) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            chunker.add(MSD_BOOKMARKS.swap,
              (vis, array) => {
                  vis.array.set(array, 'MSDRadixSort')
              },
              [A]
            )
          }
        }

        return i

      }

      function msdRadixSortRecursive(arr, left, right, mask) {
          // Base case: If the array has 1 or fewer elements or mask is less than 0, stop
          chunker.add(MSD_BOOKMARKS.base_case)
        if (left < right && mask > 0) {
          const mid = partition(arr, left, right, mask)
          msdRadixSortRecursive(arr, left, mid - 1, mask - 1)
          // chunker.add(MSD_BOOKMARKS.sort_left,
          //   (vis, array) => {
          //       vis.array.set(array, 'MSDRadixSort')
          //   },
          //   [A]
          // )
          msdRadixSortRecursive(arr, mid, right, mask - 1)
          // chunker.add(MSD_BOOKMARKS.sort_right,
          //   (vis, array) => {
          //       vis.array.set(array, 'MSDRadixSort')
          //   },
          //   [A]
          // )
        }
      }

      // Initialise the array on start
      chunker.add(MSD_BOOKMARKS.start,
        (vis, array) => {
            vis.array.set(array, 'MSDRadixSort');
        },
        [nodes]
      )

      const maxIndex = A.indexOf(Math.max(...A))
      // Highlight the index
      chunker.add(MSD_BOOKMARKS.get_mask,
          (vis, maxIndex) => {
            highlight(vis, maxIndex);
          },
          [maxIndex]
      )
      chunker.add(MSD_BOOKMARKS.first_pass)


      const mask = getMaximumBit(A);
      msdRadixSortRecursive(A, 0, n-1, mask);

      chunker.add(MSD_BOOKMARKS.done,
          vis => {
              for (let i = 0; i < n; i++) {
                  vis.array.sorted(i);
              }
          }
      );
      return A;
    }
};
