import { AuthUserService } from '@app/services/AuthUser/authUser.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressInterface } from '@app/interfaces/Address.interface';
import { OrderInterface } from '@interfaces/order.interface';
import { OrderService } from '@services/Order/order.service';
import { GlobalErrorHandlerService } from '@services/global-error-handler/global-error-handler.service';
import { PublicService } from '@app/services/Public/public.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  token!: string;
  order!: OrderInterface;
  direccionEnvio!: AddressInterface;

  constructor(
    private globalError: GlobalErrorHandlerService,
    private orderService: OrderService,
    public publicService: PublicService,
    public authUserService: AuthUserService,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): any {
    this.token = localStorage.getItem('tokenCNG')!;

    if (!this.token) return this.globalError.handleError({ status: 401 });

    this.geturlSubscribe();
  }

  geturlSubscribe() {
    this.activateRouter.params.subscribe({
      next: (params) => {
        let { id } = params;

        if (!id) this.globalError.handleError({ status: 400 });

        this.getOrder(id);
      },
      error: (err) => this.globalError.handleError(err),
      // complete:()=>
    });
  }

  getOrder(id: string) {
    this.orderService.getOrder(id, this.token).subscribe({
      next: (res) => {
        this.order = res;
        console.log(
          '🚀 ~ OrderDetailsComponent ~ this.orderService.getOrder ~ res:',
          res
        );

        if (this.authUserService.isAdmin && this.order.fechaProcesado == null)
          this.updateOrder('procesando');
      },
      error: (err) => this.globalError.handleError(err),
      complete: () => {
        if (typeof this.order.direccionEnvio != 'string')
          this.direccionEnvio = this.order.direccionEnvio;

        setTimeout(() => this.publicService.hide(), 1000);
      },
    });
  }

  updateOrder(estado: string) {
    this.orderService
      .updateOrder(this.order._id!, this.token, estado)
      .subscribe({
        next: (res) => (this.order = res),
        error: (err) => this.globalError.handleError(err),
      });
  }
}
