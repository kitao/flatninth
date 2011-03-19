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
 * Constructs a matrix. The following forms are allowed:
 * <ul>
 * <li>b9.Matrix3D()</li>
 * <li>b9.Matrix3D(b9.Matrix3D matrixToBeCloned)</li>
 * <li>b9.Matrix3D(b9.Vector3D xAxis, b9.Vector3D yAxis, b9.Vector3D zAxis, b9.Vector3D trans)</li>
 * </ul>
 *
 * @class A 4x4 matrix which is represented by four vectors.
 *
 * @param {b9.Matrix3D|b9.Vector3D} [arg1] A matrix to be cloned or an x-axis.
 * @param {b9.Vector3D} [arg2] A y-axis.
 * @param {b9.Vector3D} [arg3] A z-axis.
 * @param {b9.Vector3D} [arg4] A translation.
 */
b9.Matrix3D = b9.createClass();

/**
 * @ignore
 */
b9.Matrix3D.prototype.initialize = function(arg1, arg2, arg3, arg4) {
    /**
     * The x-axis of this matrix.
     * @type {b9.Vector3D}
     */
    this.xAxis = new b9.Vector3D();

    /**
     * The y-axis of this matrix.
     * @type {b9.Vector3D}
     */
    this.yAxis = new b9.Vector3D();

    /**
     * The z-axis of this matrix.
     * @type {b9.Vector3D}
     */
    this.zAxis = new b9.Vector3D();

    /**
     * The translation of this matrix.
     * @type {b9.Vector3D}
     */
    this.trans = new b9.Vector3D();

    if (arguments.length === 1) {
        this.xAxis.set(arg1.xAxis);
        this.yAxis.set(arg1.yAxis);
        this.zAxis.set(arg1.zAxis);
        this.trans.set(arg1.trans);
    } else if (arguments.length === 4) {
        this.xAxis.set(arg1);
        this.yAxis.set(arg2);
        this.zAxis.set(arg3);
        this.trans.set(arg4);
    }
};

/**
 * Sets all of the components to this matrix. The following forms are allowed:
 * <ul>
 * <li>set(b9.Matrix3D matrixToBeCloned)</li>
 * <li>set(b9.Vector3D xAxis, b9.Vector3D yAxis, b9.Vector3D zAxis, b9.Vector3D trans)</li>
 * </ul>
 * @param {b9.Matrix3D|b9.Vector3D} [arg1] A matrix to be cloned or an x-axis.
 * @param {b9.Vector3D} [arg2] A y-axis.
 * @param {b9.Vector3D} [arg3] A z-axis.
 * @param {b9.Vector3D} [arg4] A translation.
 * @return This matrix.
 */
b9.Matrix3D.prototype.set = function(arg1, arg2, arg3, arg4) {
    if (arguments.length === 1) {
        this.xAxis.set(arg1.xAxis);
        this.yAxis.set(arg1.yAxis);
        this.zAxis.set(arg1.zAxis);
        this.trans.set(arg1.trans);
    } else if (arguments.length === 4) {
        this.xAxis.set(arg1);
        this.yAxis.set(arg2);
        this.zAxis.set(arg3);
        this.trans.set(arg4);
    }

    return this;
};

/**
 * Builds the matrix from a quaternion and sets to this matrix.
 * @param {b9.Quaternion} quat A quaternion.
 * @return This matrix.
 */
b9.Matrix3D.prototype.fromQuaternion = function(quat) {
    var quatX = quat.x;
    var quatY = quat.y;
    var quatZ = quat.z;
    var quatW = quat.w;

    var x2 = quatX + quatX;
    var y2 = quatY + quatY;
    var z2 = quatZ + quatZ;

    var wx2 = quatW * x2;
    var wy2 = quatW * y2;
    var wz2 = quatW * z2;
    var xx2 = quatX * x2;
    var xy2 = quatX * y2;
    var xz2 = quatX * z2;
    var yy2 = quatY * y2;
    var yz2 = quatY * z2;
    var zz2 = quatZ * z2;

    this.xAxis.set(1.0 - (yy2 + zz2), xy2 + wz2, xz2 - wy2);
    this.yAxis.set(xy2 - wz2, 1.0 - (xx2 + zz2), yz2 + wx2);
    this.zAxis.set(xz2 + wy2, yz2 - wx2, 1.0 - (xx2 + yy2));
    this.trans.set(b9.Vector3D.ZERO);

    return this;
};

/**
 * Orthonormalizes this matrix.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.orthonormalize = function() {
    var vec1 = b9.Matrix3D.vec1_;
    var vec2 = b9.Matrix3D.vec2_;
    var vec3 = b9.Matrix3D.vec3_;

    vec3.set(this.zAxis).normalize();
    vec1.set(this.yAxis).cross(this.zAxis).normalize();
    vec2.set(vec3).cross(vec1);

    return this.set(vec1, vec2, vec3, this.trans);
};

/**
 * Rotates this matrix around its x-axis.
 * @param {number} deg A float angle in degrees.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.rotateX_float = function(deg) {
    var mat = b9.Matrix3D.mat1_;
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    mat.xAxis.set(b9.Vector3D.X_UNIT);
    mat.yAxis.set(0.0, cos, sin);
    mat.zAxis.set(0.0, -sin, cos);
    mat.trans.set(b9.Vector3D.ZERO);
    mat.toGlobal(this);

    return this.set(mat);
};

/**
 * Rotates this matrix around its y-axis.
 * @param {number} deg A float angle in degrees.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.rotateY_float = function(deg) {
    var mat = b9.Matrix3D.mat1_;
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    mat.xAxis.set(cos, 0.0, -sin);
    mat.yAxis.set(b9.Vector3D.Y_UNIT);
    mat.zAxis.set(sin, 0.0, cos);
    mat.trans.set(b9.Vector3D.ZERO);
    mat.toGlobal(this);

    return this.set(mat);
};

/**
 * Rotates this matrix around its z-axis.
 * @param {number} deg A float angle in degrees.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.rotateZ_float = function(deg) {
    var mat = b9.Matrix3D.mat1_;
    var sin = b9.Math.sin_float(deg);
    var cos = b9.Math.cos_float(deg);

    mat.xAxis.set(cos, sin, 0.0);
    mat.yAxis.set(-sin, cos, 0.0);
    mat.zAxis.set(b9.Vector3D.Z_UNIT);
    mat.trans.set(b9.Vector3D.ZERO);
    mat.toGlobal(this);

    return this.set(mat);
};

/**
 * Rotates this matrix around its x-axis.
 * This method allows only an integer angle, but is faster than the rotateX_float method.
 * @param {number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This matrix.
 */
b9.Matrix3D.prototype.rotateX_int = function(deg) {
    var mat = b9.Matrix3D.mat1_;
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    mat.xAxis.set(b9.Vector3D.X_UNIT);
    mat.yAxis.set(0.0, cos, sin);
    mat.zAxis.set(0.0, -sin, cos);
    mat.trans.set(b9.Vector3D.ZERO);
    mat.toGlobal(this);

    return this.set(mat);
};

/**
 * Rotates this matrix around its y-axis.
 * This method allows only an integer angle, but is faster than the rotateY_float method.
 * @param {number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This matrix.
 */
b9.Matrix3D.prototype.rotateY_int = function(deg) {
    var mat = b9.Matrix3D.mat1_;
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    mat.xAxis.set(cos, 0.0, -sin);
    mat.yAxis.set(b9.Vector3D.Y_UNIT);
    mat.zAxis.set(sin, 0.0, cos);
    mat.trans.set(b9.Vector3D.ZERO);
    mat.toGlobal(this);

    return this.set(mat);
};

/**
 * Rotates this matrix around its z-axis.
 * This method allows only an integer angle, but is faster than the rotateZ_float method.
 * @param {number} deg An integer angle in degrees.
 * @return {b9.Vector3D} This matrix.
 */
b9.Matrix3D.prototype.rotateZ_int = function(deg) {
    var mat = b9.Matrix3D.mat1_;
    var sin = b9.Math.sin_int(deg);
    var cos = b9.Math.cos_int(deg);

    mat.xAxis.set(cos, sin, 0.0);
    mat.yAxis.set(-sin, cos, 0.0);
    mat.zAxis.set(b9.Vector3D.Z_UNIT);
    mat.trans.set(b9.Vector3D.ZERO);
    mat.toGlobal(this);

    return this.set(mat);
};

/**
 * Scales this matrix.
 * @param {number} scaleX An x-axis scale factor.
 * @param {number} scaleY A y-axis scale factor.
 * @param {number} scaleZ A z-axis scale factor.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.scale = function(scaleX, scaleY, scaleZ) {
    this.xAxis.mul(scaleX);
    this.yAxis.mul(scaleY);
    this.zAxis.mul(scaleZ);

    return this;
};

/**
 * Translates this matrix along its axes.
 * @param {number} offsetX A length of translation along the x-axis.
 * @param {number} offsetY A length of translation along the y-axis.
 * @param {number} offsetZ A length of translation along the z-axis.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.translate = function(offsetX, offsetY, offsetZ) {
    var vec1 = b9.Matrix3D.vec1_;
    var vec2 = b9.Matrix3D.vec2_;
    var vec3 = b9.Matrix3D.vec3_;

    vec1.set(this.xAxis).mul(offsetX);
    vec2.set(this.yAxis).mul(offsetY);
    vec3.set(this.zAxis).mul(offsetZ);

    this.trans.add(vec1).add(vec2).add(vec3);

    return this;
};

/**
 * Interpolates this matrix to a matrix by a ratio, using spherical linear interpolation.
 * @param {number} to A destination matrix.
 * @param {number} ratio The value which indicates how far to interpolate between the two matrices.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.slerp = function(to, ratio) {
    var vec;
    var quat1, quat2;

    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        vec = b9.Matrix3D.vec1_;
        quat1 = b9.Matrix3D.quat1_;
        quat2 = b9.Matrix3D.quat2_;

        quat1.fromMatrix3D(this);
        quat2.fromMatrix3D(to);
        vec.set(this.trans).lerp(to.trans, ratio);

        this.fromQuaternion(quat1.slerp(quat2, ratio));
        this.trans.set(vec);
    }

    return this;
};

/**
 * Interpolates this matrix to a matrix by a ratio, using spherical linear interpolation.
 * However, unlike the slerp method, the translation of this matrix is regarded as the zero vector.
 * @param {number} to A destination matrix.
 * @param {number} ratio The value which indicates how far to interpolate between the two matrices.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.slerp_noTrans = function(to, ratio) {
    var quat1, quat2;

    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.xAxis.set(to.xAxis);
        this.yAxis.set(to.yAxis);
        this.zAxis.set(to.zAxis);
        this.trans.set(b9.Vector3D.ZERO);
    } else if (ratio >= b9.Math.EPSILON) {
        quat1 = b9.Matrix3D.quat1_;
        quat2 = b9.Matrix3D.quat2_;

        quat1.fromMatrix3D(this);
        quat2.fromMatrix3D(to);

        this.fromQuaternion(quat1.slerp(quat2, ratio));
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
    var vec = b9.Matrix3D.vec1_;
    var rsqXA = 1.0 / mat.xAxis.sqNorm();
    var rsqYA = 1.0 / mat.yAxis.sqNorm();
    var rsqZA = 1.0 / mat.zAxis.sqNorm();

    vec.set(this.trans).sub(mat.trans);

    this.xAxis.set(
            this.xAxis.dot(mat.xAxis) * rsqXA,
            this.xAxis.dot(mat.yAxis) * rsqYA,
            this.xAxis.dot(mat.zAxis) * rsqZA);

    this.yAxis.set(
            this.yAxis.dot(mat.xAxis) * rsqXA,
            this.yAxis.dot(mat.yAxis) * rsqYA,
            this.yAxis.dot(mat.zAxis) * rsqZA);

    this.zAxis.set(
            this.zAxis.dot(mat.xAxis) * rsqXA,
            this.zAxis.dot(mat.yAxis) * rsqYA,
            this.zAxis.dot(mat.zAxis) * rsqZA);

    this.trans.set(
            vec.dot(mat.xAxis) * rsqXA,
            vec.dot(mat.yAxis) * rsqYA,
            vec.dot(mat.zAxis) * rsqZA);

    return this;
};

/**
 * Converts this matrix from in the local coordinate system of a matrix to in the world coordinate system.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.toGlobal = function(mat) {
    this.xAxis.toGlobal_noTrans(mat);
    this.yAxis.toGlobal_noTrans(mat);
    this.zAxis.toGlobal_noTrans(mat);
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
    var rsqXA = 1.0 / mat.xAxis.sqNorm();
    var rsqYA = 1.0 / mat.yAxis.sqNorm();
    var rsqZA = 1.0 / mat.zAxis.sqNorm();

    this.xAxis.set(
            this.xAxis.dot(mat.xAxis) * rsqXA,
            this.xAxis.dot(mat.yAxis) * rsqYA,
            this.xAxis.dot(mat.zAxis) * rsqZA);

    this.yAxis.set(
            this.yAxis.dot(mat.xAxis) * rsqXA,
            this.yAxis.dot(mat.yAxis) * rsqYA,
            this.yAxis.dot(mat.zAxis) * rsqZA);

    this.zAxis.set(
            this.zAxis.dot(mat.xAxis) * rsqXA,
            this.zAxis.dot(mat.yAxis) * rsqYA,
            this.zAxis.dot(mat.zAxis) * rsqZA);

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
    this.xAxis.toGlobal_noTrans(mat);
    this.yAxis.toGlobal_noTrans(mat);
    this.zAxis.toGlobal_noTrans(mat);
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
    this.zAxis.set(from).sub(to).normalize();
    this.xAxis.set(up).cross(this.zAxis).normalize();
    this.yAxis.set(this.zAxis).cross(this.xAxis);
    this.trans.set(from);

    return this;
};

/**
 * Multiplies a 16-element float array, as a 4x4 matrix, with an another array.
 * @param {Float32Array} left A float array.
 * @param {Float32Array} right An another float array.
 * @param {b9.Matrix3D} result The product of two arrays.
 */
b9.Matrix3D.mulArrayAs4x4 = function(left, right, result) {
    var i;
    var array = b9.Matrix3D.array1_;

    array[0] = left[0] * right[0] + left[4] * right[1] + left[8] * right[2] + left[12] * right[3];
    array[1] = left[1] * right[0] + left[5] * right[1] + left[9] * right[2] + left[13] * right[3];
    array[2] = left[2] * right[0] + left[6] * right[1] + left[10] * right[2] + left[14] * right[3];
    array[3] = left[3] * right[0] + left[7] * right[1] + left[11] * right[2] + left[15] * right[3];

    array[4] = left[0] * right[4] + left[4] * right[5] + left[8] * right[6] + left[12] * right[7];
    array[5] = left[1] * right[4] + left[5] * right[5] + left[9] * right[6] + left[13] * right[7];
    array[6] = left[2] * right[4] + left[6] * right[5] + left[10] * right[6] + left[14] * right[7];
    array[7] = left[3] * right[4] + left[7] * right[5] + left[11] * right[6] + left[15] * right[7];

    array[8] = left[0] * right[8] + left[4] * right[9] + left[8] * right[10] + left[12] * right[11];
    array[9] = left[1] * right[8] + left[5] * right[9] + left[9] * right[10] + left[13] * right[11];
    array[10] = left[2] * right[8] + left[6] * right[9] + left[10] * right[10] + left[14] * right[11];
    array[11] = left[3] * right[8] + left[7] * right[9] + left[11] * right[10] + left[15] * right[11];

    array[12] = left[0] * right[12] + left[4] * right[13] + left[8] * right[14] + left[12] * right[15];
    array[13] = left[1] * right[12] + left[5] * right[13] + left[9] * right[14] + left[13] * right[15];
    array[14] = left[2] * right[12] + left[6] * right[13] + left[10] * right[14] + left[14] * right[15];
    array[15] = left[3] * right[12] + left[7] * right[13] + left[11] * right[14] + left[15] * right[15];

    for (i = 0; i < 16; i++) {
        result[i] = array[i];
    }
};

/**
 * Returns whether this matrix equals a matrix.
 * @param {b9.Matrix3D} vec A matrix.
 * @return {boolean} true if the two matrices are equal; false otherwise.
 */
b9.Matrix3D.prototype.equals = function(mat) {
    return (this.xAxis.equals(mat.xAxis) &&
            this.yAxis.equals(mat.yAxis) &&
            this.zAxis.equals(mat.zAxis) &&
            this.trans.equals(mat.trans)) ? true : false;
};

/**
 * Returns a string representation of this matrix.
 * @return {string} A string representation of this matrix.
 */
b9.Matrix3D.prototype.toString = function() {
    var i;
    var array = this.array_;
    var index = this.index_;
    var str;

    str = "(";
    str += this.xAxis.toString();
    str += ", ";
    str += this.yAxis.toString();
    str += ", ";
    str += this.zAxis.toString();
    str += ", ";
    str += this.trans.toString();
    str += ")";

    return str;
};

/**
 * The unit matrix.
 * @const
 * @type {b9.Matrix3D}
 */
b9.Matrix3D.UNIT = new b9.Matrix3D(b9.Vector3D.X_UNIT, b9.Vector3D.Y_UNIT, b9.Vector3D.Z_UNIT, b9.Vector3D.ZERO);

b9.Matrix3D.vec1_ = new b9.Vector3D();
b9.Matrix3D.vec2_ = new b9.Vector3D();
b9.Matrix3D.vec3_ = new b9.Vector3D();
b9.Matrix3D.mat1_ = new b9.Matrix3D();
b9.Matrix3D.array1_ = new Float32Array(16);
// quat1_ and quat2_ are defined in Quaternion.js
