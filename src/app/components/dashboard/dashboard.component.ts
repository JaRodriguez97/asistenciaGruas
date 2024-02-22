import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserInterface } from "@interfaces/User.interface";
import { OrderInterface } from "@interfaces/order.interface";
import { AuthUserService } from "@services/AuthUser/authUser.service";
import { OrderService } from "@services/Order/order.service";
import { PublicService } from "@services/Public/public.service";
import { UserService } from "@services/User/user.service";
import { GlobalErrorHandlerService } from "@services/global-error-handler/global-error-handler.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  token!: string;
  user!: UserInterface;
  orders!: Array<OrderInterface>;
  isHidde: boolean = true;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    public publicService: PublicService,
    public authUserService: AuthUserService,
    private router: Router,
    private globalError: GlobalErrorHandlerService
  ) {}

  ngOnInit(): any {
    this.token = localStorage.getItem("tokenCNG")!;

    if (!this.token) return this.globalError.handleError({ status: 401 });

    this.router.url.includes("order")
      ? (this.isHidde = false)
      : (this.isHidde = true);

    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.token).subscribe({
      next: (res) => {
        this.user = res;

        if (
          typeof this.authUserService.isAdmin == "undefined" ||
          this.authUserService.isAdmin == undefined
        )
          this.authUserService.isAdmin = this.user.rol === "admin";
      },
      error: (err) => this.globalError.handleError(err),

      complete: () => this.getOrders(),
    });
  }

  getOrders() {
    this.orderService.getUserOrders(this.token).subscribe({
      next: (res) => (this.orders = res),
      error: (err) => this.globalError.handleError(err),
      complete: () => setTimeout(() => this.publicService.hide(), 1000),
    });
  }

  statusOrderClass(estado: string) {
    let obj: { [key: string]: boolean } = {};

    obj[estado] = true;

    return obj;
  }

  openOrder(_id: string) {
    this.publicService.show();

    this.isHidde = false;

    this.router.navigate(["/dashboard", "order", _id]);
  }

  getDashboard() {
    this.isHidde = !this.isHidde;

    this.router.navigate(["/dashboard"]);
  }
}
