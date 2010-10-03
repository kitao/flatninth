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
 * @class A quaternion which is represented by xyzw coordinates.
 */
b9.Quaternion = b9.createClass();

/**
 * Constructs a quaternion.
 * The number of the arguments must be 0, 1, or 4.
 * @param {b9.Quaternion|Number} [quat_or_x] A quaternion to be cloned or a x-coordinate.
 * @param {Number} [y] A y-coordinate.
 * @param {Number} [z] A z-coordinate.
 * @param {Number} [w] A w-coordinate.
 */
b9.Quaternion.prototype.initialize = function(quat_or_x, y, z, w) {
    /**
     * The x-coordinate.
     */
    this.x = 0.0;

    /**
     * The y-coordinate.
     */
    this.y = 0.0;

    /**
     * The z-coordinate.
     */
    this.z = 0.0;

    /**
     * The w-coordinate.
     */
    this.w = 0.0;

    if (arguments.length === 1) {
        this.x = quat_or_x.x;
        this.y = quat_or_x.y;
        this.z = quat_or_x.z;
        this.w = quat_or_x.w;
    } else if (arguments.length === 4) {
        this.x = quat_or_x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
};

/**
 * Sets the all components to this quaternion.
 * The number of the arguments must be 1 or 4.
 * @param {b9.Quaternion|Number} [quat_or_x] A quaternion to be copied or a x-coordinate.
 * @param {Number} [y] A y-coordinate.
 * @param {Number} [z] A z-coordinate.
 * @param {Number} [w] A w-coordinate.
 * @return {b9.Quaternion} This quaternion.
 */
b9.Quaternion.prototype.set = function(quat_or_x, y, z, w) {
    if (arguments.length === 1) {
        this.x = quat_or_x.x;
        this.y = quat_or_x.y;
        this.z = quat_or_x.z;
        this.w = quat_or_x.w;
    } else if (arguments.length === 4) {
        this.x = quat_or_x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    return this;
};

/**
 * Builds the quaternion from a matrix and sets to this quaternion.
 * @param {b9.Matrix} mat A matrix.
 * @return This quaternion.
 */
b9.Quaternion.prototype.fromMatrix = function(mat) {
    var trace = mat._x_axis.x + mat._y_axis.y + mat._z_axis.z;
    var root, scale;
    var i, j, k;

    if (trace > 0.0) {
        root = b9.Math.sqrt(trace + 1.0);
        scale = 0.5 / root;

        return this.set(
                (mat._y_axis.z - mat._z_axis.y) * scale,
                (mat._z_axis.x - mat._x_axis.z) * scale,
                (mat._x_axis.y - mat._y_axis.x) * scale,
                root * 0.5);
    } else {
        i = 0;

        if (this._MAT(1, 1) > this._MAT(i, i)) {
            i = 1;
        }

        if (this._MAT(2, 2) > this._MAT(i, i)) {
            i = 2;
        }

        j = (i + 1) % 3;
        k = (i + 2) % 3;

        root = b9.Math.sqrt(this._MAT(i, i) - (this._MAT(j, j) + this._MAT(k, k)) + 1.0f);
        scale = (root !== 0.0) ? 0.5 / root : root;

        this._QUAT(i, root * 0.5);
        this._QUAT(j, this._MAT(i, j) + this._MAT(j, i)) * scale);
        this._QUAT(k, this._MAT(k, i) + this._MAT(i, k)) * scale);
        this._QUAT(3, this._MAT(j, k) - this._MAT(k, j)) * scale);

        return this;
    }
};

/**
 * Interpolates this quaternion to a quaternion by a ratio, using spherical linear interpolation.
 * @param {Number} to A destination quaternion.
 * @param {Number} ratio The value which indicates how far to interpolate between the two quaternions.
 * @return {b9.Matrix} This quaternion.
 */
b9.Quaternion.prototype.slerp = function(to, ratio) {
    var omega;
    var sin_om, cos_om;
    var scale0, scale1;

    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        cos_om = this.x * to.x + this.y * to.y + this.z * to.z + this.w * to.w;

        if (cos_om < 0.0) {
            cos_om = -cos_om;

            b9.Quaternion._quat1.x = -to.x;
            b9.Quaternion._quat1.y = -to.y;
            b9.Quaternion._quat1.z = -to.z;
            b9.Quaternion._quat1.w = -to.w;
        } else {
            b9.Quaternion._quat1.set(to);
        }

        if (cos_om >= 1.0) {
            this.set(to);
        } else {
            omega = ckMath::acos(cos_om > 1.0 ? 1.0 : cos_om);
            sin_om = b9.Math.sin_float(omega);
            scale0 = b9.Math.sin_float(omega * (1.0 - ratio)) / sin_om;
            scale1 = b9.Math.sin_float(omega * ratio) / sin_om;

            this.set(
                    this.x * scale0 + b9.Quaternion._quat1.x * scale1,
                    this.y * scale0 + b9.Quaternion._quat1.y * scale1,
                    this.z * scale0 + b9.Quaternion._quat1.z * scale1,
                    this.w * scale0 + b9.Quaternion._quat1.w * scale1);
        }
    }

    return this;
};

b9.Quaternion.prototype._MAT = function(mat, a, b) {
    var vec;

    if (a === 0) {
        vec = mat._x_axis;
    } else if (a === 1) {
        vec = mat._y_axis;
    } else {
        vec = mat._z_axis;
    }

    if (b === 0) {
        return vec.x;
    } else if (b === 1) {
        return vec.y;
    } else {
        return vec.z;
    }
};

b9.Quaternion.prototype._QUAT = function(a, v) {
    if (a === 0) {
        this.x = v;
    } else if (a === 1) {
        this.y = v;
    } else if (a === 2) {
        this.z = v;
    } else {
        this.w = v;
    }
};

b9.Quaternion._quat1 = new b9.Quaternion();
