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
 * Constructs a vector. The following forms are allowed:
 * <ul>
 * <li>b9.Vector3D()</li>
 * <li>b9.Vector3D(b9.Vector3D vectorToBeCloned)</li>
 * <li>b9.Vector3D(Float32Array arrayToBeReferenced, int arrayIndexOfFirstComponent)</li>
 * <li>b9.Vector3D(float x, float y, float z)</li>
 * </ul>
 *
 * @class A 3-element vector which is represented by xyz coordinates.
 *
 * @param {b9.Vector3D|Float32Array|number} [arg1]
 * A vector to be cloned, an array to be referenced, or an x-coordinate.
 * @param {number} [arg2] The array index of the first component or a y-coordinate.
 * @param {number} [arg3] A z-coordinate.
 */
b9.Vector3D = b9.createClass();

/**
 * @ignore
 */
b9.Vector3D.prototype.initialize = function(arg1, arg2, arg3) {
    var array = this.array_ = (arguments.length === 2) ? arg1 : new Float32Array(3);
    var index = this.index_ = (arguments.length === 2) ? arg2 : 0;
    var vecArray, vecIndex;

    if (arguments.length === 1) {
        vecArray = arg1.array_;
        vecIndex = arg1.index_;

        array[index] = vecArray[vecIndex];
        array[index + 1] = vecArray[vecIndex + 1];
        array[index + 2] = vecArray[vecIndex + 2];
    } else if (arguments.length === 3) {
        array[index] = arg1;
        array[index + 1] = arg2;
        array[index + 2] = arg3;
    }
};

/**
 * Returns the x-coordinate of this vector.
 * @return The x-coordinate.
 */
b9.Vector3D.prototype.getX = function() {
    return this.array_[this.index_];
};

/**
 * Sets an x-coordinate to this vector.
 * @param {number} x An x-coordinate.
 * @return This vector.
 */
b9.Vector3D.prototype.setX = function(x) {
    this.array_[this.index_] = x;

    return this;
};

/**
 * Returns the y-coordinate of this vector.
 * @return The y-coordinate.
 */
b9.Vector3D.prototype.getY = function() {
    return this.array_[this.index_ + 1];
};

/**
 * Sets a y-coordinate to this vector.
 * @param {number} y A y-coordinate.
 * @return This vector.
 */
b9.Vector3D.prototype.setY = function(y) {
    this.array_[this.index_ + 1] = y;

    return this;
};

/**
 * Returns the z-coordinate of this vector.
 * @return The z-coordinate.
 */
b9.Vector3D.prototype.getZ = function() {
    return this.array_[this.index_ + 2];
};

/**
 * Sets a z-coordinate to this vector.
 * @param {number} z A z-coordinate.
 * @return This vector.
 */
b9.Vector3D.prototype.setZ = function(z) {
    this.array_[this.index_ + 2] = z;

    return this;
};

/**
 * Sets all of the components to this vector. The following forms are allowed:
 * <ul>
 * <li>set(b9.Vector3D vectorToBeCloned)</li>
 * <li>set(float x, float y, float z)</li>
 * </ul>
 * @param {b9.Vector3D|number} [arg1] A vector to be cloned or an x-coordinate.
 * @param {number} [arg2] A y-coordinate.
 * @param {number} [arg3] A z-coordinate.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.set = function(arg1, arg2, arg3) {
    var array = this.array_;
    var index = this.index_;
    var vecArray, vecIndex;

    if (arguments.length === 1) {
        vecArray = arg1.array_;
        vecIndex = arg1.index_;

        array[index] = vecArray[vecIndex];
        array[index + 1] = vecArray[vecIndex + 1];
        array[index + 2] = vecArray[vecIndex + 2];
    } else if (arguments.length === 3) {
        array[index] = arg1;
        array[index + 1] = arg2;
        array[index + 2] = arg3;
    }

    return this;
};

/**
 * Returns the array of this vector.
 * @return The array.
 */
b9.Vector3D.prototype.getArray = function() {
    return this.array_;
};

/**
 * Returns the array index of the first component.
 * @return The array index.
 */
b9.Vector3D.prototype.getIndex = function() {
    return this.index_;
};

/**
 * Changes the arithmetic sign of this vector.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.neg = function() {
    var array = this.array_;
    var index = this.index_;

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
    var array = this.array_;
    var index = this.index_;
    var vecArray = vec.array_;
    var vecIndex = vec.index_;

    array[index] += vecArray[vecIndex];
    array[index + 1] += vecArray[vecIndex + 1];
    array[index + 2] += vecArray[vecIndex + 2];

    return this;
};

/**
 * Subtracts a vector from this vector.
 * @param {b9.Vector3D} vec A vector.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.sub = function(vec) {
    var array = this.array_;
    var index = this.index_;
    var vecArray = vec.array_;
    var vecIndex = vec.index_;

    array[index] -= vecArray[vecIndex];
    array[index + 1] -= vecArray[vecIndex + 1];
    array[index + 2] -= vecArray[vecIndex + 2];

    return this;
};

/**
 * Multiplies this vector with a scalar value.
 * @param {number} s A scalar value.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.mul = function(s) {
    var array = this.array_;
    var index = this.index_;

    array[index] *= s;
    array[index + 1] *= s;
    array[index + 2] *= s;

    return this;
};

/**
 * Divides this vector by a scalar value.
 * @param {number} s A scalar value.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.div = function(s) {
    var array = this.array_;
    var index = this.index_;
    var rs = 1.0 / s;

    array[index] *= rs;
    array[index + 1] *= rs;
    array[index + 2] *= rs;

    return this;
};

/**
 * Returns the norm of this vector.
 * @return {number} The norm of this vector.
 */
b9.Vector3D.prototype.norm = function() {
    var array = this.array_;
    var index = this.index_;

    return b9.Math.sqrt(
            array[index] * array[index] +
            array[index + 1] * array[index + 1] +
            array[index + 2] * array[index + 2]);
};

/**
 * Returns the squared norm of this vector.
 * This method is faster than the norm method.
 * @return {number} The squared norm of this vector.
 */
b9.Vector3D.prototype.sqNorm = function() {
    var array = this.array_;
    var index = this.index_;

    return array[index] * array[index] +
        array[index + 1] * array[index + 1] +
        array[index + 2] * array[index + 2];
};

/**
 * Returns the distance between this vector and a vector.
 * @param {b9.Vector3D} vec A vector.
 * @return {number} The distance between the two vectors.
 */
b9.Vector3D.prototype.dist = function(vec) {
    return b9.Vector3D.vec1_.set(this).sub(vec).norm();
};

/**
 * Returns the squared distance between this vector and a vector.
 * This method is faster than the dist method.
 * @param {b9.Vector3D} vec A vector.
 * @return {number} The squared distance between the two vectors.
 */
b9.Vector3D.prototype.sqDist = function(vec) {
    return b9.Vector3D.vec1_.set(this).sub(vec).sqNorm();
};

/**
 * Returns the inner product of this vector and a vector.
 * @param {b9.Vector3D} vec A vector.
 * @return {number} The inner product of the two vectors.
 */
b9.Vector3D.prototype.dot = function(vec) {
    var array = this.array_;
    var index = this.index_;
    var vecArray = vec.array_;
    var vecIndex = vec.index_;

    return array[index] * vecArray[vecIndex] +
        array[index + 1] * vecArray[vecIndex + 1] +
        array[index + 2] * vecArray[vecIndex + 2];
};

/**
 * Computes the outer product of this vector and a vector, and sets it to this vector.
 * @param {b9.Vector3D} vec A vector.
 * @return This vector.
 */
b9.Vector3D.prototype.cross = function(vec) {
    var array = this.array_;
    var index = this.index_;
    var vecArray = vec.array_;
    var vecIndex = vec.index_;

    return this.set(
            array[index + 1] * vecArray[vecIndex + 2] - array[index + 2] * vecArray[vecIndex + 1],
            array[index + 2] * vecArray[vecIndex] - array[index] * vecArray[vecIndex + 2],
            array[index] * vecArray[vecIndex + 1] - array[index + 1] * vecArray[vecIndex]);
};

/**
 * Normalizes this vector.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.normalize = function() {
    var norm = this.norm();

    if (norm < b9.Math.EPSILON) {
        this.set(b9.Vector3D.X_UNIT);
    } else {
        this.div(norm);
    }

    return this;
};

/**
 * Rotates this vector around the orthonormal x-axis.
 * @param {number} deg A float angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateX_float = function(deg) {
    var vec = b9.Vector3D.vec1_;
    var array = this.array_;
    var index = this.index_;
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    vec.set(
            array[index],
            array[index + 1] * cos - array[index + 2] * sin,
            array[index + 2] * cos + array[index + 1] * sin);

    return this.set(vec);
};

/**
 * Rotates this vector around the orthonormal y-axis.
 * @param {number} deg A float angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateY_float = function(deg) {
    var vec = b9.Vector3D.vec1_;
    var array = this.array_;
    var index = this.index_;
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    vec.set(
            array[index] * cos + array[index + 2] * sin,
            array[index + 1],
            array[index + 2] * cos - array[index] * sin);

    return this.set(vec);
};

/**
 * Rotates this vector around the orthonormal z-axis.
 * @param {number} deg A float angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateZ_float = function(deg) {
    var vec = b9.Vector3D.vec1_;
    var array = this.array_;
    var index = this.index_;
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    vec.set(
            array[index] * cos - array[index + 1] * sin,
            array[index + 1] * cos + array[index] * sin,
            array[index + 2]);

    return this.set(vec);
};

/**
 * Rotates this vector around the orthonormal x-axis.
 * This method allows only an integer angle, but is faster than the rotateX_float method.
 * @param {number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateX_int = function(deg) {
    var vec = b9.Vector3D.vec1_;
    var array = this.array_;
    var index = this.index_;
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    vec.set(
            array[index],
            array[index + 1] * cos - array[index + 2] * sin,
            array[index + 2] * cos + array[index + 1] * sin);

    return this.set(vec);
};

/**
 * Rotates this vector around the orthonormal y-axis.
 * This method allows only an integer angle, but is faster than the rotateY_float method.
 * @param {number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateY_int = function(deg) {
    var vec = b9.Vector3D.vec1_;
    var array = this.array_;
    var index = this.index_;
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    vec.set(
            array[index] * cos + array[index + 2] * sin,
            array[index + 1],
            array[index + 2] * cos - array[index] * sin);

    return this.set(vec);
};

/**
 * Rotates this vector around the orthonormal z-axis.
 * This method allows only an integer angle, but is faster than the rotateZ_float method.
 * @param {number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateZ_int = function(deg) {
    var vec = b9.Vector3D.vec1_;
    var array = this.array_;
    var index = this.index_;
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    vec.set(
            array[index] * cos - array[index + 1] * sin,
            array[index + 1] * cos + array[index] * sin,
            array[index + 2]);

    return this.set(vec);
};

/**
 * Interpolates this vector to a vector by a ratio.
 * @param {b9.Vector3D} to A destination vector.
 * @param {number} ratio The value which indicates how far to interpolate between the two vectors.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.lerp = function(to, ratio) {
    var vec;

    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        vec = b9.Vector3D.vec1_;

        vec.set(to).mul(ratio);
        this.mul(1.0 - ratio).add(vec);
    }

    return this;
};

/**
 * Converts this vector from in the world coordinate system to in the local coordinate system of a matrix.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.toLocal = function(mat) {
    var vec = b9.Vector3D.vec1_;

    vec.set(this).sub(mat.trans_);

    return this.set(
            vec.dot(mat.xAxis_) / mat.xAxis_.sqNorm(),
            vec.dot(mat.yAxis_) / mat.yAxis_.sqNorm(),
            vec.dot(mat.zAxis_) / mat.zAxis_.sqNorm());
};

/**
 * Converts this vector from in the local coordinate system of a matrix to in the world coordinate system.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.toGlobal = function(mat) {
    var vec1 = b9.Vector3D.vec1_;
    var vec2 = b9.Vector3D.vec2_;
    var vec3 = b9.Vector3D.vec3_;
    var array = this.array_;
    var index = this.index_;

    vec1.set(mat.xAxis_).mul(array[index]);
    vec2.set(mat.yAxis_).mul(array[index + 1]);
    vec3.set(mat.zAxis_).mul(array[index + 2]);

    return this.set(vec1).add(vec2).add(vec3).add(mat.trans_);
};

/**
 * Converts this vector from in the world coordinate system to in the local coordinate system of a matrix.
 * However, unlike the toLocal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.toLocal_noTrans = function(mat) {
    var vec = b9.Vector3D.vec1_;

    vec.set(
            this.dot(mat.xAxis_) / mat.xAxis_.sqNorm(),
            this.dot(mat.yAxis_) / mat.yAxis_.sqNorm(),
            this.dot(mat.zAxis_) / mat.zAxis_.sqNorm());

    return this.set(vec);
};

/**
 * Converts this vector from in the local coordinate system of a matrix to in the world coordinate system.
 * However, unlike the toGlobal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.toGlobal_noTrans = function(mat) {
    var vec1 = b9.Vector3D.vec1_;
    var vec2 = b9.Vector3D.vec2_;
    var vec3 = b9.Vector3D.vec3_;
    var array = this.array_;
    var index = this.index_;

    vec1.set(mat.xAxis_).mul(array[index]);
    vec2.set(mat.yAxis_).mul(array[index + 1]);
    vec3.set(mat.zAxis_).mul(array[index + 2]);

    return this.set(vec1).add(vec2).add(vec3);
};

/**
 * Returns whether this vector equals a vector.
 * @param {b9.Vector3D} vec A vector.
 * @return {boolean} true if the two vectors are equal; false otherwise.
 */
b9.Vector3D.prototype.equals = function(vec) {
    var array = this.array_;
    var index = this.index_;
    var vecArray = vec.array_;
    var vecIndex = vec.index_;

    return (b9.Math.equals_float(array[index], vecArray[vecIndex]) &&
            b9.Math.equals_float(array[index + 1], vecArray[vecIndex + 1]) &&
            b9.Math.equals_float(array[index + 2], vecArray[vecIndex + 2]));
};

/**
 * Returns a string representation of this vector.
 * @return {string} A string representation of this vector.
 */
b9.Vector3D.prototype.toString = function() {
    var array = this.array_;
    var index = this.index_;
    var str;

    str = "(";
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
 * @const
 * @type {b9.Vector3D}
 */
b9.Vector3D.ZERO = new b9.Vector3D(0.0, 0.0, 0.0);

/**
 * The orthonormal x-axis.
 * @const
 * @type {b9.Vector3D}
 */
b9.Vector3D.X_UNIT = new b9.Vector3D(1.0, 0.0, 0.0);

/**
 * The orthonormal y-axis.
 * @const
 * @type {b9.Vector3D}
 */
b9.Vector3D.Y_UNIT = new b9.Vector3D(0.0, 1.0, 0.0);

/**
 * The orthonormal z-axis.
 * @const
 * @type {b9.Vector3D}
 */
b9.Vector3D.Z_UNIT = new b9.Vector3D(0.0, 0.0, 1.0);

b9.Vector3D.vec1_ = new b9.Vector3D();
b9.Vector3D.vec2_ = new b9.Vector3D();
b9.Vector3D.vec3_ = new b9.Vector3D();
