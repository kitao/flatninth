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
    assertEquals(b9.Math.floor(1.234), 1.0);
    assertEquals(b9.Math.floor(-1.234), -2.0);

    /* abs */
    assertEquals(b9.Math.abs(1.234), 1.234);
    assertEquals(b9.Math.abs(-1.234), 1.234);

    /* min */
    assertEquals(b9.Math.min(1.0, 2.0), 1.0);
    assertEquals(b9.Math.min(2.0, 1.0), 1.0);

    /* max */
    assertEquals(b9.Math.max(1.0, 2.0), 2.0);
    assertEquals(b9.Math.max(2.0, 1.0), 2.0);

    /* clamp */
    assertEquals(b9.Math.clamp(0.0, 1.0, 2.0), 1.0);
    assertEquals(b9.Math.clamp(1.5, 1.0, 2.0), 1.5);
    assertEquals(b9.Math.clamp(3.0, 1.0, 2.0), 2.0);

    /* sqrt */
    assertEquals(b9.Math.sqrt(0.0), 0.0);
    assertEquals(b9.Math.sqrt(4.0), 2.0);

    /* sin_float */
    assertEquals(b9.Math.sin_float(0.0), 0.0);
    assertEquals(b9.Math.sin_float(90.0), 1.0);
    assertEquals(b9.Math.sin_float(450.0), 1.0);
    assertEquals(b9.Math.sin_float(-90.0), -1.0);
    assertEquals(b9.Math.sin_float(-450.0), -1.0);

    /* cos_float */
    assertEquals(b9.Math.cos_float(0.0), 1.0);
    assertEquals(b9.Math.cos_float(180.0), -1.0);
    assertEquals(b9.Math.cos_float(540.0), -1.0);
    assertEquals(b9.Math.cos_float(-180.0), -1.0);
    assertEquals(b9.Math.cos_float(-540.0), -1.0);

    /* sin_int */
    assertEquals(b9.Math.sin_int(0.0), 0.0);
    assertEquals(b9.Math.sin_int(90.0), 1.0);
    assertEquals(b9.Math.sin_int(450.0), 1.0);
    assertEquals(b9.Math.sin_int(-90.0), -1.0);
    assertEquals(b9.Math.sin_int(-450.0), -1.0);

    /* cos_int */
    assertEquals(b9.Math.cos_int(0.0), 1.0);
    assertEquals(b9.Math.cos_int(180.0), -1.0);
    assertEquals(b9.Math.cos_int(540.0), -1.0);
    assertEquals(b9.Math.cos_int(-180.0), -1.0);
    assertEquals(b9.Math.cos_int(-540.0), -1.0);

    /* asin */

    /* acos */

    /* atan2 */

    /* random_int */

    /* random_float */

    /* interp */

    /* EPSILON */

    /* PI */

    /* DEG_TO_RAD */

    /* RAD_TO_DEG */
}

function testVector2D() {
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
