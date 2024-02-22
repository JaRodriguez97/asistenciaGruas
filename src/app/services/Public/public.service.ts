import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  public progressBar!: Boolean;
  public isBrowser!: boolean;
  public isMobile!: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.progressBar = true;
    // Verifica si la aplicación se está ejecutando en un navegador
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      // Obtén el agente de usuario del navegador
      //@ts-ignore
      const { userAgentData, userAgent } = window.navigator;

      if (userAgentData) this.isMobile = userAgentData.mobile;
      else if (
        userAgent.match(/Android/i) ||
        userAgent.match(/webOS/i) ||
        userAgent.match(/iPhone/i) ||
        userAgent.match(/iPad/i) ||
        userAgent.match(/iPod/i) ||
        userAgent.match(/BlackBerry/i) ||
        userAgent.match(/Windows Phone/i)
      )
        this.isMobile = true;
      else this.isMobile = false;
    }

    console.log('El dispositivo usado es un celular: ', this.isMobile);
  }


  show() {
    this.progressBar = true;
  }

  hide() {
    this.progressBar = false;
  }
}
