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
 *
 */
b9.Matrix2D = function() {
    /** hoge */
    this.x_axis = b9.Vector2D();

    /** hoge */
    this.y_axis = b9.Vector2D();

    /** hoge */
    this.trans = b9.Vector2D();

    if (arguments === 3) {
        this.x_axis.set(arguments[0]);
        this.y_axis.set(arguments[1]);
        this.trans.set(arguments[2]);
    } else if (arguments === 1) {
        this.x_axis.set(arguments[0].x_axis);
        this.y_axis.set(arguments[0].y_axis);
        this.trans.set(arguments[0].trans);
    }
};

/** private */
b9.Matrix2D._s1 = 0.0;

/** private */
b9.Matrix2D._s2 = 0.0;

/** private */
b9.Matrix2D._v1 = b9.Vector2D();

/** private */
b9.Matrix2D._v2 = b9.Vector2D();

/** private */
b9.Matrix2D._v3 = b9.Vector2D();

/** private */
b9.Matrix2D._m1 = b9.Matrix2D();

/**
 *
 */
b9.Matrix2D.prototype.set = function() {
    if (arguments === 3) {
        this.x_axis.set(arguments[0]);
        this.y_axis.set(arguments[1]);
        this.trans.set(arguments[2]);
    } else if (arguments === 1) {
        this.x_axis.set(arguments[0].x_axis);
        this.y_axis.set(arguments[0].y_axis);
        this.trans.set(arguments[0].trans);
    }
};

/**
 *
 */
b9.Matrix2D.prototype.isUnit = function() {
    return (this.x_axis.x === 1.0 && this.x_axis.y === 0.0 &&
            this.y_axis.x === 0.0 && this.y_axis.y === 1.0 &&
            this.trans.x === 0.0 && this.trans.y === 0.0);
};

/**
 *
 */
b9.Matrix2D.prototype.rotate_float = function(deg) {
    b9.Matrix2D._s1 = b9.Math.sin_float(deg);
    b9.Matrix2D._s2 = b9.Math.cos_float(deg);

    b9.Matrix2D._m1.x_axis.set(b9.Matrix2D._s2, b9.Matrix2D._s1);
    b9.Matrix2D._m1.y_axis.set(-b9.Matrix2D._s1, b9.Matrix2D._s2);
    b9.Matrix2D._m1.trans.set(b9.Matrix2D.ZERO);

    b9.Matrix2D._m1.toGlobal(this);
    this.set(b9.Matrix2D._m1);
};

/**
 *
 */
b9.Matrix2D.prototype.rotate_int = function(deg) {
    b9.Matrix2D._s1 = b9.Math.sin_int(deg);
    b9.Matrix2D._s2 = b9.Math.cos_int(deg);

    b9.Matrix2D._m1.x_axis.set(b9.Matrix2D._s2, b9.Matrix2D._s1);
    b9.Matrix2D._m1.y_axis.set(-b9.Matrix2D._s1, b9.Matrix2D._s2);
    b9.Matrix2D._m1.trans.set(b9.Matrix2D.ZERO);

    b9.Matrix2D._m1.toGlobal(this);
    this.set(b9.Matrix2D._m1);
};

/**
 *
 */
b9.Matrix2D.prototype.scale = function(scale_x, scale_y) {
    this.x_axis.mul(scale_x);
    this.y_axis.mul(scale_y);
};

/**
 *
 */
b9.Matrix2D.prototype.translate = function(offset_x, offste_y) {
    b9.Matrix2D._v1.set(this.x_axis);
    b9.Matrix2D._v1.mul(offset_x);

    b9.Matrix2D._v2.set(this.y_axis);
    b9.Matrix2D._v2.mul(offset_y);

    this.trans.add(b9.Matrix2D._v1);
    this.trans.add(b9.Matrix2D._v2);
};

/**
 *
 */
b9.Matrix2D.prototype.interp = function(to, ratio) {
    // TODO
};

/**
 *
 */
b9.Matrix2D.prototype.interp_noTrans = function(to, ratio) {
    // TODO
};

/**
 *
 */
b9.Matrix2D.prototype.toLocal = function(mat) {
    // TODO
};

/**
 *
 */
b9.Matrix2D.prototype.toGlobal = function(mat) {
    // TODO
};

/**
 *
 */
b9.Matrix2D.prototype.toLocal_noTrans = function(mat) {
    // TODO
};

/**
 *
 */
b9.Matrix2D.prototype.toGlobal_noTrans = function(mat) {
    // TODO
};

/**
 *
 */
b9.Matrix2D.prototype.lookAt = function(from, to) {
    // TODO
};

/*
const ckMat ckMat::ZERO(ckVec(0.0f, 0.0f, 0.0f), ckVec(0.0f, 0.0f, 0.0f), ckVec(0.0f, 0.0f, 0.0f), ckVec(0.0f, 0.0f, 0.0f));
const ckMat ckMat::UNIT(ckVec(1.0f, 0.0f, 0.0f), ckVec(0.0f, 1.0f, 0.0f), ckVec(0.0f, 0.0f, 1.0f), ckVec(0.0f, 0.0f, 0.0f));


ckMat ckMat::toLocalOf(const ckMat& mat) const
{
    r32 rsq_xa = 1.0f / mat.x_axis.sqLength();
    r32 rsq_ya = 1.0f / mat.y_axis.sqLength();
    r32 rsq_za = 1.0f / mat.z_axis.sqLength();
    ckVec vec = trans - mat.trans;

    return ckMat( //
        ckVec(x_axis.dot(mat.x_axis) * rsq_xa, x_axis.dot(mat.y_axis) * rsq_ya, x_axis.dot(mat.z_axis) * rsq_za), //
        ckVec(y_axis.dot(mat.x_axis) * rsq_xa, y_axis.dot(mat.y_axis) * rsq_ya, y_axis.dot(mat.z_axis) * rsq_za), //
        ckVec(z_axis.dot(mat.x_axis) * rsq_xa, z_axis.dot(mat.y_axis) * rsq_ya, z_axis.dot(mat.z_axis) * rsq_za), //
        ckVec(vec.dot(mat.x_axis) * rsq_xa, vec.dot(mat.y_axis) * rsq_ya, vec.dot(mat.z_axis) * rsq_za));
}


ckMat ckMat::toGlobalFrom(const ckMat& mat) const
{
    return ckMat( //
        x_axis.toGlobalFrom_noTrans(mat), //
        y_axis.toGlobalFrom_noTrans(mat), //
        z_axis.toGlobalFrom_noTrans(mat), //
        trans.toGlobalFrom(mat));
}


ckMat ckMat::toLocalOf_noTrans(const ckMat& mat) const
{
    r32 rsq_xa = 1.0f / mat.x_axis.sqLength();
    r32 rsq_ya = 1.0f / mat.y_axis.sqLength();
    r32 rsq_za = 1.0f / mat.z_axis.sqLength();

    return ckMat( //
        ckVec(x_axis.dot(mat.x_axis) * rsq_xa, x_axis.dot(mat.y_axis) * rsq_ya, x_axis.dot(mat.z_axis) * rsq_za), //
        ckVec(y_axis.dot(mat.x_axis) * rsq_xa, y_axis.dot(mat.y_axis) * rsq_ya, y_axis.dot(mat.z_axis) * rsq_za), //
        ckVec(z_axis.dot(mat.x_axis) * rsq_xa, z_axis.dot(mat.y_axis) * rsq_ya, z_axis.dot(mat.z_axis) * rsq_za), //
        ckVec::ZERO);
}


ckMat ckMat::toGlobalFrom_noTrans(const ckMat& mat) const
{
    return ckMat( //
        x_axis.toGlobalFrom_noTrans(mat), //
        y_axis.toGlobalFrom_noTrans(mat), //
        z_axis.toGlobalFrom_noTrans(mat), //
        ckVec::ZERO);
}


ckMat ckMat::lookAt(const ckVec& from, const ckVec& to, const ckVec& up)
{
    ckVec new_z_axis = (from - to).normalize();
    ckVec new_x_axis = up.cross(new_z_axis).normalize();
    ckVec new_y_axis = new_z_axis.cross(new_x_axis);

    return ckMat(new_x_axis, new_y_axis, new_z_axis, from);
}
*/
