import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {  

  isAdmin = false;
  displayedColumns: string[] = ['orderNumber', 'date', 'total', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private orderService: OrderService,
    private session: SessionStorageService
  ) {}

  ngOnInit(): void {
    const role = this.session.getRole();
    const userId = this.session.getItem('token')?.userId;

    this.isAdmin = role === 'ROLE_ADMIN';

    if (userId) {
      this.orderService.getOrdersByUserId(userId).subscribe({
        next: (orders) => {
          const formattedOrders = orders.map((order: any) => ({
            id: order.id,
            orderNumber: `ORD-${order.id.toString().padStart(3, '0')}`,
            date: order.dateCreated.split('T')[0],
            total: order.totalOrderPrice,
            status: order.orderState
          }));
          this.dataSource = new MatTableDataSource(formattedOrders);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: () => {
          console.error('Error al cargar órdenes');
        }
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  viewDetails(id: number) {
    console.log('Ver detalles del pedido', id);
  }
  ngAfterViewInit(): void {
   setTimeout(() => {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  });
  }

  clearFilter(): void {
    this.dataSource.filter = '';
  }
}
