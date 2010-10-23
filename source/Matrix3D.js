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
b9.Matrix3D = b9.createClass();

/**
 * Constructs a matrix.
 * The number of the arguments must be 0, 1, or 4.
 * @param {b9.Matrix3D|b9.Vector3D} [mat_or_x_axis] A matrix to be copied or an x-axis.
 * @param {b9.Vector3D} [y_axis] A y-axis.
 * @param {b9.Vector3D} [z_axis] A z-axis.
 * @param {b9.Vector3D} [trans] A translation.
 */
b9.Matrix3D.prototype.initialize = function(mat_or_x_axis, y_axis, z_axis, trans) {
    /**
     * The x-axis.
     * @return {b9.Vector3D}
     */
    this.x_axis = new b9.Vector3D();

    /**
     * The y-axis.
     * @return {b9.Vector3D}
     */
    this.y_axis = new b9.Vector3D();

    /**
     * The z-axis.
     * @return {b9.Vector3D}
     */
    this.z_axis = new b9.Vector3D();

    /**
     * The translation.
     * @return {b9.Vector3D}
     */
    this.trans = new b9.Vector3D();

    if (arguments.length === 1) {
        this.x_axis.set(mat_or_x_axis.x_axis);
        this.y_axis.set(mat_or_x_axis.y_axis);
        this.z_axis.set(mat_or_x_axis.z_axis);
        this.trans.set(mat_or_x_axis.trans);
    } else if (arguments.length === 4) {
        this.x_axis.set(mat_or_x_axis);
        this.y_axis.set(y_axis);
        this.z_axis.set(z_axis);
        this.trans.set(trans);
    }
};

/**
 * Sets the all components to this matrix.
 * The number of the arguments must be 1 or 4.
 * @param {b9.Matrix3D|b9.Vector3D} [mat_or_x_axis] A matrix to be copied or an x-axis.
 * @param {b9.Vector3D} [y_axis] A y-axis.
 * @param {b9.Vector3D} [z_axis] A z-axis.
 * @param {b9.Vector3D} [trans] A translation.
 * @return This matrix.
 */
b9.Matrix3D.prototype.set = function(mat_or_x_axis, y_axis, z_axis, trans) {
    if (arguments.length === 1) {
        this.x_axis.set(mat_or_x_axis.x_axis);
        this.y_axis.set(mat_or_x_axis.y_axis);
        this.z_axis.set(mat_or_x_axis.z_axis);
        this.trans.set(mat_or_x_axis.trans);
    } else if (arguments.length === 4) {
        this.x_axis.set(mat_or_x_axis);
        this.y_axis.set(y_axis);
        this.z_axis.set(z_axis);
        this.trans.set(trans);
    }

    return this;
};

/**
 * Builds the matrix from a quaternion and sets to this matrix.
 * @param {b9.Quaternion} quat A quaternion.
 * @return This matrix.
 */
b9.Matrix3D.prototype.fromQuaternion = function(quat) {
    var x2 = quat.x + quat.x;
    var y2 = quat.y + quat.y;
    var z2 = quat.z + quat.z;
    var wx2 = quat.w * x2;
    var wy2 = quat.w * y2;
    var wz2 = quat.w * z2;
    var xx2 = quat.x * x2;
    var xy2 = quat.x * y2;
    var xz2 = quat.x * z2;
    var yy2 = quat.y * y2;
    var yz2 = quat.y * z2;
    var zz2 = quat.z * z2;

    this.x_axis.set(1.0 - (yy2 + zz2), xy2 + wz2, xz2 - wy2);
    this.y_axis.set(xy2 - wz2, 1.0 - (xx2 + zz2), yz2 + wx2);
    this.z_axis.set(xz2 + wy2, yz2 - wx2, 1.0 - (xx2 + yy2));
    this.trans.set(b9.Vector3D.ZERO);

    return this;
};

/**
 * Orthonormalizes this matrix.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.orthonormalize = function() {
    b9.Matrix3D._vec3.set(this.z_axis).normalize();
    b9.Matrix3D._vec1.set(this.y_axis).cross(this.z_axis).normalize();
    b9.Matrix3D._vec2.set(b9.Matrix3D._vec3).cross(b9.Matrix3D._vec1);

    return this.set(b9.Matrix3D._vec1, b9.Matrix3D._vec2, b9.Matrix3D._vec3, this.trans);
};

/**
 * Rotates this matrix around its x-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.rotateX_float = function(deg) {
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    b9.Matrix3D._mat1.x_axis.set(b9.Vector3D.X_UNIT);
    b9.Matrix3D._mat1.y_axis.set(0.0, cos, sin);
    b9.Matrix3D._mat1.z_axis.set(0.0, -sin, cos);
    b9.Matrix3D._mat1.trans.set(b9.Vector3D.ZERO);
    b9.Matrix3D._mat1.toGlobal(this);

    return this.set(b9.Matrix3D._mat1);
};

/**
 * Rotates this matrix around its y-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.rotateY_float = function(deg) {
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    b9.Matrix3D._mat1.x_axis.set(cos, 0.0, -sin);
    b9.Matrix3D._mat1.y_axis.set(b9.Vector3D.Y_UNIT);
    b9.Matrix3D._mat1.z_axis.set(sin, 0.0, cos);
    b9.Matrix3D._mat1.trans.set(b9.Vector3D.ZERO);
    b9.Matrix3D._mat1.toGlobal(this);

    return this.set(b9.Matrix3D._mat1);
};

/**
 * Rotates this matrix around its z-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.rotateZ_float = function(deg) {
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    b9.Matrix3D._mat1.x_axis.set(cos, sin, 0.0);
    b9.Matrix3D._mat1.y_axis.set(-sin, cos, 0.0);
    b9.Matrix3D._mat1.z_axis.set(b9.Vector3D.Z_UNIT);
    b9.Matrix3D._mat1.trans.set(b9.Vector3D.ZERO);
    b9.Matrix3D._mat1.toGlobal(this);

    return this.set(b9.Matrix3D._mat1);
};

/**
 * Rotates this matrix around its x-axis.
 * This method allows only an integer angle, but is faster than the rotateX_float method.
 * @param {Number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This matrix.
 */
b9.Matrix3D.prototype.rotateX_int = function(deg) {
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    b9.Matrix3D._mat1.x_axis.set(b9.Vector3D.X_UNIT);
    b9.Matrix3D._mat1.y_axis.set(0.0, cos, sin);
    b9.Matrix3D._mat1.z_axis.set(0.0, -sin, cos);
    b9.Matrix3D._mat1.trans.set(b9.Vector3D.ZERO);
    b9.Matrix3D._mat1.toGlobal(this);

    return this.set(b9.Matrix3D._mat1);
};

/**
 * Rotates this matrix around its y-axis.
 * This method allows only an integer angle, but is faster than the rotateY_float method.
 * @param {Number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This matrix.
 */
b9.Matrix3D.prototype.rotateY_int = function(deg) {
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    b9.Matrix3D._mat1.x_axis.set(cos, 0.0, -sin);
    b9.Matrix3D._mat1.y_axis.set(b9.Vector3D.Y_UNIT);
    b9.Matrix3D._mat1.z_axis.set(sin, 0.0, cos);
    b9.Matrix3D._mat1.trans.set(b9.Vector3D.ZERO);
    b9.Matrix3D._mat1.toGlobal(this);

    return this.set(b9.Matrix3D._mat1);
};

/**
 * Rotates this matrix around its z-axis.
 * This method allows only an integer angle, but is faster than the rotateZ_float method.
 * @param {Number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This matrix.
 */
b9.Matrix3D.prototype.rotateZ_int = function(deg) {
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    b9.Matrix3D._mat1.x_axis.set(cos, sin, 0.0);
    b9.Matrix3D._mat1.y_axis.set(-sin, cos, 0.0);
    b9.Matrix3D._mat1.z_axis.set(b9.Vector3D.Z_UNIT);
    b9.Matrix3D._mat1.trans.set(b9.Vector3D.ZERO);
    b9.Matrix3D._mat1.toGlobal(this);

    return this.set(b9.Matrix3D._mat1);
};

/**
 * Scales this matrix.
 * @param {Number} scale_x An x-axis scale factor.
 * @param {Number} scale_y A y-axis scale factor.
 * @param {Number} scale_z A z-axis scale factor.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.scale = function(scale_x, scale_y, scale_z) {
    this.x_axis.mul(scale_x);
    this.y_axis.mul(scale_y);
    this.z_axis.mul(scale_z);

    return this;
};

/**
 * Translates this matrix along its axes.
 * @param {Number} offset_x A length of translation along the x-axis.
 * @param {Number} offset_y A length of translation along the y-axis.
 * @param {Number} offset_z A length of translation along the z-axis.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.translate = function(offset_x, offset_y, offset_z) {
    b9.Matrix3D._vec1.set(this.x_axis).mul(offset_x);
    b9.Matrix3D._vec2.set(this.y_axis).mul(offset_y);
    b9.Matrix3D._vec3.set(this.z_axis).mul(offset_z);

    this.trans.add(b9.Matrix3D._vec1).add(b9.Matrix3D._vec2).add(b9.Matrix3D._vec3);

    return this;
};

/**
 * Interpolates this matrix to a matrix by a ratio, using spherical linear interpolation.
 * @param {Number} to A destination matrix.
 * @param {Number} ratio The value which indicates how far to interpolate between the two matrices.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.slerp = function(to, ratio) {
    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        b9.Matrix3D._quat1.fromMatrix3D(this);
        b9.Matrix3D._quat2.fromMatrix3D(to);
        b9.Matrix3D._vec1.set(this.trans).lerp(to.trans, ratio);

        this.fromQuaternion(b9.Matrix3D._quat1.slerp(b9.Matrix3D._quat2, ratio));
        this.trans.set(b9.Matrix3D._vec1);
    }

    return this;
};

/**
 * Interpolates this matrix to a matrix by a ratio, using spherical linear interpolation.
 * However, unlike the slerp method, the translation of this matrix is regarded as the zero vector.
 * @param {Number} to A destination matrix.
 * @param {Number} ratio The value which indicates how far to interpolate between the two matrices.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.slerp_noTrans = function(to, ratio) {
    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.x_axis.set(to.x_axis);
        this.y_axis.set(to.y_axis);
        this.z_axis.set(to.z_axis);
        this.trans.set(b9.Vector3D.ZERO);
    } else if (ratio >= b9.Math.EPSILON) {
        b9.Matrix3D._quat1.fromMatrix3D(this);
        b9.Matrix3D._quat2.fromMatrix3D(to);

        this.fromQuaternion(b9.Matrix3D._quat1.slerp(b9.Matrix3D._quat2, ratio));
    } else {
        this.trans.set(b9.Vector3D.ZERO);
    }

    return this;
};

/**
 * Converts this matrix from in the world coordinate system to in the local coordinate system of a matrix.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.toLocal = function(mat) {
    var rsq_xa = 1.0 / mat.x_axis.sqNorm();
    var rsq_ya = 1.0 / mat.y_axis.sqNorm();
    var rsq_za = 1.0 / mat.z_axis.sqNorm();

    b9.Matrix3D._vec1.set(this.trans).sub(mat.trans);

    this.x_axis.set(
            this.x_axis.dot(mat.x_axis) * rsq_xa,
            this.x_axis.dot(mat.y_axis) * rsq_ya,
            this.x_axis.dot(mat.z_axis) * rsq_za);

    this.y_axis.set(
            this.y_axis.dot(mat.x_axis) * rsq_xa,
            this.y_axis.dot(mat.y_axis) * rsq_ya,
            this.y_axis.dot(mat.z_axis) * rsq_za);

    this.z_axis.set(
            this.z_axis.dot(mat.x_axis) * rsq_xa,
            this.z_axis.dot(mat.y_axis) * rsq_ya,
            this.z_axis.dot(mat.z_axis) * rsq_za);

    this.trans.set(
            b9.Matrix3D._vec1.dot(mat.x_axis) * rsq_xa,
            b9.Matrix3D._vec1.dot(mat.y_axis) * rsq_ya,
            b9.Matrix3D._vec1.dot(mat.z_axis) * rsq_za);

    return this;
};

/**
 * Converts this matrix from in the local coordinate system of a matrix to in the world coordinate system.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.toGlobal = function(mat) {
    this.x_axis.toGlobal_noTrans(mat);
    this.y_axis.toGlobal_noTrans(mat);
    this.z_axis.toGlobal_noTrans(mat);
    this.trans.toGlobal(mat);

    return this;
};

/**
 * Converts this matrix from in the world coordinate system to in the local coordinate system of a matrix.
 * However, unlike the toLocal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.toLocal_noTrans = function(mat) {
    var rsq_xa = 1.0 / mat.x_axis.sqNorm();
    var rsq_ya = 1.0 / mat.y_axis.sqNorm();
    var rsq_za = 1.0 / mat.z_axis.sqNorm();

    this.x_axis.set(
            this.x_axis.dot(mat.x_axis) * rsq_xa,
            this.x_axis.dot(mat.y_axis) * rsq_ya,
            this.x_axis.dot(mat.z_axis) * rsq_za);

    this.y_axis.set(
            this.y_axis.dot(mat.x_axis) * rsq_xa,
            this.y_axis.dot(mat.y_axis) * rsq_ya,
            this.y_axis.dot(mat.z_axis) * rsq_za);

    this.z_axis.set(
            this.z_axis.dot(mat.x_axis) * rsq_xa,
            this.z_axis.dot(mat.y_axis) * rsq_ya,
            this.z_axis.dot(mat.z_axis) * rsq_za);

    this.trans.set(b9.Vector3D.ZERO);

    return this;
};

/**
 * Converts this matrix from in the local coordinate system of a matrix to in the world coordinate system.
 * However, unlike the tGlobal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix3D} mat A Matrix3D.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.toGlobal_noTrans = function(mat) {
    this.x_axis.toGlobal_noTrans(mat);
    this.y_axis.toGlobal_noTrans(mat);
    this.z_axis.toGlobal_noTrans(mat);
    this.trans.set(b9.Vector3D.ZERO);

    return this;
};

/**
 * Builds the look-at matrix and sets to this matrix.
 * @param {b9.Vector3D} from The position of a camera.
 * @param {b9.Vector3D} to The position of a camera look-at target.
 * @param {b9.Vector3D} up The up direction of a camera.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.lookAt = function(from, to, up) {
    this.z_axis.set(from).sub(to).normalize();
    this.x_axis.set(up).cross(this.z_axis).normalize();
    this.y_axis.set(this.z_axis).cross(this.x_axis);
    this.trans.set(from);

    return this;
};

/**
 * Returns whether this matrix equals a matrix.
 * @param {b9.Matrix3D} vec A matrix.
 * @return {Boolean} true if the two matrices are equal; false otherwise.
 */
b9.Matrix3D.prototype.equals = function(mat) {
    return (this.x_axis.equals(mat.x_axis) &&
            this.y_axis.equals(mat.y_axis) &&
            this.z_axis.equals(mat.z_axis) &&
            this.trans.equals(mat.trans));
};

/**
 * Returns a string representation of this matrix.
 * @return {String} A string representation of this matrix.
 */
b9.Matrix3D.prototype.toString = function() {
    var str = "(";
    str += this.x_axis.toString();
    str += ", ";
    str += this.y_axis.toString();
    str += ", ";
    str += this.z_axis.toString();
    str += ", ";
    str += this.trans.toString();
    str += ")";

    return str;
};

/**
 * The unit matrix.
 * @return {b9.Matrix3D}
 */
b9.Matrix3D.UNIT = new b9.Matrix3D(b9.Vector3D.X_UNIT, b9.Vector3D.Y_UNIT, b9.Vector3D.Z_UNIT, b9.Vector3D.ZERO);

b9.Matrix3D._vec1 = new b9.Vector3D();
b9.Matrix3D._vec2 = new b9.Vector3D();
b9.Matrix3D._vec3 = new b9.Vector3D();
b9.Matrix3D._mat1 = new b9.Matrix3D();
// _quat1 and _quat2 are defined in Quaternion.js
