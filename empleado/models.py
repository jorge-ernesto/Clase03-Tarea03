from django.db import models

# Create your models here.

class Empleado(models.Model):  # Modelo creado para ejecutar migraciones
    # Definir los datos de la clase (campos de la tabla)
    # Si no se especifica lo contrario, todos los campos seran requeridos por defecto, es decir NOT NULL
    codigo = models.CharField(max_length=20)
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    sexo = models.CharField(max_length=1)
    fecha_nacimiento = models.DateField()
    cargo = models.CharField(max_length=40)
    area = models.CharField(max_length=40)
    sueldo = models.DecimalField(max_digits=11, decimal_places=4)

    class Meta:
        db_table = "empleado"  # Especificar el nombre de la tabla que se creara en la migración

    def __str__(self):
        return self.nombre + ' ' + self.apellidos
