// core
import { Injectable, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';

@Injectable()
export class NavBarService {

  private isDownload = false;

  @Output() downloadTaskToExel: EventEmitter<boolean> = new EventEmitter();

  onDownloadTaskToExel() {
    this.isDownload = !this.isDownload;
    this.downloadTaskToExel.emit(this.isDownload);
  }
}
