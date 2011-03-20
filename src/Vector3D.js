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
 * <li>b9.Vector3D(float x, float y, float z)</li>
 * </ul>
 *
 * @class A 3-element vector which is represented by xyz coordinates.
 *
 * @param {b9.Vector3D|number} [vecOrX] A vector to be cloned or an x-coordinate.
 * @param {Number} [y] A y-coordinate.
 * @param {Number} [z] A z-coordinate.
 */
b9.Vector3D = b9.createClass();

/**
 * @ignore
 */
b9.Vector3D.prototype.initialize = function(vecOrX, y, z) {
    /**
     * The x-coordinate of this vector.
     * @type {Number}
     */
    this.x = 0.0;

    /**
     * The y-coordinate of this vector.
     * @type {Number}
     */
    this.y = 0.0;

    /**
     * The z-coordinate of this vector.
     * @type {Number}
     */
    this.z = 0.0;

    if (arguments.length === 1) {
        this.x = vecOrX.x;
        this.y = vecOrX.y;
        this.z = vecOrX.z;
    } else if (arguments.length === 3) {
        this.x = vecOrX;
        this.y = y;
        this.z = z;
    }
};

/**
 * Sets all of the components to this vector. The following forms are allowed:
 * <ul>
 * <li>set(b9.Vector3D vectorToBeCloned)</li>
 * <li>set(float x, float y, float z)</li>
 * </ul>
 * @param {b9.Vector3D|number} [vecOrX] A vector to be cloned or an x-coordinate.
 * @param {Number} [y] A y-coordinate.
 * @param {Number} [z] A z-coordinate.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.set = function(vecOrX, y, z) {
    if (arguments.length === 1) {
        this.x = vecOrX.x;
        this.y = vecOrX.y;
        this.z = vecOrX.z;
    } else if (arguments.length === 3) {
        this.x = vecOrX;
        this.y = y;
        this.z = z;
    }

    return this;
};

/**
 * Changes the arithmetic sign of this vector.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.neg = function() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;

    return this;
};

/**
 * Adds a vector to this vector.
 * @param {b9.Vector3D} vec A vector.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.add = function(vec) {
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;

    return this;
};

/**
 * Subtracts a vector from this vector.
 * @param {b9.Vector3D} vec A vector.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.sub = function(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    this.z -= vec.z;

    return this;
};

/**
 * Multiplies this vector with a scalar value.
 * @param {Number} s A scalar value.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.mul = function(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;

    return this;
};

/**
 * Divides this vector by a scalar value.
 * @param {Number} s A scalar value.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.div = function(s) {
    var rs = 1.0 / s;

    this.x *= rs;
    this.y *= rs;
    this.z *= rs;

    return this;
};

/**
 * Returns the norm of this vector.
 * @return {Number} The norm of this vector.
 */
b9.Vector3D.prototype.norm = function() {
    return b9.Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

/**
 * Returns the squared norm of this vector.
 * This method is faster than the norm method.
 * @return {Number} The squared norm of this vector.
 */
b9.Vector3D.prototype.sqNorm = function() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
};

/**
 * Returns the distance between this vector and a vector.
 * @param {b9.Vector3D} vec A vector.
 * @return {Number} The distance between the two vectors.
 */
b9.Vector3D.prototype.dist = function(vec) {
    return b9.Vector3D.vec1_.set(this).sub(vec).norm();
};

/**
 * Returns the squared distance between this vector and a vector.
 * This method is faster than the dist method.
 * @param {b9.Vector3D} vec A vector.
 * @return {Number} The squared distance between the two vectors.
 */
b9.Vector3D.prototype.sqDist = function(vec) {
    return b9.Vector3D.vec1_.set(this).sub(vec).sqNorm();
};

/**
 * Returns the inner product of this vector and a vector.
 * @param {b9.Vector3D} vec A vector.
 * @return {Number} The inner product of the two vectors.
 */
b9.Vector3D.prototype.dot = function(vec) {
    return this.x * vec.x + this.y * vec.y + this.z * vec.z;
};

/**
 * Computes the outer product of this vector and a vector, and sets it to this vector.
 * @param {b9.Vector3D} vec A vector.
 * @return This vector.
 */
b9.Vector3D.prototype.cross = function(vec) {
    return this.set(
            this.y * vec.z - this.z * vec.y,
            this.z * vec.x - this.x * vec.z,
            this.x * vec.y - this.y * vec.x);
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
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateX_float = function(deg) {
    var vec = b9.Vector3D.vec1_;
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    vec.set(
            this.x,
            this.y * cos - this.z * sin,
            this.z * cos + this.y * sin);

    return this.set(vec);
};

/**
 * Rotates this vector around the orthonormal y-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateY_float = function(deg) {
    var vec = b9.Vector3D.vec1_;
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    vec.set(
            this.x * cos + this.z * sin,
            this.y,
            this.z * cos - this.x * sin);

    return this.set(vec);
};

/**
 * Rotates this vector around the orthonormal z-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateZ_float = function(deg) {
    var vec = b9.Vector3D.vec1_;
    var array = this.array_;
    var index = this.index_;
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    vec.set(
            this.x * cos - this.y * sin,
            this.y * cos + this.x * sin,
            this.z);

    return this.set(vec);
};

/**
 * Rotates this vector around the orthonormal x-axis.
 * This method allows only an integer angle, but is faster than the rotateX_float method.
 * @param {Number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateX_int = function(deg) {
    var vec = b9.Vector3D.vec1_;
    var array = this.array_;
    var index = this.index_;
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    vec.set(
            this.x,
            this.y * cos - this.z * sin,
            this.z * cos + this.y * sin);

    return this.set(vec);
};

/**
 * Rotates this vector around the orthonormal y-axis.
 * This method allows only an integer angle, but is faster than the rotateY_float method.
 * @param {Number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateY_int = function(deg) {
    var vec = b9.Vector3D.vec1_;
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    vec.set(
            this.x * cos + this.z * sin,
            this.y,
            this.z * cos - this.x * sin);

    return this.set(vec);
};

/**
 * Rotates this vector around the orthonormal z-axis.
 * This method allows only an integer angle, but is faster than the rotateZ_float method.
 * @param {Number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This vector.
 */
b9.Vector3D.prototype.rotateZ_int = function(deg) {
    var vec = b9.Vector3D.vec1_;
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    vec.set(
            this.x * cos - this.y * sin,
            this.y * cos + this.x * sin,
            this.z);

    return this.set(vec);
};

/**
 * Interpolates this vector to a vector by a ratio.
 * @param {b9.Vector3D} to A destination vector.
 * @param {Number} ratio The value which indicates how far to interpolate between the two vectors.
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

    vec.set(this).sub(mat.trans);

    return this.set(
            vec.dot(mat.xAxis) / mat.xAxis.sqNorm(),
            vec.dot(mat.yAxis) / mat.yAxis.sqNorm(),
            vec.dot(mat.zAxis) / mat.zAxis.sqNorm());
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

    vec1.set(mat.xAxis).mul(this.x);
    vec2.set(mat.yAxis).mul(this.y);
    vec3.set(mat.zAxis).mul(this.z);

    return this.set(vec1).add(vec2).add(vec3).add(mat.trans);
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
            this.dot(mat.xAxis) / mat.xAxis.sqNorm(),
            this.dot(mat.yAxis) / mat.yAxis.sqNorm(),
            this.dot(mat.zAxis) / mat.zAxis.sqNorm());

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

    vec1.set(mat.xAxis).mul(this.x);
    vec2.set(mat.yAxis).mul(this.y);
    vec3.set(mat.zAxis).mul(this.z);

    return this.set(vec1).add(vec2).add(vec3);
};

/**
 * Returns whether this vector equals a vector.
 * @param {b9.Vector3D} vec A vector.
 * @return {Boolean} true if the two vectors are equal; false otherwise.
 */
b9.Vector3D.prototype.equals = function(vec) {
    return (b9.Math.equals_float(this.x, vec.x) &&
            b9.Math.equals_float(this.y, vec.y) &&
            b9.Math.equals_float(this.z, vec.z));
};

/**
 * Returns a string representation of this vector.
 * @return {String} A string representation of this vector.
 */
b9.Vector3D.prototype.toString = function() {
    var str;

    str = "(";
    str += this.x;
    str += ", ";
    str += this.y;
    str += ", ";
    str += this.z;
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
