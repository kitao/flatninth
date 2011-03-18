/*
 * Copyright (c) 2009-2011 Takashi Kitao
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
 * <li>b9.Quaternion(b9.Quaternion quaternionToBeCloned)</li>
 * <li>b9.Quaternion(Float32Array arrayToBeReferenced, int arrayIndexOfFirstComponent)</li>
 * <li>b9.Quaternion(float x, float y, float z, float w)</li>
 * </ul>
 *
 * @class A quaternion which is represented by xyzw coordinates.
 *
 * @param {b9.Quaternion|Float32Array|number} [arg1]
 * A quaternion to be cloned, an array to be referenced, or an x-coordinate.
 * @param {number} [arg2] The array index of the first component or a y-coordinate.
 * @param {number} [arg3] A z-coordinate.
 * @param {number} [arg4] A w-coordinate.
 */
b9.Quaternion = b9.createClass();

/**
 * @ignore
 */
b9.Quaternion.prototype.initialize = function(arg1, arg2, arg3, arg4) {
    var array = this.array_ = (arguments.length === 2) ? arg1 : new Float32Array(4);
    var index = this.index_ = (arguments.length === 2) ? arg2 : 0;
    var quatArray, quatIndex;

    if (arguments.length === 1) {
        quatArray = arg1.array_;
        quatIndex = arg1.index_;

        array[index] = quatArray[quatIndex];
        array[index + 1] = quatArray[quatIndex + 1];
        array[index + 2] = quatArray[quatIndex + 2];
        array[index + 3] = quatArray[quatIndex + 3];
    } else if (arguments.length === 4) {
        array[index] = arg1;
        array[index + 1] = arg2;
        array[index + 2] = arg3;
        array[index + 3] = arg4;
    }
};

/**
 * Returns the x-coordinate of this quaternion.
 * @return The x-coordinate.
 */
b9.Quaternion.prototype.getX = function() {
    return this.array_[this.index_];
};

/**
 * Sets an x-coordinate to this quaternion.
 * @param {number} x An x-coordinate.
 * @return This quaternion.
 */
b9.Quaternion.prototype.setX = function(x) {
    this.array_[this.index_] = x;

    return this;
};

/**
 * Returns the y-coordinate of this quaternion.
 * @return The y-coordinate of this quaternion.
 */
b9.Quaternion.prototype.getY = function() {
    return this.array_[this.index_ + 1];
};

/**
 * Sets a y-coordinate to this quaternion.
 * @param {number} y A y-coordinate.
 * @return This quaternion.
 */
b9.Quaternion.prototype.setY = function(y) {
    this.array_[this.index_ + 1] = y;

    return this;
};

/**
 * Returns the z-coordinate of this quaternion.
 * @return The z-coordinate of this quaternion.
 */
b9.Quaternion.prototype.getZ = function() {
    return this.array_[this.index_ + 2];
};

/**
 * Sets a z-coordinate of this quaternion.
 * @param {number} z A z-coordinate.
 * @return This quaternion.
 */
b9.Quaternion.prototype.setZ = function(z) {
    this.array_[this.index_ + 2] = z;

    return this;
};

/**
 * Returns the w-coordinate of this quaternion.
 * @return The w-coordinate of this quaternion.
 */
b9.Quaternion.prototype.getW = function() {
    return this.array_[this.index_ + 3];
};

/**
 * Sets a w-coordinate to this quaternion.
 * @param {number} w A w-coordinate.
 * @return This quaternion.
 */
b9.Quaternion.prototype.setW = function(w) {
    this.array_[this.index_ + 3] = w;

    return this;
};

/**
 * Sets all of the components to this quaternion. The following forms are allowed:
 * <ul>
 * <li>b9.Quaternion(b9.Quaternion quaternionToBeCloned)</li>
 * <li>b9.Quaternion(float x, float y, float z, float w)</li>
 * </ul>
 * @param {b9.Quaternion|number} [arg1] A quaternion to be cloned or an x-coordinate.
 * @param {number} [arg2] A y-coordinate.
 * @param {number} [arg3] A z-coordinate.
 * @param {number} [arg4] A w-coordinate.
 * @return {b9.Quaternion} This quaternion.
 */
b9.Quaternion.prototype.set = function(arg1, arg2, arg3, arg4) {
    var array = this.array_;
    var index = this.index_;
    var quatArray, quatIndex;

    if (arguments.length === 1) {
        quatArray = arg1.array_;
        quatIndex = arg1.index_;

        array[index] = quatArray[quatIndex];
        array[index + 1] = quatArray[quatIndex + 1];
        array[index + 2] = quatArray[quatIndex + 2];
        array[index + 3] = quatArray[quatIndex + 3];
    } else if (arguments.length === 4) {
        array[index] = arg1;
        array[index + 1] = arg2;
        array[index + 2] = arg3;
        array[index + 3] = arg4;
    }

    return this;
};

/**
 * Returns the array of this quaternion.
 * @return The array.
 */
b9.Quaternion.prototype.getArray = function() {
    return this.array_;
};

/**
 * Returns the array index of the first component.
 * @return The array index.
 */
b9.Quaternion.prototype.getIndex = function() {
    return this.index_;
};

/**
 * Builds the quaternion from a matrix and sets to this quaternion.
 * @param {b9.Matrix3D} mat A matrix.
 * @return This quaternion.
 */
b9.Quaternion.prototype.fromMatrix3D = function(mat) {
    var i, j, k;
    var array = this.array_;
    var index = this.index_;
    var matArray = mat.array_;
    var matIndex = mat.index_;
    var trace = matArray[matIndex] + matArray[matIndex + 5] + matArray[matIndex + 10];
    var root, scale;

    if (trace > 0.0) {
        root = b9.Math.sqrt(trace + 1.0);
        scale = 0.5 / root;

        return this.set(
                (matArray[matIndex + 6] - matArray[matIndex + 9]) * scale,
                (matArray[matIndex + 8] - matArray[matIndex + 2]) * scale,
                (matArray[matIndex + 1] - matArray[matIndex + 4]) * scale,
                root * 0.5);
    } else {
        matArray = mat.array_;
        matIndex = mat.index_;

        i = 0;

        if (matArray[matIndex + 5] > matArray[matIndex + i * 5]) {
            i = 1;
        }

        if (matArray[matIndex + 10] > matArray[matIndex + i * 5]) {
            i = 2;
        }

        j = (i + 1) % 3;
        k = (i + 2) % 3;

        root = b9.Math.sqrt(
                matArray[matIndex + i * 5] - (matArray[matIndex + j * 5] + matArray[matIndex + k * 5]) + 1.0);
        scale = (root !== 0.0) ? 0.5 / root : root;

        array[index + i] = root * 0.5;
        array[index + j] = (matArray[matIndex + i * 4 + j] + matArray[matIndex + j * 4 + i]) * scale;
        array[index + k] = (matArray[matIndex + k * 4 + i] + matArray[matIndex + i * 4 + k]) * scale;
        array[index + 3] = (matArray[matIndex + j * 4 + k] - matArray[matIndex + k * 4 + j]) * scale;

        return this;
    }
};

/**
 * Interpolates this quaternion to a quaternion by a ratio, using spherical linear interpolation.
 * @param {number} to A destination quaternion.
 * @param {number} ratio The value which indicates how far to interpolate between the two quaternions.
 * @return {b9.Matrix3D} This quaternion.
 */
b9.Quaternion.prototype.slerp = function(to, ratio) {
    var array = this.array_;
    var index = this.index_;
    var toArray, toIndex;
    var quat, quatArray, quatIndex;
    var omega;
    var sinOmega, cosOmega;
    var scale0, scale1;

    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        quat = b9.Quaternion.quat1_;

        toArray = to.array_;
        toIndex = to.index_;

        cosOmega = array[index] * toArray[toIndex] +
            array[index + 1] * toArray[toIndex + 1] +
            array[index + 2] * toArray[toIndex + 2] +
            array[index + 3] * toArray[toIndex + 3];

        if (cosOmega < 0.0) {
            cosOmega = -cosOmega;

            quat.set(
                    -toArray[toIndex],
                    -toArray[toIndex + 1],
                    -toArray[toIndex + 2],
                    -toArray[toIndex + 3]);
        } else {
            quat.set(to);
        }

        if (cosOmega >= 1.0) {
            this.set(to);
        } else {
            quatArray = quat.array_;
            quatIndex = quat.index_;
            omega = b9.Math.acos(cosOmega > 1.0 ? 1.0 : cosOmega);
            sinOmega = b9.Math.sin_float(omega);
            scale0 = b9.Math.sin_float(omega * (1.0 - ratio)) / sinOmega;
            scale1 = b9.Math.sin_float(omega * ratio) / sinOmega;

            this.set(
                    array[index] * scale0 + quatArray[quatIndex] * scale1,
                    array[index + 1] * scale0 + quatArray[quatIndex + 1] * scale1,
                    array[index + 2] * scale0 + quatArray[quatIndex + 2] * scale1,
                    array[index + 3] * scale0 + quatArray[quatIndex + 3] * scale1);
        }
    }

    return this;
};

/**
 * Returns whether this quaternion equals a quaternion.
 * @param {b9.Quaternion} quat A quaternion.
 * @return {boolean} true if the two quaternions are equal; false otherwise.
 */
b9.Quaternion.prototype.equals = function(quat) {
    var array = this.array_;
    var index = this.index_;
    var quatArray = quat.array_;
    var quatIndex = quat.index_;

    return (b9.Math.equals_float(array[index], quatArray[quatIndex]) &&
            b9.Math.equals_float(array[index + 1], quatArray[quatIndex + 1]) &&
            b9.Math.equals_float(array[index + 2], quatArray[quatIndex + 2]) &&
            b9.Math.equals_float(array[index + 3], quatArray[quatIndex + 3]));
};

/**
 * Returns a string representation of this quaternion.
 * @return {string} A string representation of this quaternion.
 */
b9.Quaternion.prototype.toString = function() {
    var array = this.array_;
    var index = this.index_;
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

b9.Quaternion.quat1_ = new b9.Quaternion();

b9.Matrix3D.quat1_ = new b9.Quaternion();
b9.Matrix3D.quat2_ = new b9.Quaternion();
