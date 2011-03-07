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
 * @class
 */
b9.Resource = {};

b9.Resource._initialize = function() {
    this._res_table = {};
};

/**
 *
 * @param {String} res_name
 */
b9.Resource.get= function(res_name) {
    return this._res_table[res_name];
};

/**
 *
 * @param {String} res_name
 * @param {Object} obj
 */
b9.Resource.add = function(res_name, obj) {
    this._res_table[res_name] = obj;
};

/**
 *
 * @param {String} res_name
 */
b9.Resource.remove = function(res_name) {
    delete this._res_table[res_name];
};

/**
 *
 */
b9.Resource.dump = function() {
    // TODO
};
