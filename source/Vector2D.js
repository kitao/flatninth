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
 * @class hoge
 */
b9.Vector2D = b9.createClass();

/**
 * hoge
 * @param {b9.Vector2D|Number} [arg1] hoge
 * @param {Number} [arg2] hoge
 */
b9.Vector2D.prototype.initialize = function(arg1, arg2) {
    /**
     * hoge
     * @return {Number}
     */
    this.x = 0.0;

    /**
     * hoge
     * @return {Number}
     */
    this.y = 0.0;

    if (arguments.length === 1) {
        this.x = arg1.x;
        this.y = arg1.y;
    } else if (arguments.length === 2) {
        this.x = arg1;
        this.y = arg2;
    }
};

/**
 * hoge
 * @param {b9.Vector2D|Number} arg1 hoge
 * @param {Number} [arg2] hoge
 */
b9.Vector2D.prototype.set = function(arg1, arg2)
{
    if (arguments.length === 1) {
        this.x = arg1.x;
        this.y = arg1.y;
    } else if (arguments.length === 2) {
        this.x = arg1;
        this.y = arg2;
    }
};

/**
 * hoge
 */
b9.Vector2D.prototype.neg = function() {
    this.x = -this.x;
    this.y = -this.y;
};

/**
 * hoge
 * @param {b9.Vector2D} vec hoge
 */
b9.Vector2D.prototype.add = function(vec) {
    this.x += vec.x;
    this.y += vec.y;
};

/**
 * hoge
 * @param {b9.Vector2D} vec hoge
 */
b9.Vector2D.prototype.sub = function(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
};

/**
 * hoge
 * @param {Number} s hoge
 */
b9.Vector2D.prototype.mul = function(s) {
    this.x *= s;
    this.y *= s;
};

/**
 * hoge
 * @param {Number} s hoge
 */
b9.Vector2D.prototype.div = function(s) {
    var rs = 1.0 / s;

    this.x *= rs;
    this.y *= rs;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.Vector2D.prototype.norm = function() {
    return b9.Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.Vector2D.prototype.sqNorm = function() {
    return this.x * this.x + this.y * this.y;
};

/**
 * hoge
 * @param {b9.Vector2D} vec hoge
 * @return {Number} hoge
 */
b9.Vector2D.prototype.dist = function(vec) {
    b9.Vector2D._vec1.set(this);
    b9.Vector2D._vec1.sub(vec);
    return b9.Vector2D._vec1.norm();
};

/**
 * hoge
 * @param {b9.Vector2D} vec hoge
 * @return {Number} hoge
 */
b9.Vector2D.prototype.sqDist = function(vec) {
    b9.Vector2D._vec1.set(this);
    b9.Vector2D._vec1.sub(vec);
    return b9.Vector2D._vec1.sqNorm();
};

/**
 * hoge
 * @param {b9.Vector2D} vec hoge
 * @return {Number} hoge
 */
b9.Vector2D.prototype.dot = function(vec) {
    return this.x * vec.x + this.y * vec.y;
};

/**
 * hoge
 */
b9.Vector2D.prototype.normalize = function() {
    var norm = this.norm();

    if (norm < b9.Math.EPSILON) {
        this.set(b9.Math.X_UNIT);
    } else {
        this.div(norm);
    }
};

/**
 * hoge
 * @param {Number} deg hoge
 */
b9.Vector2D.prototype.rotateFloat = function(deg) {
    var sin = b9.Math.sinFloat(deg);
    var cos = b9.Math.cosFloat(deg);

    b9.Vector2D._vec1.x = this.x * cos - this.y * sin;
    b9.Vector2D._vec1.y = this.y * cos + this.x * sin;

    this.set(b9.Vector2D._vec1);
};

/**
 * hoge
 * @param {Number} deg hoge
 */
b9.Vector2D.prototype.rotateInt = function(deg) {
    var sin = b9.Math.sinInt(deg);
    var cos = b9.Math.cosInt(deg);

    b9.Vector2D._vec1.x = this.x * cos - this.y * sin;
    b9.Vector2D._vec1.y = this.y * cos + this.x * sin;

    this.set(b9.Vector2D._vec1);
};

/**
 * hoge
 * @param {b9.Vector2D} to hoge
 * @param {Number} ratio hoge
 */
b9.Vector2D.prototype.interp = function(to, ratio) {
    if (ratio < b9.Math.EPSILON) {
        return;
    } else if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else {
        this.mul(1.0 - ratio);
        b9.Vector2D._vec1.set(to);
        b9.Vector2D._vec1.mul(ratio);
        this.add(b9.Vector2D._vec1);
    }
};

/**
 * hoge
 * @param {b9.Matrix2D} mat hoge
 */
b9.Vector2D.prototype.toLocal = function(mat) {
    b9.Vector2D._vec1.set(this);
    b9.Vector2D._vec1.sub(mat.trans);

    this.set(b9.Vector2D._vec1.dot(mat.x_axis) / mat.x_axis.sqNorm(),
            b9.Vector2D._vec1.dot(mat.y_axis) / mat.y_axis.sqNorm());
};

/**
 * hoge
 * @param {b9.Matrix2D} mat hoge
 */
b9.Vector2D.prototype.toGlobal = function(mat) {
    b9.Vector2D._vec1.set(mat.x_axis);
    b9.Vector2D._vec1.mul(this.x);

    b9.Vector2D._vec2.set(mat.y_axis);
    b9.Vector2D._vec2.mul(this.y);

    this.set(b9.Vector2D._vec1);
    this.add(b9.Vector2D._vec2);
    this.add(mat.trans);
};

/**
 * hoge
 * @param {b9.Matrix2D} mat hoge
 */
b9.Vector2D.prototype.toLocalNoTrans = function(mat) {
    b9.Vector2D._vec1.x = this.dot(mat.x_axis) / mat.x_axis.sqNorm();
    b9.Vector2D._vec1.y = this.dot(mat.y_axis) / mat.y_axis.sqNorm();

    this.set(b9.Vector2D._vec1);
};

/**
 * hoge
 * @param {b9.Matrix2D} mat hoge
 */
b9.Vector2D.prototype.toGlobalNoTrans = function(mat) {
    b9.Vector2D._vec1.set(mat.x_axis);
    b9.Vector2D._vec1.mul(this.x);

    b9.Vector2D._vec2.set(mat.y_axis);
    b9.Vector2D._vec2.mul(this.y);

    this.set(b9.Vector2D._vec1);
    this.add(b9.Vector2D._vec2);
};

/**
 * hoge
 * @param {b9.Vector2D} vec hoge
 * @return {Boolean} hoge
 */
b9.Vector2D.prototype.isEqual = function(vec) {
    return (b9.Math.isEqualFloat(this.x, vec.x) && b9.Math.isEqualFloat(this.y, vec.y));
};

/**
 * hoge
 * @return {String} hoge
 */
b9.Vector2D.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ")";
};

/**
 * hoge
 * @return {b9.Vector2D}
 */
b9.Vector2D.ZERO = new b9.Vector2D(0.0, 0.0);

/**
 * hoge
 * @return {b9.Vector2D}
 */
b9.Vector2D.X_UNIT = new b9.Vector2D(1.0, 0.0);

/**
 * hoge
 * @return {b9.Vector2D}
 */
b9.Vector2D.Y_UNIT = new b9.Vector2D(0.0, 1.0);

b9.Vector2D._vec1 = new b9.Vector2D();
b9.Vector2D._vec2 = new b9.Vector2D();
