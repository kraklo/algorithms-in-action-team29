import ArrayTracer from '../../components/DataStructures/Array/Array1DTracer';
import { areExpanded } from './collapseChunkPlugin';

const SRS_BOOKMARKS = {
    radix_sort: 1,
    max_number: 2,
    counting_sort: 3,
    count_nums: 4,
    cumulative_sum: 5,
    populate_array: 6,
    populate_for_loop: 7,
    insert_into_array: 8,
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
    console.log((num & (1 << index)));
    return (num & (1 << index) >> index);
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
        const A = [...nodes];

        console.log(A);

        chunker.add(SRS_BOOKMARKS.radix_sort,
            (vis, array) => {
                vis.array.set(array, 'radixsort');
            },
            [nodes]
        );

        const maxNumber = Math.max(...A);
        console.log(maxNumber);
        const maxIndex = A.indexOf(maxNumber);
        let maxBit = 64;

        for (; bitAtIndex(maxNumber, maxBit) == 0; maxBit--);

        chunker.add(SRS_BOOKMARKS.max_number,
            (vis, maxIndex) => {
                highlight(vis, maxIndex);
            },
            [maxIndex]
        );

        chunker.add(SRS_BOOKMARKS.counting_sort);

        chunker.add(SRS_BOOKMARKS.count_nums);

        chunker.add(SRS_BOOKMARKS.cumulative_sum);

        chunker.add(SRS_BOOKMARKS.populate_array);

        chunker.add(SRS_BOOKMARKS.populate_for_loop);

        chunker.add(SRS_BOOKMARKS.insert_into_array,
            (vis, array) => {
                vis.array.set(array.sort(), 'radixsort');
            },
            [A]
        );
    }
};