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
 * <li>b9.Matrix3D()</li>
 * <li>b9.Matrix3D(b9.Matrix3D matrix_to_be_cloned)</li>
 * <li>b9.Matrix3D(Float32Array array_to_be_referenced, int array_index_of_first_component)</li>
 * <li>b9.Matrix3D(b9.Vector3D x_axis, b9.Vector3D y_axis, b9.Vector3D z_axis, b9.Vector3D trans)</li>
 * </ul>
 *
 * @class A 3x4 matrix which is represented by four vectors.
 *
 * @param {b9.Matrix3D|Float32Array|b9.Vector3D} [mat_or_array_or_x_axis]
 * A matrix to be cloned, an array to be referenced, or an x-axis.
 * @param {Number|b9.Vector3D} [index_or_y_axis] The array index of the first component, or a y-axis.
 * @param {b9.Vector3D} [z_axis] A z-axis.
 * @param {b9.Vector3D} [trans] A translation.
 */
b9.Matrix3D = b9.createClass();

/**
 * @ignore
 */
b9.Matrix3D.prototype.initialize = function(mat_or_array_or_x_axis, index_or_y_axis, z_axis, trans) {
    var array = this._array = (arguments.length === 2) ? mat_or_array_or_x_axis : new Float32Array(16);
    var index = this._index = (arguments.length === 2) ? index_or_y_axis : 0;
    var mat_array, mat_index;
    var i;

    this._x_axis = new b9.Vector3D(array, index);
    this._y_axis = new b9.Vector3D(array, index + 4);
    this._z_axis = new b9.Vector3D(array, index + 8);
    this._trans = new b9.Vector3D(array, index + 12);

    if (arguments.length === 0) {
        array[index + 3] = 0.0;
        array[index + 7] = 0.0;
        array[index + 11] = 0.0;
        array[index + 15] = 1.0;
    } else if (arguments.length === 1) {
        mat_array = mat_or_array_or_x_axis._array;
        mat_index = mat_or_array_or_x_axis._index;

        for (i = 0; i < 16; i++) {
            array[index + i] = mat_array[mat_index + i];
        }
    } else if (arguments.length === 4) {
        this._x_axis.set(mat_or_array_or_x_axis);
        this._y_axis.set(index_or_y_axis);
        this._z_axis.set(z_axis);
        this._trans.set(trans);

        array[index + 3] = 0.0;
        array[index + 7] = 0.0;
        array[index + 11] = 0.0;
        array[index + 15] = 1.0;
    }
};

/**
 * Returns the array of this matrix.
 * @return The array of this matrix.
 */
b9.Matrix3D.prototype.getArray = function() {
    return this._array;
};

/**
 * Returns the array index of the first component.
 * @return The array index of the first component.
 */
b9.Matrix3D.prototype.getIndex = function() {
    return this._index;
};

/**
 * Returns the x-axis of this matrix.
 * @return The x-axis.
 */
b9.Matrix3D.prototype.getXAxis = function() {
    return this._x_axis;
};

/**
 * Returns the y-axis of this matrix.
 * @return The y-axis.
 */
b9.Matrix3D.prototype.getYAxis = function() {
    return this._y_axis;
};

/**
 * Returns the z-axis of this matrix.
 * @return The z-axis.
 */
b9.Matrix3D.prototype.getZAxis = function() {
    return this._z_axis;
};

/**
 * Returns the translation of this matrix.
 * @return The translation.
 */
b9.Matrix3D.prototype.getTrans = function() {
    return this._trans;
};

/**
 * Sets all of the components to this matrix. The following forms are allowed:
 * <ul>
 * <li>set(b9.Matrix3D matrix_to_be_cloned)</li>
 * <li>set(b9.Vector3D x_axis, b9.Vector3D y_axis, b9.Vector3D z_axis, b9.Vector3D trans)</li>
 * </ul>
 * @param {b9.Matrix3D|b9.Vector3D} [mat_or_x_axis] A matrix to be cloned or an x-axis.
 * @param {b9.Vector3D} [y_axis] A y-axis.
 * @param {b9.Vector3D} [z_axis] A z-axis.
 * @param {b9.Vector3D} [trans] A translation.
 * @return This matrix.
 */
b9.Matrix3D.prototype.set = function(mat_or_x_axis, y_axis, z_axis, trans) {
    var array, index;
    var mat_array, mat_index;
    var i;

    if (arguments.length === 1) {
        array = this._array;
        index = this._index;
        mat_array = mat_or_x_axis._array;
        mat_index = mat_or_x_axis._index;

        for (i = 0; i < 16; i++) {
            array[index + i] = mat_array[mat_index + i];
        }
    } else if (arguments.length === 4) {
        this._x_axis.set(mat_or_x_axis);
        this._y_axis.set(y_axis);
        this._z_axis.set(z_axis);
        this._trans.set(trans);
    }

    return this;
};

/**
 * Builds the matrix from a quaternion and sets to this matrix.
 * @param {b9.Quaternion} quat A quaternion.
 * @return This matrix.
 */
b9.Matrix3D.prototype.fromQuaternion = function(quat) {
    var quat_x = quat.getX();
    var quat_y = quat.getY();
    var quat_z = quat.getZ();
    var quat_w = quat.getW();

    var x2 = quat_x + quat_x;
    var y2 = quat_y + quat_y;
    var z2 = quat_z + quat_z;

    var wx2 = quat_w * x2;
    var wy2 = quat_w * y2;
    var wz2 = quat_w * z2;
    var xx2 = quat_x * x2;
    var xy2 = quat_x * y2;
    var xz2 = quat_x * z2;
    var yy2 = quat_y * y2;
    var yz2 = quat_y * z2;
    var zz2 = quat_z * z2;

    this._x_axis.set(1.0 - (yy2 + zz2), xy2 + wz2, xz2 - wy2);
    this._y_axis.set(xy2 - wz2, 1.0 - (xx2 + zz2), yz2 + wx2);
    this._z_axis.set(xz2 + wy2, yz2 - wx2, 1.0 - (xx2 + yy2));
    this._trans.set(b9.Vector3D.ZERO);

    return this;
};

/**
 * Orthonormalizes this matrix.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.orthonormalize = function() {
    b9.Matrix3D._vec3.set(this._z_axis).normalize();
    b9.Matrix3D._vec1.set(this._y_axis).cross(this._z_axis).normalize();
    b9.Matrix3D._vec2.set(b9.Matrix3D._vec3).cross(b9.Matrix3D._vec1);

    return this.set(b9.Matrix3D._vec1, b9.Matrix3D._vec2, b9.Matrix3D._vec3, this._trans);
};

/**
 * Rotates this matrix around its x-axis.
 * @param {Number} deg A float angle in degrees.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.rotateX_float = function(deg) {
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    b9.Matrix3D._mat1._x_axis.set(b9.Vector3D.X_UNIT);
    b9.Matrix3D._mat1._y_axis.set(0.0, cos, sin);
    b9.Matrix3D._mat1._z_axis.set(0.0, -sin, cos);
    b9.Matrix3D._mat1._trans.set(b9.Vector3D.ZERO);
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

    b9.Matrix3D._mat1._x_axis.set(cos, 0.0, -sin);
    b9.Matrix3D._mat1._y_axis.set(b9.Vector3D.Y_UNIT);
    b9.Matrix3D._mat1._z_axis.set(sin, 0.0, cos);
    b9.Matrix3D._mat1._trans.set(b9.Vector3D.ZERO);
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

    b9.Matrix3D._mat1._x_axis.set(cos, sin, 0.0);
    b9.Matrix3D._mat1._y_axis.set(-sin, cos, 0.0);
    b9.Matrix3D._mat1._z_axis.set(b9.Vector3D.Z_UNIT);
    b9.Matrix3D._mat1._trans.set(b9.Vector3D.ZERO);
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

    b9.Matrix3D._mat1._x_axis.set(b9.Vector3D.X_UNIT);
    b9.Matrix3D._mat1._y_axis.set(0.0, cos, sin);
    b9.Matrix3D._mat1._z_axis.set(0.0, -sin, cos);
    b9.Matrix3D._mat1._trans.set(b9.Vector3D.ZERO);
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

    b9.Matrix3D._mat1._x_axis.set(cos, 0.0, -sin);
    b9.Matrix3D._mat1._y_axis.set(b9.Vector3D.Y_UNIT);
    b9.Matrix3D._mat1._z_axis.set(sin, 0.0, cos);
    b9.Matrix3D._mat1._trans.set(b9.Vector3D.ZERO);
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

    b9.Matrix3D._mat1._x_axis.set(cos, sin, 0.0);
    b9.Matrix3D._mat1._y_axis.set(-sin, cos, 0.0);
    b9.Matrix3D._mat1._z_axis.set(b9.Vector3D.Z_UNIT);
    b9.Matrix3D._mat1._trans.set(b9.Vector3D.ZERO);
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
    this._x_axis.mul(scale_x);
    this._y_axis.mul(scale_y);
    this._z_axis.mul(scale_z);

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
    b9.Matrix3D._vec1.set(this._x_axis).mul(offset_x);
    b9.Matrix3D._vec2.set(this._y_axis).mul(offset_y);
    b9.Matrix3D._vec3.set(this._z_axis).mul(offset_z);

    this._trans.add(b9.Matrix3D._vec1).add(b9.Matrix3D._vec2).add(b9.Matrix3D._vec3);

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
        b9.Matrix3D._vec1.set(this._trans).lerp(to._trans, ratio);

        this.fromQuaternion(b9.Matrix3D._quat1.slerp(b9.Matrix3D._quat2, ratio));
        this._trans.set(b9.Matrix3D._vec1);
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
        this._x_axis.set(to._x_axis);
        this._y_axis.set(to._y_axis);
        this._z_axis.set(to._z_axis);
        this._trans.set(b9.Vector3D.ZERO);
    } else if (ratio >= b9.Math.EPSILON) {
        b9.Matrix3D._quat1.fromMatrix3D(this);
        b9.Matrix3D._quat2.fromMatrix3D(to);

        this.fromQuaternion(b9.Matrix3D._quat1.slerp(b9.Matrix3D._quat2, ratio));
    } else {
        this._trans.set(b9.Vector3D.ZERO);
    }

    return this;
};

/**
 * Converts this matrix from in the world coordinate system to in the local coordinate system of a matrix.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.toLocal = function(mat) {
    var rsq_xa = 1.0 / mat._x_axis.sqNorm();
    var rsq_ya = 1.0 / mat._y_axis.sqNorm();
    var rsq_za = 1.0 / mat._z_axis.sqNorm();

    b9.Matrix3D._vec1.set(this._trans).sub(mat._trans);

    this._x_axis.set(
            this._x_axis.dot(mat._x_axis) * rsq_xa,
            this._x_axis.dot(mat._y_axis) * rsq_ya,
            this._x_axis.dot(mat._z_axis) * rsq_za);

    this._y_axis.set(
            this._y_axis.dot(mat._x_axis) * rsq_xa,
            this._y_axis.dot(mat._y_axis) * rsq_ya,
            this._y_axis.dot(mat._z_axis) * rsq_za);

    this._z_axis.set(
            this._z_axis.dot(mat._x_axis) * rsq_xa,
            this._z_axis.dot(mat._y_axis) * rsq_ya,
            this._z_axis.dot(mat._z_axis) * rsq_za);

    this._trans.set(
            b9.Matrix3D._vec1.dot(mat._x_axis) * rsq_xa,
            b9.Matrix3D._vec1.dot(mat._y_axis) * rsq_ya,
            b9.Matrix3D._vec1.dot(mat._z_axis) * rsq_za);

    return this;
};

/**
 * Converts this matrix from in the local coordinate system of a matrix to in the world coordinate system.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.toGlobal = function(mat) {
    this._x_axis.toGlobal_noTrans(mat);
    this._y_axis.toGlobal_noTrans(mat);
    this._z_axis.toGlobal_noTrans(mat);
    this._trans.toGlobal(mat);

    return this;
};

/**
 * Converts this matrix from in the world coordinate system to in the local coordinate system of a matrix.
 * However, unlike the toLocal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.toLocal_noTrans = function(mat) {
    var rsq_xa = 1.0 / mat._x_axis.sqNorm();
    var rsq_ya = 1.0 / mat._y_axis.sqNorm();
    var rsq_za = 1.0 / mat._z_axis.sqNorm();

    this._x_axis.set(
            this._x_axis.dot(mat._x_axis) * rsq_xa,
            this._x_axis.dot(mat._y_axis) * rsq_ya,
            this._x_axis.dot(mat._z_axis) * rsq_za);

    this._y_axis.set(
            this._y_axis.dot(mat._x_axis) * rsq_xa,
            this._y_axis.dot(mat._y_axis) * rsq_ya,
            this._y_axis.dot(mat._z_axis) * rsq_za);

    this._z_axis.set(
            this._z_axis.dot(mat._x_axis) * rsq_xa,
            this._z_axis.dot(mat._y_axis) * rsq_ya,
            this._z_axis.dot(mat._z_axis) * rsq_za);

    this._trans.set(b9.Vector3D.ZERO);

    return this;
};

/**
 * Converts this matrix from in the local coordinate system of a matrix to in the world coordinate system.
 * However, unlike the tGlobal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix3D} mat A Matrix3D.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.toGlobal_noTrans = function(mat) {
    this._x_axis.toGlobal_noTrans(mat);
    this._y_axis.toGlobal_noTrans(mat);
    this._z_axis.toGlobal_noTrans(mat);
    this._trans.set(b9.Vector3D.ZERO);

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
    this._z_axis.set(from).sub(to).normalize();
    this._x_axis.set(up).cross(this._z_axis).normalize();
    this._y_axis.set(this._z_axis).cross(this._x_axis);
    this._trans.set(from);

    return this;
};

/**
 * Returns whether this matrix equals a matrix.
 * @param {b9.Matrix3D} vec A matrix.
 * @return {Boolean} true if the two matrices are equal; false otherwise.
 */
b9.Matrix3D.prototype.equals = function(mat) {
    var array = this._array;
    var index = this._index;
    var mat_array = mat._array;
    var mat_index = mat._index;
    var i;

    for (i = 0; i < 16; i++) {
        if (!b9.Math.equals_float(array[index + i], mat_array[mat_index + i])) {
            return false;
        }
    }

    return true;
};

/**
 * Returns a string representation of this matrix.
 * @return {String} A string representation of this matrix.
 */
b9.Matrix3D.prototype.toString = function() {
    var str = "(";
    str += this._x_axis.toString();
    str += ", ";
    str += this._y_axis.toString();
    str += ", ";
    str += this._z_axis.toString();
    str += ", ";
    str += this._trans.toString();
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
