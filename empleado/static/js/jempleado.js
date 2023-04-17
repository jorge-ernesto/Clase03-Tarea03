// Esperar a que el documento se haya cargado
$(document).ready(function () { // $(function () {

    // Verificar si el elemento con el id "result" existe en el DOM.
    if ($('#result') != null) {
        console.log('Cargar Read')
        Read();
    }

    //funcion create
    // $("#create").on('click', function () {
    $("#formCreate").on('submit', function (e) {
        e.preventDefault();

        //asignar valores a variables
        $id = $("#id").val();
        $codigo = $("#codigo").val();
        $nombre = $("#nombre").val();
        $apellidos = $("#apellidos").val();
        $sexo = $("#sexo").val();
        $fecha_nacimiento = $("#fecha_nacimiento").val();
        $cargo = $("#cargo").val();
        $area = $("#area").val();
        $sueldo = $("#sueldo").val();

        // Guardar o editar
        let $url = '/empleados/create';
        if ($id && !isNaN($id)) { // Validar que id exista y sea diferente de null o undefined. Ademas id debe ser numerico. NaN (Not-a-Number)
            $url = '/empleados/update/' + $id;
        }

        // Validacion
        let errores = {};
        if ($codigo.trim() == '' || $codigo == null) {
            errores['codigo'] = 'El código no es válido';
        }
        if ($nombre.trim() == '' || $nombre == null) {
            errores['nombre'] = 'El nombre no es válido';
        }
        if ($apellidos.trim() == '' || $apellidos == null) {
            errores['apellidos'] = 'Los apellidos no son válidos';
        }
        if ($sexo.trim() == '' || $sexo == null) {
            errores['sexo'] = 'El sexo no es válido';
        }
        if ($fecha_nacimiento.trim() == '' || $fecha_nacimiento == null || !/^\d{4}-\d{2}-\d{2}$/.test($fecha_nacimiento)) {
            errores['fecha_nacimiento'] = 'La fecha de nacimiento no es válida';
        }
        if ($cargo.trim() == '' || $cargo == null) {
            errores['cargo'] = 'El cargo no es válido';
        }
        if ($area.trim() == '' || $area == null) {
            errores['area'] = 'El área no es válida';
        }
        if ($sueldo.trim() == '' || $sueldo == null || isNaN($sueldo)) {
            errores['sueldo'] = 'El sueldo no es válido. Debe ser un número';
        }

        if (Object.keys(errores).length > 0) {
            for (let error in errores) {
                alert(errores[error]);
            }
            return false;
        } else {
            // uso de ajax
            $.ajax({
                url: $url,
                type: 'POST',
                data: {
                    codigo: $codigo,
                    nombre: $nombre,
                    apellidos: $apellidos,
                    sexo: $sexo,
                    fecha_nacimiento: $fecha_nacimiento,
                    cargo: $cargo,
                    area: $area,
                    sueldo: $sueldo,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function () {
                    Read();
                    $('#id').val('');
                    $('#codigo').val('');
                    $('#nombre').val('');
                    $('#apellidos').val('');
                    $('#sexo').val('');
                    $('#fecha_nacimiento').val('');
                    $('#cargo').val('');
                    $('#area').val('');
                    $('#sueldo').val('');
                    openCloseModal();
                }
            });
        }
    });

    //funcion edit
    $(document).on('click', '.edit', function () {
        $id = $(this).attr('name');
        $.ajax({
            url: '/empleados/edit/' + $id,
            type: 'POST',
            data: {
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function (response) {
                console.log(response);
                $('#id').val(response.empleados[0]);
                $('#codigo').val(response.empleados[1]);
                $('#nombre').val(response.empleados[2]);
                $('#apellidos').val(response.empleados[3]);
                $('#sexo').val(response.empleados[4]);
                $('#fecha_nacimiento').val(response.empleados[5]);
                $('#cargo').val(response.empleados[6]);
                $('#area').val(response.empleados[7]);
                $('#sueldo').val(response.empleados[8]);
                openCloseModal();
            }
        });
    });

    //funcion delete
    $(document).on('click', '.delete', function (e) {
        const confirmacion = confirm('¿Desea eliminar el registro?');
        if (!confirmacion) {
            return false;
        }

        $id = $(this).attr('name');
        $.ajax({
            url: '/empleados/delete/' + $id,
            type: 'POST',
            data: {
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function () {
                Read();
            }
        });
    });

    //funcion hidden.bs.modal
    $('#createEmpleado').on('hidden.bs.modal', function () {
        // Código a ejecutar cuando el modal se cierra
        eliminarNuevo();
    });

});

//funcion read
function Read() {
    $.ajax({
        url: '/empleados/read',
        type: 'POST',
        async: false,
        data: {
            //res: 1,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function (response) {
            $('#result').html(response);
        }
    });
}

//funcion handleopenmodal
function handleOpenModal() {
    $('#createEmpleado').modal('hide');
}

//funcion handleclosemodal
function handleCloseModal() {
    $('#createEmpleado').modal('show');
}

//funcion openclosemodal
function openCloseModal() {
    if ($('#createEmpleado').is(':visible')) {
        $('#createEmpleado').modal('hide');
    } else {
        $('#createEmpleado').modal('show');
    }
}

//function eliminarnuevo
function eliminarNuevo() {
    $('#id').val('');
    $('#codigo').val('');
    $('#nombre').val('');
    $('#apellidos').val('');
    $('#sexo').val('');
    $('#fecha_nacimiento').val('');
    $('#cargo').val('');
    $('#area').val('');
    $('#sueldo').val('');
}
