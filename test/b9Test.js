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

function testB9() {
    var ctorCount1, ctorCount2, ctorCount3;
    var dtorCount1, dtorCount2, dtorCount3;
    var TestClass0, TestClass1, TestClass2, TestClass3;
    var testIns0, testIns1, testIns2, testIns3;

    /* VERSION */
    assertEquals(0.01, b9.VERSION);

    /* createClass */
    TestClass0 = b9.createClass();

    ctorCount1 = 0;
    dtorCount1 = 0;
    TestClass1 = b9.createClass();
    TestClass1.prototype.initialize = function(param) { ctorCount1++; this.param = param; };
    TestClass1.prototype.finalize = function() { dtorCount1++; };

    ctorCount2 = 0;
    dtorCount2 = 0;
    TestClass2 = b9.createClass(TestClass1);
    TestClass2.prototype.initialize = function() { ctorCount2++; this.initializeSuper(456); };
    TestClass2.prototype.finalize = function() { dtorCount2++; this.finalizeSuper(); };

    ctorCount3 = 0;
    dtorCount3 = 0;
    TestClass3 = b9.createClass(TestClass2);
    TestClass3.prototype.initialize = function() { ctorCount3++; this.initializeSuper(); };
    TestClass3.prototype.finalize = function() { dtorCount3++; this.finalizeSuper(); };

    testIns0 = new TestClass0();

    testIns1 = new TestClass1(123);

    assertUndefined(testIns1.initializeSuper);
    assertUndefined(testIns1.finalizeSuper);
    assertEquals(1, ctorCount1);
    assertEquals(0, dtorCount1);
    assertEquals(0, ctorCount2);
    assertEquals(0, dtorCount2);
    assertEquals(0, ctorCount3);
    assertEquals(0, dtorCount3);
    assertEquals(123, testIns1.param);

    testIns1.finalize();

    assertEquals(1, ctorCount1);
    assertEquals(1, dtorCount1);
    assertEquals(0, ctorCount2);
    assertEquals(0, dtorCount2);
    assertEquals(0, ctorCount3);
    assertEquals(0, dtorCount3);

    testIns2 = new TestClass2();

    assertNotUndefined(testIns2.initializeSuper);
    assertNotUndefined(testIns2.finalizeSuper);
    assertEquals(2, ctorCount1);
    assertEquals(1, dtorCount1);
    assertEquals(1, ctorCount2);
    assertEquals(0, dtorCount2);
    assertEquals(0, ctorCount3);
    assertEquals(0, dtorCount3);
    assertEquals(456, testIns2.param);

    testIns2.finalize();

    assertEquals(2, ctorCount1);
    assertEquals(2, dtorCount1);
    assertEquals(1, ctorCount2);
    assertEquals(1, dtorCount2);
    assertEquals(0, ctorCount3);
    assertEquals(0, dtorCount3);

    testIns3 = new TestClass3();

    assertNotUndefined(testIns3.initializeSuper);
    assertNotUndefined(testIns3.finalizeSuper);
    assertEquals(3, ctorCount1);
    assertEquals(2, dtorCount1);
    assertEquals(2, ctorCount2);
    assertEquals(1, dtorCount2);
    assertEquals(1, ctorCount3);
    assertEquals(0, dtorCount3);
    assertEquals(456, testIns3.param);

    testIns3.finalize();

    assertEquals(3, ctorCount1);
    assertEquals(3, dtorCount1);
    assertEquals(2, ctorCount2);
    assertEquals(2, dtorCount2);
    assertEquals(1, ctorCount3);
    assertEquals(1, dtorCount3);
}
