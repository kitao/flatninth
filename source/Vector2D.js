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
 * Constructs a vector. The following forms are allowed:
 * <ul>
 * <li>b9.Vector2D()</li>
 * <li>b9.Vector2D(b9.Vector2D vector_to_be_cloned)</li>
 * <li>b9.Vector2D(float x, float y)</li>
 * </ul>
 *
 * @class A 2-element vector which is represented by xy coordinates.
 *
 * @param {b9.Vector2D|Number} [vec_or_x] A vector to be cloned or an x-coordinate.
 * @param {Number} [y] A y-coordinate.
 */
b9.Vector2D = b9.createClass();

/**
 * @ignore
 */
b9.Vector2D.prototype.initialize = function(vec_or_x, y) {
    /**
     * The x-coordinate.
     * @return {Number}
     */
    this.x = 0.0;

    /**
     * The y-coordinate.
     * @return {Number}
     */
    this.y = 0.0;

    if (arguments.length === 1) {
        this.x = vec_or_x.x;
        this.y = vec_or_x.y;
    } else if (arguments.length === 2) {
        this.x = vec_or_x;
        this.y = y;
    }
};

/**
 * Sets all of the components to this vector. The following forms are allowed:
 * <ul>
 * <li>set(b9.Vector2D vector_to_be_cloned)</li>
 * <li>set(float x, float y)</li>
 * </ul>
 * @param {b9.Vector2D|Number} [vec_or_x] A vector to be cloned or an x-coordinate.
 * @param {Number} [y] A y-coordinate.
 * @return {b9.Vector2D} This vector.
 */
b9.Vector2D.prototype.set = function(vec_or_x, y) {
    if (arguments.length === 1) {
        this.x = vec_or_x.x;
        this.y = vec_or_x.y;
    } else if (arguments.length === 2) {
        this.x = vec_or_x;
        this.y = y;
    }

    return this;
};

/**
 * Changes the arithmetic sign of this vector.
 * @return {b9.Vector2D} This vector.
 */
b9.Vector2D.prototype.neg = function() {
    this.x = -this.x;
    this.y = -this.y;

    return this;
};

/**
 * Adds a vector to this vector.
 * @param {b9.Vector2D} vec A vector.
 * @return {b9.Vector2D} This vector.
 */
b9.Vector2D.prototype.add = function(vec) {
    this.x += vec.x;
    this.y += vec.y;

    return this;
};

/**
 * Subtracts a vector from this vector.
 * @param {b9.Vector2D} vec A vector.
 * @return {b9.Vector2D} This vector.
 */
b9.Vector2D.prototype.sub = function(vec) {
    this.x -= vec.x;
    this.y -= vec.y;

    return this;
};

/**
 * Multiplies this vector with a scalar value.
 * @param {Number} s A scalar value.
 * @return {b9.Vector2D} This vector.
 */
b9.Vector2D.prototype.mul = function(s) {
    this.x *= s;
    this.y *= s;

    return this;
};

/**
 * Divides this vector by a scalar value.
 * @param {Number} s A scalar value.
 * @return {b9.Vector2D} This vector.
 */
b9.Vector2D.prototype.div = function(s) {
    var rs = 1.0 / s;

    this.x *= rs;
    this.y *= rs;

    return this;
};

/**
 * Returns the norm of this vector.
 * @return {Number} The norm of this vector.
 */
b9.Vector2D.prototype.norm = function() {
    return b9.Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 * Returns the squared norm of this vector.
 * This method is faster than the norm method.
 * @return {Number} The squared norm of this vector.
 */
b9.Vector2D.prototype.sqNorm = function() {
    return this.x * this.x + this.y * this.y;
};

/**
 * Returns the distance between this vector and a vector.
 * @param {b9.Vector2D} vec A vector.
 * @return {Number} The distance between the two vectors.
 */
b9.Vector2D.prototype.dist = function(vec) {
    return b9.Vector2D._vec1.set(this).sub(vec).norm();
};

/**
 * Returns the squared distance between this vector and a vector.
 * This method is faster than the dist method.
 * @param {b9.Vector2D} vec A vector.
 * @return {Number} The squared distance between the two vectors.
 */
b9.Vector2D.prototype.sqDist = function(vec) {
    return b9.Vector2D._vec1.set(this).sub(vec).sqNorm();
};

/**
 * Returns the inner product of this vector and a vector.
 * @param {b9.Vector2D} vec A vector.
 * @return {Number} The inner product of the two vectors.
 */
b9.Vector2D.prototype.dot = function(vec) {
    return this.x * vec.x + this.y * vec.y;
};

/**
 * Normalizes this vector.
 * @return {b9.Vector2D} This vector.
 */
b9.Vector2D.prototype.normalize = function() {
    var norm = this.norm();

    if (norm < b9.Math.EPSILON) {
        this.set(b9.Math.X_UNIT);
    } else {
        this.div(norm);
    }

    return this;
};

/**
 * Rotates this vector.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Vector2D} This vector.
 */
b9.Vector2D.prototype.rotate_float = function(deg) {
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    b9.Vector2D._vec1.set(this.x * cos - this.y * sin, this.y * cos + this.x * sin);

    return this.set(b9.Vector2D._vec1);
};

/**
 * Rotates this vector.
 * This method allows only an integer angle, but is faster than the rotate_float method.
 * @param {Number} deg An integer angle in degrees.
 * @return {b9.Vector2D} This vector.
 */
b9.Vector2D.prototype.rotate_int = function(deg) {
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    b9.Vector2D._vec1.set(this.x * cos - this.y * sin, this.y * cos + this.x * sin);

    return this.set(b9.Vector2D._vec1);
};

/**
 * Interpolates this vector to a vector by a ratio.
 * @param {b9.Vector2D} to A destination vector.
 * @param {Number} ratio The value which indicates how far to interpolate between the two vectors.
 * @return {b9.Vector2D} This vector.
 */
b9.Vector2D.prototype.lerp = function(to, ratio) {
    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        b9.Vector2D._vec1.set(to).mul(ratio);
        this.mul(1.0 - ratio).add(b9.Vector2D._vec1);
    }

    return this;
};

/**
 * Converts this vector from in the world coordinate system to the local coordinate system of a matrix.
 * @param {b9.Matrix2D} mat A matrix.
 * @return {b9.Vector2D} This vector.
 */
b9.Vector2D.prototype.toLocal = function(mat) {
    b9.Vector2D._vec1.set(this).sub(mat.trans);

    return this.set(
            b9.Vector2D._vec1.dot(mat.x_axis) / mat.x_axis.sqNorm(),
            b9.Vector2D._vec1.dot(mat.y_axis) / mat.y_axis.sqNorm());
};

/**
 * Converts this vector from in the local coordinate system of a matrix to in the world coordinate system.
 * @param {b9.Matrix2D} mat A matrix.
 * @return {b9.Vector2D} This vector.
 */
b9.Vector2D.prototype.toGlobal = function(mat) {
    b9.Vector2D._vec1.set(mat.x_axis).mul(this.x);
    b9.Vector2D._vec2.set(mat.y_axis).mul(this.y);

    return this.set(b9.Vector2D._vec1).add(b9.Vector2D._vec2).add(mat.trans);
};

/**
 * Converts this vector from in the world coordinate system to the local coordinate system of a matrix.
 * However, unlike the toLocal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix2D} mat A matrix.
 * @return {b9.Vector2D} This vector.
 */
b9.Vector2D.prototype.toLocal_noTrans = function(mat) {
    b9.Vector2D._vec1.set(
            this.dot(mat.x_axis) / mat.x_axis.sqNorm(),
            this.dot(mat.y_axis) / mat.y_axis.sqNorm());

    return this.set(b9.Vector2D._vec1);
};

/**
 * Converts this vector from in the local coordinate system of a matrix to in the world coordinate system.
 * However, unlike the toGlobal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix2D} mat A matrix.
 * @return {b9.Vector2D} This vector.
 */
b9.Vector2D.prototype.toGlobal_noTrans = function(mat) {
    b9.Vector2D._vec1.set(mat.x_axis).mul(this.x);
    b9.Vector2D._vec2.set(mat.y_axis).mul(this.y);

    return this.set(b9.Vector2D._vec1).add(b9.Vector2D._vec2);
};

/**
 * Returns whether this vector equals a vector.
 * @param {b9.Vector2D} vec A vector.
 * @return {Boolean} true if the two vectors are equal; false otherwise.
 */
b9.Vector2D.prototype.equals = function(vec) {
    return (b9.Math.equals_float(this.x, vec.x) &&
            b9.Math.equals_float(this.y, vec.y));
};

/**
 * Returns a string representation of this vector.
 * @return {String} A string representation of this vector.
 */
b9.Vector2D.prototype.toString = function() {
    var str = "(";
    str += this.x;
    str += ", ";
    str += this.y;
    str += ")";

    return str;
};

/**
 * The zero vector.
 * @return {b9.Vector2D}
 */
b9.Vector2D.ZERO = new b9.Vector2D(0.0, 0.0);

/**
 * The orthonormal x-axis.
 * @return {b9.Vector2D}
 */
b9.Vector2D.X_UNIT = new b9.Vector2D(1.0, 0.0);

/**
 * The orthonormal y-axis.
 * @return {b9.Vector2D}
 */
b9.Vector2D.Y_UNIT = new b9.Vector2D(0.0, 1.0);

b9.Vector2D._vec1 = new b9.Vector2D();
b9.Vector2D._vec2 = new b9.Vector2D();
