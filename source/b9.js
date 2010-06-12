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
 * @namespace Flatninth package.
 */
var b9 = {};

/**
 * hoge
 * @param {Object} [super_class] hoge
 * @return {Object} hoge
 */
b9.createClass = function(super_class) {
    var sub_class = function() {
        this.initialize.apply(this, arguments);
    };

    if (super_class) {
        var temp_class = function() {};
        temp_class.prototype = super_class.prototype;

        sub_class.prototype = new temp_class();
        sub_class.prototype.super_class = super_class;

        if (super_class.prototype.initialize) {
            sub_class.prototype.initializeSuper = super_class.prototype.initialize;
        }

        if (super_class.prototype.finalize) {
            sub_class.prototype.finalizeSuper = super_class.prototype.finalize;
        }

        sub_class.constructor = sub_class;
    }

    return sub_class;
};

/**
 * hoge
 * @param {Object} instance
 */
b9.release = function(instance) {
    if (instance.finalize) {
        instance.finalize();
    }
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.generateID = function() {
    b9.System._cur_id++;
    return b9.System._cur_id;
};

/**
 * hoge
 * @return {String}
 */
b9.VERSION = 0.01;

/**
 * hoge
 * @return {Number}
 */
b9.DIMENSION_2 = 2;

/**
 * hoge
 * @return {Number}
 */
b9.DIMENSION_3 = 3;

/** @private */
b9._cur_id = 0;
