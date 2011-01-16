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
 * Constructs a color. The following forms are allowed:
 * <ul>
 * <li>b9.Color()</li>
 * <li>b9.Color(b9.Color color_to_be_cloned)</li>
 * <li>b9.Color(Uint8Array array_to_be_referenced, int array_index_of_first_component)</li>
 * <li>b9.Color(Uint8 r, Uint8 g, Uint8 b, Uint8 a = 255)</li>
 * </ul>
 *
 * @class A color which is represented by red, green, blue, and alpha components.<br>
 * Each component ranges between 0..255 with 0 meaning no contribution for that component,
 * and 255 meaning 100% contribution.
 *
 * @param {b9.Color|Uint8Array|Number} [color_or_array_or_r]
 * A color to be cloned, an array to be referenced, or a red component.
 * @param {Number} [index_or_g] The array index of the first component or a green component.
 * @param {Number} [b] A blue component.
 * @param {Number} [a] An alpha component. If not specified, 255 is used.
 */
b9.Color = b9.createClass();

/**
 * @ignore
 */
b9.Color.prototype.initialize = function(color_or_array_or_r, index_or_g, b, a) {
    var array = this._array = (arguments.length === 2) ? color_or_array_or_r : new Uint8Array(4);
    var index = this._index = (arguments.length === 2) ? index_or_g : 0;
    var color_array, color_index;

    if (arguments.length === 1) {
        color_array = color_or_array_or_r._array;
        color_index = color_or_array_or_r._index;

        array[index] = color_array[color_index];
        array[index + 1] = color_array[color_index + 1];
        array[index + 2] = color_array[color_index + 2];
        array[index + 3] = color_array[color_index + 3];
    } else if (arguments.length === 3) {
        array[index] = color_or_array_or_r;
        array[index + 1] = index_or_g;
        array[index + 2] = b;
        array[index + 3] = 255;
    } else if (arguments.length === 4) {
        array[index] = color_or_array_or_r;
        array[index + 1] = index_or_g;
        array[index + 2] = b;
        array[index + 3] = a;
    }
};

/**
 * Returns the red component of this color.
 * @return {Number} The red component.
 */
b9.Color.prototype.getR = function() {
    return this._array[this._index];
};

/**
 * Sets a red component to this color.
 * @param {Number} r A red component.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.setR = function(r) {
    this._array[this._index] = r;

    return this;
};

/**
 * Returns the green component of this color.
 * @return {Number} The green component.
 */
b9.Color.prototype.getG = function() {
    return this._array[this._index + 1];
};

/**
 * Sets a green component to this color.
 * @param {Number} g A green component.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.setG = function(g) {
    this._array[this._index + 1] = g;

    return this;
};

/**
 * Returns the blue component of this color.
 * @return {Number} The blue component.
 */
b9.Color.prototype.getB = function() {
    return this._array[this._index + 2];
};

/**
 * Sets a blue component to this color.
 * @param {Number} b A blue component.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.setB = function(b) {
    this._array[this._index + 2] = b;

    return this;
};

/**
 * Returns the alpha component of this color.
 * @return {Number} The alpha component.
 */
b9.Color.prototype.getA = function() {
    return this._array[this._index + 3];
};

/**
 * Sets an alpha component to this color.
 * @param {Number} a An alpha component.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.setA = function(a) {
    this._array[this._index + 3] = a;

    return this;
};

/**
 * Sets all of the components to this color. The following forms are allowed:
 * <ul>
 * <li>b9.Color(b9.Color color_to_be_cloned)</li>
 * <li>b9.Color(Uint8 r, Uint8 g, Uint8 b, Uint8 a = 255)</li>
 * </ul>
 * @param {b9.Color|Number} [color_or_r] A color to be cloned or a red component.
 * @param {Number} [g] A green component.
 * @param {Number} [b] A blue component.
 * @param {Number} [a] An alpha component. If not specified, 255 is used.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.set = function(color_or_r, g, b, a) {
    var array = this._array;
    var index = this._index;
    var color_array, color_index;

    if (arguments.length === 1) {
        color_array = color_or_r._array;
        color_index = color_or_r._index;

        array[index] = color_array[color_index];
        array[index + 1] = color_array[color_index + 1];
        array[index + 2] = color_array[color_index + 2];
        array[index + 3] = color_array[color_index + 3];
    } else if (arguments.length === 3) {
        array[index] = color_or_r;
        array[index + 1] = g;
        array[index + 2] = b;
        array[index + 3] = 255;
    } else if (arguments.length === 4) {
        array[index] = color_or_r;
        array[index + 1] = g;
        array[index + 2] = b;
        array[index + 3] = a;
    }

    return this;
};

/**
 * Returns the array of this color.
 * @return The array.
 */
b9.Color.prototype.getArray = function() {
    return this._array;
};

/**
 * Returns the array index of the first component.
 * @return The array index.
 */
b9.Color.prototype.getIndex = function() {
    return this._index;
};

/**
 * Adds a color to this color.
 * @param {b9.Color} color A color.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.add = function(color) {
    var array = this._array;
    var index = this._index;
    var color_array = color._array;
    var color_index = color._index;

    array[index] = b9.Math.min(array[index] + color_array[color_index], 255);
    array[index + 1] = b9.Math.min(array[index + 1] + color_array[color_index + 1], 255);
    array[index + 2] = b9.Math.min(array[index + 2] + color_array[color_index + 2], 255);
    array[index + 3] = b9.Math.min(array[index + 3] + color_array[color_index + 3], 255);

    return this;
};

/**
 * Subtracts a color from this color.
 * @param {b9.Color} color A color.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.sub = function(color) {
    var array = this._array;
    var index = this._index;
    var color_array = color._array;
    var color_index = color._index;

    array[index] = b9.Math.max(array[index] - color_array[color_index], 0);
    array[index + 1] = b9.Math.max(array[index + 1] - color_array[color_index + 1], 0);
    array[index + 2] = b9.Math.max(array[index + 2] - color_array[color_index + 2], 0);
    array[index + 3] = b9.Math.max(array[index + 3] - color_array[color_index + 3], 0);

    return this;
};

/**
 * Multiplies this color with a color or a scalar value.
 * @param {b9.Color|Number} color_os_s A color or a scalar value.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.mul = function(color_or_s) {
    var array = this._array;
    var index = this._index;
    var color_array, color_index;

    if (color_or_s._array) {
        color_array = color_or_s._array;
        color_index = color_or_s._index;

        array[index] = ((array[index] + 1) * (color_array[color_index] + 1) - 1) >> 8;
        array[index + 1] = ((array[index + 1] + 1) * (color_array[color_index + 1] + 1) - 1) >> 8;
        array[index + 2] = ((array[index + 2] + 1) * (color_array[color_index + 2] + 1) - 1) >> 8;
        array[index + 3] = ((array[index + 3] + 1) * (color_array[color_index + 3] + 1) - 1) >> 8;
    } else {
        array[index] = b9.Math.clamp(array[index] * color_or_s, 0, 255);
        array[index + 1] = b9.Math.clamp(array[index + 1] * color_or_s, 0, 255);
        array[index + 2] = b9.Math.clamp(array[index + 2] * color_or_s, 0, 255);
        array[index + 3] = b9.Math.clamp(array[index + 3] * color_or_s, 0, 255);
    }

    return this;
};

/**
 * Divides this color by a scalar value.
 * @param {Number} s A scalar value.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.div = function(s) {
    var array = this._array;
    var index = this._index;
    var rs = 1.0 / s;

    array[index] = b9.Math.clamp(array[index] * rs, 0, 255);
    array[index + 1] = b9.Math.clamp(array[index + 1] * rs, 0, 255);
    array[index + 2] = b9.Math.clamp(array[index + 2] * rs, 0, 255);
    array[index + 3] = b9.Math.clamp(array[index + 3] * rs, 0, 255);

    return this;
};

/**
 * Interpolates this color to a color by a ratio.
 * @param {b9.Color} to A destination color.
 * @param {Number} ratio The value which indicates how far to interpolate between the two colors.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.lerp = function(to, ratio) {
    var array = this._array;
    var index = this._index;
    var to_array = to._array;
    var to_index = to._index;
    var inv_ratio;

    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        inv_ratio = 1.0 - ratio;

        array[index] = array[index] * inv_ratio + to_array[to_index] * ratio;
        array[index + 1] = array[index + 1] * inv_ratio + to_array[to_index + 1] * ratio;
        array[index + 2] = array[index + 2] * inv_ratio + to_array[to_index + 2] * ratio;
        array[index + 3] = array[index + 3] * inv_ratio + to_array[to_index + 3] * ratio;
    }

    return this;
};

/**
 * Returns whether this color equals a color.
 * @param {b9.Color} vec A color.
 * @return {Boolean} true if the two colors are equal; false otherwise.
 */
b9.Color.prototype.equals = function(color) {
    var array = this._array;
    var index = this._index;
    var color_array = color._array;
    var color_index = color._index;

    return (array[index] === color_array[color_index] &&
            array[index + 1] === color_array[color_index + 1] &&
            array[index + 2] === color_array[color_index + 2] &&
            array[index + 3] === color_array[color_index + 3]);
};

/**
 * Returns a string representation of this color.
 * @return {String} A string representation of this color.
 */
b9.Color.prototype.toString = function() {
    var array = this._array;
    var index = this._index;

    var str = "(";
    str += array[index];
    str += ", ";
    str += array[index + 1];
    str += ", ";
    str += array[index + 2];
    str += ", ";
    str += array[index + 3];
    str += ")";

    return str;
};
