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
 * @class A 3-element vector which is represented by xyz coordinates.
 */
b9.Vector = b9.createClass();

/**
 * Constructs a b9.Vector.
 * @param {b9.Vector|Number} [arg1] A b9.Vector to be cloned or a x-coordinate.
 * @param {Number} [arg2] A y-coordinate.
 * @param {Number} [arg3] A z-coordinate
 */
b9.Vector.prototype.initialize = function(arg1, arg2, arg3) {
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

    /**
     * The z-coordinate.
     * @return {Number}
     */
    this.z = 0.0;

    if (arguments.length === 1) {
        this.x = arg1.x;
        this.y = arg1.y;
        this.z = arg1.z;
    } else {
        this.x = arg1;
        this.y = arg2;
        this.z = arg3;
    }
};

/**
 * Sets all components to this object.
 * @param {b9.Vector|Number} A b9.Vector to be cloned or a x-coordinate.
 * @param {Number} [arg2] A y-coordinate.
 * @param {Number} [arg3] A z-coordinate.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.set = function(arg1, arg2, arg3)
{
    if (arguments.length === 1) {
        this.x = arg1.x;
        this.y = arg1.y;
        this.z = arg1.z;
    } else {
        this.x = arg1;
        this.y = arg2;
        this.z = arg3;
    }

    return this;
};

/**
 * Changes the arithmetic sign of this object.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.neg = function() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;

    return this;
};

/**
 * Adds a b9.Vector to this object.
 * @param {b9.Vector} vec A b9.Vector.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.add = function(vec) {
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;

    return this;
};

/**
 * Subtracts a b9.Vector from this object.
 * @param {b9.Vector} vec A b9.Vector.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.sub = function(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    this.z -= vec.z;

    return this;
};

/**
 * Multiplies this object with a scalar value.
 * @param {Number} s A scalar value.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.mul = function(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;

    return this;
};

/**
 * Divides this object by a scalar value.
 * @param {Number} s A scalar value.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.div = function(s) {
    var rs = 1.0 / s;

    this.x *= rs;
    this.y *= rs;
    this.z *= rs;

    return this;
};

/**
 * Returns the norm of this object.
 * @return {Number} The norm of this object.
 */
b9.Vector.prototype.norm = function() {
    return b9.Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

/**
 * Returns the squared norm of this object.
 * This method is faster than the norm method.
 * @return {Number} The squared norm of this object.
 */
b9.Vector.prototype.sqNorm = function() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
};

/**
 * Returns the distance between this object and a b9.Vector.
 * @param {b9.Vector} vec A b9.Vector.
 * @return {Number} The distance between the two points.
 */
b9.Vector.prototype.dist = function(vec) {
    return b9.Vector._vec1.set(this).sub(vec).norm();
};

/**
 * Returns the squared distance between this object and a b9.Vector.
 * This method is faster than the dist method.
 * @param {b9.Vector} vec A b9.Vector.
 * @return {Number} The sqared distance between the two points.
 */
b9.Vector.prototype.sqDist = function(vec) {
    return b9.Vector._vec1.set(this).sub(vec).sqNorm();
};

/**
 * Returns the inner product of this object and a b9.Vector.
 * @param {b9.Vector} vec A b9.Vector.
 * @return {Number} The inner product of the two vectors.
 */
b9.Vector.prototype.dot = function(vec) {
    return this.x * vec.x + this.y * vec.y + this.z * vec.z;
};

/**
 * Obtains the outer product of this object an a b9.Vector.
 * @param {b9.Vector} vec A b9.Vector.
 * @param {b9.Vector} result A destination of the outer product of the two vectors.
 */
b9.Vector.prototype.cross = function(vec, result) {
    // TODO
};

/**
 * Normalizes this object.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.normalize = function() {
    var norm = this.norm();

    if (norm < b9.Math.EPSILON) {
        this.set(b9.Math.X_UNIT);
    } else {
        this.div(norm);
    }

    return this;
};

/**
 * Rotates this object around the orthonormal x-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.rotateX_float = function(deg) {
    var sin = b9.Math.sinFloat(deg);
    var cos = b9.Math.cosFloat(deg);

    b9.Vector._vec1.x = this.x * cos - this.y * sin;
    b9.Vector._vec1.y = this.y * cos + this.x * sin;

    return this.set(b9.Vector._vec1);
};

/**
 * Rotates this object around the orthonormal y-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.rotateY_float = function(deg) {
    // TODO
};

/**
 * Rotates this object around the orthonormal z-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.rotateZ_float = function(deg) {
    // TODO
};

/**
 * Rotates this object around the orthonormal x-axis.
 * This method allows only a integer angle, but is faster than the rotateX_float method.
 * @param {Number} deg A integer angle in degrees.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.rotateX_int = function(deg) {
    // TODO
};

/**
 * Rotates this object around the orthonormal y-axis.
 * This method allows only a integer angle, but is faster than the rotateY_float method.
 * @param {Number} deg A integer angle in degrees.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.rotateY_int = function(deg) {
    // TODO
};

/**
 * Rotates this object around the orthonormal z-axis.
 * This method allows only a integer angle, but is faster than the rotateZ_float method.
 * @param {Number} deg A integer angle in degrees.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.rotateZ_int = function(deg) {
    var sin = b9.Math.sinInt(deg);
    var cos = b9.Math.cosInt(deg);

    b9.Vector._vec1.x = this.x * cos - this.y * sin;
    b9.Vector._vec1.y = this.y * cos + this.x * sin;

    return this.set(b9.Vector._vec1);
};

/**
 * Interpolates this object to a b9.Vector by a ratio.
 * @param {b9.Vector} to A destination b9.Vector.
 * @param {Number} ratio The value which indicates how far to interpolate between the two vectors.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.interp = function(to, ratio) {
    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        b9.Vector._vec1.set(to).mul(ratio);
        this.mul(1.0 - ratio).add(b9.Vector._vec1);
    }

    return this;
};

/**
 * Converts this object from in the world coordinate system to the local coordinate system of a b9.Matrix.
 * @param {b9.Matrix2D} mat A b9.Matrix.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.toLocal = function(mat) {
    b9.Vector._vec1.set(this).sub(mat._trans);

    return this.set(b9.Vector._vec1.dot(mat._x_axis) / mat._x_axis.sqNorm(),
            b9.Vector._vec1.dot(mat._y_axis) / mat._y_axis.sqNorm());
};

/**
 * Converts this object from in the local coordinate system of a b9.Matrix to in the world coordinate system.
 * @param {b9.Matrix2D} mat A b9.Matrix.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.toGlobal = function(mat) {
    b9.Vector._vec1.set(mat._x_axis).mul(this.x);
    b9.Vector._vec2.set(mat._y_axis).mul(this.y);

    return this.set(b9.Vector._vec1).add(b9.Vector._vec2).add(mat._trans);
};

/**
 * Converts this object from in the world coordinate system to the local coordinate system of a b9.Matrix.
 * However, unlike the toLocal method, the translation of a b9.Matrix is regarded as the zero vector.
 * @param {b9.Matrix2D} mat A b9.Matrix.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.toLocal_noTrans = function(mat) {
    b9.Vector._vec1.x = this.dot(mat._x_axis) / mat._x_axis.sqNorm();
    b9.Vector._vec1.y = this.dot(mat._y_axis) / mat._y_axis.sqNorm();

    return this.set(b9.Vector._vec1);
};

/**
 * Converts this object from in the local coordinate system of a b9.Matrix to in the world coordinate system.
 * However, unlike the toGlobal method, the translation of a b9.Matrix is regarded as the zero vector.
 * @param {b9.Matrix2D} mat A b9.Matrix.
 * @return {b9.Vector} This object.
 */
b9.Vector.prototype.toGlobal_noTrans = function(mat) {
    b9.Vector._vec1.set(mat._x_axis).mul(this.x);
    b9.Vector._vec2.set(mat._y_axis).mul(this.y);

    return this.set(b9.Vector._vec1).add(b9.Vector._vec2);
};

/**
 * Returns whether this object equals a b9.Vector.
 * @param {b9.Vector} vec A b9.Vector.
 * @return {Boolean} true if the two vectors are equal; false otherwise;
 */
b9.Vector.prototype.equals = function(vec) {
    return (b9.Math.equals_float(this.x, vec.x) &&
            b9.Math.equals_float(this.y, vec.y) &&
            b9.Math.equals_float(this.z, vec.z));
};

/**
 * Returns a string representation of this object.
 * @return {String} A string representation of this object.
 */
b9.Vector.prototype.toString = function() {
    var str = "(";
    str += this.x;
    str += ", ";
    str += this.y;
    str += ")";

    return str;
};

/**
 * The zero vector.
 * @return {b9.Vector}
 */
b9.Vector.ZERO = new b9.Vector(0.0, 0.0, 0.0);

/**
 * The orthonormal x-axis.
 * @return {b9.Vector}
 */
b9.Vector.X_UNIT = new b9.Vector(1.0, 0.0, 0.0);

/**
 * The orthonormal y-axis.
 * @return {b9.Vector}
 */
b9.Vector.Y_UNIT = new b9.Vector(0.0, 1.0, 0.0);

/**
 * The orthonormal z-axis.
 * @return {b9.Vector}
 */
b9.Vector.Z_UNIT = new b9.Vector(0.0, 0.0, 1.0);

b9.Vector._vec1 = new b9.Vector();
b9.Vector._vec2 = new b9.Vector();
