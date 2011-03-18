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
 * <li>b9.Color(b9.Color colorToBeCloned)</li>
 * <li>b9.Color(Uint8Array arrayToBeReferenced, int arrayIndexOfFirstComponent)</li>
 * <li>b9.Color(Uint8 r, Uint8 g, Uint8 b, Uint8 a = 255)</li>
 * </ul>
 *
 * @class A color which is represented by red, green, blue, and alpha components.<br>
 * Each component ranges between 0..255 with 0 meaning no contribution for that component,
 * and 255 meaning 100% contribution.
 *
 * @param {b9.Color|Uint8Array|number} [arg1]
 * A color to be cloned, an array to be referenced, or a red component.
 * @param {number} [arg2] The array index of the first component or a green component.
 * @param {number} [arg3] A blue component.
 * @param {number} [arg4] An alpha component. If not specified, 255 is used.
 */
b9.Color = b9.createClass();

/**
 * @ignore
 */
b9.Color.prototype.initialize = function(arg1, arg2, arg3, arg4) {
    var array = this.array_ = (arguments.length === 2) ? arg1 : new Uint8Array(4);
    var index = this.index_ = (arguments.length === 2) ? arg2 : 0;
    var colorArray, colorIndex;

    if (arguments.length === 1) {
        colorArray = arg1.array_;
        colorIndex = arg1.index_;

        array[index] = colorArray[colorIndex];
        array[index + 1] = colorArray[colorIndex + 1];
        array[index + 2] = colorArray[colorIndex + 2];
        array[index + 3] = colorArray[colorIndex + 3];
    } else if (arguments.length === 3) {
        array[index] = arg1;
        array[index + 1] = arg2;
        array[index + 2] = arg3;
        array[index + 3] = 255;
    } else if (arguments.length === 4) {
        array[index] = arg1;
        array[index + 1] = arg2;
        array[index + 2] = arg3;
        array[index + 3] = arg4;
    }
};

/**
 * Returns the red component of this color.
 * @return {number} The red component.
 */
b9.Color.prototype.getR = function() {
    return this.array_[this.index_];
};

/**
 * Sets a red component to this color.
 * @param {number} r A red component.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.setR = function(r) {
    this.array_[this.index_] = r;

    return this;
};

/**
 * Returns the green component of this color.
 * @return {number} The green component.
 */
b9.Color.prototype.getG = function() {
    return this.array_[this.index_ + 1];
};

/**
 * Sets a green component to this color.
 * @param {number} g A green component.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.setG = function(g) {
    this.array_[this.index_ + 1] = g;

    return this;
};

/**
 * Returns the blue component of this color.
 * @return {number} The blue component.
 */
b9.Color.prototype.getB = function() {
    return this.array_[this.index_ + 2];
};

/**
 * Sets a blue component to this color.
 * @param {number} b A blue component.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.setB = function(b) {
    this.array_[this.index_ + 2] = b;

    return this;
};

/**
 * Returns the alpha component of this color.
 * @return {number} The alpha component.
 */
b9.Color.prototype.getA = function() {
    return this.array_[this.index_ + 3];
};

/**
 * Sets an alpha component to this color.
 * @param {number} a An alpha component.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.setA = function(a) {
    this.array_[this.index_ + 3] = a;

    return this;
};

/**
 * Sets all of the components to this color. The following forms are allowed:
 * <ul>
 * <li>b9.Color(b9.Color colorToBeCloned)</li>
 * <li>b9.Color(Uint8 r, Uint8 g, Uint8 b, Uint8 a = 255)</li>
 * </ul>
 * @param {b9.Color|number} [arg1] A color to be cloned or a red component.
 * @param {number} [arg2] A green component.
 * @param {number} [arg3] A blue component.
 * @param {number} [arg4] An alpha component. If not specified, 255 is used.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.set = function(arg1, arg2, arg3, arg4) {
    var array = this.array_;
    var index = this.index_;
    var colorArray, colorIndex;

    if (arguments.length === 1) {
        colorArray = arg1.array_;
        colorIndex = arg1.index_;

        array[index] = colorArray[colorIndex];
        array[index + 1] = colorArray[colorIndex + 1];
        array[index + 2] = colorArray[colorIndex + 2];
        array[index + 3] = colorArray[colorIndex + 3];
    } else if (arguments.length === 3) {
        array[index] = arg1;
        array[index + 1] = arg2;
        array[index + 2] = arg3;
        array[index + 3] = 255;
    } else if (arguments.length === 4) {
        array[index] = arg1;
        array[index + 1] = arg2;
        array[index + 2] = arg3;
        array[index + 3] = arg4;
    }

    return this;
};

/**
 * Returns the array of this color.
 * @return The array.
 */
b9.Color.prototype.getArray = function() {
    return this.array_;
};

/**
 * Returns the array index of the first component.
 * @return The array index.
 */
b9.Color.prototype.getIndex = function() {
    return this.index_;
};

/**
 * Adds a color to this color.
 * @param {b9.Color} color A color.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.add = function(color) {
    var array = this.array_;
    var index = this.index_;
    var colorArray = color.array_;
    var colorIndex = color.index_;

    array[index] = b9.Math.min(array[index] + colorArray[colorIndex], 255);
    array[index + 1] = b9.Math.min(array[index + 1] + colorArray[colorIndex + 1], 255);
    array[index + 2] = b9.Math.min(array[index + 2] + colorArray[colorIndex + 2], 255);
    array[index + 3] = b9.Math.min(array[index + 3] + colorArray[colorIndex + 3], 255);

    return this;
};

/**
 * Subtracts a color from this color.
 * @param {b9.Color} color A color.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.sub = function(color) {
    var array = this.array_;
    var index = this.index_;
    var colorArray = color.array_;
    var colorIndex = color.index_;

    array[index] = b9.Math.max(array[index] - colorArray[colorIndex], 0);
    array[index + 1] = b9.Math.max(array[index + 1] - colorArray[colorIndex + 1], 0);
    array[index + 2] = b9.Math.max(array[index + 2] - colorArray[colorIndex + 2], 0);
    array[index + 3] = b9.Math.max(array[index + 3] - colorArray[colorIndex + 3], 0);

    return this;
};

/**
 * Multiplies this color with a color or a scalar value.
 * @param {b9.Color|number} colorOrScalar A color or a scalar value.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.mul = function(colorOrScalar) {
    var array = this.array_;
    var index = this.index_;
    var colorArray, colorIndex;

    if (colorOrScalar.array_) {
        colorArray = colorOrScalar.array_;
        colorIndex = colorOrScalar.index_;

        array[index] = ((array[index] + 1) * (colorArray[colorIndex] + 1) - 1) >> 8;
        array[index + 1] = ((array[index + 1] + 1) * (colorArray[colorIndex + 1] + 1) - 1) >> 8;
        array[index + 2] = ((array[index + 2] + 1) * (colorArray[colorIndex + 2] + 1) - 1) >> 8;
        array[index + 3] = ((array[index + 3] + 1) * (colorArray[colorIndex + 3] + 1) - 1) >> 8;
    } else {
        array[index] = b9.Math.clamp(array[index] * colorOrScalar, 0, 255);
        array[index + 1] = b9.Math.clamp(array[index + 1] * colorOrScalar, 0, 255);
        array[index + 2] = b9.Math.clamp(array[index + 2] * colorOrScalar, 0, 255);
        array[index + 3] = b9.Math.clamp(array[index + 3] * colorOrScalar, 0, 255);
    }

    return this;
};

/**
 * Divides this color by a scalar value.
 * @param {number} s A scalar value.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.div = function(s) {
    var array = this.array_;
    var index = this.index_;
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
 * @param {number} ratio The value which indicates how far to interpolate between the two colors.
 * @return {b9.Color} This color.
 */
b9.Color.prototype.lerp = function(to, ratio) {
    var array = this.array_;
    var index = this.index_;
    var toArray = to.array_;
    var toIndex = to.index_;
    var invRatio;

    if (ratio > 1.0 - b9.Math.EPSILON) {
        this.set(to);
    } else if (ratio >= b9.Math.EPSILON) {
        invRatio = 1.0 - ratio;

        array[index] = array[index] * invRatio + toArray[toIndex] * ratio;
        array[index + 1] = array[index + 1] * invRatio + toArray[toIndex + 1] * ratio;
        array[index + 2] = array[index + 2] * invRatio + toArray[toIndex + 2] * ratio;
        array[index + 3] = array[index + 3] * invRatio + toArray[toIndex + 3] * ratio;
    }

    return this;
};

/**
 * Returns whether this color equals a color.
 * @param {b9.Color} vec A color.
 * @return {Boolean} true if the two colors are equal; false otherwise.
 */
b9.Color.prototype.equals = function(color) {
    var array = this.array_;
    var index = this.index_;
    var colorArray = color.array_;
    var colorIndex = color.index_;

    return (array[index] === colorArray[colorIndex] &&
            array[index + 1] === colorArray[colorIndex + 1] &&
            array[index + 2] === colorArray[colorIndex + 2] &&
            array[index + 3] === colorArray[colorIndex + 3]);
};

/**
 * Returns a string representation of this color.
 * @return {string} A string representation of this color.
 */
b9.Color.prototype.toString = function() {
    var array = this.array_;
    var index = this.index_;
    var str;

    str = "(";
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
