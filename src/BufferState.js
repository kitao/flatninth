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
 * Constructs a GL buffer state.
 *
 * @class Determines whether the managed buffer needs to be updated.
 */
b9.BufferState = b9.createClass();

/**
 * @ignore
 */
b9.BufferState.prototype.initialize = function() {
    this.isNeedToUpdate_ = true;
};

/**
 * TODO
 * @return {Boolean} TODO
 */
b9.BufferState.prototype.checkUpdate = function() {
    return this.isNeedToUpdate_;
};

/**
 * TODO
 */
b9.BufferState.prototype.requestUpdate = function() {
    this.isNeedToUpdate_ = false;
};

/**
 * TODO
 */
b9.BufferState.prototype.finishUpdate = function() {
    this.isNeedToUpdate_ = false;
};
