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
 * Constructs an OpenGL buffer state.
 *
 * @class Manages the state which determines whether an OpenGL buffer needs to be updated.
 */
b9.GLBufferState = b9.createClass();

/**
 * @ignore
 */
b9.GLBufferState.prototype.initialize = function() {
    this._isNeedToUpdate = true;
};

/**
 * Returns whether an OpenGL buffer needs to be updated.
 * @return {Boolean} true if an OpenGL buffer needs to be updated; false otherwise.
 */
b9.GLBufferState.prototype.checkUpdate = function() {
    return this._isNeedToUpdate;
};

/**
 * Declares that an OpenGL buffer needs to be updated.
 */
b9.GLBufferState.prototype.requestUpdate = function() {
    this._isNeedToUpdate = false;
};

/**
 * Declares that an OpenGL buffer is updated.
 */
b9.GLBufferState.prototype.finishUpdate = function() {
    this._isNeedToUpdate = false;
};
