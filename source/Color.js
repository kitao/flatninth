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
 * Constructs a color. The following forms are allowed:
 * <ul>
 * <li>b9.Color()</li>
 * <li>b9.Color(b9.Color color_to_be_cloned)</li>
 * <li>b9.Color(float r, float g, float b)</li>
 * <li>b9.Color(float r, float g, float b, float a)</li>
 * </ul>
 *
 * @class A color which is represented by red, green, blue, and alpha components.
 *
 * @param {b9.Color|Number} [color_or_r] A color to be cloned or a red component.
 * @param {Number} [g] A green component.
 * @param {Number} [b] A blue component.
 * @param {Number} [a] An alpha component. If not specified, 1.0(=opacity) is used.
 */
b9.Color = b9.createClass();

/**
 * @ignore
 */
b9.Color.prototype.initialize = function(color_or_r, g, b, a) {
    this._r = 0.0;
    this._g = 0.0;
    this._b = 0.0;
    this._a = 0.0;

    if (arguments.length === 1) {
        this._r = color_or_r._r;
        this._g = color_or_r._g;
        this._b = color_or_r._b;
        this._a = color_or_r._a;
    } else if (arguments.length === 3) {
        this._r = color_or_r;
        this._g = g;
        this._b = b;
        this._a = 1.0;
    } else if (arguments.length === 4) {
        this._r = color_or_r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    this._r = b9.Math.clamp(this._r, 0.0, 1.0);
    this._g = b9.Math.clamp(this._g, 0.0, 1.0);
    this._b = b9.Math.clamp(this._b, 0.0, 1.0);
    this._a = b9.Math.clamp(this._a, 0.0, 1.0);
};

/**
 * Returns the red component.
 * @return {Number} The red component.
 */
b9.Color.prototype.getR = function() {
    return this._r;
};

/**
 * Sets the red component.
 * @param {Number} r A red component.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.setR = function(r) {
    this._r = b9.Math.clamp(r, 0.0, 1.0);

    return this;
};

/**
 * Returns the green component.
 * @return {Number} The green component.
 */
b9.Color.prototype.getG = function() {
    return this._g;
};

/**
 * Sets the green component.
 * @param {Number} g A green component.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.setG = function(g) {
    this._g = b9.Math.clamp(g, 0.0, 1.0);

    return this;
};

/**
 * Returns the blue component.
 * @return {Number} The blue component.
 */
b9.Color.prototype.getB = function() {
    return this._b;
};

/**
 * Sets the blue component.
 * @param {Number} b A blue component.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.setB = function(b) {
    this._b = b9.Math.clamp(b, 0.0, 1.0);

    return this;
};

/**
 * Returns the alpha component.
 * @return {Number} The alpha component.
 */
b9.Color.prototype.getA = function() {
    return this._a;
};

/**
 * Sets the alpha component.
 * @param {Number} a An alpha component.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.setA = function(a) {
    this._a = b9.Math.clamp(a, 0.0, 1.0);

    return this;
};

/**
 * Sets all of the components to this color. The following forms are allowed:
 * <ul>
 * <li>b9.Color(b9.Color color_to_be_cloned)</li>
 * <li>b9.Color(float r, float g, float b)</li>
 * <li>b9.Color(float r, float g, float b, float a)</li>
 * </ul>
 * @param {b9.Color|Number} [color_or_r] A color to be cloned or a red component.
 * @param {Number} [g] A green component.
 * @param {Number} [b] A blue component.
 * @param {Number} [a] An alpha component. If not specified, 1.0(=opacity) is used.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.set = function(color_or_r, g, b, a) {
    if (arguments.length === 1) {
        this._r = color_or_r._r;
        this._g = color_or_r._g;
        this._b = color_or_r._b;
        this._a = color_or_r._a;
    } else if (arguments.length === 3) {
        this._r = color_or_r;
        this._g = g;
        this._b = b;
        this._a = 1.0;
    } else if (arguments.length === 4) {
        this._r = color_or_r;
        this._g = g;
        this._b = b;
        this._a = a;
    }

    this._r = b9.Math.clamp(this._r, 0.0, 1.0);
    this._g = b9.Math.clamp(this._g, 0.0, 1.0);
    this._b = b9.Math.clamp(this._b, 0.0, 1.0);
    this._a = b9.Math.clamp(this._a, 0.0, 1.0);

    return this;
};

/**
 * Adds a color to this color.
 * @param {b9.Color} color A color.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.add = function(color) {
    this._r = b9.Math.min(this._r + color._r, 1.0);
    this._g = b9.Math.min(this._g + color._g, 1.0);
    this._b = b9.Math.min(this._b + color._b, 1.0);
    this._a = b9.Math.min(this._a + color._a, 1.0);

    return this;
};

/**
 * Subtracts a color from this color.
 * @param {b9.Color} color A color.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.sub = function(color) {
    this._r = b9.Math.max(this._r - color._r, 0.0);
    this._g = b9.Math.max(this._g - color._g, 0.0);
    this._b = b9.Math.max(this._b - color._b, 0.0);
    this._a = b9.Math.max(this._a - color._a, 0.0);

    return this;
};

/**
 * Multiplies this color with a color or a scalar value.
 * @param {b9.Color|Number} color_os_s A color or a scalar value.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.mul = function(color_or_s) {
    if (color_or_s._r === undefined) {
        this._r *= color_or_s;
        this._g *= color_or_s;
        this._b *= color_or_s;
        this._a *= color_or_s;
    } else {
        this._r = this._r * color_or_s._r;
        this._g = this._g * color_or_s._g;
        this._b = this._b * color_or_s._b;
        this._a = this._a * color_or_s._a;
    }

    this._r = b9.Math.clamp(this._r, 0.0, 1.0);
    this._g = b9.Math.clamp(this._g, 0.0, 1.0);
    this._b = b9.Math.clamp(this._b, 0.0, 1.0);
    this._a = b9.Math.clamp(this._a, 0.0, 1.0);

    return this;
};

/**
 * Divides this color by a scalar value.
 * @param {Number} s A scalar value.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.div = function(s) {
    var rs = 1.0 / s;

    this._r = b9.Math.clamp(this._r * rs, 0.0, 1.0);
    this._g = b9.Math.clamp(this._g * rs, 0.0, 1.0);
    this._b = b9.Math.clamp(this._b * rs, 0.0, 1.0);
    this._a = b9.Math.clamp(this._a * rs, 0.0, 1.0);

    return this;
};

/**
 * Interpolates this color to a color by a ratio.
 * @param {b9.Color} to A destination color.
 * @param {Number} ratio The value which indicates how far to interpolate between the two colors.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.lerp = function(to, ratio) {
    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        var inv_ratio = 1.0 - ratio;

        this._r = b9.Math.clamp(this._r * inv_ratio + to._r * ratio, 0.0, 1.0);
        this._g = b9.Math.clamp(this._g * inv_ratio + to._g * ratio, 0.0, 1.0);
        this._b = b9.Math.clamp(this._b * inv_ratio + to._b * ratio, 0.0, 1.0);
        this._a = b9.Math.clamp(this._a * inv_ratio + to._a * ratio, 0.0, 1.0);
    }

    return this;
};

/**
 * Returns whether this color equals a color.
 * @param {b9.Color} vec A color.
 * @return {Boolean} true if the two colors are equal; false otherwise.
 */
b9.Color.prototype.equals = function(color) {
    return (b9.Math.equals_float(this._r, color._r) &&
            b9.Math.equals_float(this._g, color._g) &&
            b9.Math.equals_float(this._b, color._b) &&
            b9.Math.equals_float(this._a, color._a));
};

/**
 * Returns a string representation of this color.
 * @return {String} A string representation of this color.
 */
b9.Color.prototype.toString = function() {
    var str = "(";
    str += this._r;
    str += ", ";
    str += this._g;
    str += ", ";
    str += this._b;
    str += ", ";
    str += this._a;
    str += ")";

    return str;
};

/**
 * The color whose components are all 0.0.
 * @return {b9.Color}
 */
b9.Color.ZERO = new b9.Color(0.0, 0.0, 0.0, 0.0);

/**
 * The color whose compoenents are all 1.0.
 * @return {b9.Color}
 */
b9.Color.FULL = new b9.Color(1.0, 1.0, 1.0, 1.0);
