import ArrayTracer from '../../components/DataStructures/Array/Array1DTracer';
import {
  areExpanded,
} from './collapseChunkPlugin';

// see stackFrameColour in index.js to find corresponding function mapping to css
const STACK_FRAME_COLOR = {
  No_color: 0,
  In_progress_stackFrame: 1,
  Current_stackFrame: 2,
  Finished_stackFrame: 3,
  I_color: 4,
  J_color: 5,
  P_color: 6, // pivot
};

const VIS_VARIABLE_STRINGS = {
  i_left_index: 'i',
  j_right_index: 'j',
  i_eq_0: 'i==0',
  j_eq_0: 'j==0',
  pivot: 'pivot',
};

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


const update_vis_with_stack_frame = (a, stack_frame, stateVal) => {
  let left, right,  depth;
  [left, right,  depth] = stack_frame;

  for (let i = left; i <= right; i += 1) {
    // each element in the vis stack is a tuple:
    // 0th index is for base color,
    // 1th index is for pivot, i, j colors
    a[depth][i] = { base: stateVal, extra: [] };
  }
  return a;
}

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

const isPartitionExpanded = () => {
  return areExpanded(['Partition'])
}

const isRecursionExpanded = () => {
  return areExpanded(['QuicksortFirst']) || areExpanded(['QuicksortSecond']);
}

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

const assignVar = (vis, variableName, index) => {
  if (index === undefined)
    vis.array.removeVariable(variableName)
  else
    vis.array.assignVariable(variableName, index)
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
      console.log('start')


      // ----------------------------------------------------------------------------------------------------------------------------
      // Define 'global' variables
      // ----------------------------------------------------------------------------------------------------------------------------

      const entire_num_array = nodes;
      let max_depth_index = -1; // indexes into 2D array, starts at zero
      const finished_stack_frames = []; // [ [left, right,  depth], ...]  (although depth could be implicit this is easier)
      const real_stack = []; // [ [left, right,  depth], ...]

      // ----------------------------------------------------------------------------------------------------------------------------
      // Define helper functions
      // ----------------------------------------------------------------------------------------------------------------------------

      const refresh_stack = (vis, cur_real_stack, cur_finished_stack_frames, cur_i, cur_j, cur_pivot_index, cur_depth) => {
        // XXX
        // We can't render the -1 index in the array
        // For now we display i==0/j==0 at left of array if appropriate
        let cur_i_too_low;
        let cur_j_too_low;
        if (cur_i === -1) {
          cur_i = undefined;
          cur_i_too_low = 0;
        } else {
          cur_i_too_low = undefined;
        }
        if (cur_j === -1) {
          cur_j = undefined;
          cur_j_too_low = 0;
        } else {
          cur_j_too_low = undefined;
        }

        assert(vis.array);
        assert(cur_real_stack && cur_finished_stack_frames);

        if (!isPartitionExpanded()) {
          // j should not show up in vis if partition is collapsed
          cur_j = undefined;
          cur_j_too_low = undefined;
        }

        if (!isPartitionExpanded() && !isRecursionExpanded()) {
          // i should not show up in vis if partition + recursion is collapsed
          cur_i = undefined;
          cur_i_too_low = undefined;
        }

        vis.array.setStackDepth(cur_real_stack.length);
        vis.array.setStack(
          derive_stack(cur_real_stack, cur_finished_stack_frames, cur_i, cur_j, cur_pivot_index, cur_depth)
        );

        assign_i_j(vis, VIS_VARIABLE_STRINGS.i_left_index, cur_i);
        assign_i_j(vis, VIS_VARIABLE_STRINGS.i_eq_0, cur_i_too_low);
        assign_i_j(vis, VIS_VARIABLE_STRINGS.pivot, cur_pivot_index);
        assign_i_j(vis, VIS_VARIABLE_STRINGS.j_right_index, cur_j);
        assign_i_j(vis, VIS_VARIABLE_STRINGS.j_eq_0, cur_j_too_low);
      };


      function derive_stack(cur_real_stack, cur_finished_stack_frames, cur_i, cur_j, cur_pivot_index, cur_depth) {
        // return 2D array stack_vis containing color values corresponding to stack frame states and indexes in those stack frames
        // for visualise this data

        let stack_vis = [];

        for (let i = 0; i < max_depth_index + 1; i++) {
          // for whatever reason fill() does not work here... JavaScript
          stack_vis.push(
            [...Array.from({ length: entire_num_array.length })].map(() => ({
              base: STACK_FRAME_COLOR.No_color,
              extra: [],
            })),
          );
        }

        cur_finished_stack_frames.forEach((stack_frame) => {
          stack_vis = update_vis_with_stack_frame(
            stack_vis,
            stack_frame,
            STACK_FRAME_COLOR.Finished_stackFrame,
          );
        });

        cur_real_stack.forEach((stack_frame) => {
          stack_vis = update_vis_with_stack_frame(
            stack_vis,
            stack_frame,
            STACK_FRAME_COLOR.In_progress_stackFrame,
          );
        });

        if (cur_real_stack.length !== 0) {
          stack_vis = update_vis_with_stack_frame(
            stack_vis,
            cur_real_stack[cur_real_stack.length - 1],
            STACK_FRAME_COLOR.Current_stackFrame,
          );
        }

        if (cur_depth === undefined) {
          return stack_vis;
        }

        if (cur_pivot_index !== undefined) {
          stack_vis[cur_depth][cur_pivot_index].extra.push(STACK_FRAME_COLOR.P_color);
        }

        if (!isPartitionExpanded()) { return stack_vis; }

        if (cur_i !== undefined) {
          stack_vis[cur_depth][cur_i].extra.push(STACK_FRAME_COLOR.I_color);
        }

        if (cur_j !== undefined) {
          stack_vis[cur_depth][cur_j].extra.push(STACK_FRAME_COLOR.J_color);
        }

        return stack_vis;
      }

      const assign_i_j = (vis, variable_name, index) => {
        if (index === undefined) { vis.array.removeVariable(variable_name); return; }
        vis.array.assignVariable(variable_name, index);
      }







      // ----------------------------------------------------------------------------------------------------------------------------
      // Real code goes here
      // ----------------------------------------------------------------------------------------------------------------------------
      const partition = (arr, left, right, mask) => {
        let i = left
        let j = right
        chunker.add(MSD_BOOKMARKS.set_i,
          (vis) => {
            assignVar(vis, 'left', left)
            assignVar(vis, 'i', left)
          }, [A, left])
        chunker.add(MSD_BOOKMARKS.set_j,
          (vis) => {
            assignVar(vis, 'right', right)
            assignVar(vis, 'j', right)
          }, [A, right])
        while (i <= j) {
          // Build the left group until it reaches the mask (find the big element)
          while (i <= right && ((arr[i] >> mask & 1)) === 0) {
            // Update the position of i on the array
            console.log(i)
            // chunker.add(MSD_BOOKMARKS.partition_left,
            //     (vis) => {
            //       console.log('Assigning i  to ', i)
            //       assignVar(vis, 'i', i)
            //   }, [i])
            i++
          }
          // Build the right group until it fails the mask (find the small element)
          while (j >= left && ((arr[j] >> mask & 1)) === 1) {
            // Update the position of j on the array
            j--
            // chunker.add(MSD_BOOKMARKS.partition_right,
            //     (vis) => {
            //       assignVar(vis, 'j', j)
            //   }, [j])
          }

          // Swap if the bigger element is not in the right place
          if (j > i) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
            chunker.add(MSD_BOOKMARKS.swap,
              (vis, array) => {
                  vis.array.set(array, 'MSDRadixSort')
                  vis.array.swapElements(i, j)
              },
              [A, i, j]
            )
          }
        }

        return i

      }

      const msdRadixSortRecursive = (arr, left, right, mask) => {
        // Base case: If the array has 1 or fewer elements or mask is less than 0, stop
        chunker.add(MSD_BOOKMARKS.base_case)
        if (left < right && mask >= 0) {
          const mid = partition(arr, left, right, mask)
          chunker.add(MSD_BOOKMARKS.sort_left,
            (vis, array) => {
                vis.array.set(array, 'MSDRadixSort')
            },
            [A]
          )
          msdRadixSortRecursive(arr, left, mid - 1, mask - 1)
          chunker.add(MSD_BOOKMARKS.sort_right,
            (vis, array) => {
                vis.array.set(array, 'MSDRadixSort')
            },
            [A]
          )
          msdRadixSortRecursive(arr, mid, right, mask - 1)
        }
      }

      // Initialise the array on start
      chunker.add(MSD_BOOKMARKS.start,
        (vis, array) => {
            vis.array.set(array, 'MSDRadixSort')
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
