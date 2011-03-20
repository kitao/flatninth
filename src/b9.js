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
 * @namespace Flatninth package. For your information, "b" means flat and "9" means ninth. :)
 */
var b9 = {};

/**
 * The version number of Flatninth.
 * @constant
 * @return {Number}
 */
b9.VERSION = 0.01;

/**
 * Creates a new class which provides constructor/destructor mechanism.<br>
 * The method named initialize is called when an instance is created,
 * and the method named finalize is called when an instance is deleted by calling the finalize method.<br>
 * If the created class has a base class, the initializeSuper method and the finalizeSuper method are also provided.
 * These methods can call the constructor and destructor of the base class respectively.
 * @param {Object} [baseClass] A base class.
 * @return {Object} A class object.
 */
b9.createClass = function(baseClass) {
    var tempClass;
    var derivedClass = function() {
        if (derivedClass.prototype.initialize) {
            derivedClass.prototype.initialize.apply(this, arguments);
        }
    };

    if (baseClass) {
        tempClass = function() {};
        tempClass.prototype = baseClass.prototype;
        derivedClass.prototype = new tempClass();
        derivedClass.prototype.constructor = derivedClass;

        if (baseClass.prototype.initialize) {
            /** @ignore */
            derivedClass.prototype.initializeSuper = function() {
                var tempMethod = this.initializeSuper;
                this.initializeSuper = baseClass.prototype.initializeSuper || null;

                baseClass.prototype.initialize.apply(this, arguments);

                if (this.constructor === derivedClass) {
                    delete this.initializeSuper;
                } else {
                    this.initializeSuper = tempMethod;
                }
            };
        }

        if (baseClass.prototype.finalize) {
            /** @ignore */
            derivedClass.prototype.finalizeSuper = function() {
                var tempMethod = this.finalizeSuper;
                this.finalizeSuper = baseClass.prototype.finalizeSuper || null;

                baseClass.prototype.finalize.apply(this, arguments);

                if (this.constructor === derivedClass) {
                    delete this.finalizeSuper;
                } else {
                    this.finalizeSuper = tempMethod;
                }
            };
        }
    }

    return derivedClass;
};
