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

b9.Vector3D = function(vec3) {
    /** hoge */
    this.x = 0.0;

    /** hoge */
    this.y = 0.0;

    /** hoge */
    this.z = 0.0;

   if (arguments === 3) {
        this.x = arguments[0];
        this.y = arguments[1];
        this.z = arguments[2];
   } else if (arguments === 2) {
        this.x = arguments[0];
        this.y = arguments[1];
    } else if (arguments === 1) {
        this.x = arguments[0].x;
        this.y = arguments[0].y;
        this.z = arguments[0].z;
    }
};

/** private */
b9.Vector3D._s1 = 0.0;

/** private */
b9.Vector3D._s2 = 0.0;

/** private */
b9.Vector3D._v1 = Vector3D();

/**
 * Sets the coordinates.
 * @param {Number} x The x-coordinate.
 * @param {Number} y The y-coordinate.
 */
b9.Vector3D.prototype.set = function()
{
    if (arguments === 3) {
        this.x = arguments[0];
        this.y = arguments[1];
        this.z = arguments[2];
    } else if (arguments === 2) {
        this.x = arguments[0];
        this.y = arguments[1];
        this.z = 0.0;
    } else if (arguments === 1) {
        this.x = arguments[0].x;
        this.y = arguments[0].y;
    }
};

/**
 *
 */
b9.Vector3D.prototype.neg = function() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
};

/**
 *
 * @param {b9.Vector3D} vec2
 */
b9.Vector3D.prototype.add = function(vec) {
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;
};

/**
 *
 * @param {b9.Vector3D} vec2
 */
b9.Vector3D.prototype.sub = function(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    this.z -= vec.z;
};

/**
 *
 * @param {Number} s
 */
b9.Vector3D.prototype.mul = function(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
};

/**
 * @param {Number} s
 */
b9.Vector3D.prototype.div = function(s) {
    this._s1 = 1.0 / s;
    this.x *= this._s1;
    this.y *= this._s1;
    this.z *= this._s1;
};

/**
 *
 */
b9.Vector3D.prototype.norm = function() {
    return b9.Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

/**
 *
 */
b9.Vector3D.prototype.sqNorm = function() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
};

/**
 *
 */
b9.Vector3D.prototype.dist = function(vec) {
    Vector3D._v1.set(this);
    Vector3D._v1.sub(vec);
    return Vector3D._v1.norm();
};

/**
 *
 */
b9.Vector3D.prototype.sqDist = function(vec) {
    Vector3D._v1.set(this);
    Vector3D._v1.sub(vec);
    return Vector3D._v1.sqNorm();
};

/**
 *
 */
b9.Vector3D.prototype.dot = function(vec) {
    return this.x * vec.x + this.y * vec.y + this.z * vec.z;
};

/**
 *
 */
b9.Vector3D.prototype.rotate = function(deg) {
    Vector3D._s1 = b9.Math.sin(deg);
    Vector3D._s2 = b9.Math.cos(deg);

    Vector3D._v1.x = x * Vector3D._s2 - y * Vector3D._s1;
    Vector3D._v1.y = y * Vector3D._s2 + x * Vector3D._s1;

    this.set(Vector3D._v1);
};

/**
 *
 */
b9.Vector3D.prototype.rotate_int = function(deg) {
    Vector3D._s1 = b9.Math.sin_int(deg);
    Vector3D._s2 = b9.Math.cos_int(deg);

    Vector3D._v1.x = x * Vector3D._s2 - y * Vector3D._s1;
    Vector3D._v1.y = y * Vector3D._s2 + x * Vector3D._s1;

    this.set(Vector3D._v1);
};

/**
 *
 */
b9.Vector3D.prototype.normalize = function() {
    Vector3D._s1 = this.mag();
    this.div(Vector3D._s1);
};

/**
 *
 */
b9.Vector3D.prototype.interp = function(aim, ratio) {
    /*
    if (ratio < ckMath::EPSILON)
    {
        return *this;
    }
    else if (ratio > 1.0f - ckMath::EPSILON)
    {
        return to;
    }
    else
    {
        return *this * (1.0f - ratio) + to * ratio;
    }
    */
};

/**
 *
 */
b9.Vector3D.prototype.toLocal = function(mat) {
    /*
    ckVec vec = *this - mat.trans;

    return ckVec( //
        vec.dot(mat.x_axis) / mat.x_axis.sqLength(), //
        vec.dot(mat.y_axis) / mat.y_axis.sqLength(), //
        vec.dot(mat.z_axis) / mat.z_axis.sqLength());
    */
};

/**
 *
 */
b9.Vector3D.prototype.toGlobal= function(mat) {
    /*
    return mat.x_axis * x + mat.y_axis * y + mat.z_axis * z + mat.trans;
    */
};

/**
 *
 */
b9.Vector3D.prototype.toLocal_noTrans = function(mat) {
    /*
    return ckVec( //
        dot(mat.x_axis) / mat.x_axis.sqLength(), //
        dot(mat.y_axis) / mat.y_axis.sqLength(), //
        dot(mat.z_axis) / mat.z_axis.sqLength());
    */
};

/**
 *
 */
b9.Vector3D.prototype.toGlobal_noTrans = function(mat) {
    /*
    return mat.x_axis * x + mat.y_axis * y + mat.z_axis * z;
    */
}
