import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  HostListener,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { Router } from "@angular/router";
import { PublicService } from "@services/Public/public.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"],
})
export class LandingComponent implements OnInit {
  sections: string[] = ["Inicio", "Productos", "Contactanos"];
  selectedItem: number | null = null;
  activeClassHeader: Boolean = false;
  activeClassNav: Boolean = false;
  productos: [] = [];
  hidden = false;
  // token!: string;

  @ViewChild("menuToggle") menuToggle!: ElementRef;
  @ViewChild("menu") menu!: ElementRef;
  @ViewChild("header") header!: ElementRef;

  constructor(
    private render: Renderer2,
    private router: Router,
    public publicService: PublicService
  ) {}

  ngOnInit() {
    setTimeout(() => this.publicService.hide(), 1000);

    // this.token = localStorage.getItem("tokenCNG")!;

    // if (this.router.url.indexOf("cart") != -1) this.toggleBadgeVisibility();
  }

  @HostListener("window:scroll")
  scrolling(): void {
    if (window.scrollY > 0)
      this.render.addClass(this.header.nativeElement, "sticky");
    else this.render.removeClass(this.header.nativeElement, "sticky");
  }

  // toggleBadgeVisibility() {
  //   if (!this.token)
  //     Swal.fire({
  //       title: "Inicia sesión",
  //       text: "Para ver los productos del carrito debes iniciar sesión",
  //       icon: "warning",
  //       confirmButtonText: "Aceptar",
  //       // }).then(() => this.toggleParpadeo());
  //     });
  //   else {
  //     this.hidden = !this.hidden;

  //     if (this.hidden) this.router.navigate(["/landing/cart"]);
  //     else this.router.navigate(["/"]);
  //   }
  // }

  toogleMenu() {
    this.menuToggle?.nativeElement?.classList.toggle("active");
    this.menu?.nativeElement?.classList.toggle("active");
  }

  // onDataLoaded() {
  //   this.progressBar = !this.progressBar;
  // }

  onItemClick(index: number) {
    this.selectedItem = index;
    this.addClass();
  }

  addClass() {
    this.activeClassNav = !this.activeClassNav;
  }
}
