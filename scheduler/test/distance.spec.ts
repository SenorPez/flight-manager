import {distance} from "../src/distance";

test('Test distance function', () => {
    expect(distance([37.46249771, 126.4391479], [61.17408752, -149.9981384])).toEqual(3295);
})