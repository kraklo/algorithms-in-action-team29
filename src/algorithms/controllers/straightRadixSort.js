import ArrayTracer from '../../components/DataStructures/Array/Array1DTracer';
import { areExpanded } from './collapseChunkPlugin';

const BITS = 2;

const SRS_BOOKMARKS = {
    radix_sort: 1,
    // max_number: 2,
    counting_sort_for_loop: 3,
    counting_sort: 4,
    count_nums: 5,
    cumulative_sum: 6,
    populate_array: 7,
    // populate_for_loop: 8,
    insert_into_array: 9,
    copy: 10,
    done: 11,
    add_to_count: 12,
    add_count_for_loop: 13,
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

const bitsAtIndex = (num, index, bits) => {
    return (num & (((1 << bits) - 1) << (index * bits))) >> (index * bits);
};

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
        let A = [...nodes];
        const n = A.length;

        const countingSort = (A, k, n, bits) => {
            const count = Array.apply(null, Array(1 << bits)).map(() => 0);

            for (let i = 0; i < n; i++) {
                chunker.add(SRS_BOOKMARKS.count_nums);
                const bit = bitsAtIndex(A[i], k, bits);
                count[bit]++;


                chunker.add(SRS_BOOKMARKS.add_to_count,
                    (vis, i) => {
                        if (i !== 0) {
                            unhighlight(vis, i - 1);
                        }

                        highlight(vis, i);
                    },
                    [i]
                );

                chunker.add(SRS_BOOKMARKS.add_count_for_loop,
                    (vis, i) => {
                        unhighlight(vis, i);
                    },
                    [i]
                );
            }

            for (let i = 1; i < n; i++) {
                count[i] += count[i - 1];
            }

            chunker.add(SRS_BOOKMARKS.cumulative_sum);

            const sorted_A = Array.apply(null, Array(n)).map(() => 0);

            chunker.add(SRS_BOOKMARKS.populate_array);
            // chunker.add(SRS_BOOKMARKS.populate_for_loop);

            for (let i = n - 1; i >= 0; i--) {
                const num = A[i];
                const bit = bitsAtIndex(num, k, bits);
                count[bit]--;
                sorted_A[count[bit]] = num;
                chunker.add(SRS_BOOKMARKS.insert_into_array);
            }

            chunker.add(SRS_BOOKMARKS.copy,
                (vis, array) => {
                    vis.array.set(array, 'straightRadixSort');
                },
                [sorted_A]
            );

            return sorted_A;
        };

        chunker.add(SRS_BOOKMARKS.radix_sort,
            (vis, array) => {
                vis.array.set(array, 'straightRadixSort');
            },
            [nodes]
        );

        let maxNumber = Math.max(...A);
        const maxIndex = A.indexOf(maxNumber);
        let maxBit = -1;

        while (maxNumber > 0) {
            maxNumber = Math.floor(maxNumber / 2);
            maxBit++;
        }

        // chunker.add(SRS_BOOKMARKS.max_number,
        //     (vis, maxIndex) => {
        //         highlight(vis, maxIndex);
        //     },
        //     [maxIndex]
        // );

        let bits = 1;

        while (bits < maxBit) {
            bits *= 2;
        }


        for (let k = 0; k <= bits / BITS; k++) {
            chunker.add(SRS_BOOKMARKS.counting_sort_for_loop,
                vis => {
                    unhighlight(vis, maxIndex);
                }
            );

            A = countingSort(A, k, n, BITS);

            chunker.add(SRS_BOOKMARKS.counting_sort);
        }

        chunker.add(SRS_BOOKMARKS.done,
            vis => {
                for (let i = 0; i < n; i++) {
                    vis.array.sorted(i);
                }
            }
        );

        return A;
    }
};