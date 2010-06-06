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
 * hoge
 * @class hoge
 */
b9.Matrix2D = b9.createClass();

/**
 * hoge
 * @param {b9.Matrix2D|Number} [arg1] hoge
 * @param {Number} [arg2] hoge
 * @param {Number} [arg3] hoge
 */
b9.Matrix2D.prototype.initialize = function(arg1, arg2, arg3) {
    /**
     * hoge
     * @return {b9.Vector2D}
     */
    this.x_axis = new b9.Vector2D();

    /**
     * hoge
     * @return {b9.Vector2D}
     */
    this.y_axis = new b9.Vector2D();

    /**
     * hoge
     * @return {b9.Vector2D}
     */
    this.trans = new b9.Vector2D();

    if (arguments.length === 1) {
        this.x_axis.set(arg1.x_axis);
        this.y_axis.set(arg1.y_axis);
        this.trans.set(arg1.trans);
    } else if (arguments.length === 3) {
        this.x_axis.set(arg1);
        this.y_axis.set(arg2);
        this.trans.set(arg3);
    }
};

/**
 * hoge
 * @param {b9.Matrix2D|Number} arg1 hoge
 * @param {Number} [arg2] hoge
 * @param {Number} [arg3] hoge
 */
b9.Matrix2D.prototype.set = function(arg1, arg2, arg3) {
    if (arguments.length === 1) {
        this.x_axis.set(arg1.x_axis);
        this.y_axis.set(arg1.y_axis);
        this.trans.set(arg1.trans);
    } else if (arguments.length === 3) {
        this.x_axis.set(arg1);
        this.y_axis.set(arg2);
        this.trans.set(arg3);
    }
};

/**
 * hoge
 */
b9.Matrix2D.prototype.orthonormalize = function() {
    this.x_axis.normalize();
    this.y_axis.set(this.x_axis);
    this.y_axis.rotateInt(90);
};

/**
 * hoge
 * @param {Number} deg hoge
 */
b9.Matrix2D.prototype.rotateFloat = function(deg) {
    var sin = b9.Math.sinFloat(deg);
    var cos = b9.Math.cosFloat(deg);

    b9.Matrix2D._mat1.x_axis.set(cos, sin);
    b9.Matrix2D._mat1.y_axis.set(-sin, cos);
    b9.Matrix2D._mat1.trans.set(b9.Vector2D.ZERO);

    b9.Matrix2D._mat1.toGlobal(this);
    this.set(b9.Matrix2D._mat1);
};

/**
 * hoge
 * @param {Number} deg hoge
 */
b9.Matrix2D.prototype.rotateInt = function(deg) {
    var sin = b9.Math.sinInt(deg);
    var cos = b9.Math.cosInt(deg);

    b9.Matrix2D._mat1.x_axis.set(cos, sin);
    b9.Matrix2D._mat1.y_axis.set(-sin, cos);
    b9.Matrix2D._mat1.trans.set(b9.Vector2D.ZERO);

    b9.Matrix2D._mat1.toGlobal(this);
    this.set(b9.Matrix2D._mat1);
};

/**
 * hoge
 * @param {Number} scale_x hoge
 * @param {Number} scale_y hoge
 */
b9.Matrix2D.prototype.scale = function(scale_x, scale_y) {
    this.x_axis.mul(scale_x);
    this.y_axis.mul(scale_y);
};

/**
 * hoge
 * @param {Number} offset_x hoge
 * @param {Number} offset_y hoge
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
 * hoge
 * @param {Number} to hoge
 * @param {Number} ratio hoge
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
 * hoge
 * @param {Number} to hoge
 * @param {Number} ratio hoge
 */
b9.Matrix2D.prototype.interpNoTrans = function(to, ratio) {
    if (ratio < b9.Math.EPSILON) {
        return;
    } else if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else {
        var ang = b9.Math.acos(this.x_axis.dot(to.x_axis));

        if (this.y_axis.dot(to.x_axis) < 0.0) {
            ang = -ang;
        }

        this.rotateFloat(ang * ratio);
    }
};

/**
 * hoge
 * @param {b9.Matrix2D} mat hoge
 */
b9.Matrix2D.prototype.toLocal = function(mat) {
    var rsq_xa = 1.0 / mat.x_axis.sqNorm();
    var rsq_ya = 1.0 / mat.y_axis.sqNorm();

    b9.Vector2D._vec1.set(this.trans);
    b9.Vector2D._vec1.sub(mat.trans);

    this.x_axis.set(this.x_axis.dot(mat.x_axis) * rsq_xa, this.x_axis.dot(mat.y_axis) * rsq_ya);
    this.y_axis.set(this.y_axis.dot(mat.x_axis) * rsq_xa, this.y_axis.dot(mat.y_axis) * rsq_ya);
    this.trans.set(b9.Vector2D._vec1.dot(mat.x_axis) * rsq_xa, b9.Vector2D._vec1.dot(mat.y_axis) * rsq_ya);
};

/**
 * hoge
 * @param {b9.Matrix2D} mat hoge
 */
b9.Matrix2D.prototype.toGlobal = function(mat) {
    this.x_axis.toGlobalNoTrans(mat);
    this.y_axis.toGlobalNoTrans(mat);
    this.trans.toGlobal(mat);
};

/**
 * hoge
 * @param {b9.Matrix2D} mat hoge
 */
b9.Matrix2D.prototype.toLocalNoTrans = function(mat) {
    var rsq_xa = 1.0 / mat.x_axis.sqNorm();
    var rsq_ya = 1.0 / mat.y_axis.sqNorm();

    this.x_axis.set(this.x_axis.dot(mat.x_axis) * rsq_xa, this.x_axis.dot(mat.y_axis) * rsq_ya);
    this.y_axis.set(this.y_axis.dot(mat.x_axis) * rsq_xa, this.y_axis.dot(mat.y_axis) * rsq_ya);
    this.trans.set(b9.Vector2D.ZERO);
};

/**
 * hoge
 * @param {b9.Matrix2D} mat hoge
 */
b9.Matrix2D.prototype.toGlobalNoTrans = function(mat) {
    this.x_axis.toGlobalNoTrans(mat);
    this.y_axis.toGlobalNoTrans(mat);
    this.trans.set(b9.Vector2D.ZERO);
};

/**
 * hoge
 * @param {b9.Vector2D} from hoge
 * @param {b9.Vector2D} to hoge
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
 * hoge
 * @param {b9.Matrix2D} mat hoge
 * @return {Boolean} hoge
 */
b9.Matrix2D.prototype.isEqual = function(mat) {
    return (this.x_axis.isEqual(mat.x_axis) && this.y_axis.isEqual(mat.y_axis) && this.trans.isEqual(mat.trans));
};

/**
 * hoge
 * @return {String} hoge
 */
b9.Matrix2D.prototype.toString = function() {
    return "(" + this.x_axis.toString() + ", " + this.y_axis.toString() + ", " + this.trans.toString() + ")";
};

/**
 * hoge
 * @return {b9.Matrix2D}
 */
b9.Matrix2D.ZERO = new b9.Matrix2D(b9.Vector2D.ZERO, b9.Vector2D.ZERO, b9.Vector2D.ZERO);

/**
 * hoge
 * @return {b9.Matrix2D}
 */
b9.Matrix2D.UNIT = new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.ZERO);

/** @private */
b9.Vector2D._vec1 = new b9.Vector2D();

/** @private */
b9.Vector2D._vec2 = new b9.Vector2D();

/** @private */
b9.Matrix2D._mat1 = new b9.Matrix2D();
