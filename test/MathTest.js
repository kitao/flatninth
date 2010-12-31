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
    assertEquals_float(0.0, b9.Math.sqrt(0.0));
    assertEquals_float(2.0, b9.Math.sqrt(4.0));

    /* sin_float */
    assertEquals_float(0.0, b9.Math.sin_float(0.0));
    assertEquals_float(1.0, b9.Math.sin_float(90.0));
    assertEquals_float(-1.0, b9.Math.sin_float(630.0));
    assertEquals_float(-1.0, b9.Math.sin_float(-90.0));
    assertEquals_float(1.0, b9.Math.sin_float(-630.0));

    /* cos_float */
    assertEquals_float(0.0, b9.Math.cos_float(90.0));
    assertEquals_float(-1.0, b9.Math.cos_float(180.0));
    assertEquals_float(1.0, b9.Math.cos_float(720.0));
    assertEquals_float(-1.0, b9.Math.cos_float(-180.0));
    assertEquals_float(1.0, b9.Math.cos_float(-720.0));

    /* sin_int */
    assertEquals_float(0.0, b9.Math.sin_int(0.0));
    assertEquals_float(1.0, b9.Math.sin_int(90.0));
    assertEquals_float(-1.0, b9.Math.sin_int(630.0));
    assertEquals_float(-1.0, b9.Math.sin_int(-90.0));
    assertEquals_float(1.0, b9.Math.sin_int(-630.0));

    /* cos_int */
    assertEquals_float(0.0, b9.Math.cos_int(90.0));
    assertEquals_float(-1.0, b9.Math.cos_int(180.0));
    assertEquals_float(1.0, b9.Math.cos_int(720.0));
    assertEquals_float(-1.0, b9.Math.cos_int(-180.0));
    assertEquals_float(1.0, b9.Math.cos_int(-720.0));

    /* asin */
    assertEquals_float(0.0, b9.Math.asin(0.0));
    assertEquals_float(90.0, b9.Math.asin(1.0));
    assertEquals_float(-90.0, b9.Math.asin(-1.0));

    /* acos */
    assertEquals_float(90.0, b9.Math.acos(0.0));
    assertEquals_float(0.0, b9.Math.acos(1.0));
    assertEquals_float(180.0, b9.Math.acos(-1.0));

    /* atan2 */
    assertEquals_float(0.0, b9.Math.atan2(0.0, 1.0));
    assertEquals_float(90.0, b9.Math.atan2(2.0, 0.0));
    assertEquals_float(180.0, b9.Math.atan2(0.0, -3.0));
    assertEquals_float(-90.0, b9.Math.atan2(-4.0, 0.0));

    /* random_int */
    var i, x;

    for (i = 0; i < 10; i++) {
        x = b9.Math.random_int(-1, 1);
        assertTrue(x === -1 || x === 0 || x === 1);
    }

    for (i = 0; i < 10; i++) {
        x = b9.Math.random_int(3, 5);
        assertTrue(x === 3 || x === 4 || x === 5);
    }

    for (i = 0; i < 10; i++) {
        x = b9.Math.random_int(-3, -5);
        assertTrue(x === -3 || x === -4 || x === -5);
    }

    /* random_float */
    for (i = 0; i < 10; i++) {
        x = b9.Math.random_float(-0.5, 0.5, 0.5);
        assertTrue(x === -0.5 || x === 0.0 || x === 0.5);
    }

    for (i = 0; i < 10; i++) {
        x = b9.Math.random_float(3.5, 4.5, 0.5);
        assertTrue(x === 3.5 || x === 4.0 || x === 4.5);
    }

    for (i = 0; i < 10; i++) {
        x = b9.Math.random_float(-3.5, -4.5, -0.5);
        assertTrue(x === -3.5 || x === -4.0 || x === -4.5);
    }

    /* lerp */
    assertEquals_float(0.0, b9.Math.lerp(0.0, 2.0, -1.0));
    assertEquals_float(1.0, b9.Math.lerp(0.0, 2.0, 0.5));
    assertEquals_float(2.0, b9.Math.lerp(0.0, 2.0, 2.0));

    /* equals_float */
    assertTrue(b9.Math.equals_float(1.0, 1.0 + b9.Math.EPSILON * 0.99));
    assertTrue(b9.Math.equals_float(1.0, 1.0 - b9.Math.EPSILON * 0.99));
    assertFalse(b9.Math.equals_float(1.1, 2.0));
    assertFalse(b9.Math.equals_float(1.0, 2.1));

    /* EPSILON */
    assertEquals(0.0001, b9.Math.EPSILON);

    /* PI */
    assertEquals_float(3.14159265358979, b9.Math.PI);

    /* DEG_TO_RAD */
    assertEquals_float(b9.Math.PI / 180.0, b9.Math.DEG_TO_RAD);

    /* RAD_TO_DEG */
    assertEquals_float(180.0 / b9.Math.PI, b9.Math.RAD_TO_DEG);
}
