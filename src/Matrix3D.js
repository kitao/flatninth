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
 * <li>b9.Matrix3D(Float32Array arrayToBeReferenced, int arrayIndexOfFirstComponent)</li>
 * <li>b9.Matrix3D(b9.Vector3D xAxis, b9.Vector3D yAxis, b9.Vector3D zAxis, b9.Vector3D trans)</li>
 * </ul>
 *
 * @class A 4x4 matrix which is represented by four vectors.
 *
 * @param {b9.Matrix3D|Float32Array|b9.Vector3D} [arg1]
 * A matrix to be cloned, an array to be referenced, or an x-axis.
 * @param {number|b9.Vector3D} [arg2] The array index of the first component or a y-axis.
 * @param {b9.Vector3D} [arg3] A z-axis.
 * @param {b9.Vector3D} [arg4] A translation.
 */
b9.Matrix3D = b9.createClass();

/**
 * @ignore
 */
b9.Matrix3D.prototype.initialize = function(arg1, arg2, arg3, arg4) {
    var i;
    var array = this.array_ = (arguments.length === 2) ? arg1 : new Float32Array(16);
    var index = this.index_ = (arguments.length === 2) ? arg2 : 0;
    var matArray, matIndex;

    this.xAxis_ = new b9.Vector3D(array, index);
    this.yAxis_ = new b9.Vector3D(array, index + 4);
    this.zAxis_ = new b9.Vector3D(array, index + 8);
    this.trans_ = new b9.Vector3D(array, index + 12);

    if (arguments.length === 0) {
        array[index + 3] = 0.0;
        array[index + 7] = 0.0;
        array[index + 11] = 0.0;
        array[index + 15] = 1.0;
    } else if (arguments.length === 1) {
        matArray = arg1.array_;
        matIndex = arg1.index_;

        for (i = 0; i < 16; i++) {
            array[index + i] = matArray[matIndex + i];
        }
    } else if (arguments.length === 4) {
        this.xAxis_.set(arg1);
        this.yAxis_.set(arg2);
        this.zAxis_.set(arg3);
        this.trans_.set(arg4);

        array[index + 3] = 0.0;
        array[index + 7] = 0.0;
        array[index + 11] = 0.0;
        array[index + 15] = 1.0;
    }
};

/**
 * Returns the x-axis of this matrix.
 * @return The x-axis.
 */
b9.Matrix3D.prototype.getXAxis = function() {
    return this.xAxis_;
};

/**
 * Returns the y-axis of this matrix.
 * @return The y-axis.
 */
b9.Matrix3D.prototype.getYAxis = function() {
    return this.yAxis_;
};

/**
 * Returns the z-axis of this matrix.
 * @return The z-axis.
 */
b9.Matrix3D.prototype.getZAxis = function() {
    return this.zAxis_;
};

/**
 * Returns the translation of this matrix.
 * @return The translation.
 */
b9.Matrix3D.prototype.getTrans = function() {
    return this.trans_;
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
    var i;
    var array, index;
    var matArray, matIndex;

    if (arguments.length === 1) {
        array = this.array_;
        index = this.index_;
        matArray = arg1.array_;
        matIndex = arg1.index_;

        for (i = 0; i < 16; i++) {
            array[index + i] = matArray[matIndex + i];
        }
    } else if (arguments.length === 4) {
        this.xAxis_.set(arg1);
        this.yAxis_.set(arg2);
        this.zAxis_.set(arg3);
        this.trans_.set(arg4);
    }

    return this;
};

/**
 * Returns the array of this matrix.
 * @return The array.
 */
b9.Matrix3D.prototype.getArray = function() {
    return this.array_;
};

/**
 * Returns the array index of the first component.
 * @return The array index.
 */
b9.Matrix3D.prototype.getIndex = function() {
    return this.index_;
};

/**
 * Builds the matrix from a quaternion and sets to this matrix.
 * @param {b9.Quaternion} quat A quaternion.
 * @return This matrix.
 */
b9.Matrix3D.prototype.fromQuaternion = function(quat) {
    var quatArray = quat.array_;
    var quatIndex = quat.index_;

    var quatX = quatArray[quatIndex];
    var quatY = quatArray[quatIndex + 1];
    var quatZ = quatArray[quatIndex + 2];
    var quatW = quatArray[quatIndex + 3];

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

    this.xAxis_.set(1.0 - (yy2 + zz2), xy2 + wz2, xz2 - wy2);
    this.yAxis_.set(xy2 - wz2, 1.0 - (xx2 + zz2), yz2 + wx2);
    this.zAxis_.set(xz2 + wy2, yz2 - wx2, 1.0 - (xx2 + yy2));
    this.trans_.set(b9.Vector3D.ZERO);

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

    vec3.set(this.zAxis_).normalize();
    vec1.set(this.yAxis_).cross(this.zAxis_).normalize();
    vec2.set(vec3).cross(vec1);

    return this.set(vec1, vec2, vec3, this.trans_);
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

    mat.xAxis_.set(b9.Vector3D.X_UNIT);
    mat.yAxis_.set(0.0, cos, sin);
    mat.zAxis_.set(0.0, -sin, cos);
    mat.trans_.set(b9.Vector3D.ZERO);
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

    mat.xAxis_.set(cos, 0.0, -sin);
    mat.yAxis_.set(b9.Vector3D.Y_UNIT);
    mat.zAxis_.set(sin, 0.0, cos);
    mat.trans_.set(b9.Vector3D.ZERO);
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

    mat.xAxis_.set(cos, sin, 0.0);
    mat.yAxis_.set(-sin, cos, 0.0);
    mat.zAxis_.set(b9.Vector3D.Z_UNIT);
    mat.trans_.set(b9.Vector3D.ZERO);
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

    mat.xAxis_.set(b9.Vector3D.X_UNIT);
    mat.yAxis_.set(0.0, cos, sin);
    mat.zAxis_.set(0.0, -sin, cos);
    mat.trans_.set(b9.Vector3D.ZERO);
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

    mat.xAxis_.set(cos, 0.0, -sin);
    mat.yAxis_.set(b9.Vector3D.Y_UNIT);
    mat.zAxis_.set(sin, 0.0, cos);
    mat.trans_.set(b9.Vector3D.ZERO);
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

    mat.xAxis_.set(cos, sin, 0.0);
    mat.yAxis_.set(-sin, cos, 0.0);
    mat.zAxis_.set(b9.Vector3D.Z_UNIT);
    mat.trans_.set(b9.Vector3D.ZERO);
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
    this.xAxis_.mul(scaleX);
    this.yAxis_.mul(scaleY);
    this.zAxis_.mul(scaleZ);

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

    vec1.set(this.xAxis_).mul(offsetX);
    vec2.set(this.yAxis_).mul(offsetY);
    vec3.set(this.zAxis_).mul(offsetZ);

    this.trans_.add(vec1).add(vec2).add(vec3);

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
        vec.set(this.trans_).lerp(to.trans_, ratio);

        this.fromQuaternion(quat1.slerp(quat2, ratio));
        this.trans_.set(vec);
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
        this.xAxis_.set(to.xAxis_);
        this.yAxis_.set(to.yAxis_);
        this.zAxis_.set(to.zAxis_);
        this.trans_.set(b9.Vector3D.ZERO);
    } else if (ratio >= b9.Math.EPSILON) {
        quat1 = b9.Matrix3D.quat1_;
        quat2 = b9.Matrix3D.quat2_;

        quat1.fromMatrix3D(this);
        quat2.fromMatrix3D(to);

        this.fromQuaternion(quat1.slerp(quat2, ratio));
    } else {
        this.trans_.set(b9.Vector3D.ZERO);
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
    var rsqXA = 1.0 / mat.xAxis_.sqNorm();
    var rsqYA = 1.0 / mat.yAxis_.sqNorm();
    var rsqZA = 1.0 / mat.zAxis_.sqNorm();

    vec.set(this.trans_).sub(mat.trans_);

    this.xAxis_.set(
            this.xAxis_.dot(mat.xAxis_) * rsqXA,
            this.xAxis_.dot(mat.yAxis_) * rsqYA,
            this.xAxis_.dot(mat.zAxis_) * rsqZA);

    this.yAxis_.set(
            this.yAxis_.dot(mat.xAxis_) * rsqXA,
            this.yAxis_.dot(mat.yAxis_) * rsqYA,
            this.yAxis_.dot(mat.zAxis_) * rsqZA);

    this.zAxis_.set(
            this.zAxis_.dot(mat.xAxis_) * rsqXA,
            this.zAxis_.dot(mat.yAxis_) * rsqYA,
            this.zAxis_.dot(mat.zAxis_) * rsqZA);

    this.trans_.set(
            vec.dot(mat.xAxis_) * rsqXA,
            vec.dot(mat.yAxis_) * rsqYA,
            vec.dot(mat.zAxis_) * rsqZA);

    return this;
};

/**
 * Converts this matrix from in the local coordinate system of a matrix to in the world coordinate system.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.toGlobal = function(mat) {
    this.xAxis_.toGlobal_noTrans(mat);
    this.yAxis_.toGlobal_noTrans(mat);
    this.zAxis_.toGlobal_noTrans(mat);
    this.trans_.toGlobal(mat);

    return this;
};

/**
 * Converts this matrix from in the world coordinate system to in the local coordinate system of a matrix.
 * However, unlike the toLocal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix3D} mat A matrix.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.toLocal_noTrans = function(mat) {
    var rsqXA = 1.0 / mat.xAxis_.sqNorm();
    var rsqYA = 1.0 / mat.yAxis_.sqNorm();
    var rsqZA = 1.0 / mat.zAxis_.sqNorm();

    this.xAxis_.set(
            this.xAxis_.dot(mat.xAxis_) * rsqXA,
            this.xAxis_.dot(mat.yAxis_) * rsqYA,
            this.xAxis_.dot(mat.zAxis_) * rsqZA);

    this.yAxis_.set(
            this.yAxis_.dot(mat.xAxis_) * rsqXA,
            this.yAxis_.dot(mat.yAxis_) * rsqYA,
            this.yAxis_.dot(mat.zAxis_) * rsqZA);

    this.zAxis_.set(
            this.zAxis_.dot(mat.xAxis_) * rsqXA,
            this.zAxis_.dot(mat.yAxis_) * rsqYA,
            this.zAxis_.dot(mat.zAxis_) * rsqZA);

    this.trans_.set(b9.Vector3D.ZERO);

    return this;
};

/**
 * Converts this matrix from in the local coordinate system of a matrix to in the world coordinate system.
 * However, unlike the tGlobal method, the translation of the matrix is regarded as the zero vector.
 * @param {b9.Matrix3D} mat A Matrix3D.
 * @return {b9.Matrix3D} This matrix.
 */
b9.Matrix3D.prototype.toGlobal_noTrans = function(mat) {
    this.xAxis_.toGlobal_noTrans(mat);
    this.yAxis_.toGlobal_noTrans(mat);
    this.zAxis_.toGlobal_noTrans(mat);
    this.trans_.set(b9.Vector3D.ZERO);

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
    this.zAxis_.set(from).sub(to).normalize();
    this.xAxis_.set(up).cross(this.zAxis_).normalize();
    this.yAxis_.set(this.zAxis_).cross(this.xAxis_);
    this.trans_.set(from);

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
    var i;
    var array = this.array_;
    var index = this.index_;
    var matArray = mat.array_;
    var matIndex = mat.index_;

    for (i = 0; i < 16; i++) {
        if (!b9.Math.equals_float(array[index + i], matArray[matIndex + i])) {
            return false;
        }
    }

    return true;
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

    for (i = 0; i < 15; i++) {
        str += array[index + i];
        str += ", ";
    }

    str += array[index + 15];
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
