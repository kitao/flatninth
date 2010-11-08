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
 * Constructs a quaternion. The following forms are allowed:
 * <ul>
 * <li>b9.Quaternion()</li>
 * <li>b9.Quaternion(b9.Quaternion quaternion_to_be_cloned)</li>
 * <li>b9.Quaternion(Float32Array array_to_be_referenced, int array_index_of_first_component)</li>
 * <li>b9.Quaternion(float x, float y, float z, float w)</li>
 * </ul>
 *
 * @class A quaternion which is represented by xyzw coordinates.
 *
 * @param {b9.Quaternion|Float32Array|Number} [quat_or_array_or_x]
 * A quaternion to be cloned, an array to be referenced, or an x-coordinate.
 * @param {Number} [index_or_y] The array index of the first component or a y-coordinate.
 * @param {Number} [z] A z-coordinate.
 * @param {Number} [w] A w-coordinate.
 */
b9.Quaternion = b9.createClass();

/**
 * @ignore
 */
b9.Quaternion.prototype.initialize = function(quat_or_array_or_x, index_or_y, z, w) {
    var array = this._array = (arguments.length === 2) ? quat_or_array_or_x : new Float32Array(4);
    var index = this._index = (arguments.length === 2) ? index_or_y : 0;
    var quat_array, quat_index;

    if (arguments.length === 1) {
        quat_array = quat_or_array_or_x._array;
        quat_index = quat_or_array_or_x._index;

        array[index] = quat_array[quat_index];
        array[index + 1] = quat_array[quat_index + 1];
        array[index + 2] = quat_array[quat_index + 2];
        array[index + 3] = quat_array[quat_index + 3];
    } else if (arguments.length === 4) {
        array[index] = quat_or_array_or_x;
        array[index + 1] = index_or_y;
        array[index + 2] = z;
        array[index + 3] = w;
    }
};

/**
 * Returns the x-coordinate of this quaternion.
 * @return The x-coordinate.
 */
b9.Quaternion.prototype.getX = function() {
    return this._array[this._index];
};

/**
 * Sets an x-coordinate to this quaternion.
 * @param {Number} x An x-coordinate.
 * @return This quaternion.
 */
b9.Quaternion.prototype.setX = function(x) {
    this._array[this._index] = x;

    return this;
};

/**
 * Returns the y-coordinate of this quaternion.
 * @return The y-coordinate of this quaternion.
 */
b9.Quaternion.prototype.getY = function() {
    return this._array[this._index + 1];
};

/**
 * Sets a y-coordinate to this quaternion.
 * @param {Number} y A y-coordinate.
 * @return This quaternion.
 */
b9.Quaternion.prototype.setY = function(y) {
    this._array[this._index + 1] = y;

    return this;
};

/**
 * Returns the z-coordinate of this quaternion.
 * @return The z-coordinate of this quaternion.
 */
b9.Quaternion.prototype.getZ = function() {
    return this._array[this._index + 2];
};

/**
 * Sets a z-coordinate of this quaternion.
 * @param {Number} z A z-coordinate.
 * @return This quaternion.
 */
b9.Quaternion.prototype.setZ = function(z) {
    this._array[this._index + 2] = z;

    return this;
};

/**
 * Returns the w-coordinate of this quaternion.
 * @return The w-coordinate of this quaternion.
 */
b9.Quaternion.prototype.getW = function() {
    return this._array[this._index + 3];
};

/**
 * Sets a w-coordinate to this quaternion.
 * @param {Number} w A w-coordinate.
 * @return This quaternion.
 */
b9.Quaternion.prototype.setW = function(w) {
    this._array[this._index + 3] = w;

    return this;
};

/**
 * Sets all of the components to this quaternion. The following forms are allowed:
 * <ul>
 * <li>b9.Quaternion(b9.Quaternion quaternion_to_be_cloned)</li>
 * <li>b9.Quaternion(float x, float y, float z, float w)</li>
 * </ul>
 * @param {b9.Quaternion|Number} [quat_or_x] A quaternion to be cloned or an x-coordinate.
 * @param {Number} [y] A y-coordinate.
 * @param {Number} [z] A z-coordinate.
 * @param {Number} [w] A w-coordinate.
 * @return {b9.Quaternion} This quaternion.
 */
b9.Quaternion.prototype.set = function(quat_or_x, y, z, w) {
    var array = this._array;
    var index = this._index;
    var quat_array, quat_index;

    if (arguments.length === 1) {
        quat_array = quat_or_x._array;
        quat_index = quat_or_x._index;

        array[index] = quat_array[quat_index];
        array[index + 1] = quat_array[quat_index + 1];
        array[index + 2] = quat_array[quat_index + 2];
        array[index + 3] = quat_array[quat_index + 3];
    } else if (arguments.length === 4) {
        array[index] = quat_or_x;
        array[index + 1] = y;
        array[index + 2] = z;
        array[index + 3] = w;
    }

    return this;
};

/**
 * Returns the array of this quaternion.
 * @return The array.
 */
b9.Quaternion.prototype.getArray = function() {
    return this._array;
};

/**
 * Returns the array index of the first component.
 * @return The array index.
 */
b9.Quaternion.prototype.getIndex = function() {
    return this._index;
};

/**
 * Builds the quaternion from a matrix and sets to this quaternion.
 * @param {b9.Matrix3D} mat A matrix.
 * @return This quaternion.
 */
b9.Quaternion.prototype.fromMatrix3D = function(mat) {
    var array = this._array;
    var index = this._index;
    var trace = mat._x_axis.getX() + mat._y_axis.getY() + mat._z_axis.getZ();
    var root, scale;
    var mat_array, mat_index;
    var i, j, k;

    if (trace > 0.0) {
        root = b9.Math.sqrt(trace + 1.0);
        scale = 0.5 / root;

        return this.set(
                (mat._y_axis.getZ() - mat._z_axis.getY()) * scale,
                (mat._z_axis.getX() - mat._x_axis.getZ()) * scale,
                (mat._x_axis.getY() - mat._y_axis.getX()) * scale,
                root * 0.5);
    } else {
        mat_array = mat._array;
        mat_index = mat._index;

        i = 0;

        if (mat_array[mat_index + 5] > mat_array[mat_index + i * 5]) {
            i = 1;
        }

        if (mat_array[mat_index + 10] > mat_array[mat_index + i * 5]) {
            i = 2;
        }

        j = (i + 1) % 3;
        k = (i + 2) % 3;

        root = b9.Math.sqrt(
                mat_array[mat_index + i * 5] - (mat_array[mat_index + j * 5] + mat_array[mat_index + k * 5]) + 1.0);
        scale = (root !== 0.0) ? 0.5 / root : root;

        array[index + i] = root * 0.5;
        array[index + j] = (mat_array[mat_index + i * 4 + j] + mat_array[mat_index + j * 4 + i]) * scale;
        array[index + k] = (mat_array[mat_index + k * 4 + i] + mat_array[mat_index + i * 4 + k]) * scale;
        array[index + 3] = (mat_array[mat_index + j * 4 + k] - mat_array[mat_index + k * 4 + j]) * scale;

        return this;
    }
};

/**
 * Interpolates this quaternion to a quaternion by a ratio, using spherical linear interpolation.
 * @param {Number} to A destination quaternion.
 * @param {Number} ratio The value which indicates how far to interpolate between the two quaternions.
 * @return {b9.Matrix3D} This quaternion.
 */
b9.Quaternion.prototype.slerp = function(to, ratio) {
    var array = this._array;
    var index = this._index;
    var to_array, to_index;
    var quat_array, quat_index;
    var omega;
    var sin_om, cos_om;
    var scale0, scale1;

    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        to_array = to._array;
        to_index = to._index;

        cos_om = array[index] * to_array[to_index] +
            array[index + 1] * to_array[to_index + 1] +
            array[index + 2] * to_array[to_index + 2] +
            array[index + 3] * to_array[to_index + 3];

        if (cos_om < 0.0) {
            cos_om = -cos_om;

            b9.Quaternion._quat1.set(
                    -to_array[to_index],
                    -to_array[to_index + 1],
                    -to_array[to_index + 2],
                    -to_array[to_index + 3]);
        } else {
            b9.Quaternion._quat1.set(to);
        }

        if (cos_om >= 1.0) {
            this.set(to);
        } else {
            quat_array = b9.Quaternion._quat1._array;
            quat_index = b9.Quaternion._quat1._index;
            omega = b9.Math.acos(cos_om > 1.0 ? 1.0 : cos_om);
            sin_om = b9.Math.sin_float(omega);
            scale0 = b9.Math.sin_float(omega * (1.0 - ratio)) / sin_om;
            scale1 = b9.Math.sin_float(omega * ratio) / sin_om;

            this.set(
                    array[index] * scale0 + quat_array[quat_index] * scale1,
                    array[index + 1] * scale0 + quat_array[quat_index + 1] * scale1,
                    array[index + 2] * scale0 + quat_array[quat_index + 2] * scale1,
                    array[index + 3] * scale0 + quat_array[quat_index + 3] * scale1);
        }
    }

    return this;
};

/**
 * Returns whether this quaternion equals a quaternion.
 * @param {b9.Quaternion} quat A quaternion.
 * @return {Boolean} true if the two quaternions are equal; false otherwise.
 */
b9.Quaternion.prototype.equals = function(quat) {
    var array = this._array;
    var index = this._index;
    var quat_array = quat._array;
    var quat_index = quat._index;

    return (b9.Math.equals_float(array[index], quat_array[quat_index]) &&
            b9.Math.equals_float(array[index + 1], quat_array[quat_index + 1]) &&
            b9.Math.equals_float(array[index + 2], quat_array[quat_index + 2]) &&
            b9.Math.equals_float(array[index + 3], quat_array[quat_index + 3]));
};

/**
 * Returns a string representation of this quaternion.
 * @return {String} A string representation of this quaternion.
 */
b9.Quaternion.prototype.toString = function() {
    var array = this._array;
    var index = this._index;

    var str = "(";
    str += array[index];
    str += ", ";
    str += array[index + 1];
    str += ", ";
    str += array[index + 2];
    str += ", ";
    str += array[index + 3];
    str += ")";

    return str;
};

b9.Quaternion._quat1 = new b9.Quaternion();

b9.Matrix3D._quat1 = new b9.Quaternion();
b9.Matrix3D._quat2 = new b9.Quaternion();
