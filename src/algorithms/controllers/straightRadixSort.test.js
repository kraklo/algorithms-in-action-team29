/* The purpose of the test here is to detect whether the correct result is generated
   under the legal input, not to test its robustness, because this is not considered
   in the implementation process of the algorithm.
*/

/* eslint-disable no-undef */

import straightRadixSort from "./straightRadixSort";

// Simple stub for the chunker
const chunker = {
    add: () => { },
};

describe('straight radix sort', () => {

    it('sorts empty array', () => {
        expect(straightRadixSort.run(chunker, { nodes: [] })).toEqual([]);
    });

    // it('should be stable when sorting objects with the same value', () => {
    //     const arr = [
    //         { value: 170, label: 'A' },
    //         { value: 45, label: 'B' },
    //         { value: 75, label: 'C' },
    //         { value: 45, label: 'D' },
    //         { value: 802, label: 'E' },
    //         { value: 24, label: 'F' },
    //         { value: 2, label: 'G' },
    //         { value: 66, label: 'H' }
    //     ];
    //
    //     straightRadixSort(arr, (item) => item.value);
    //     expect(arr).toEqual([
    //         { value: 2, label: 'G' },
    //         { value: 24, label: 'F' },
    //         { value: 45, label: 'B' },
    //         { value: 45, label: 'D' },
    //         { value: 66, label: 'H' },
    //         { value: 75, label: 'C' },
    //         { value: 170, label: 'A' },
    //         { value: 802, label: 'E' }
    //     ]);
    // });
});