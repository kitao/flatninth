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
 * Constructs a sprite.
 *
 * @class A derived class of the b9.Node class, which draws a rectangle.
 * @extends b9.Node
 *
 * @param {Number} [uniCount] The number of the shader uniforms. If not specified, 0 is used.
 * @param {Number} [texCount] The number of the textures. This number is must be equal to or more than 1.
 * If not specified, 1 is used.
 */
b9.Sprite = b9.createClass(b9.Node);

/**
 * @ignore
 */
b9.Primitive.prototype.initialize = function(primMode, primBuf, uniCount, texCount) {
    this.initializeSuper();

    // TODO
};

/**
 * Destructs this sprite.
 */
b9.Sprite.prototype.finalize = function() {
    this.finalizeSuper();
};

b9.Sprite.prototype._draw = function(worldToScreenArray) {
    // TODO
};
