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

function assertEqualsFloat(expected, actual) {
    if (b9.Math.abs(expected - actual) >= b9.Math.EPSILON) {
        fail("Expected " + expected + " but was " + actual);
    }
}

function testMath() {
    /* floor */
    assertEquals(1.0, b9.Math.floor(1.234));
    assertEquals(-2.0, b9.Math.floor(-1.234));

    /* abs */
    assertEquals(1.234, b9.Math.abs(1.234));
    assertEquals(1.234, b9.Math.abs(-1.234));

    /* min */
    assertEquals(1.0, b9.Math.min(1.0, 2.0));
    assertEquals(1.0, b9.Math.min(2.0, 1.0));

    /* max */
    assertEquals(2.0, b9.Math.max(1.0, 2.0));
    assertEquals(2.0, b9.Math.max(2.0, 1.0));

    /* clamp */
    assertEquals(1.0, b9.Math.clamp(0.0, 1.0, 2.0));
    assertEquals(1.5, b9.Math.clamp(1.5, 1.0, 2.0));
    assertEquals(2.0, b9.Math.clamp(3.0, 1.0, 2.0));

    /* sqrt */
    assertEqualsFloat(0.0, b9.Math.sqrt(0.0));
    assertEqualsFloat(2.0, b9.Math.sqrt(4.0));

    /* sinFloat */
    assertEqualsFloat(0.0, b9.Math.sinFloat(0.0));
    assertEqualsFloat(1.0, b9.Math.sinFloat(90.0));
    assertEqualsFloat(-1.0, b9.Math.sinFloat(630.0));
    assertEqualsFloat(-1.0, b9.Math.sinFloat(-90.0));
    assertEqualsFloat(1.0, b9.Math.sinFloat(-630.0));

    /* cosFloat */
    assertEqualsFloat(0.0, b9.Math.cosFloat(90.0));
    assertEqualsFloat(-1.0, b9.Math.cosFloat(180.0));
    assertEqualsFloat(1.0, b9.Math.cosFloat(720.0));
    assertEqualsFloat(-1.0, b9.Math.cosFloat(-180.0));
    assertEqualsFloat(1.0, b9.Math.cosFloat(-720.0));

    /* sinInt */
    assertEqualsFloat(0.0, b9.Math.sinInt(0.0));
    assertEqualsFloat(1.0, b9.Math.sinInt(90.0));
    assertEqualsFloat(-1.0, b9.Math.sinInt(630.0));
    assertEqualsFloat(-1.0, b9.Math.sinInt(-90.0));
    assertEqualsFloat(1.0, b9.Math.sinInt(-630.0));

    /* cosInt */
    assertEqualsFloat(0.0, b9.Math.cosInt(90.0));
    assertEqualsFloat(-1.0, b9.Math.cosInt(180.0));
    assertEqualsFloat(1.0, b9.Math.cosInt(720.0));
    assertEqualsFloat(-1.0, b9.Math.cosInt(-180.0));
    assertEqualsFloat(1.0, b9.Math.cosInt(-720.0));

    /* asin */
    assertEqualsFloat(0.0, b9.Math.asin(0.0));
    assertEqualsFloat(90.0, b9.Math.asin(1.0));
    assertEqualsFloat(-90.0, b9.Math.asin(-1.0));

    /* acos */
    assertEqualsFloat(90.0, b9.Math.acos(0.0));
    assertEqualsFloat(0.0, b9.Math.acos(1.0));
    assertEqualsFloat(180.0, b9.Math.acos(-1.0));

    /* atan2 */
    assertEqualsFloat(0.0, b9.Math.atan2(0.0, 1.0));
    assertEqualsFloat(90.0, b9.Math.atan2(2.0, 0.0));
    assertEqualsFloat(180.0, b9.Math.atan2(0.0, -3.0));
    assertEqualsFloat(-90.0, b9.Math.atan2(-4.0, 0.0));

    /* randomInt */
    for (var i = 0; i < 10; i++) {
        var x = b9.Math.randomInt(-1, 1);
        assertTrue(x === -1 || x === 0 || x === 1);
    }

    for (var i = 0; i < 10; i++) {
        var x = b9.Math.randomInt(3, 5);
        assertTrue(x === 3 || x === 4 || x === 5);
    }

    for (var i = 0; i < 10; i++) {
        var x = b9.Math.randomInt(-3, -5);
        assertTrue(x === -3 || x === -4 || x === -5);
    }

    /* randomFloat */
    for (var i = 0; i < 10; i++) {
        var x = b9.Math.randomFloat(-0.5, 0.5, 0.5);
        assertTrue(x === -0.5 || x === 0.0 || x === 0.5);
    }

    for (var i = 0; i < 10; i++) {
        var x = b9.Math.randomFloat(3.5, 4.5, 0.5);
        assertTrue(x === 3.5 || x === 4.0 || x === 4.5);
    }

    for (var i = 0; i < 10; i++) {
        var x = b9.Math.randomFloat(-3.5, -4.5, -0.5);
        assertTrue(x === -3.5 || x === -4.0 || x === -4.5);
    }

    /* interp */
    assertEqualsFloat(0.0, b9.Math.interp(0.0, 2.0, -1.0));
    assertEqualsFloat(1.0, b9.Math.interp(0.0, 2.0, 0.5));
    assertEqualsFloat(2.0, b9.Math.interp(0.0, 2.0, 3.0));

    /* EPSILON */
    assertEquals(0.0001, b9.Math.EPSILON);

    /* PI */
    assertEqualsFloat(3.14159265358979, b9.Math.PI);

    /* DEG_TO_RAD */
    assertEqualsFloat(b9.Math.PI / 180.0, b9.Math.DEG_TO_RAD);

    /* RAD_TO_DEG */
    assertEqualsFloat(180.0 / b9.Math.PI, b9.Math.RAD_TO_DEG);
}

function testVector2D() {
    /* b9.Vector2D */

}

/*
    assert([comment], booleanValue)
    assertTrue([comment], booleanValue)
    assertFalse([comment], booleanValue)
    assertEquals([comment], value1, value2)
    assertNotEquals([comment], value1, value2)
    assertNull([comment], value)
    assertNotNull([comment], value)
    assertUndefined([comment], value)
    assertNotUndefined([comment], value)
    assertNaN([comment], value)
    assertNotNaN([comment], value)
    fail(comment)
*/
