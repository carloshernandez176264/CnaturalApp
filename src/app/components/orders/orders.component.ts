import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  isAdmin = false;

  displayedColumns: string[] = ['orderNumber', 'date', 'total', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;

  orders = [
    { id: 1, orderNumber: 'ORD-001', date: '2024-03-10', total: 95000, status: 'Completado' },
    { id: 2, orderNumber: 'ORD-002', date: '2024-03-12', total: 45000, status: 'Pendiente' },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'ADMIN';

    this.dataSource = new MatTableDataSource(this.orders);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  viewDetails(id: number) {
    console.log('Ver detalles del pedido', id);
    // redirigir o abrir modal
  }
}
