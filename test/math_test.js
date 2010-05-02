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
    if (!b9.Math.isEqualFloat(expected, actual)) {
        fail("Expected " + expected + " but was " + actual);
    }
}

function assertEqualsVector2D(expected, actual) {
    if (!expected.isEqual(actual)) {
        fail("Expected " + expected.toString() + " but was " + actual.toString());
    }
}

function assertEqualsMatrix2D(expected, actual) {
    if (!expected.isEqual(actual)) {
        fail("Expected " + expected.toString() + " but was " + actual.toString());
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
    var i, x;

    for (i = 0; i < 10; i++) {
        x = b9.Math.randomInt(-1, 1);
        assertTrue(x === -1 || x === 0 || x === 1);
    }

    for (i = 0; i < 10; i++) {
        x = b9.Math.randomInt(3, 5);
        assertTrue(x === 3 || x === 4 || x === 5);
    }

    for (i = 0; i < 10; i++) {
        x = b9.Math.randomInt(-3, -5);
        assertTrue(x === -3 || x === -4 || x === -5);
    }

    /* randomFloat */
    for (i = 0; i < 10; i++) {
        x = b9.Math.randomFloat(-0.5, 0.5, 0.5);
        assertTrue(x === -0.5 || x === 0.0 || x === 0.5);
    }

    for (i = 0; i < 10; i++) {
        x = b9.Math.randomFloat(3.5, 4.5, 0.5);
        assertTrue(x === 3.5 || x === 4.0 || x === 4.5);
    }

    for (i = 0; i < 10; i++) {
        x = b9.Math.randomFloat(-3.5, -4.5, -0.5);
        assertTrue(x === -3.5 || x === -4.0 || x === -4.5);
    }

    /* interp */
    assertEqualsFloat(0.0, b9.Math.interp(0.0, 2.0, -1.0));
    assertEqualsFloat(1.0, b9.Math.interp(0.0, 2.0, 0.5));
    assertEqualsFloat(2.0, b9.Math.interp(0.0, 2.0, 3.0));

    /* isEqualFloat */
    assertTrue(b9.Math.isEqualFloat(1.0, 1.0 + b9.Math.EPSILON * 0.99));
    assertTrue(b9.Math.isEqualFloat(1.0, 1.0 - b9.Math.EPSILON * 0.99));
    assertFalse(b9.Math.isEqualFloat(1.1, 2.0));
    assertFalse(b9.Math.isEqualFloat(1.0, 2.1));

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
    /* Vector2D */
    var vec1 = new b9.Vector2D();
    assertTrue(vec1.x === 0.0 && vec1.y === 0.0);

    var vec2 = new b9.Vector2D(1.0, 2.0);
    assertTrue(vec2.x === 1.0 && vec2.y === 2.0);

    var vec3 = new b9.Vector2D(vec2);
    assertTrue(vec2.x === 1.0 && vec2.y === 2.0);

    /* set */
    vec1.set(3.0, 4.0);
    assertEqualsVector2D(new b9.Vector2D(3.0, 4.0), vec1);

    vec2.set(vec1);
    assertEqualsVector2D(vec1, vec2);

    /* neg */
    vec1.set(10.0, -20.0);
    vec1.neg();
    assertEqualsVector2D(new b9.Vector2D(-10.0, 20.0), vec1);

    /* add */
    vec1.set(1.0, 2.0);
    vec2.set(3.0, 4.0);
    vec1.add(vec2);
    assertEqualsVector2D(new b9.Vector2D(4.0, 6.0), vec1);

    /* sub */
    vec1.set(2.0, 3.0);
    vec2.set(3.0, 5.0);
    vec1.sub(vec2);
    assertEqualsVector2D(new b9.Vector2D(-1.0, -2.0), vec1);

    /* mul */
    vec1.set(1.0, 2.0);
    vec1.mul(10.0);
    assertEqualsVector2D(new b9.Vector2D(10.0, 20.0), vec1);

    /* div */
    vec1.set(1.0, 2.0);
    vec1.div(10.0);
    assertEqualsVector2D(new b9.Vector2D(0.1, 0.2), vec1);

    /* norm */
    vec1.set(-3.0, -4.0);
    assertEqualsFloat(5.0, vec1.norm());

    /* sqNorm */
    vec1.set(2.0, 3.0);
    assertEqualsFloat(13.0, vec1.sqNorm());

    /* dist */
    vec1.set(-1.0, -2.0);
    vec2.set(2.0, -6.0);
    assertEqualsFloat(5.0, vec1.dist(vec2));

    /* sqDist */
    vec1.set(1.0, 2.0);
    vec2.set(3.0, 5.0);
    assertEqualsFloat(13.0, vec1.sqDist(vec2));

    /* dot */
    vec1.set(1.0, 2.0);
    vec2.set(3.0, 4.0);
    assertEqualsFloat(11.0, vec1.dot(vec2));

    /* normalize */
    vec1.set(3.0, 4.0);
    vec1.normalize();
    assertEqualsVector2D(new b9.Vector2D(0.6, 0.8), vec1);

    /* rotateFloat */
    vec1.set(1.0, 2.0);
    vec1.rotateFloat(90.0);
    assertEqualsVector2D(new b9.Vector2D(-2.0, 1.0), vec1);

    /* rotateInt */
    vec1.set(1.0, 2.0);
    vec1.rotateInt(90.5);
    assertEqualsVector2D(new b9.Vector2D(-2.0, 1.0), vec1);

    /* interp */
    vec1.set(1.0, 2.0);
    vec2.set(-1.0, -2.0);
    vec1.interp(vec2, -1.0);
    assertEqualsVector2D(new b9.Vector2D(1.0, 2.0), vec1);

    vec1.set(1.0, 2.0);
    vec1.interp(vec2, 0.5);
    assertEqualsVector2D(new b9.Vector2D(0.0, 0.0), vec1);

    vec1.set(1.0, 2.0);
    vec1.interp(vec2, 2.0);
    assertEqualsVector2D(new b9.Vector2D(-1.0, -2.0), vec1);

    /* toLocal */
    var mat1 = new b9.Matrix2D(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(2.0, 3.0));
    vec1.set(1.0, 5.0);
    vec1.toLocal(mat1);
    assertEqualsVector2D(new b9.Vector2D(2.0, 1.0), vec1);

    /* toGlobal */
    mat1.set(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(2.0, 3.0));
    vec1.set(2.0, 1.0);
    vec1.toGlobal(mat1);
    assertEqualsVector2D(new b9.Vector2D(1.0, 5.0), vec1);

    /* toLocalNoTrans */
    mat1 = new b9.Matrix2D(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(2.0, 3.0));
    vec1.set(1.0, 5.0);
    vec1.toLocalNoTrans(mat1);
    assertEqualsVector2D(new b9.Vector2D(5.0, -1.0), vec1);

    /* toGlobalNoTrans */
    mat1.set(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(2.0, 3.0));
    vec1.set(2.0, 1.0);
    vec1.toGlobalNoTrans(mat1);
    assertEqualsVector2D(new b9.Vector2D(-1.0, 2.0), vec1);

    /* isEqual */
    vec1.set(1.0, 2.0);
    vec2.set(vec1);
    assertTrue(vec1.isEqual(vec2));

    vec2.set(1.1, 2.0);
    assertFalse(vec1.isEqual(vec2));

    vec2.set(1.0, 2.1);
    assertFalse(vec1.isEqual(vec2));

    /* toString */
    assertEquals("(1, 0)", b9.Vector2D.X_UNIT.toString());

    /* ZERO */
    assertEqualsVector2D(new b9.Vector2D(0.0, 0.0), b9.Vector2D.ZERO);

    /* X_UNIT */
    assertEqualsVector2D(new b9.Vector2D(1.0, 0.0), b9.Vector2D.X_UNIT);

    /* Y_UNIT */
    assertEqualsVector2D(new b9.Vector2D(0.0, 1.0), b9.Vector2D.Y_UNIT);
}

function testMatrix2D() {
    /* Matrix2D */
    var mat1 = new b9.Matrix2D();
    assertTrue(b9.Vector2D.ZERO.isEqual(mat1.x_axis) &&
            b9.Vector2D.ZERO.isEqual(mat1.y_axis) &&
            b9.Vector2D.ZERO.isEqual(mat1.trans));

    var mat2 = new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, new b9.Vector2D(1.0, 2.0));
    assertTrue(b9.Vector2D.X_UNIT.isEqual(mat2.x_axis) &&
            b9.Vector2D.Y_UNIT.isEqual(mat2.y_axis) &&
            (new b9.Vector2D(1.0, 2.0)).isEqual(mat2.trans));

    var mat3 = new b9.Matrix2D(mat2);
    assertTrue(b9.Vector2D.X_UNIT.isEqual(mat3.x_axis) &&
            b9.Vector2D.Y_UNIT.isEqual(mat3.y_axis) &&
            (new b9.Vector2D(1.0, 2.0)).isEqual(mat3.trans));

    /* set */
    mat1.set(b9.Vector2D.Y_UNIT, b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT);
    assertEqualsMatrix2D(new b9.Matrix2D(b9.Vector2D.Y_UNIT, b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT), mat1);

    mat2.set(mat1);
    assertEqualsMatrix2D(mat1, mat2);

    /* orthonormalize */
    mat1.set(new b9.Vector2D(0.1, 0.0), new b9.Vector2D(3.0, 3.0), b9.Vector2D.Y_UNIT);
    mat1.orthonormalize();
    assertEqualsMatrix2D(new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.Y_UNIT), mat1);

    /* rotateFloat */
    mat1.set(new b9.Vector2D(0.0, -1.0), new b9.Vector2D(1.0, 0.0), new b9.Vector2D(1.0, 0.0));
    mat1.rotateFloat(90.0);
    assertEqualsMatrix2D(new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.X_UNIT), mat1);

    /* rotateInt */
    mat1.set(new b9.Vector2D(0.0, -1.0), new b9.Vector2D(1.0, 0.0), new b9.Vector2D(1.0, 0.0));
    mat1.rotateInt(90.5);
    assertEqualsMatrix2D(new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.X_UNIT), mat1);

    /* scale */
    mat1.set(new b9.Vector2D(0.5, 0.0), new b9.Vector2D(0.0, -0.25), new b9.Vector2D(1.0, 0.0));
    mat1.scale(2.0, -4.0);
    assertEqualsMatrix2D(new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.X_UNIT), mat1);

    /* translate */
    mat1.set(b9.Matrix2D.UNIT);
    mat1.rotateInt(90);
    mat1.translate(1.0, 2.0);
    assertEqualsMatrix2D(new b9.Matrix2D(
                new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(-2.0, 1.0)), mat1);

    /* interp */
    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(mat1);
    mat2.trans.set(1.0, -1.0);
    mat2.rotateInt(40);
    mat3.set(mat1);
    mat3.trans.set(0.5, -0.5);
    mat3.rotateInt(20);
    mat1.interp(mat2, 0.5);
    assertEqualsMatrix2D(mat3, mat1);

    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(mat1);
    mat2.trans.set(1.0, -1.0);
    mat2.rotateInt(-40);
    mat3.set(mat1);
    mat3.trans.set(0.5, -0.5);
    mat3.rotateInt(-20);
    mat1.interp(mat2, 0.5);
    assertEqualsMatrix2D(mat3, mat1);

    /* interpNoTrans */
    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(mat1);
    mat2.trans.set(1.0, 1.0);
    mat2.rotateInt(40);
    mat3.set(mat1);
    mat3.rotateInt(20);
    mat1.interpNoTrans(mat2, 0.5);
    assertEqualsMatrix2D(mat3, mat1);

    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(mat1);
    mat2.trans.set(1.0, 1.0);
    mat2.rotateInt(-40);
    mat3.set(mat1);
    mat3.rotateInt(-20);
    mat1.interpNoTrans(mat2, 0.5);
    assertEqualsMatrix2D(mat3, mat1);

    /* toLocal */
    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(-1.0, -2.0));
    mat1.toLocal(mat2);
    assertEqualsMatrix2D(new b9.Matrix2D(
                new b9.Vector2D(0.0, -1.0), new b9.Vector2D(1.0, 0.0), new b9.Vector2D(2.0, -1.0)), mat1);

    /* toGlobal */
    mat1.set(new b9.Vector2D(0.0, -1.0), new b9.Vector2D(1.0, 0.0), new b9.Vector2D(2.0, -1.0));
    mat2.set(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(-1.0, -2.0));
    mat1.toGlobal(mat2);
    assertEqualsMatrix2D(b9.Matrix2D.UNIT, mat1);

    /* toLocalNoTrans */
    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(-1.0, -2.0));
    mat1.toLocalNoTrans(mat2);
    assertEqualsMatrix2D(new b9.Matrix2D(
                new b9.Vector2D(0.0, -1.0), new b9.Vector2D(1.0, 0.0), b9.Vector2D.ZERO), mat1);

    /* toGlobalNoTrans */
    mat1.set(new b9.Vector2D(0.0, -1.0), new b9.Vector2D(1.0, 0.0), new b9.Vector2D(2.0, -1.0));
    mat2.set(new b9.Vector2D(0.0, 1.0), new b9.Vector2D(-1.0, 0.0), new b9.Vector2D(-1.0, -2.0));
    mat1.toGlobalNoTrans(mat2);
    assertEqualsMatrix2D(b9.Matrix2D.UNIT, mat1);

    /* lookAt */
    mat1.lookAt(new b9.Vector2D(1.0, 2.0), new b9.Vector2D(3.0, 2.0));
    assertEqualsMatrix2D(new b9.Matrix2D(
                new b9.Vector2D(0.0, -1.0), new b9.Vector2D(1.0, 0.0), new b9.Vector2D(1.0, 2.0)), mat1);

    /* isEqual */
    mat1.set(b9.Matrix2D.UNIT);
    mat2.set(mat1);
    assertTrue(mat1.isEqual(mat2));

    mat2.set(mat1);
    mat2.x_axis.set(b9.Vector2D.ZERO);
    assertFalse(mat1.isEqual(mat2));

    mat2.set(mat1);
    mat2.y_axis.set(b9.Vector2D.ZERO);
    assertFalse(mat1.isEqual(mat2));

    mat2.set(mat1);
    mat2.trans.set(b9.Vector2D.X_UNIT);
    assertFalse(mat1.isEqual(mat2));

    /* toString */
    assertEquals("((1, 0), (0, 1), (0, 0))", b9.Matrix2D.UNIT.toString());

    /* ZERO */
    assertEqualsMatrix2D(new b9.Matrix2D(b9.Vector2D.ZERO, b9.Vector2D.ZERO, b9.Vector2D.ZERO), b9.Matrix2D.ZERO);

    /* UNIT */
    assertEqualsMatrix2D(new b9.Matrix2D(b9.Vector2D.X_UNIT, b9.Vector2D.Y_UNIT, b9.Vector2D.ZERO), b9.Matrix2D.UNIT);
}
