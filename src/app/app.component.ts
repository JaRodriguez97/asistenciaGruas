import { Component } from "@angular/core";
import { PublicService } from "./services/Public/public.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  // token!: string | null;
  title = "CNG";
  constructor(public deviceService: PublicService) {}
}
