import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'jiraworkflow';
  deviceXs: boolean | undefined;
  mediaSub: Subscription | undefined;

  constructor(public mediaObserver: MediaObserver) {}

  ngOnInit() {
    this.mediaSub = this.mediaObserver.asObservable().subscribe((changes: MediaChange[]) => {
      changes.forEach(change => {
        console.log(change.mqAlias);
        this.deviceXs = change.mqAlias === 'xs' ? true : false;
      });
    });
  }

  ngOnDestroy() {
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
  }
}
