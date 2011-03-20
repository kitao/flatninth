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
 * <li>b9.Quaternion(float x, float y, float z, float w)</li>
 * </ul>
 *
 * @class A quaternion which is represented by xyzw coordinates.
 *
 * @param {b9.Quaternion|number} [quatOrX] A quaternion to be cloned or an x-coordinate.
 * @param {number} [y] A y-coordinate.
 * @param {number} [z] A z-coordinate.
 * @param {number} [w] A w-coordinate.
 */
b9.Quaternion = b9.createClass();

/**
 * @ignore
 */
b9.Quaternion.prototype.initialize = function(quatOrX, y, z, w) {
    /**
     * The x-coordinate of this quaternion.
     * @type {number}
     */
    this.x;

    /**
     * The y-coordinate of this quaternion.
     * @type {number}
     */
    this.y;

    /**
     * The z-coordinate of this quaternion.
     * @type {number}
     */
    this.z;

    /**
     * The w-coordinate of this quaternion.
     * @type {number}
     */
    this.w;

    if (arguments.length === 1) {
        this.x = quatOrX.x;
        this.y = quatOrX.y;
        this.z = quatOrX.z;
        this.w = quatOrX.w;
    } else if (arguments.length === 4) {
        this.x = quatOrX;
        this.y = y;
        this.z = z;
        this.w = w;
    }
};

/**
 * Sets all of the components to this quaternion. The following forms are allowed:
 * <ul>
 * <li>b9.Quaternion(b9.Quaternion quaternionToBeCloned)</li>
 * <li>b9.Quaternion(float x, float y, float z, float w)</li>
 * </ul>
 * @param {b9.Quaternion|number} [quatOrX] A quaternion to be cloned or an x-coordinate.
 * @param {number} [y] A y-coordinate.
 * @param {number} [z] A z-coordinate.
 * @param {number} [w] A w-coordinate.
 * @return {b9.Quaternion} This quaternion.
 */
b9.Quaternion.prototype.set = function(quatOrX, y, z, w) {
    if (arguments.length === 1) {
        this.x = quatOrX.x;
        this.y = quatOrX.y;
        this.z = quatOrX.z;
        this.w = quatOrX.w;
    } else if (arguments.length === 4) {
        this.x = quatOrX;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    return this;
};

/**
 * Builds the quaternion from a matrix and sets to this quaternion.
 * @param {b9.Matrix3D} mat A matrix.
 * @return This quaternion.
 */
b9.Quaternion.prototype.fromMatrix3D = function(mat) {
    var k;
    var matXAxis = matXAxis;
    var matYAxis = matYAxis;
    var matZAxis = matZAxis;
    var trace = matXAxis.x + matYAxis.y + matZAxis.z;
    var root, scale;

    if (trace > 0.0) {
        root = b9.Math.sqrt(trace + 1.0);
        scale = 0.5 / root;

        this.set(
                (matYAxis.z - matZAxis.y) * scale,
                (matZAxis.x - matXAxis.z) * scale,
                (matXAxis.y - matYAxis.x) * scale,
                root * 0.5);
    } else {
        k = (matYAxis.y > matXAxis.x) ? ((matZAxis.z > matYAxis.y) ? 2 : 1) : ((matZAxis.z > matXAxis.x) ? 2 : 0);

        if (k === 0) {
            root = b9.Math.sqrt(matXAxis.x - (matYAxis.y + matZAxis.z) + 1.0);
            scale = (root !== 0.0) ? 0.5 / root : root;

            this.set(
                    root * 0.5,
                    (matXAxis.y + matYAxis.x) * scale,
                    (matZAxis.x + matXAxis.z) * scale,
                    (matYAxis.z - matZAxis.y) * scale);
        } else if (k === 1) {
            root = b9.Math.sqrt(matYAxis.y - (matZAxis.z + matXAxis.x) + 1.0);
            scale = (root !== 0.0) ? 0.5 / root : root;

            this.set(
                    (matXAxis.y + matYAxis.x) * scale,
                    root * 0.5,
                    (matYAxis.z + matZAxis.y) * scale,
                    (matZAxis.x - matXAxis.z) * scale);
        } else { // k === 2
            root = b9.Math.sqrt(matZAxis.z - (matXAxis.x + matYAxis.y) + 1.0);
            scale = (root !== 0.0) ? 0.5 / root : root;

            this.set(
                    (matZAxis.x + matXAxis.z) * scale,
                    (matYAxis.z + matZAxis.y) * scale,
                    root * 0.5,
                    (matXAxis.y - matYAxis.x) * scale);
        }
    }

    return this;
};

/**
 * Interpolates this quaternion to a quaternion by a ratio, using spherical linear interpolation.
 * @param {number} to A destination quaternion.
 * @param {number} ratio The value which indicates how far to interpolate between the two quaternions.
 * @return {b9.Matrix3D} This quaternion.
 */
b9.Quaternion.prototype.slerp = function(to, ratio) {
    var quat;
    var omega, sinOmega, cosOmega;
    var scale0, scale1;

    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        quat = b9.Quaternion.quat1_;

        cosOmega = this.x * to.x + this.y * to.y + this.z * to.z + this.w * to.w;

        if (cosOmega < 0.0) {
            cosOmega = -cosOmega;

            quat.set(-to.x, -to.y, -to.z, -to.w);
        } else {
            quat.set(to);
        }

        if (cosOmega >= 1.0) {
            this.set(to);
        } else {
            omega = b9.Math.acos(cosOmega > 1.0 ? 1.0 : cosOmega);
            sinOmega = b9.Math.sin_float(omega);
            scale0 = b9.Math.sin_float(omega * (1.0 - ratio)) / sinOmega;
            scale1 = b9.Math.sin_float(omega * ratio) / sinOmega;

            this.set(
                    this.x * scale0 + quat.x * scale1,
                    this.y * scale0 + quat.y * scale1,
                    this.z * scale0 + quat.z * scale1,
                    this.w * scale0 + quat.w * scale1);
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
    return (b9.Math.equals_float(this.x, quat.x) &&
            b9.Math.equals_float(this.y, quat.y) &&
            b9.Math.equals_float(this.z, quat.z) &&
            b9.Math.equals_float(this.w, quat.w));
};

/**
 * Returns a string representation of this quaternion.
 * @return {string} A string representation of this quaternion.
 */
b9.Quaternion.prototype.toString = function() {
    var str;

    str = "(";
    str += this.x;
    str += ", ";
    str += this.y;
    str += ", ";
    str += this.z;
    str += ", ";
    str += this.w;
    str += ")";

    return str;
};

b9.Quaternion.quat1_ = new b9.Quaternion();

b9.Matrix3D.quat1_ = new b9.Quaternion();
b9.Matrix3D.quat2_ = new b9.Quaternion();
