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
 * <li>b9.Vector3D()</li>
 * <li>b9.Vector3D(b9.Vector3D vector_to_be_cloned)</li>
 * <li>b9.Vector3D(Float32Array array_to_be_referenced, int array_index_of_first_component)</li>
 * <li>b9.Vector3D(float x, float y, float z)</li>
 * </ul>
 *
 * @class A 3-element vector which is represented by xyz coordinates.
 *
 * @param {b9.Vector3D|Float32Array|Number} [vec_or_array_or_x]
 * A vector to be cloned, an array to be referenced, or an x-coordinate.
 * @param {Number} [index_or_y] The array index of the first component, or a y-coordinate.
 * @param {Number} [z] A z-coordinate.
 */
b9.Vector3D = b9.createClass();

/**
 * @ignore
 */
b9.Vector3D.prototype.initialize = function(vec_or_array_or_x, index_or_y, z) {
    var array = this._array = (arguments.length === 2) ? vec_or_array_or_x : new Float32Array(3);
    var index = this._index = (arguments.length === 2) ? index_or_y : 0;
    var vec_array, vec_index;

    if (arguments.length === 1) {
        vec_array = vec_or_array_or_x._array;
        vec_index = vec_or_array_or_x._index;

        array[index] = vec_array[vec_index];
        array[index + 1] = vec_array[vec_index + 1];
        array[index + 2] = vec_array[vec_index + 2];
    } else if (arguments.length === 3) {
        array[index] = vec_or_array_or_x;
        array[index + 1] = index_or_y;
        array[index + 2] = z;
    }
};

/**
 * Returns the array of this vector.
 * @return The array of this vector.
 */
b9.Vector3D.prototype.getArray = function() {
    return this._array;
};

/**
 * Returns the array index of the first component.
 * @return The array index of the first component.
 */
b9.Vector3D.prototype.getIndex = function() {
    return this._index;
};

/**
 * Returns the x-coordinate of this vector.
 * @return The x-coordinate.
 */
b9.Vector3D.prototype.getX = function() {
    return this._array[this._index];
};

/**
 * Sets an x-coordinate to this vector.
 * @param {Number} x An x-coordinate.
 * @return This vector.
 */
b9.Vector3D.prototype.setX = function(x) {
    this._array[this._index] = x;

    return this;
};

/**
 * Returns the y-coordinate of this vector.
 * @return The y-coordinate.
 */
b9.Vector3D.prototype.getY = function() {
    return this._array[this._index + 1];
};

/**
 * Sets an y-coordinate to this vector.
 * @param {Number} y An y-coordinate.
 * @return This vector.
 */
b9.Vector3D.prototype.setY = function(y) {
    this._array[this._index + 1] = y;

    return this;
};

/**
 * Returns the z-coordinate of this vector.
 * @return The z-coordinate.
 */
b9.Vector3D.prototype.getZ = function() {
    return this._array[this._index + 2];
};

/**
 * Sets an z-coordinate to this vector.
 * @param {Number} z An z-coordinate.
 * @return This vector.
 */
b9.Vector3D.prototype.setZ = function(z) {
    this._array[this._index + 2] = z;

    return this;
};

/**
 * Sets all of the components to this vector. The following forms are allowed:
 * <ul>
 * <li>set(b9.Vector3D vector_to_be_cloned)</li>
 * <li>set(float x, float y, float z)</li>
 * </ul>
 * @param {b9.Vector3D|Number} [vec_or_x] A vector to be cloned or an x-coordinate.
 * @param {Number} [y] A y-coordinate.
 * @param {Number} [z] A z-coordinate.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.set = function(vec_or_x, y, z) {
    var array = this._array;
    var index = this._index;
    var vec_array, vec_index;

    if (arguments.length === 1) {
        vec_array = vec_or_x._array;
        vec_index = vec_or_x._index;

        array[index] = vec_array[vec_index];
        array[index + 1] = vec_array[vec_index + 1];
        array[index + 2] = vec_array[vec_index + 2];
    } else if (arguments.length === 3) {
        array[index] = vec_or_x;
        array[index + 1] = y;
        array[index + 2] = z;
    }

    return this;
};

/**
 * Changes the arithmetic sign of this vector.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.neg = function() {
    var array = this._array;
    var index = this._index;

    array[index] = -array[index];
    array[index + 1] = -array[index + 1];
    array[index + 2] = -array[index + 2];

    return this;
};

/**
 * Adds a vector to this vector.
 * @param {b9.Vector3D} vec A vector.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.add = function(vec) {
    var array = this._array;
    var index = this._index;
    var vec_array = vec._array;
    var vec_index = vec._index;

    array[index] += vec_array[vec_index];
    array[index + 1] += vec_array[vec_index + 1];
    array[index + 2] += vec_array[vec_index + 2];

    return this;
};

/**
 * Subtracts a vector from this vector.
 * @param {b9.Vector3D} vec A vector.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.sub = function(vec) {
    var array = this._array;
    var index = this._index;
    var vec_array = vec._array;
    var vec_index = vec._index;

    array[index] -= vec_array[vec_index];
    array[index + 1] -= vec_array[vec_index + 1];
    array[index + 2] -= vec_array[vec_index + 2];

    return this;
};

/**
 * Multiplies this vector with a scalar value.
 * @param {Number} s A scalar value.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.mul = function(s) {
    var array = this._array;
    var index = this._index;

    array[index] *= s;
    array[index + 1] *= s;
    array[index + 2] *= s;

    return this;
};

/**
 * Divides this vector by a scalar value.
 * @param {Number} s A scalar value.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.div = function(s) {
    var array = this._array;
    var index = this._index;
    var rs = 1.0 / s;

    array[index] *= rs;
    array[index + 1] *= rs;
    array[index + 2] *= rs;

    return this;
};

/**
 * Returns the norm of this vector.
 * @return {Number} The norm of this vector.
 */
b9.Vector3D.prototype.norm = function() {
    var array = this._array;
    var index = this._index;

    return b9.Math.sqrt(
            array[index] * array[index] +
            array[index + 1] * array[index + 1] +
            array[index + 2] * array[index + 2]);
};

/**
 * Returns the squared norm of this vector.
 * This method is faster than the norm method.
 * @return {Number} The squared norm of this vector.
 */
b9.Vector3D.prototype.sqNorm = function() {
    var array = this._array;
    var index = this._index;

    return array[index] * array[index] +
        array[index + 1] * array[index + 1] +
        array[index + 2] * array[index + 2];
};

/**
 * Returns the distance between this vector and a vector.
 * @param {b9.Vector3D} vec A vector.
 * @return {Number} The distance between the two vectors.
 */
b9.Vector3D.prototype.dist = function(vec) {
    return b9.Vector3D._vec1.set(this).sub(vec).norm();
};

/**
 * Returns the squared distance between this vector and a vector.
 * This method is faster than the dist method.
 * @param {b9.Vector3D} vec A vector.
 * @return {Number} The squared distance between the two vectors.
 */
b9.Vector3D.prototype.sqDist = function(vec) {
    return b9.Vector3D._vec1.set(this).sub(vec).sqNorm();
};

/**
 * Returns the inner product of this vector and a vector.
 * @param {b9.Vector3D} vec A vector.
 * @return {Number} The inner product of the two vectors.
 */
b9.Vector3D.prototype.dot = function(vec) {
    var array = this._array;
    var index = this._index;
    var vec_array = vec._array;
    var vec_index = vec._index;

    return array[index] * vec_array[vec_index] +
        array[index + 1] * vec_array[vec_index + 1] +
        array[index + 2] * vec_array[vec_index + 2];
};

/**
 * Computes the outer product of this vector and a vector, and sets it to this vector.
 * @param {b9.Vector3D} vec A vector.
 * @return This vector.
 */
b9.Vector3D.prototype.cross = function(vec) {
    var array = this._array;
    var index = this._index;
    var vec_array = vec._array;
    var vec_index = vec._index;

    return this.set(
            array[index + 1] * vec_array[vec_index + 2] - array[index + 2] * vec_array[vec_index + 1],
            array[index + 2] * vec_array[vec_index] - array[index] * vec_array[vec_index + 2],
            array[index] * vec_array[vec_index + 1] - array[index + 1] * vec_array[vec_index]);
};

/**
 * Normalizes this vector.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.normalize = function() {
    var norm = this.norm();

    if (norm < b9.Math.EPSILON) {
        this.set(b9.Math.X_UNIT);
    } else {
        this.div(norm);
    }

    return this;
};

/**
 * Rotates this vector around the orthonormal x-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateX_float = function(deg) {
    var array = this._array;
    var index = this._index;
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    b9.Vector3D._vec1.set(
            array[index],
            array[index + 1] * cos - array[index + 2] * sin,
            array[index + 2] * cos + array[index + 1] * sin);

    return this.set(b9.Vector3D._vec1);
};

/**
 * Rotates this vector around the orthonormal y-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateY_float = function(deg) {
    var array = this._array;
    var index = this._index;
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    b9.Vector3D._vec1.set(
            array[index] * cos + array[index + 2] * sin,
            array[index + 1],
            array[index + 2] * cos - array[index] * sin);

    return this.set(b9.Vector3D._vec1);
};

/**
 * Rotates this vector around the orthonormal z-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateZ_float = function(deg) {
    var array = this._array;
    var index = this._index;
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    b9.Vector3D._vec1.set(
            array[index] * cos - array[index + 1] * sin,
            array[index + 1] * cos + array[index] * sin, 
            array[index + 2]);

    return this.set(b9.Vector3D._vec1);
};

/**
 * Rotates this vector around the orthonormal x-axis.
 * This method allows only an integer angle, but is faster than the rotateX_float method.
 * @param {Number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateX_int = function(deg) {
    var array = this._array;
    var index = this._index;
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    b9.Vector3D._vec1.set(
            array[index],
            array[index + 1] * cos - array[index + 2] * sin,
            array[index + 2] * cos + array[index + 1] * sin);

    return this.set(b9.Vector3D._vec1);
};

/**
 * Rotates this vector around the orthonormal y-axis.
 * This method allows only an integer angle, but is faster than the rotateY_float method.
 * @param {Number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateY_int = function(deg) {
    var array = this._array;
    var index = this._index;
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    b9.Vector3D._vec1.set(
            array[index] * cos + array[index + 2] * sin,
            array[index + 1],
            array[index + 2] * cos - array[index] * sin);

    return this.set(b9.Vector3D._vec1);
};

/**
 * Rotates this vector around the orthonormal z-axis.
 * This method allows only an integer angle, but is faster than the rotateZ_float method.
 * @param {Number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateZ_int = function(deg) {
    var array = this._array;
    var index = this._index;
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    b9.Vector3D._vec1.set(
            array[index] * cos - array[index + 1] * sin,
            array[index + 1] * cos + array[index] * sin,
            array[index + 2]);

    return this.set(b9.Vector3D._vec1);
};

/**
 * Interpolates this vector to a vector by a ratio.
 * @param {b9.Vector3D} to A destination vector.
 * @param {Number} ratio The value which indicates how far to interpolate between the two vectors.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.lerp = function(to, ratio) {
    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        b9.Vector3D._vec1.set(to).mul(ratio);
        this.mul(1.0 - ratio).add(b9.Vector3D._vec1);
    }

    return this;
};

/**
 * Converts this vector from in the world coordinate system to the local coordinate system of a matrix.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.toLocal = function(mat) {
    b9.Vector3D._vec1.set(this).sub(mat._trans);

    return this.set(
            b9.Vector3D._vec1.dot(mat._x_axis) / mat._x_axis.sqNorm(),
            b9.Vector3D._vec1.dot(mat._y_axis) / mat._y_axis.sqNorm(),
            b9.Vector3D._vec1.dot(mat._z_axis) / mat._z_axis.sqNorm());
};

/**
 * Converts this vector from in the local coordinate system of a matrix to in the world coordinate system.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.toGlobal = function(mat) {
    var array = this._array;
    var index = this._index;

    b9.Vector3D._vec1.set(mat._x_axis).mul(array[index]);
    b9.Vector3D._vec2.set(mat._y_axis).mul(array[index + 1]);
    b9.Vector3D._vec3.set(mat._z_axis).mul(array[index + 2]);

    return this.set(b9.Vector3D._vec1).add(b9.Vector3D._vec2).add(b9.Vector3D._vec3).add(mat._trans);
};

/**
 * Converts this vector from in the world coordinate system to the local coordinate system of a matrix.
 * However, unlike the toLocal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.toLocal_noTrans = function(mat) {
    b9.Vector3D._vec1.set(
            this.dot(mat._x_axis) / mat._x_axis.sqNorm(),
            this.dot(mat._y_axis) / mat._y_axis.sqNorm(),
            this.dot(mat._z_axis) / mat._z_axis.sqNorm());

    return this.set(b9.Vector3D._vec1);
};

/**
 * Converts this vector from in the local coordinate system of a matrix to in the world coordinate system.
 * However, unlike the toGlobal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.toGlobal_noTrans = function(mat) {
    var array = this._array;
    var index = this._index;

    b9.Vector3D._vec1.set(mat._x_axis).mul(array[index]);
    b9.Vector3D._vec2.set(mat._y_axis).mul(array[index + 1]);
    b9.Vector3D._vec3.set(mat._z_axis).mul(array[index + 2]);

    return this.set(b9.Vector3D._vec1).add(b9.Vector3D._vec2).add(b9.Vector3D._vec3);
};

/**
 * Returns whether this vector equals a vector.
 * @param {b9.Vector3D} vec A vector.
 * @return {Boolean} true if the two vectors are equal; false otherwise.
 */
b9.Vector3D.prototype.equals = function(vec) {
    var array = this._array;
    var index = this._index;
    var vec_array = vec._array;
    var vec_index = vec._index;

    return (b9.Math.equals_float(array[index], vec_array[vec_index]) &&
            b9.Math.equals_float(array[index + 1], vec_array[vec_index + 1]) &&
            b9.Math.equals_float(array[index + 2], vec_array[vec_index + 2]));
};

/**
 * Returns a string representation of this vector.
 * @return {String} A string representation of this vector.
 */
b9.Vector3D.prototype.toString = function() {
    var array = this._array;
    var index = this._index;

    var str = "(";
    str += array[index];
    str += ", ";
    str += array[index + 1];
    str += ", ";
    str += array[index + 2];
    str += ")";

    return str;
};

/**
 * The zero vector.
 * @return {b9.Vector3D}
 */
b9.Vector3D.ZERO = new b9.Vector3D(0.0, 0.0, 0.0);

/**
 * The orthonormal x-axis.
 * @return {b9.Vector3D}
 */
b9.Vector3D.X_UNIT = new b9.Vector3D(1.0, 0.0, 0.0);

/**
 * The orthonormal y-axis.
 * @return {b9.Vector3D}
 */
b9.Vector3D.Y_UNIT = new b9.Vector3D(0.0, 1.0, 0.0);

/**
 * The orthonormal z-axis.
 * @return {b9.Vector3D}
 */
b9.Vector3D.Z_UNIT = new b9.Vector3D(0.0, 0.0, 1.0);

b9.Vector3D._vec1 = new b9.Vector3D();
b9.Vector3D._vec2 = new b9.Vector3D();
b9.Vector3D._vec3 = new b9.Vector3D();
