(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('qhull2d', function() {

    /**
     * Find extremes in given axis
     * @param {Array} points Array of points, each point as [x, y] array
     * @param {Number} axis dimension axis identifier, 0 for x, 1 for y
     * @return {Object} object with maximum and minimum point from the input set
     */
    var findExtremes = function(points, axis) {
        var maximum, minimum;
        for (var i = 0, len = points.length; i < len; i++) {

            maximum = maximum ?
                (points[i][axis] > maximum[axis] ? points[i] : maximum)
                : points[i];

            minimum = minimum ?
                (points[i][axis] < minimum[axis] ? points[i] : minimum)
                : points[i];
        }

        return {
            maximum: maximum,
            minimum: minimum
        };
    };

    /**
     * Get distance from point to line
     * @param {Array} lineA Array in the form of [x, y] for the first line point
     * @param {Array} lineB Array in the form of [x, y] for the second line point
     * @param {Array} point Array in the form of [x, y] for the point to compute distance
     * @return {Number} distance from point to the line
     */
    var pointLineDist = function(lineA, lineB, point) {
        var a = lineA[1] - lineB[1],
            b = lineB[0] - lineA[0],
            c = lineA[0] * lineB[1] - lineA[1] * lineB[0];
        return Math.abs(a * point[0] + b * point[1] + c) / Math.sqrt(a * a + b * b);
    };

    /**
     * Get farthest point from the line
     * @param {Array} pointA Array in the form of [x, y] for the first line point
     * @param {Array} pointB Array in the form of [x, y] for the second line point
     * @param {Array} points Array of points, each point as [x, y] array
     * @return {Array} selected point from the input set with biggest distance from the line
     */
    var getFarthestPoint = function(pointA, pointB, points) {
        var maxDist = -Infinity,
            maxPoint;

        points.forEach(function(point) {
            var dist = pointLineDist(pointA, pointB, point);
            if (dist > maxDist) {
                maxPoint = point;
                maxDist = dist;
            }
        });

        return maxPoint;
    };

    /**
     * Math.sign for given number
     */
    var mathsign = function(x) {
        return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
    };

    /**
     * Get point sign against line leading from pointA to pointB (A -> B, order important)
     * @param {Array} pointA Array in the form of [x, y] for the first line point
     * @param {Array} pointB Array in the form of [x, y] for the second line point
     * @param {Array} point Array in the form of [x, y] for the point to compute sign
     * @return {Number} -1, 0, 1 for left/right/on positioning
     */
    var sign = function(pointA, pointB, point) {
        return mathsign((pointB[0] - pointA[0])*(point[1] - pointA[1]) - (pointB[1] - pointA[1])*(point[0] - pointA[0]));
    };

    /**
     * Get points from given set which have negative sign for given line
     * @param {Array} pointA Array in the form of [x, y] for the first line point
     * @param {Array} pointB Array in the form of [x, y] for the second line point
     * @param {Array} points Array of points, each point as [x, y] array
     * @return {Array} points array of points having negative sign
     */
    var getPointsOnRight = function(pointA, pointB, points) {
        return points.filter(function(point) {
            return sign(pointA, pointB, point) === -1;
        });
    };

    /**
     * Qhull2d recursive helper function. Filters. Find farthest point for the segment
     * and process recursively.
     * @param {Array} pointA Array in the form of [x, y] for the first line segment point
     * @param {Array} pointB Array in the form of [x, y] for the second line segment point
     * @param {Array} points Array of points, each point as [x, y] array
     * @return {Array} array of points denoting the convex hull
     */
    var qh2 = function(pointA, pointB, allPoints) {
        var points = getPointsOnRight(pointA, pointB, allPoints);

        // if no points, return segment, to not have duplicates, report
        // just first point of the segment. If pairs denoting particular
        // edges are needed, report both pointA and pointB and adjust.
        if (!points.length) return [pointA];

        // find farthest point
        var pointF = getFarthestPoint(pointA, pointB, points);

        return [].concat(
            qh2(pointA, pointF, points),
            qh2(pointF, pointB, points)
        );
    };


    /**
     * Compute convex hull of the dataset
     * @param {Array} points Array of points, each point as [x, y] array
     * @return {Array} array of points denoting the convex hull of the input set
     */
    var compute = function(points) {
        if (!points) {
            console.log('Error: No input data given, aborting computation');
            return null;
        }
        if (points.length <= 3) return [].concat(points);

        var maxmin = findExtremes(points, 0);

        return [].concat(
            qh2(maxmin.minimum, maxmin.maximum, points),
            qh2(maxmin.maximum, maxmin.minimum, points)
        );
    };

    return {
        helpers: {
            mathsign: mathsign,
            sign: sign,
            getPointsOnRight: getPointsOnRight,
            pointLineDist: pointLineDist,
            getFarthestPoint: getFarthestPoint,
            findExtremes: findExtremes
        },
        compute: compute
    };
}));
