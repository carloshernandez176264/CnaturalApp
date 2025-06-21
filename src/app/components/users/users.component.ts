import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource!: MatTableDataSource<any>;

  users = [
    { id: 1, name: 'Carlos Hernández', email: 'carlos@email.com', role: 'ADMIN' },
    { id: 2, name: 'Ana Gómez', email: 'ana@email.com', role: 'USER' },
    // más usuarios
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  editUser(id: number) {
    console.log('Editar usuario', id);
    // abrir modal, formulario o redirigir
  }

  deleteUser(id: number) {
    console.log('Eliminar usuario', id);
    // llamada al servicio de eliminación
  }
}
