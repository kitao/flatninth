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
 * @class Provides debugging functions.
 */
b9.Debug = {};

/**
 * Prints a trace log.
 * @param {String} msg a trace message.
 */
b9.Debug.trace = function(msg)
{
    console.log(msg);
};

/**
 * Assertion.
 * @param {String} test_str A test expression.
 * @param {Object} this_obj An object of a test expression.
 */
b9.Debug.assert = function(test_str, this_obj)
{
    var func = new Function("return (" + test_str + ");");

    if (!func.apply(this_obj))
    {
        var msg = "assertion failed: " + test_str;

        b9.Debug.trace(msg);
        throw new Error(msg);
    }
};
