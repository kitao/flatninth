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
 * @class An ID based on a string.
 * @param {String} seed A seed of an ID. When not specified, generate the unique ID automatically.
 */
b9.ID = function(seed)
{
    /** private */
    this._value = undefined;

    if (seed)
    {
        this._value = 0;

        for (var i in seed)
        {
            this._value = this._value * 37 + seed.charCodeAt(i);
        }

        this._value = -this._value;
    }
    else
    {
        this._value = b9.ID._cur_value;
        b9.ID._cur_value++;
    }
};

/**
 * @param {b9.ID} id
 * @returns {Boolean} Whether an ID is equal to this ID.
 */
b9.ID.prototype.isEqual = function(id)
{
    return (this._value == id._value);
};

/**
 * {b9.ID} The invalid ID.
 */
b9.ID.ZERO = new b9.ID();

/** @private */
b9.ID._cur_value = 0;
