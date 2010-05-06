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
 * @param {Number} [arg2]
 * @param {Number} [arg3]
 */
b9.Matrix2D = function(arg1, arg2, arg3) {
    /**
     * {b9.Vector2D}
     */
    this.x_axis = new b9.Vector2D();

    /**
     * {b9.Vector2D}
     */
    this.y_axis = new b9.Vector2D();

    /**
     * {b9.Vector2D}
     */
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
 * @param {Number} [arg2]
 * @param {Number} [arg3]
 */
b9.Matrix2D.prototype.set = function(arg1, arg2, arg3) {
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
 */
b9.Matrix2D.prototype.orthonormalize = function() {
    this.x_axis.normalize();
    this.y_axis.set(this.x_axis);
    this.y_axis.rotateInt(90);
};

/**
 *
 * {Number} deg
 */
b9.Matrix2D.prototype.rotateFloat = function(deg) {
    b9.Vector2D._f1 = b9.Math.sinFloat(deg);
    b9.Vector2D._f2 = b9.Math.cosFloat(deg);

    b9.Matrix2D._mat1.x_axis.set(b9.Vector2D._f2, b9.Vector2D._f1);
    b9.Matrix2D._mat1.y_axis.set(-b9.Vector2D._f1, b9.Vector2D._f2);
    b9.Matrix2D._mat1.trans.set(b9.Vector2D.ZERO);

    b9.Matrix2D._mat1.toGlobal(this);
    this.set(b9.Matrix2D._mat1);
};

/**
 *
 * {Number} deg
 */
b9.Matrix2D.prototype.rotateInt = function(deg) {
    b9.Vector2D._f1 = b9.Math.sinInt(deg);
    b9.Vector2D._f2 = b9.Math.cosInt(deg);

    b9.Matrix2D._mat1.x_axis.set(b9.Vector2D._f2, b9.Vector2D._f1);
    b9.Matrix2D._mat1.y_axis.set(-b9.Vector2D._f1, b9.Vector2D._f2);
    b9.Matrix2D._mat1.trans.set(b9.Vector2D.ZERO);

    b9.Matrix2D._mat1.toGlobal(this);
    this.set(b9.Matrix2D._mat1);
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
b9.Matrix2D.prototype.translate = function(offset_x, offset_y) {
    b9.Vector2D._vec1.set(this.x_axis);
    b9.Vector2D._vec1.mul(offset_x);

    b9.Vector2D._vec2.set(this.y_axis);
    b9.Vector2D._vec2.mul(offset_y);

    this.trans.add(b9.Vector2D._vec1);
    this.trans.add(b9.Vector2D._vec2);
};

/**
 *
 * {Number} to
 * {Number} ratio
 */
b9.Matrix2D.prototype.interp = function(to, ratio) {
    if (ratio < b9.Math.EPSILON) {
        return;
    } else if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else {
        this.interpNoTrans(to, ratio);
        this.trans.interp(to.trans, ratio);
    }
};

/**
 *
 * {Number} to
 * {Number} ratio
 */
b9.Matrix2D.prototype.interpNoTrans = function(to, ratio) {
    if (ratio < b9.Math.EPSILON) {
        return;
    } else if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else {
        b9.Matrix2D._f1 = this.x_axis.dot(to.x_axis);
        b9.Matrix2D._f2 = b9.Math.acos(b9.Matrix2D._f1);

        if (this.y_axis.dot(to.x_axis) < 0.0) {
            b9.Matrix2D._f2 = -b9.Matrix2D._f2;
        }

        this.rotateFloat(b9.Matrix2D._f2 * ratio);
    }
};

/**
 *
 * {b9.Matrix2D} mat
 */
b9.Matrix2D.prototype.toLocal = function(mat) {
    b9.Vector2D._f1 = 1.0 / mat.x_axis.sqNorm();
    b9.Vector2D._f2 = 1.0 / mat.y_axis.sqNorm();

    b9.Vector2D._vec1.set(this.trans);
    b9.Vector2D._vec1.sub(mat.trans);

    this.x_axis.set(this.x_axis.dot(mat.x_axis) * b9.Vector2D._f1, this.x_axis.dot(mat.y_axis) * b9.Vector2D._f2);
    this.y_axis.set(this.y_axis.dot(mat.x_axis) * b9.Vector2D._f1, this.y_axis.dot(mat.y_axis) * b9.Vector2D._f2);
    this.trans.set(b9.Vector2D._vec1.dot(mat.x_axis) * b9.Vector2D._f1,
            b9.Vector2D._vec1.dot(mat.y_axis) * b9.Vector2D._f2);
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
    b9.Vector2D._f1 = 1.0 / mat.x_axis.sqNorm();
    b9.Vector2D._f2 = 1.0 / mat.y_axis.sqNorm();

    this.x_axis.set(this.x_axis.dot(mat.x_axis) * b9.Vector2D._f1, this.x_axis.dot(mat.y_axis) * b9.Vector2D._f2);
    this.y_axis.set(this.y_axis.dot(mat.x_axis) * b9.Vector2D._f1, this.y_axis.dot(mat.y_axis) * b9.Vector2D._f2);
    this.trans.set(b9.Vector2D.ZERO);
};

/**
 *
 * {b9.Matrix2D} mat
 */
b9.Matrix2D.prototype.toGlobalNoTrans = function(mat) {
    this.x_axis.toGlobalNoTrans(mat);
    this.y_axis.toGlobalNoTrans(mat);
    this.trans.set(b9.Vector2D.ZERO);
};

/**
 *
 * {Number} from
 * {Number} to
 */
b9.Matrix2D.prototype.lookAt = function(from, to) {
    this.y_axis.set(to);
    this.y_axis.sub(from);
    this.y_axis.normalize();

    this.x_axis.set(this.x_axis);
    this.x_axis.rotateInt(-90);

    this.trans.set(from);
};

/**
 *
 * @param {b9.Matrix2D} mat
 * @returns {Boolean}
 */
b9.Matrix2D.prototype.isEqual = function(mat) {
    return (this.x_axis.isEqual(mat.x_axis) && this.y_axis.isEqual(mat.y_axis) && this.trans.isEqual(mat.trans));
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
b9.Vector2D._f1 = 0.0;

/** @private */
b9.Vector2D._f2 = 0.0;

/** @private */
b9.Vector2D._vec1 = new b9.Vector2D();

/** @private */
b9.Vector2D._vec2 = new b9.Vector2D();

/** @private */
b9.Matrix2D._mat1 = new b9.Matrix2D();
