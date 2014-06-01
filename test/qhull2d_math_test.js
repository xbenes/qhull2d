describe('Suppporting math for QHull algorithm', function() {
    before(function() {
        this.helpers = qhull2d.helpers;
    });

    after(function() {
        this.helpers = null;
    });

    it('should correctly compute sign', function() {
        var sign = this.helpers.sign;

        var signRight = sign([0,0], [1,1], [1,0]);
        expect(signRight).to.be(-1);

        var signRight = sign([0,0], [1,1], [0,1]);
        expect(signRight).to.be(1);

        var signOn = sign([0,0], [1,1], [0.5,0.5]);
        expect(signOn).to.be(0);

    });


    it('should correctly compute mathematical sign', function() {
        var mathsign = this.helpers.mathsign;

        expect(mathsign(0)).to.be(0);
        expect(mathsign(-2)).to.be(-1);
        expect(mathsign(-1)).to.be(-1);
        expect(mathsign(-Infinity)).to.be(-1);
        expect(mathsign(1)).to.be(1);
        expect(mathsign(1.55)).to.be(1);
        expect(mathsign(Infinity)).to.be(1);
        expect(isNaN(mathsign("abc"))).to.be(true);
        expect(isNaN(mathsign(null))).to.be(true);
    });

    it('should correctly filter points on right', function() {
        var getPointsOnRight = this.helpers.getPointsOnRight;

        var points = [[0.5, 0], [0, 0.5]];

        expect(getPointsOnRight([0,0], [1,1], points)).to.eql([[0.5, 0]]);
        expect(getPointsOnRight([0,0], [1,0], points)).to.eql([]);
    });

    it('should correctly compute point-line dist', function() {
        var pointLineDist = this.helpers.pointLineDist;

        expect(pointLineDist([0, 0], [1, 0], [1, 1])).to.be(1);
        expect(pointLineDist([0, 0], [1, 0], [1.5, 2])).to.be(2);
        expect(pointLineDist([0, 0], [1, 0], [0.5, 0])).to.be(0);
    });

    it('should properly indicate farthest point from line', function() {
        var getFarthestPoint = this.helpers.getFarthestPoint;

        var points = [
            [0, 0], [1, 1], [2, 1], [3, 2], [1, 3]
        ];

        expect(getFarthestPoint([0, 0], [1, 0], points)).to.eql([1, 3]);
        expect(getFarthestPoint([0, 0], [0, 1], points)).to.eql([3, 2]);
    });

    it('should correctly find extremes', function() {
        var findExtremes = this.helpers.findExtremes;

        var points = [
            [0, 0], [1, 4], [2, 1], [3, 2], [4, 3]
        ];

        var extremesX = findExtremes(points, 0);
        expect(extremesX.minimum).to.eql([0, 0]);
        expect(extremesX.maximum).to.eql([4, 3]);

        var extremesY = findExtremes(points, 1);
        expect(extremesY.minimum).to.eql([0, 0]);
        expect(extremesY.maximum).to.eql([1, 4]);
    });

});

