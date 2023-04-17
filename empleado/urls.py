from django.urls import path
from . import views

app_name = 'empleados'

urlpatterns = [
    path(''                         , views.index , name="index"),
    path('empleados/'               , views.index , name="empleados"),
    path('empleados/read'           , views.read  , name="read"),
    path('empleados/create'         , views.create, name="create"),
    path('empleados/edit/<int:id>'  , views.edit  , name="edit"),
    path('empleados/update/<int:id>', views.update, name="update"),
    path('empleados/delete/<int:id>', views.delete, name="delete"),
]
