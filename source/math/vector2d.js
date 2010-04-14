/*
 * Copyright (c) 2009-2010 Takashi Kitao
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @class A 2-element vector which is represented by xy coordinates.
 * @param {Number} x The x-coordinate. Possible not to specify.
 * @param {Number} y The y-coordinate. Possible not to specify.
 */
b9.Vector2D = function() {
    /** hoge */
    this.x = 0.0;

    /** hoge */
    this.y = 0.0;

    if (arguments === 2) {
        this.x = arguments[0];
        this.y = arguments[1];
    } else if (arguments === 1) {
        this.x = arguments[0].x;
        this.y = arguments[0].y;
    }
};

/** private */
b9.Vector2D._s1 = 0.0;

/** private */
b9.Vector2D._s2 = 0.0;

/** private */
b9.Vector2D._v1 = Vector2D();

/**
 * Sets the coordinates.
 * @param {Number} x The x-coordinate.
 * @param {Number} y The y-coordinate.
 */
b9.Vector2D.prototype.set = function()
{
    if (arguments === 2) {
        this.x = arguments[0];
        this.y = arguments[1];
    } else if (arguments === 1) {
        this.x = arguments[0].x;
        this.y = arguments[0].y;
    }
};

/**
 *
 */
b9.Vector2D.prototype.neg = function() {
    this.x = -this.x;
    this.y = -this.y;
};

/**
 *
 * @param {b9.Vector2D} vec2
 */
b9.Vector2D.prototype.add = function(vec) {
    this.x += vec.x;
    this.y += vec.y;
};

/**
 *
 * @param {b9.Vector2D} vec2
 */
b9.Vector2D.prototype.sub = function(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
};

/**
 *
 * @param {Number} s
 */
b9.Vector2D.prototype.mul = function(s) {
    this.x *= s;
    this.y *= s;
};

/**
 * @param {Number} s
 */
b9.Vector2D.prototype.div = function(s) {
    this._s1 = 1.0 / s;
    this.x *= this._s1;
    this.y *= this._s1;
};

/**
 *
 */
b9.Vector2D.prototype.norm = function() {
    return b9.Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 *
 */
b9.Vector2D.prototype.sqNorm = function() {
    return this.x * this.x + this.y * this.y;
};

/**
 *
 */
b9.Vector2D.prototype.dist = function(vec) {
    Vector2D._v1.set(this);
    Vector2D._v1.sub(vec);
    return Vector2D._v1.norm();
};

/**
 *
 */
b9.Vector2D.prototype.sqDist = function(vec) {
    Vector2D._v1.set(this);
    Vector2D._v1.sub(vec);
    return Vector2D._v1.sqNorm();
};

/**
 *
 */
b9.Vector2D.prototype.dot = function(vec) {
    return this.x * vec.x + this.y * vec.y;
};

/**
 *
 */
b9.Vector2D.prototype.rotate_float = function(deg) {
    Vector2D._s1 = b9.Math.sin_float(deg);
    Vector2D._s2 = b9.Math.cos_float(deg);

    Vector2D._v1.x = x * Vector2D._s2 - y * Vector2D._s1;
    Vector2D._v1.y = y * Vector2D._s2 + x * Vector2D._s1;

    this.set(Vector2D._v1);
};

/**
 *
 */
b9.Vector2D.prototype.rotate_int = function(deg) {
    Vector2D._s1 = b9.Math.sin_int(deg);
    Vector2D._s2 = b9.Math.cos_int(deg);

    Vector2D._v1.x = x * Vector2D._s2 - y * Vector2D._s1;
    Vector2D._v1.y = y * Vector2D._s2 + x * Vector2D._s1;

    this.set(Vector2D._v1);
};

/**
 *
 */
b9.Vector2D.prototype.normalize = function() {
    Vector2D._s1 = this.mag();
    this.div(Vector2D._s1);
};

/**
 *
 */
b9.Vector2D.prototype.interp = function(to, ratio) {
    if (ratio < b9.Math.EPSILON) {
        return;
    } else if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else {
        this.mul(1.0 - ratio);
        Vector2D._v1.set(to);
        Vector2D._v1.mul(ratio);
        this.add(Vector2D._v1);
    }
};

/**
 *
 */
b9.Vector2D.prototype.toLocalOf = function(mat) {
    Vector2D._v1.set(this);
    Vector2D._v1.sub(mat.trans);

    this.set(
        Vector2D._v1.dot(mat.x_axis) / mat.x_axis.sqNorm(),
        Vector2D._v1.dot(mat.y_axis) / mat.y_axis.sqNorm());
};

/**
 *
 */
b9.Vector2D.prototype.toGlobalFrom = function(mat) {
    Vector2D._v1.set(mat.x_axis);
    Vector2D._v1.mul(this.x);

    Vector2D._v2.set(mat.y_axis);
    Vector2D._v2.mul(this.y);

    this.set(Vector2D._v1);
    this.add(Vector2D._v2);
    this.add(mat.trans);
};

/**
 *
 */
b9.Vector2D.prototype.toLocalOf_noTrans = function(mat) {
    Vector2D._v1.x = this.dot(mat.x_axis) / mat.x_axis.sqNorm();
    Vector2D._v1.y = this.dot(mat.y_axis) / mat.y_axis.sqNorm();

    this.set(Vector2D._v1);
};

/**
 *
 */
b9.Vector2D.prototype.toGlobalFrom_noTrans = function(mat) {
    Vector2D._v1.set(mat.x_axis);
    Vector2D._v1.mul(this.x);

    Vector2D._v2.set(mat.y_axis);
    Vector2D._v2.mul(this.y);

    this.set(Vector2D._v1);
    this.add(Vector2D._v2);
};

/**
 * {b9.Vector2D}
 */
b9.Vector2D.ZERO = b9.Vector2D(0.0, 0.0);

/**
 * {b9.Vector2D}
 */
b9.Vector2D.X_UNIT = b9.Vector2D(1.0, 0.0);

/**
 * {b9.Vector2D}
 */
b9.Vector2D.Y_UNIT = b9.Vector2D(0.0, 1.0);
