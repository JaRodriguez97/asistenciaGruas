import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "asistenciaGruas";
  @ViewChild("menuToggle") menuToggle!: ElementRef;
  @ViewChild("menu") menu!: ElementRef;
  @ViewChild("header") header!: ElementRef;

  constructor(private render: Renderer2, private router: Router) {}

  ngOnInit(): void {}

  @HostListener("window:scroll")
  scrolling(): void {
    if (window.scrollY > 0) {
      this.render.addClass(this.header.nativeElement, "sticky");
    } else this.render.removeClass(this.header.nativeElement, "sticky");
  }

  toogleMenu() {
    this.menuToggle?.nativeElement?.classList.toggle("active");
    this.menu?.nativeElement?.classList.toggle("active");
  }

  // getSection(url: string) {
  //   if (this.menuToggle)
  //     this.render?.removeClass(this.menuToggle?.nativeElement!, "active");
  //   if (this.menuToggle)
  //     this.render?.removeClass(this.menu?.nativeElement!, "active");

  //   return url;
  // }
}
