from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Empleado

# Create your views here.

def index(request):
    return render(request, "empleado/index.html")

def read(request):
    empleados = Empleado.objects.all()
    print('empleados', empleados)
    return render(request, 'empleado/result.html', {"empleados":empleados})

def create(request):
    # crear objeto empleado de la clase empleado
    empleado = Empleado(codigo = request.POST["codigo"],
                    nombre = request.POST["nombre"],
                    apellidos = request.POST["apellidos"],
                    sexo = request.POST["sexo"],
                    fecha_nacimiento = request.POST["fecha_nacimiento"],
                    cargo = request.POST["cargo"],
                    area = request.POST["area"],
                    sueldo = request.POST["sueldo"])
    # grabar empleado en la BD
    empleado.save()
    return redirect('/')

def edit(request, id):
    empleado = Empleado.objects.get(id = id)
    fe = empleado.fecha_nacimiento
    empleado.fecha_nacimiento = '{:%Y-%m-%d}'.format(fe)
    arregloEmpleado = [empleado.id, empleado.codigo, empleado.nombre, empleado.apellidos, empleado.sexo, empleado.fecha_nacimiento, empleado.cargo, empleado.area, empleado.sueldo]
    data = {'message': "Success", 'empleados': arregloEmpleado}
    return JsonResponse(data)

def update(request, id):
    empleado = Empleado.objects.get(id = id)
    # actualizar datos
    empleado.codigo = request.POST["codigo"]
    empleado.nombre = request.POST["nombre"]
    empleado.apellidos = request.POST["apellidos"]
    empleado.sexo = request.POST["sexo"]
    empleado.fecha_nacimiento = request.POST["fecha_nacimiento"]
    empleado.cargo = request.POST["cargo"]
    empleado.area = request.POST["area"]
    empleado.sueldo = request.POST["sueldo"]
    # graba empleado actualizado
    empleado.save()
    return redirect('/')

def delete(request, id):
    empleado = Empleado.objects.get(id = id)
    empleado.delete()
    return redirect('/')
