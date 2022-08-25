import { Component, OnInit, HostListener, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ActivatedRoute, Params, Router } from "@angular/router";
// import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"],
})
export class IndexComponent implements OnInit {
  // clases: { imgBx: boolean; active: boolean } = { imgBx: true, active: false };

  constructor() {}
  ngOnInit() {
    // setTimeout(() => {
    //   this.clases.active = true;
    // }, 2000);
  }
}
