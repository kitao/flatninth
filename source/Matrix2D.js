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
 * Constructs a matrix. The following forms are allowed:
 * <ul>
 * <li>b9.Matrix2D()</li>
 * <li>b9.Matrix2D(b9.Matrix2D matrix_to_be_cloned)</li>
 * <li>b9.Matrix2D(b9.Vector2D x_axis, b9.Vector2D y_axis, b9.Vector2D trans)</li>
 * </ul>
 *
 * @class A 2x3 matrix which is represented by four vectors.
 *
 * @param {b9.Matrix2D|b9.Vector2D} [mat_or_x_axis] A matrix to be cloned or an x-axis.
 * @param {b9.Vector2D} [y_axis] A y-axis.
 * @param {b9.Vector2D} [trans] A translation.
 */
b9.Matrix2D = b9.createClass();

/**
 * @ignore
 */
b9.Matrix2D.prototype.initialize = function(mat_or_x_axis, y_axis, trans) {
    /**
     * The x-axis.
     * @return {b9.Vector2D}
     */
    this.x_axis = new b9.Vector2D();

    /**
     * The y-axis.
     * @return {b9.Vector2D}
     */
    this.y_axis = new b9.Vector2D();

    /**
     * The translation.
     * @return {b9.Vector2D}
     */
    this.trans = new b9.Vector2D();

    if (arguments.length === 1) {
        this.x_axis.set(mat_or_x_axis.x_axis);
        this.y_axis.set(mat_or_x_axis.y_axis);
        this.trans.set(mat_or_x_axis.trans);
    } else if (arguments.length === 3) {
        this.x_axis.set(mat_or_x_axis);
        this.y_axis.set(y_axis);
        this.trans.set(trans);
    }
};

/**
 * Sets all of the components to this matrix. The following forms are allowed:
 * <ul>
 * <li>set(b9.Matrix2D matrix_to_be_cloned)</li>
 * <li>set(b9.Vector2D x_axis, b9.Vector2D y_axis, b9.Vector2D trans)</li>
 * </ul>
 * @param {b9.Matrix2D|b9.Vector2D} [mat_or_x_axis] A matrix to be cloned or an x-axis.
 * @param {b9.Vector2D} [y_axis] A y-axis.
 * @param {b9.Vector2D} [trans] A translation.
 * @return This matrix.
 */
b9.Matrix2D.prototype.set = function(mat_or_x_axis, y_axis, trans) {
    if (arguments.length === 1) {
        this.x_axis.set(mat_or_x_axis.x_axis);
        this.y_axis.set(mat_or_x_axis.y_axis);
        this.trans.set(mat_or_x_axis.trans);
    } else if (arguments.length === 3) {
        this.x_axis.set(mat_or_x_axis);
        this.y_axis.set(y_axis);
        this.trans.set(trans);
    }

    return this;
};

/**
 * Orthonormalizes this matrix.
 * @return {b9.Matrix2D} This matrix.
 */
b9.Matrix2D.prototype.orthonormalize = function() {
    this.x_axis.normalize();
    this.y_axis.set(this.x_axis).rotate_int(90);

    return this;
};

/**
 * Rotates this matrix.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Matrix2D} This matrix.
 */
b9.Matrix2D.prototype.rotate_float = function(deg) {
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    b9.Matrix2D._mat1.x_axis.set(cos, sin);
    b9.Matrix2D._mat1.y_axis.set(-sin, cos);
    b9.Matrix2D._mat1.trans.set(b9.Vector2D.ZERO);
    b9.Matrix2D._mat1.toGlobal(this);

    return this.set(b9.Matrix2D._mat1);
};

/**
 * Rotates this matrix.
 * This method allows only an integer angle, but is faster than the rotate_float method.
 * @param {Number} deg An integer angle in degrees.
 * @return {b9.Vector2D} This matrix.
 */
b9.Matrix2D.prototype.rotate_int = function(deg) {
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    b9.Matrix2D._mat1.x_axis.set(cos, sin);
    b9.Matrix2D._mat1.y_axis.set(-sin, cos);
    b9.Matrix2D._mat1.trans.set(b9.Vector2D.ZERO);
    b9.Matrix2D._mat1.toGlobal(this);

    return this.set(b9.Matrix2D._mat1);
};

/**
 * Scales this matrix.
 * @param {Number} scale_x An x-axis scale factor.
 * @param {Number} scale_y A y-axis scale factor.
 * @return {b9.Matrix2D} This matrix.
 */
b9.Matrix2D.prototype.scale = function(scale_x, scale_y) {
    this.x_axis.mul(scale_x);
    this.y_axis.mul(scale_y);

    return this;
};

/**
 * Translates this matrix along its axes.
 * @param {Number} offset_x A length of translation along the x-axis.
 * @param {Number} offset_y A length of translation along the y-axis.
 * @return {b9.Matrix2D} This matrix.
 */
b9.Matrix2D.prototype.translate = function(offset_x, offset_y) {
    b9.Matrix2D._vec1.set(this.x_axis).mul(offset_x);
    b9.Matrix2D._vec2.set(this.y_axis).mul(offset_y);

    this.trans.add(b9.Matrix2D._vec1).add(b9.Matrix2D._vec2);

    return this;
};

/**
 * Interpolates this matrix to a matrix by a ratio, using spherical linear interpolation.
 * @param {Number} to A destination matrix.
 * @param {Number} ratio The value which indicates how far to interpolate between the two matrices.
 * @return {b9.Matrix2D} This matrix.
 */
b9.Matrix2D.prototype.slerp = function(to, ratio) {
    var ang;

    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        ang = b9.Math.acos(this.x_axis.dot(to.x_axis));

        if (this.y_axis.dot(to.x_axis) < 0.0) {
            ang = -ang;
        }

        this.rotate_float(ang * ratio);
        this.trans.lerp(to.trans, ratio);
    }

    return this;
};

/**
 * Interpolates this matrix to a matrix by a ratio, using spherical linear interpolation.
 * However, unlike the slerp method, the translation of this matrix is regarded as the zero vector.
 * @param {Number} to A destination matrix.
 * @param {Number} ratio The value which indicates how far to interpolate between the two matrices.
 * @return {b9.Matrix2D} This matrix.
 */
b9.Matrix2D.prototype.slerp_noTrans = function(to, ratio) {
    var ang;

    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        ang = b9.Math.acos(this.x_axis.dot(to.x_axis));

        if (this.y_axis.dot(to.x_axis) < 0.0) {
            ang = -ang;
        }

        this.rotate_float(ang * ratio);
    }

    this.trans.set(b9.Vector2D.ZERO);

    return this;
};

/**
 * Converts this matrix from in the world coordinate system to in the local coordinate system of a matrix.
 * @param {b9.Matrix2D} mat A matrix.
 * @return {b9.Matrix2D} This matrix.
 */
b9.Matrix2D.prototype.toLocal = function(mat) {
    var rsq_xa = 1.0 / mat.x_axis.sqNorm();
    var rsq_ya = 1.0 / mat.y_axis.sqNorm();

    b9.Matrix2D._vec1.set(this.trans).sub(mat.trans);

    this.x_axis.set(
            this.x_axis.dot(mat.x_axis) * rsq_xa,
            this.x_axis.dot(mat.y_axis) * rsq_ya);

    this.y_axis.set(
            this.y_axis.dot(mat.x_axis) * rsq_xa,
            this.y_axis.dot(mat.y_axis) * rsq_ya);

    this.trans.set(
            b9.Matrix2D._vec1.dot(mat.x_axis) * rsq_xa,
            b9.Matrix2D._vec1.dot(mat.y_axis) * rsq_ya);

    return this;
};

/**
 * Converts this matrix from in the local coordinate system of a matrix to in the world coordinate system.
 * @param {b9.Matrix2D} mat A Matrix2D.
 * @return {b9.Matrix2D} This matrix.
 */
b9.Matrix2D.prototype.toGlobal = function(mat) {
    this.x_axis.toGlobal_noTrans(mat);
    this.y_axis.toGlobal_noTrans(mat);
    this.trans.toGlobal(mat);

    return this;
};

/**
 * Converts this matrix from in the world coordinate system to in the local coordinate system of a matrix.
 * However, unlike the toLocal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix2D} mat A matrix.
 * @return {b9.Matrix2D} This matrix.
 */
b9.Matrix2D.prototype.toLocal_noTrans = function(mat) {
    var rsq_xa = 1.0 / mat.x_axis.sqNorm();
    var rsq_ya = 1.0 / mat.y_axis.sqNorm();

    this.x_axis.set(
            this.x_axis.dot(mat.x_axis) * rsq_xa,
            this.x_axis.dot(mat.y_axis) * rsq_ya);

    this.y_axis.set(
            this.y_axis.dot(mat.x_axis) * rsq_xa,
            this.y_axis.dot(mat.y_axis) * rsq_ya);

    this.trans.set(b9.Vector2D.ZERO);

    return this;
};

/**
 * Converts this matrix from in the local coordinate system of a matrix to in the world coordinate system.
 * However, unlike the tGlobal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix2D} mat A Matrix.
 * @return {b9.Matrix2D} This matrix.
 */
b9.Matrix2D.prototype.toGlobal_noTrans = function(mat) {
    this.x_axis.toGlobal_noTrans(mat);
    this.y_axis.toGlobal_noTrans(mat);
    this.trans.set(b9.Vector2D.ZERO);

    return this;
};

/**
 * Returns whether this matrix equals a matrix.
 * @param {b9.Matrix2D} vec A matrix.
 * @return {Boolean} true if the two matrices are equal; false otherwise.
 */
b9.Matrix2D.prototype.equals = function(mat) {
    return (this.x_axis.equals(mat.x_axis) &&
            this.y_axis.equals(mat.y_axis) &&
            this.trans.equals(mat.trans));
};

/**
 * Returns a string representation of this matrix.
 * @return {String} A string representation of this matrix.
 */
b9.Matrix2D.prototype.toString = function() {
    var str = "(";
    str += this.x_axis.toString();
    str += ", ";
    str += this.y_axis.toString();
    str += ", ";
    str += this.trans.toString();
    str += ")";

    return str;
};

/**
 * The unit matrix.
 * @return {b9.Matrix2D}
 */
b9.Matrix2D.UNIT = new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.ZERO);

b9.Matrix2D._vec1 = new b9.Vector2D();
b9.Matrix2D._vec2 = new b9.Vector2D();
b9.Matrix2D._mat1 = new b9.Matrix2D();
