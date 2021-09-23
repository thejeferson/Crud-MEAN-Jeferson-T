import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { NgForm } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  constructor(public empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  resetForm(form: NgForm){
    form.reset();
  }

  getEmpleados(){
    this.empleadoService.getEmpleados().subscribe(
      res => {
        this.empleadoService.empleados = res;
      },
      err => console.log(err)
    );
  }

  addEmpleado(form: NgForm){
    if(form.value._id)
    {
      this.empleadoService.putEmpleado(form.value).subscribe(
        res => {
          this.getEmpleados();
          form.reset();
        },
        err => console.log(err)
      );
    }else{
      this.empleadoService.createEmpleado(form.value).subscribe(
        res => {
          this.getEmpleados();
          form.reset();
        },
        err => console.log(err)
      )
    }
  }

  deleteEmpleado(id: any) {
    if (confirm("Esás seguro de eliminar este registro?")) {
      this.empleadoService.deleteEmpleado(id).subscribe(
        (res) => {
          this.getEmpleados();
        },
        (err) => console.log(err)
      );
    }
  }

  editEmpleado(empleado: Empleado){
    this.empleadoService.selectedEmpleado = empleado;
  }

}
