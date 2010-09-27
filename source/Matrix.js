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
 * @class A 3x4 matrix which is represented by four vectors.
 */
b9.Matrix = b9.createClass();

/**
 * Constructs a matrix.
 * The number of the arguments must be 0, 1, or 4.
 * @param {b9.Matrix|b9.Vector} [mat_or_x_axis] A matrix to be copied or an x-axis.
 * @param {b9.Vector} [y_axis] A y-axis.
 * @param {b9.Vector} [z_axis] A z-axis.
 * @param {b9.Vector} [trans] A translation.
 */
b9.Matrix.prototype.initialize = function(mat_or_x_axis, y_axis, z_axis, trans) {
    this._x_axis = new b9.Vector();
    this._y_axis = new b9.Vector();
    this._z_axis = new b9.Vector();
    this._trans = new b9.Vector();

    if (arguments.length === 4) {
        this._x_axis.set(mat_or_x_axis);
        this._y_axis.set(y_axis);
        this._z_axis.set(z_axis);
        this._trans.set(trans);
    } else if (arguments.length === 1) {
        this._x_axis.set(mat_or_x_axis._x_axis);
        this._y_axis.set(mat_or_x_axis._y_axis);
        this._z_axis.set(mat_or_x_axis._y_axis);
        this._trans.set(mat_or_x_axis._trans);
    }
};

/**
 * Returns the reference of the x-axis.
 * The number of the arguments must be 0, 1, or 4.
 * @return {b9.Vector} The reference of the x-axis.
 */
b9.Matrix.prototype.refXAxis = function() {
    return this._x_axis;
};

/**
 * Returns the reference of the y-axis.
 * @return {b9.Vector} The reference of the y-axis.
 */
b9.Matrix.prototype.refYAxis = function() {
    return this._y_axis;
};

/**
 * Returns the reference of the z-axis.
 * @return {b9.Vector} The reference of the z-axis.
 */
b9.Matrix.prototype.refZAxis = function() {
    return this._z_axis;
};

/**
 * Returns the reference of the translation.
 * @return {b9.Vector} The reference of the translation.
 */
b9.Matrix.prototype.refTrans = function() {
    return this._trans;
};

/**
 * Sets the all components to this matrix.
 * The number of the arguments must be 0, 1, or 4.
 * @param {b9.Matrix|b9.Vector} [mat_or_x_axis] A matrix to be copied or an x-axis.
 * @param {b9.Vector} [y_axis] A y-axis.
 * @param {b9.Vector} [z_axis] A z-axis.
 * @param {b9.Vector} [trans] A translation.
 * @return This matrix.
 */
b9.Matrix.prototype.set = function(mat_or_x_axis, y_axis, z_axis, trans) {
    if (arguments.length === 1) {
        this._x_axis.set(arg1._x_axis);
        this._y_axis.set(arg1._y_axis);
        this._trans.set(arg1._trans);
    } else if (arguments.length === 3) {
        this._x_axis.set(arg1);
        this._y_axis.set(arg2);
        this._trans.set(arg3);
    }

    return this;
};

/**
 * Orthonormalizes this matrix.
 * @return {b9.Matrix} This matrix.
 */
b9.Matrix.prototype.orthonormalize = function() {
    this._x_axis.normalize();
    this._y_axis.set(this._x_axis);
    this._y_axis.rotateInt(90);

    return this;
};

/**
 * Rotates this matrix around its x-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Matrix} This matrix.
 */
b9.Matrix.prototype.rotateX_float = function(deg) {
    // TODO
};

/**
 * Rotates this matrix around its y-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Matrix} This matrix.
 */
b9.Matrix.prototype.rotateY_float = function(deg) {
    // TODO
};

/**
 * Rotates this matrix around its z-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Matrix} This matrix.
 */
b9.Matrix.prototype.rotateZ_float = function(deg) {
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    // TODO
    b9.Matrix._mat1._x_axis.set(cos, sin);
    b9.Matrix._mat1._y_axis.set(-sin, cos);
    b9.Matrix._mat1._trans.set(b9.Vector.ZERO);

    return this.set(b9.Matrix._mat1.toGlobal(this));
};

/**
 * Rotates this matrix around its x-axis.
 * This method allows only an integer angle, but is faster than the rotateX_float method.
 * @param {Number} deg A integer angle in degrees.
 * @return {b9.Vector} This matrix.
 */
b9.Matrix.prototype.rotateX_int = function(deg) {
    // TODO
};

/**
 * Rotates this matrix around its y-axis.
 * This method allows only an integer angle, but is faster than the rotateY_float method.
 * @param {Number} deg A integer angle in degrees.
 * @return {b9.Vector} This matrix.
 */
b9.Matrix.prototype.rotateY_int = function(deg) {
    // TODO
};

/**
 * Rotates this matrix around its z-axis.
 * This method allows only an integer angle, but is faster than the rotateZ_float method.
 * @param {Number} deg A integer angle in degrees.
 * @return {b9.Vector} This matrix.
 */
b9.Matrix.prototype.rotateZ_int = function(deg) {
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    // TODO
    b9.Matrix._mat1._x_axis.set(cos, sin);
    b9.Matrix._mat1._y_axis.set(-sin, cos);
    b9.Matrix._mat1._trans.set(b9.Vector.ZERO);

    return this.set(b9.Matrix._mat1.toGlobal(this));
};

/**
 * Scales this matrix.
 * @param {Number} scale_x An x-axis scale factor.
 * @param {Number} scale_y A y-axis scale factor.
 * @param {Number} scale_z A z-axis scale factor.
 * @return {b9.Matrix} This matrix.
 */
b9.Matrix.prototype.scale = function(scale_x, scale_y, scale_z) {
    this._x_axis.mul(scale_x);
    this._y_axis.mul(scale_y);

    return this;
};

/**
 * Translates this matrix along its axes.
 * @param {Number} offset_x A length of translation along the x-axis.
 * @param {Number} offset_y A length of translation along the y-axis.
 * @param {Number} offset_z A length of translation along the z-axis.
 * @return {b9.Matrix} This matrix.
 */
b9.Matrix.prototype.translate = function(offset_x, offset_y, offset_z) {
    b9.Vector._vec1.set(this._x_axis).mul(offset_x);
    b9.Vector._vec2.set(this._y_axis).mul(offset_y);

    this._trans.add(b9.Vector._vec1).add(b9.Vector._vec2);

    return this;
};

/**
 * Interpolates this matrix to a matrix by a ratio, using spherical linear interpolation.
 * @param {Number} to A destination matrix.
 * @param {Number} ratio The value which indicates how far to interpolate between the two matrices.
 * @return {b9.Matrix} This matrix.
 */
b9.Matrix.prototype.slerp = function(to, ratio) {
    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        this.interpNoTrans(to, ratio);
        this._trans.interp(to._trans, ratio);
    }

    return this;
};

/**
 * Interpolates this matrix to a matrix by a ratio, using spherical linear interpolation.
 * However, unlike the slerp method, the translation of the matrix is ignored.
 * @param {Number} to A destination matrix.
 * @param {Number} ratio The value which indicates how far to interpolate between the two matrices.
 * @return {b9.Matrix} This matrix.
 */
b9.Matrix.prototype.slerp_noTrans = function(to, ratio) {
    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        var ang = b9.Math.acos(this._x_axis.dot(to._x_axis));

        if (this._y_axis.dot(to._x_axis) < 0.0) {
            ang = -ang;
        }

        this.rotateFloat(ang * ratio);
    }

    return this;
};

/**
 * Converts this matrix from in the world coordinate system to in the local coordinate system of a matrix.
 * @param {b9.Matrix} mat A matrix.
 * @return {b9.Matrix} This matrix.
 */
b9.Matrix.prototype.toLocal = function(mat) {
    var rsq_xa = 1.0 / mat._x_axis.sqNorm();
    var rsq_ya = 1.0 / mat._y_axis.sqNorm();

    b9.Vector._vec1.set(this._trans).sub(mat._trans);

    this._x_axis.set(this._x_axis.dot(mat._x_axis) * rsq_xa, this._x_axis.dot(mat._y_axis) * rsq_ya);
    this._y_axis.set(this._y_axis.dot(mat._x_axis) * rsq_xa, this._y_axis.dot(mat._y_axis) * rsq_ya);
    this._trans.set(b9.Vector._vec1.dot(mat._x_axis) * rsq_xa, b9.Vector._vec1.dot(mat._y_axis) * rsq_ya);

    return this;
};

/**
 * Converts this matrix from in the local coordinate system of a matrix to in the world coordinate system.
 * @param {b9.Matrix} mat A Matrix.
 * @return {b9.Matrix} This matrix.
 */
b9.Matrix.prototype.toGlobal = function(mat) {
    this._x_axis.toGlobalNoTrans(mat);
    this._y_axis.toGlobalNoTrans(mat);
    this._trans.toGlobal(mat);

    return this;
};

/**
 * Converts this matrix from in the world coordinate system to in the local coordinate system of a matrix.
 * However, unlike the toLocal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix} mat A matrix.
 * @return {b9.Matrix} This matrix.
 */
b9.Matrix.prototype.toLocal_noTrans = function(mat) {
    var rsq_xa = 1.0 / mat._x_axis.sqNorm();
    var rsq_ya = 1.0 / mat._y_axis.sqNorm();

    this._x_axis.set(this._x_axis.dot(mat._x_axis) * rsq_xa, this._x_axis.dot(mat._y_axis) * rsq_ya);
    this._y_axis.set(this._y_axis.dot(mat._x_axis) * rsq_xa, this._y_axis.dot(mat._y_axis) * rsq_ya);
    this._trans.set(b9.Vector.ZERO);

    return this;
};

/**
 * Converts this matrix from in the local coordinate system of a matrix to in the world coordinate system.
 * However, unlike the tGlobal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix} mat A Matrix.
 * @return {b9.Matrix} This matrix.
 */
b9.Matrix.prototype.toGlobal_noTrans = function(mat) {
    this._x_axis.toGlobalNoTrans(mat);
    this._y_axis.toGlobalNoTrans(mat);
    this._trans.set(b9.Vector.ZERO);

    return this;
};

/**
 * Builds the look-at matrix and sets to this matrix.
 * @param {b9.Vector} from The position of a camera.
 * @param {b9.Vector} to The position of a camera look-at target.
 * @param {b9.Vector} up The up direction of a camera.
 * @return {b9.Matrix} This matrix.
 */
b9.Matrix.prototype.lookAt = function(from, to, up) {
    this._y_axis.set(to).sub(from).normalize();
    this._x_axis.set(this._x_axis).rotateInt(-90);
    this._trans.set(from);

    return this;
};

/**
 * Returns whether this matrix equals a matrix.
 * @param {b9.Matrix} vec A matrix.
 * @return {Boolean} true if the two matrices are equal; false otherwise.
 */
b9.Matrix.prototype.equals = function(mat) {
    return (this._x_axis.equals(mat._x_axis) && this._y_axis.equals(mat._y_axis) && this._trans.equals(mat._trans));
};

/**
 * Returns a string representation of this matrix.
 * @return {String} A string representation of this matrix.
 */
b9.Matrix.prototype.toString = function() {
    var str = "(";
    str += this._x_axis.toString();
    str += ", ";
    str += this._y_axis.toString();
    str += ", ";
    str += this._trans.toString();
    str += ")";

    return str;
};

/**
 * The zero matrix.
 * @return {b9.Matrix}
 */
b9.Matrix.ZERO = new b9.Matrix(b9.Vector.ZERO, b9.Vector.ZERO, b9.Vector.ZERO);

/**
 * The unit matrix.
 * @return {b9.Matrix}
 */
b9.Matrix.UNIT = new b9.Matrix(b9.Vector.X_UNIT, b9.Vector.Y_UNIT, b9.Vector.ZERO);

b9.Vector._vec1 = new b9.Vector();
b9.Vector._vec2 = new b9.Vector();
b9.Matrix._mat1 = new b9.Matrix();
