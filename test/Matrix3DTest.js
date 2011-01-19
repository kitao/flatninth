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

function testMatrix3D() {
    var i;
    var mat1, mat2, mat3, mat4;
    var array1, array2, array3, array4, array5;
    var ratio;

    /* initialize */
    /* getXAxis */
    /* getYAxis */
    /* getZAxis */
    /* getTrans */
    /* getArray */
    /* getIndex */
    mat1 = new b9.Matrix3D();

    array1 = new Float32Array([
            100.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0]);
    mat2 = new b9.Matrix3D(array1, 1);
    assertTrue(
            mat2.getXAxis().equals(b9.Vector3D.X_UNIT) &&
            mat2.getYAxis().equals(b9.Vector3D.Y_UNIT) &&
            mat2.getZAxis().equals(b9.Vector3D.Z_UNIT) &&
            mat2.getTrans().equals(b9.Vector3D.ZERO));
    assertTrue(mat2.getArray() === array1 && mat2.getIndex() === 1);

    mat3 = new b9.Matrix3D(b9.Vector3D.ZERO, b9.Vector3D.X_UNIT, b9.Vector3D.Y_UNIT, b9.Vector3D.Z_UNIT);
    assertTrue(
            mat3.getXAxis().equals(b9.Vector3D.ZERO) &&
            mat3.getYAxis().equals(b9.Vector3D.X_UNIT) &&
            mat3.getZAxis().equals(b9.Vector3D.Y_UNIT) &&
            mat3.getTrans().equals(b9.Vector3D.Z_UNIT));

    mat4 = new b9.Matrix3D(mat2);
    assertTrue(
            mat4.getXAxis().equals(b9.Vector3D.X_UNIT) &&
            mat4.getYAxis().equals(b9.Vector3D.Y_UNIT) &&
            mat4.getZAxis().equals(b9.Vector3D.Z_UNIT) &&
            mat4.getTrans().equals(b9.Vector3D.ZERO));

    /* set */
    assertEquals_object(
            new b9.Matrix3D(b9.Vector3D.Y_UNIT, b9.Vector3D.Z_UNIT, b9.Vector3D.X_UNIT, b9.Vector3D.Y_UNIT),
            mat1.set(b9.Vector3D.Y_UNIT, b9.Vector3D.Z_UNIT, b9.Vector3D.X_UNIT, b9.Vector3D.Y_UNIT));
    assertEquals_object(mat1, mat2.set(mat1));

    /* fromQuaternion */
    assertEquals_object(b9.Matrix3D.UNIT, mat1.fromQuaternion(new b9.Quaternion(0.0, 0.0, 0.0, 1.0)));

    /* orthonormalize */
    mat1.set(
            new b9.Vector3D(0.1, 0.2, 0.3),
            new b9.Vector3D(0.0, 3.0, 3.0),
            new b9.Vector3D(0.0, 0.0, 0.1),
            b9.Vector3D.X_UNIT);
    assertEquals_object(
            new b9.Matrix3D(b9.Vector3D.X_UNIT, b9.Vector3D.Y_UNIT, b9.Vector3D.Z_UNIT, b9.Vector3D.X_UNIT),
            mat1.orthonormalize());

    /* rotateX_float */
    mat1.set(
            new b9.Vector3D(0.0, 0.0, -1.0),
            new b9.Vector3D(-1.0, 0.0, 0.0),
            new b9.Vector3D(0.0, 1.0, 0.0),
            new b9.Vector3D(100.0, 200.0, 300.0));
    assertEquals_object(
            new b9.Matrix3D(
                new b9.Vector3D(0.0, 0.0, -1.0),
                new b9.Vector3D(0.0, 1.0, 0.0),
                new b9.Vector3D(1.0, 0.0, 0.0),
                new b9.Vector3D(100.0, 200.0, 300.0)),
            mat1.rotateX_float(90.0));

    /* rotateY_float */
    mat1.set(
            new b9.Vector3D(0.0, 0.0, -1.0),
            new b9.Vector3D(-1.0, 0.0, 0.0),
            new b9.Vector3D(0.0, 1.0, 0.0),
            new b9.Vector3D(100.0, 200.0, 300.0));
    assertEquals_object(
            new b9.Matrix3D(
                new b9.Vector3D(0.0, -1.0, 0.0),
                new b9.Vector3D(-1.0, 0.0, 0.0),
                new b9.Vector3D(0.0, 0.0, -1.0),
                new b9.Vector3D(100.0, 200.0, 300.0)),
            mat1.rotateY_float(90.0));

    /* rotateZ_float */
    mat1.set(
            new b9.Vector3D(0.0, 0.0, -1.0),
            new b9.Vector3D(-1.0, 0.0, 0.0),
            new b9.Vector3D(0.0, 1.0, 0.0),
            new b9.Vector3D(100.0, 200.0, 300.0));
    assertEquals_object(
            new b9.Matrix3D(
                new b9.Vector3D(-1.0, 0.0, 0.0),
                new b9.Vector3D(0.0, 0.0, 1.0),
                new b9.Vector3D(0.0, 1.0, 0.0),
                new b9.Vector3D(100.0, 200.0, 300.0)),
            mat1.rotateZ_float(90.0));

    /* rotateX_int */
    mat1.set(
            new b9.Vector3D(0.0, 0.0, -1.0),
            new b9.Vector3D(-1.0, 0.0, 0.0),
            new b9.Vector3D(0.0, 1.0, 0.0),
            new b9.Vector3D(100.0, 200.0, 300.0));
    assertEquals_object(
            new b9.Matrix3D(
                new b9.Vector3D(0.0, 0.0, -1.0),
                new b9.Vector3D(0.0, 1.0, 0.0),
                new b9.Vector3D(1.0, 0.0, 0.0),
                new b9.Vector3D(100.0, 200.0, 300.0)),
            mat1.rotateX_int(90.0));

    /* rotateY_int */
    mat1.set(
            new b9.Vector3D(0.0, 0.0, -1.0),
            new b9.Vector3D(-1.0, 0.0, 0.0),
            new b9.Vector3D(0.0, 1.0, 0.0),
            new b9.Vector3D(100.0, 200.0, 300.0));
    assertEquals_object(
            new b9.Matrix3D(
                new b9.Vector3D(0.0, -1.0, 0.0),
                new b9.Vector3D(-1.0, 0.0, 0.0),
                new b9.Vector3D(0.0, 0.0, -1.0),
                new b9.Vector3D(100.0, 200.0, 300.0)),
            mat1.rotateY_int(90.0));

    /* rotateZ_int */
    mat1.set(
            new b9.Vector3D(0.0, 0.0, -1.0),
            new b9.Vector3D(-1.0, 0.0, 0.0),
            new b9.Vector3D(0.0, 1.0, 0.0),
            new b9.Vector3D(100.0, 200.0, 300.0));
    assertEquals_object(
            new b9.Matrix3D(
                new b9.Vector3D(-1.0, 0.0, 0.0),
                new b9.Vector3D(0.0, 0.0, 1.0),
                new b9.Vector3D(0.0, 1.0, 0.0),
                new b9.Vector3D(100.0, 200.0, 300.0)),
            mat1.rotateZ_int(90.0));

    /* scale */
    mat1.set(
            new b9.Vector3D(0.0, 0.0, -1.0),
            new b9.Vector3D(-1.0, 0.0, 0.0),
            new b9.Vector3D(0.0, 1.0, 0.0),
            new b9.Vector3D(100.0, 200.0, 300.0));
    assertEquals_object(
            new b9.Matrix3D(
                new b9.Vector3D(0.0, 0.0, -2.0),
                new b9.Vector3D(-3.0, 0.0, 0.0),
                new b9.Vector3D(0.0, -1.0, 0.0),
                new b9.Vector3D(100.0, 200.0, 300.0)),
            mat1.scale(2.0, 3.0, -1.0));

    /* translate */
    mat1.set(
            new b9.Vector3D(0.0, 0.0, -1.0),
            new b9.Vector3D(-1.0, 0.0, 0.0),
            new b9.Vector3D(0.0, 1.0, 0.0),
            new b9.Vector3D(100.0, 200.0, 300.0));
    assertEquals_object(
            new b9.Matrix3D(
                new b9.Vector3D(0.0, 0.0, -1.0),
                new b9.Vector3D(-1.0, 0.0, 0.0),
                new b9.Vector3D(0.0, 1.0, 0.0),
                new b9.Vector3D(120.0, 230.0, 290.0)),
            mat1.translate(10.0, -20.0, 30.0));

    /* slerp */
    for (ratio = 0.0; ratio <= 1.0; ratio += 0.5) {
        mat1.set(b9.Matrix3D.UNIT);
        mat2.set(b9.Matrix3D.UNIT).translate(2.0, 4.0, 6.0).rotateX_int(90);
        mat3.set(b9.Matrix3D.UNIT).translate(2.0 * ratio, 4.0 * ratio, 6.0 * ratio).rotateX_float(90.0 * ratio);
        assertEquals_object(mat3, mat1.slerp(mat2, ratio));

        mat1.set(b9.Matrix3D.UNIT);
        mat2.set(b9.Matrix3D.UNIT).translate(2.0, 4.0, 6.0).rotateY_int(90);
        mat3.set(b9.Matrix3D.UNIT).translate(2.0 * ratio, 4.0 * ratio, 6.0 * ratio).rotateY_float(90.0 * ratio);
        assertEquals_object(mat3, mat1.slerp(mat2, ratio));

        mat1.set(b9.Matrix3D.UNIT);
        mat2.set(b9.Matrix3D.UNIT).translate(2.0, 4.0, 6.0).rotateZ_int(90);
        mat3.set(b9.Matrix3D.UNIT).translate(2.0 * ratio, 4.0 * ratio, 6.0 * ratio).rotateZ_float(90.0 * ratio);
        assertEquals_object(mat3, mat1.slerp(mat2, ratio));
    }

    /* slerp_noTrans */
    for (ratio = 0.0; ratio <= 1.0; ratio += 0.5) {
        mat1.set(b9.Matrix3D.UNIT).translate(1.0, 2.0, 3.0);
        mat2.set(b9.Matrix3D.UNIT).translate(2.0, 4.0, 6.0).rotateX_int(90);
        mat3.set(b9.Matrix3D.UNIT).rotateX_float(90.0 * ratio);
        assertEquals_object(mat3, mat1.slerp_noTrans(mat2, ratio));

        mat1.set(b9.Matrix3D.UNIT).translate(1.0, 2.0, 3.0);
        mat2.set(b9.Matrix3D.UNIT).translate(2.0, 4.0, 6.0).rotateY_int(90);
        mat3.set(b9.Matrix3D.UNIT).rotateY_float(90.0 * ratio);
        assertEquals_object(mat3, mat1.slerp_noTrans(mat2, ratio));

        mat1.set(b9.Matrix3D.UNIT).translate(1.0, 2.0, 3.0);
        mat2.set(b9.Matrix3D.UNIT).translate(2.0, 4.0, 6.0).rotateZ_int(90);
        mat3.set(b9.Matrix3D.UNIT).rotateZ_float(90.0 * ratio);
        assertEquals_object(mat3, mat1.slerp_noTrans(mat2, ratio));
    }

    /* toLocal */
    mat1.set(b9.Vector3D.X_UNIT, b9.Vector3D.Y_UNIT, b9.Vector3D.Z_UNIT, new b9.Vector3D(3.0, 4.0, 5.0));
    mat2.set(
            new b9.Vector3D(0.0, 0.0, 0.5),
            new b9.Vector3D(2.0, 0.0, 0.0),
            new b9.Vector3D(0.0, -0.5, 0.0),
            new b9.Vector3D(1.0, 2.0, 3.0));
    assertEquals_object(
            new b9.Matrix3D(
                new b9.Vector3D(0.0, 0.5, 0.0),
                new b9.Vector3D(0.0, 0.0, -2.0),
                new b9.Vector3D(2.0, 0.0, 0.0),
                new b9.Vector3D(4.0, 1.0, -4.0)),
            mat1.toLocal(mat2));

    /* toGlobal */
    mat1.set(
            new b9.Vector3D(0.0, 0.5, 0.0),
            new b9.Vector3D(0.0, 0.0, -2.0),
            new b9.Vector3D(2.0, 0.0, 0.0),
            new b9.Vector3D(4.0, 1.0, -4.0));
    mat2.set(
            new b9.Vector3D(0.0, 0.0, 0.5),
            new b9.Vector3D(2.0, 0.0, 0.0),
            new b9.Vector3D(0.0, -0.5, 0.0),
            new b9.Vector3D(1.0, 2.0, 3.0));
    assertEquals_object(
            new b9.Matrix3D(
                b9.Vector3D.X_UNIT, b9.Vector3D.Y_UNIT, b9.Vector3D.Z_UNIT, new b9.Vector3D(3.0, 4.0, 5.0)),
            mat1.toGlobal(mat2));

    /* toLocal_noTrans */
    mat1.set(b9.Vector3D.X_UNIT, b9.Vector3D.Y_UNIT, b9.Vector3D.Z_UNIT, new b9.Vector3D(3.0, 4.0, 5.0));
    mat2.set(
            new b9.Vector3D(0.0, 0.0, 0.5),
            new b9.Vector3D(2.0, 0.0, 0.0),
            new b9.Vector3D(0.0, -0.5, 0.0),
            new b9.Vector3D(1.0, 2.0, 3.0));
    assertEquals_object(
            new b9.Matrix3D(
                new b9.Vector3D(0.0, 0.5, 0.0),
                new b9.Vector3D(0.0, 0.0, -2.0),
                new b9.Vector3D(2.0, 0.0, 0.0),
                new b9.Vector3D(0.0, 0.0, 0.0)),
            mat1.toLocal_noTrans(mat2));

    /* toGlobal_noTrans */
    mat1.set(
            new b9.Vector3D(0.0, 0.5, 0.0),
            new b9.Vector3D(0.0, 0.0, -2.0),
            new b9.Vector3D(2.0, 0.0, 0.0),
            new b9.Vector3D(0.0, 0.0, 0.0));
    mat2.set(
            new b9.Vector3D(0.0, 0.0, 0.5),
            new b9.Vector3D(2.0, 0.0, 0.0),
            new b9.Vector3D(0.0, -0.5, 0.0),
            new b9.Vector3D(1.0, 2.0, 3.0));
    assertEquals_object(
            new b9.Matrix3D(b9.Vector3D.X_UNIT, b9.Vector3D.Y_UNIT, b9.Vector3D.Z_UNIT, b9.Vector3D.ZERO),
            mat1.toGlobal_noTrans(mat2));

    /* lookAt */
    assertEquals_object(
            new b9.Matrix3D(
                new b9.Vector3D(0.0, 1.0, 0.0),
                new b9.Vector3D(0.0, 0.0, 1.0),
                new b9.Vector3D(1.0, 0.0, 0.0),
                new b9.Vector3D(5.0, 2.0, -3.0)),
            mat1.lookAt(
                new b9.Vector3D(5.0, 2.0, -3.0), new b9.Vector3D(-5.0, 2.0, -3.0), new b9.Vector3D(1.0, 0.0, 10.0)));

    /* mulArrayAs4x4 */
    array1 = new Float32Array([
            1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0]);

    array2 = new Float32Array([
            2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 1.0]);

    array3 = new Float32Array(16);

    b9.Matrix3D.mulArrayAs4x4(array1, array2, array3);
    b9.Matrix3D.mulArrayAs4x4(array1, array1, array1);

    array4 = new Float32Array([
            118.0, 132.0, 146.0, 160.0, 230.0, 260.0, 290.0, 320.0,
            342.0, 388.0, 434.0, 480.0, 246.0, 292.0, 338.0, 384.0]);

    array5 = new Float32Array([
            90.0, 100.0, 110.0, 120.0, 202.0, 228.0, 254.0, 280.0,
            314.0, 356.0, 398.0, 440.0, 426.0, 484.0, 542.0, 600.0]);

    for (i = 0; i < 16; i++) {
        assertEquals_float(array4[i], array3[i]);
        assertEquals_float(array5[i], array1[i]);
    }

    /* equals */
    mat1.set(b9.Matrix3D.UNIT);
    mat2.set(mat1);
    assertTrue(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.getXAxis().set(b9.Vector3D.ZERO);
    assertFalse(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.getYAxis().set(b9.Vector3D.ZERO);
    assertFalse(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.getZAxis().set(b9.Vector3D.ZERO);
    assertFalse(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.getTrans().set(b9.Vector3D.X_UNIT);
    assertFalse(mat1.equals(mat2));

    /* toString */
    assertEquals("(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)", b9.Matrix3D.UNIT.toString());

    /* UNIT */
    assertEquals_object(
            new b9.Matrix3D(b9.Vector3D.X_UNIT, b9.Vector3D.Y_UNIT, b9.Vector3D.Z_UNIT, b9.Vector3D.ZERO),
            b9.Matrix3D.UNIT);
}
