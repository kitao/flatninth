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
 * @namespace Flatninth package. For your information, "b" means flat and "9" means ninth. :)
 */
var b9 = {};

/**
 * The string of the version number of Flatninth.
 * @return {String}
 */
b9.VERSION = 0.01;

/**
 * Creates a new class which provides constructor/destructor mechanism.<br>
 * The method named initialize is called when an instance is created,
 * and the method named finalize is called when an instance is deleted by calling the finalize method.<br>
 * If the created class has a base class, it also provides the initializeSuper method and the finalizeSuper method.
 * The constructor and destructor of the base class can be called with these methods respectively.
 * @param {Object} [super_class] A base class.
 * @return {Object} A class object.
 */
b9.createClass = function(super_class) {
    var sub_class = function() {
        if (sub_class.prototype.initialize) {
            sub_class.prototype.initialize.apply(this, arguments);
        }
    };

    if (super_class) {
        var temp_class = function() {};
        temp_class.prototype = super_class.prototype;
        sub_class.prototype = new temp_class();
        sub_class.prototype.constructor = sub_class;

        if (super_class.prototype.initialize) {
            /** @ignore */
            sub_class.prototype.initializeSuper = function() {
                var temp_method = this.initializeSuper;
                this.initializeSuper = super_class.prototype.initializeSuper || null;

                super_class.prototype.initialize.apply(this, arguments);

                if (this.constructor === sub_class) {
                    delete this.initializeSuper;
                } else {
                    this.initializeSuper = temp_method;
                }
            };
        }

        if (super_class.prototype.finalize) {
            /** @ignore */
            sub_class.prototype.finalizeSuper = function() {
                var temp_method = this.finalizeSuper;
                this.finalizeSuper = super_class.prototype.finalizeSuper || null;

                super_class.prototype.finalize.apply(this, arguments);

                if (this.constructor === sub_class) {
                    delete this.finalizeSuper;
                } else {
                    this.finalizeSuper = temp_method;
                }
            };
        }
    }

    return sub_class;
};
