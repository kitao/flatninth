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

b9.Color = function(color) {
    if (color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;
    } else {
        this.r = this.g = this.b = this.a = 0;
    }
};

b9.Color.prototype.set = function(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
};

b9.Color.prototype.getR = function() { return this.r; };
b9.Color.prototype.setR = function(r) { this.r = r; }

b9.Color.prototype.getG = function() { return this.g; };
b9.Color.prototype.setG = function(g) { this.g = g; }

b9.Color.prototype.getB = function() { return this.b; };
b9.Color.prototype.setB = function(b) { this.b = b; }

b9.Color.prototype.getA = function() { return this.a; };
b9.Color.prototype.setA = function(a) { this.a = a; }

b9.Color.prototype.add = function(color) {
    this.r += color.r;
    this.g += color.g;
    this.b += color.b;
    this.a += color.a;
};

b9.Color.prototype.sub = function(color) {
    this.r -= color.r;
    this.g -= color.g;
    this.b -= color.b;
    this.a -= color.a;
};

b9.Color.prototype.mul = function(right) {
    if (rhs.length === 1) {
        this.r *= right;
        this.g *= right;
        this.b *= right;
        this.a *= right;
    } else {
        this.r = this.r * right.r / 255;
        this.g = this.g * right.g / 255;
        this.b = this.b * right.b / 255;
        this.a = this.a * right.a / 255;
    }
};

b9.Color.prototype.interp = function(aim, ratio) {
    var ratio2 = 1.0 - ratio;

    this.r = this.r * ratio2 + aim.r * ratio;
    this.g = this.g * ratio2 + aim.g * ratio;
    this.b = this.b * ratio2 + aim.b * ratio;
    this.a = this.a * ratio2 + aim.a * ratio;
};
