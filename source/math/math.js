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

b9.Math = {};

/**
 * {Number}
 */
b9.Math.EPSILON = 0.0001; // TODO

/**
 * {Number}
 */
b9.Math.PI = Math.PI;

/**
 * {Number}
 */
b9.Math.DEG_TO_RAD = b9.Math.PI / 180.0;

/**
 * {Number}
 */
b9.Math.RAD_TO_DEG = 180.0 / b9.Math.PI;

/**
 *
 */
b9.Math.floor = function(x) {
    return Math.floor(x);
};

/**
 *
 */
b9.Math.abs = function(x) {
    return (x >= 0.0) ? x : -x;
};

/**
 *
 */
b9.Math.min = function(a, b) {
    return (a < b) return a : b;
};

/**
 *
 */
b9.Math.max = function(a, b) {
    return (a > b) return a : b;
};

/**
 *
 */
b9.Math.clamp = function(x, min, max) {
    return (x < min) ? min : ((x > max) ? max : x);
};

/**
 * {Number}
 */
b9.Math.sqrt = function(s) {
    return Math.sqrt(s);
};

/**
 *
 */
b9.Math.sin_float = function(deg) {
    return Math.sin(deg * b9.Math.DEG_TO_RAD);
};

/**
 *
 */
b9.Math.cos_float = function(deg) {
    return Math.cos(deg * b9.Math.DEG_TO_RAD);
};

/**
 *
 */
b9.Math.sin_int = function(deg) {
    /*
    if (deg < 0)
    {
        deg -= (deg / 360 - 1) * 360;
    }

    deg %= 360;

    return (deg < 180) ? s_sin_tbl[deg] : -s_sin_tbl[deg - 180];
    */
};

/**
 *
 */
b9.Math.cos_int = function(deg) {
    return b9.Math.sin_int(deg + 90);
};

/**
 *
 */
b9.Math.asin = function(x) {
    return Math.asin(x) * b9.Math.RAD_TO_DEG;
};

/**
 *
 */
b9.Math.acos = function(x) {
    return Math.acos(x) * b9.Math.RAD_TO_DEG;
};

/**
 *
 */
b9.Math.atan2 = function(y, x) {
    return Math.atan2(y, x) * b9.Math.RAD_TO_DEG;
};

/**
 *
 */
b9.Math.srand = function(seed) {
    // TODO
};

/**
 *
 */
b9.Math.random_int = function(from, to) {
    if (to >= from) {
        b9._n1 = to - from + 1;
        return from + b9.Math.floor(Math.random() * b9._n1);
    } else {
        b9._n1 = from - to + 1;
        return from - b9.Math.floor(Math.random() * b9._n1);
    }
};

/**
 *
 */
b9.Math.random_float = function(from, to, interval) {
    interval = b9.Math.abs(interval);

    if (to >= from) {
        b9._f1 = b9.Math.floor((to - from) / interval + 1.0);
        return from + b9.Math.floor(Math.random() * b9._f1) * interval;
    } else {
        b9._f1 = b9.Math.floor((from - to) / interval + 1.0);
        return from - b9.Math.floor(Math.random() * b9._f1) * interval;
    }
};

/**
 *
 */
b9.Math.interp = function(from, to, ratio) {
    if (ratio < b9.Math.EPSILON) {
        return from;
    } else if (ratio > 1.0 - b9.Math.EPSILON) {
        return to;
    } else {
        return from * (1.0 - ratio) + to * ratio;
    };
};

/*
static const r32 s_sin_tbl[180] =
{
    0.000000f, 0.017452f, 0.034899f, 0.052336f, 0.069756f, 0.087156f, //
    0.104528f, 0.121869f, 0.139173f, 0.156434f, 0.173648f, 0.190809f, //
    0.207912f, 0.224951f, 0.241922f, 0.258819f, 0.275637f, 0.292372f, //
    0.309017f, 0.325568f, 0.342020f, 0.358368f, 0.374607f, 0.390731f, //
    0.406737f, 0.422618f, 0.438371f, 0.453991f, 0.469472f, 0.484810f, //
    0.500000f, 0.515038f, 0.529919f, 0.544639f, 0.559193f, 0.573576f, //
    0.587785f, 0.601815f, 0.615662f, 0.629320f, 0.642788f, 0.656059f, //
    0.669131f, 0.681998f, 0.694658f, 0.707107f, 0.719340f, 0.731354f, //
    0.743145f, 0.754710f, 0.766044f, 0.777146f, 0.788011f, 0.798636f, //
    0.809017f, 0.819152f, 0.829038f, 0.838671f, 0.848048f, 0.857167f, //
    0.866025f, 0.874620f, 0.882948f, 0.891007f, 0.898794f, 0.906308f, //
    0.913545f, 0.920505f, 0.927184f, 0.933580f, 0.939693f, 0.945519f, //
    0.951057f, 0.956305f, 0.961262f, 0.965926f, 0.970296f, 0.974370f, //
    0.978148f, 0.981627f, 0.984808f, 0.987688f, 0.990268f, 0.992546f, //
    0.994522f, 0.996195f, 0.997564f, 0.998630f, 0.999391f, 0.999848f, //
    1.000000f, 0.999848f, 0.999391f, 0.998630f, 0.997564f, 0.996195f, //
    0.994522f, 0.992546f, 0.990268f, 0.987688f, 0.984808f, 0.981627f, //
    0.978148f, 0.974370f, 0.970296f, 0.965926f, 0.961262f, 0.956305f, //
    0.951056f, 0.945519f, 0.939693f, 0.933580f, 0.927184f, 0.920505f, //
    0.913545f, 0.906308f, 0.898794f, 0.891006f, 0.882948f, 0.874620f, //
    0.866025f, 0.857167f, 0.848048f, 0.838671f, 0.829037f, 0.819152f, //
    0.809017f, 0.798635f, 0.788011f, 0.777146f, 0.766044f, 0.754709f, //
    0.743145f, 0.731354f, 0.719340f, 0.707107f, 0.694658f, 0.681998f, //
    0.669130f, 0.656059f, 0.642788f, 0.629320f, 0.615661f, 0.601815f, //
    0.587785f, 0.573576f, 0.559193f, 0.544639f, 0.529919f, 0.515038f, //
    0.500000f, 0.484810f, 0.469472f, 0.453990f, 0.438371f, 0.422618f, //
    0.406737f, 0.390731f, 0.374606f, 0.358368f, 0.342020f, 0.325568f, //
    0.309017f, 0.292372f, 0.275637f, 0.258819f, 0.241922f, 0.224951f, //
    0.207912f, 0.190809f, 0.173648f, 0.156434f, 0.139173f, 0.121869f, //
    0.104528f, 0.087156f, 0.069756f, 0.052336f, 0.034899f, 0.017452f
};
*/
