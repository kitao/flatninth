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
 * @class
 * @param {b9.Matrix2D|Number} arg1
 * @param {Number} arg2
 * @param {Number} arg3
 */
b9.Matrix2D = function(arg1, arg2, arg3) {
    /** hoge */
    this.x_axis = new b9.Vector2D();

    /** hoge */
    this.y_axis = new b9.Vector2D();

    /** hoge */
    this.trans = new b9.Vector2D();

    if (arguments.length === 3) {
        this.x_axis.set(arg1);
        this.y_axis.set(arg2);
        this.trans.set(arg3);
    } else if (arguments.length === 1) {
        this.x_axis.set(arg1.x_axis);
        this.y_axis.set(arg1.y_axis);
        this.trans.set(arg1.trans);
    }
};

/**
 *
 * @param {b9.Matrix2D|Number} arg1
 * @param {Number} arg2
 * @param {Number} arg3
 */
b9.Matrix2D.prototype.set = function() {
    if (arguments.length === 3) {
        this.x_axis.set(arg1);
        this.y_axis.set(arg2);
        this.trans.set(arg3);
    } else if (arguments.length === 1) {
        this.x_axis.set(arg1.x_axis);
        this.y_axis.set(arg1.y_axis);
        this.trans.set(arg1.trans);
    }
};

/**
 *
 * @returns {Boolean}
 */
b9.Matrix2D.prototype.isUnit = function() {
    return (this.x_axis.x === 1.0 && this.x_axis.y === 0.0 &&
            this.y_axis.x === 0.0 && this.y_axis.y === 1.0 &&
            this.trans.x === 0.0 && this.trans.y === 0.0);
};

/**
 *
 */
b9.Matrix2D.prototype.orthonormalize = function() {
    // TODO
};

/**
 *
 * {Number} deg
 */
b9.Matrix2D.prototype.rotateFloat = function(deg) {
    b9._f1 = b9.Math.sinFloat(deg);
    b9._f2 = b9.Math.cosFloat(deg);

    b9._m1.x_axis.set(b9._f2, b9._f1);
    b9._m1.y_axis.set(-b9._f1, b9._f2);
    b9._m1.trans.set(b9.Matrix2D.ZERO);

    b9._m1.toGlobal(this);
    this.set(b9._m1);
};

/**
 *
 * {Number} deg
 */
b9.Matrix2D.prototype.rotateInt = function(deg) {
    b9._f1 = b9.Math.sinInt(deg);
    b9._f2 = b9.Math.cosInt(deg);

    b9._m1.x_axis.set(b9._f2, b9._f1);
    b9._m1.y_axis.set(-b9._f1, b9._f2);
    b9._m1.trans.set(b9.Matrix2D.ZERO);

    b9._m1.toGlobal(this);
    this.set(b9._m1);
};

/**
 *
 * {Number} scale_x
 * {Number} scale_y
 */
b9.Matrix2D.prototype.scale = function(scale_x, scale_y) {
    this.x_axis.mul(scale_x);
    this.y_axis.mul(scale_y);
};

/**
 *
 * {Number} offset_x
 * {Number} offset_y
 */
b9.Matrix2D.prototype.translate = function(offset_x, offste_y) {
    b9._v1.set(this.x_axis);
    b9._v1.mul(offset_x);

    b9._v2.set(this.y_axis);
    b9._v2.mul(offset_y);

    this.trans.add(b9._v1);
    this.trans.add(b9._v2);
};

/**
 *
 * {Number} to
 * {Number} ratio
 */
b9.Matrix2D.prototype.interp = function(to, ratio) {
    // TODO
};

/**
 *
 * {Number} to
 * {Number} ratio
 */
b9.Matrix2D.prototype.interpNoTrans = function(to, ratio) {
    // TODO
};

/**
 *
 * {b9.Matrix2D} mat
 */
b9.Matrix2D.prototype.toLocal = function(mat) {
    b9._f1 = 1.0 / mat.x_axis.sqNorm();
    b9._f2 = 1.0 / mat.y_axis.sqNorm();

    b9._v1.set(this.trans);
    b9._v1.sub(mat.trans);

    this.x_axis.set(this.x_axis.dot(mat.x_axis) * b9._f1, this.x_axis.dot(mat.y_axis) * b9._f2);
    this.y_axis.set(this.y_axis.dot(mat.x_axis) * b9._f1, this.y_axis.dot(mat.y_axis) * b9._f2);
    this.trans.set(b9._v1.dot(mat.x_axis) * b9._f1, b9._v1.dot(mat.y_axis) * b9._f2);
};

/**
 *
 * {b9.Matrix2D} mat
 */
b9.Matrix2D.prototype.toGlobal = function(mat) {
    this.x_axis.toGlobalNoTrans(mat);
    this.y_axis.toGlobalNoTrans(mat);
    this.trans.toGlobal(mat);
};

/**
 *
 * {b9.Matrix2D} mat
 */
b9.Matrix2D.prototype.toLocalNoTrans = function(mat) {
    b9._f1 = 1.0 / mat.x_axis.sqNorm();
    b9._f2 = 1.0 / mat.y_axis.sqNorm();

    this.x_axis.set(this.x_axis.dot(mat.x_axis) * b9._f1, this.x_axis.dot(mat.y_axis) * b9._f2);
    this.y_axis.set(this.y_axis.dot(mat.x_axis) * b9._f1, this.y_axis.dot(mat.y_axis) * b9._f2);
    this.trans.set(b9.Vector2D.ZERO);
};

/**
 *
 * {b9.Matrix2D} mat
 */
b9.Matrix2D.prototype.toGlobalNoTrans = function(mat) {
    this.x_axis.toGlobalNoTrans(mat);
    this.y_axis.toGlobalNoTrans(mat);
    trans.set(b9.Vector2D.ZERO);
};

/**
 *
 * {Number} from
 * {Number} to
 */
b9.Matrix2D.prototype.lookAt = function(from, to) {
    // TODO
/*
    ckVec new_z_axis = (from - to).normalize();
    ckVec new_x_axis = up.cross(new_z_axis).normalize();
    ckVec new_y_axis = new_z_axis.cross(new_x_axis);

    return ckMat(new_x_axis, new_y_axis, new_z_axis, from);
*/
};

/**
 * @returns {String}
 */
b9.Matrix2D.prototype.toString = function() {
    return "(" + this.x_axis.toString() + ", " + this.y_axis.toString() + ", " + this.trans.toString() + ")";
};

/**
 * {b9.Matrix2D}
 */
b9.Matrix2D.ZERO = new b9.Matrix2D(b9.Vector2D.ZERO, b9.Vector2D.ZERO, b9.Vector2D.ZERO);

/**
 * {b9.Matrix2D}
 */
b9.Matrix2D.UNIT = new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.ZERO);

/** @private */
b9._m1 = new b9.Matrix2();

/** @private */
b9._m2 = new b9.Matrix2();

/** @private */
b9._m3 = new b9.Matrix2();
