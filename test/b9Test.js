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

function test_b9() {
    /* VERSION */
    assertEquals(0.01, b9.VERSION);

    /* createClass */
    var test_class0 = b9.createClass();

    var ctor_count1 = 0;
    var dtor_count1 = 0;
    var test_class1 = b9.createClass();
    test_class1.prototype.initialize = function(param) { ctor_count1++; this.param = param; };
    test_class1.prototype.finalize = function() { dtor_count1++; };

    var ctor_count2 = 0;
    var dtor_count2 = 0;
    var test_class2 = b9.createClass(test_class1);
    test_class2.prototype.initialize = function() { ctor_count2++; this.initializeSuper(456); };
    test_class2.prototype.finalize = function() { dtor_count2++; this.finalizeSuper(); };

    var ctor_count3 = 0;
    var dtor_count3 = 0;
    var test_class3 = b9.createClass(test_class2);
    test_class3.prototype.initialize = function() { ctor_count3++; this.initializeSuper(); };
    test_class3.prototype.finalize = function() { dtor_count3++; this.finalizeSuper(); };

    var test_ins0 = new test_class0();

    var test_ins1 = new test_class1(123);

    assertUndefined(test_ins1.initializeSuper);
    assertUndefined(test_ins1.finalizeSuper);
    assertEquals(1, ctor_count1);
    assertEquals(0, dtor_count1);
    assertEquals(0, ctor_count2);
    assertEquals(0, dtor_count2);
    assertEquals(0, ctor_count3);
    assertEquals(0, dtor_count3);
    assertEquals(123, test_ins1.param);

    test_ins1.finalize();

    assertEquals(1, ctor_count1);
    assertEquals(1, dtor_count1);
    assertEquals(0, ctor_count2);
    assertEquals(0, dtor_count2);
    assertEquals(0, ctor_count3);
    assertEquals(0, dtor_count3);

    var test_ins2 = new test_class2();

    assertNotUndefined(test_ins2.initializeSuper);
    assertNotUndefined(test_ins2.finalizeSuper);
    assertEquals(2, ctor_count1);
    assertEquals(1, dtor_count1);
    assertEquals(1, ctor_count2);
    assertEquals(0, dtor_count2);
    assertEquals(0, ctor_count3);
    assertEquals(0, dtor_count3);
    assertEquals(456, test_ins2.param);

    test_ins2.finalize();

    assertEquals(2, ctor_count1);
    assertEquals(2, dtor_count1);
    assertEquals(1, ctor_count2);
    assertEquals(1, dtor_count2);
    assertEquals(0, ctor_count3);
    assertEquals(0, dtor_count3);

    var test_ins3 = new test_class3();

    assertNotUndefined(test_ins3.initializeSuper);
    assertNotUndefined(test_ins3.finalizeSuper);
    assertEquals(3, ctor_count1);
    assertEquals(2, dtor_count1);
    assertEquals(2, ctor_count2);
    assertEquals(1, dtor_count2);
    assertEquals(1, ctor_count3);
    assertEquals(0, dtor_count3);
    assertEquals(456, test_ins3.param);

    test_ins3.finalize();

    assertEquals(3, ctor_count1);
    assertEquals(3, dtor_count1);
    assertEquals(2, ctor_count2);
    assertEquals(2, dtor_count2);
    assertEquals(1, ctor_count3);
    assertEquals(1, dtor_count3);

    /* generateID */
    var id1 = b9.generateID();
    var id2 = b9.generateID();
    var id3 = b9.generateID();

    assertNotEquals(0, id1);
    assertNotEquals(0, id2);
    assertNotEquals(0, id3);
    assertNotEquals(id1, id2);
    assertNotEquals(id2, id3);
    assertNotEquals(id3, id1);
}
