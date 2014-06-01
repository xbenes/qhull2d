# qhull2d

QHull algorithm implementation in javascript. Two-dimensional variant.
Link the `dist/qhull2d.js` file and use as follows.

```javascript
var points = [[0, 0], [1, 0], [1, 1], [0, 1], [0.5, 0.5]];
var result = qhull2d.compute(points);
// [[0, 0], [1, 0], [1, 1], [0, 1]]
```

## Development and demo

Set-up the environment
```
npm install
bower install
```

Run development server

```
grunt dev
```

and visit http://localhost:8089/example/

See it in action by clicking points in canvas.

Run `grunt test` to run unit tests and to generate test code coverage.
