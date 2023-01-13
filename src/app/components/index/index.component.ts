import { Component, OnInit } from "@angular/core";
import {
  faFacebookF,
  faInstagram,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"],
})
export class IndexComponent implements OnInit {
  faFacebookF = faFacebookF;
  faInstagram = faInstagram;
  faGoogle = faGoogle;

  constructor() {}
  ngOnInit() {}
}
