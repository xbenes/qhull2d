describe('QHull algorithm', function() {

    var comparePoints = function(a, b) {
        if (a[0] < b[0]) return 1;
        if (a[0] > b[0]) return -1;

        return b[1] - a[1];
    };
    var getSorted = function(array) {
        return [].concat(array).sort(comparePoints);
    };

    it('should return empty array for empty input', function() {
        expect(qhull2d.compute([])).to.eql([]);
    });

    it('should correctly compute convex hull for pointset 1', function() {
        var result = qhull2d.compute([[0, 0], [1, 0], [1, 1], [0, 1]]);
        expect(
            getSorted(result)
        ).to.eql(
            getSorted([[0, 0], [1, 0], [1, 1], [0, 1]])
        );
    });

    it('should correctly compute convex hull for pointset 2', function() {
        var result = qhull2d.compute([[3, 10], [1, 1], [0, 0], [4, 0]]);
        expect(
            getSorted(result)
        ).to.eql(
            getSorted([[0, 0], [4, 0], [3, 10]])
        );
    });

    it('should produce correct value day map for given data', function() {
        var result = qhull2d.compute([[0, 0], [1, 0], [1, 1], [0, 1], [0.5, 0.5]]);
        expect(
            getSorted(result)
        ).to.eql(
            getSorted([[0, 0], [1, 0], [1, 1], [0, 1]])
        );
    });

    it('should return null if no points given', function() {
        console.log('Testing qhull2d with no data, expect error message');
        var result = qhull2d.compute();
        expect(result).to.be(null);
    });
});

