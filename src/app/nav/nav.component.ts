import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    private deferredPrompt: any = null;

    isA2HSConfirm = false;
    
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(private breakpointObserver: BreakpointObserver) {
        
    }

    ngOnInit(): void {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            console.log("deferredPrompt");
            console.log(this.deferredPrompt);
            this.A2HS();
        });
    }


    public A2HS() {
        console.log("A2HS");
        if (!this.deferredPrompt) {
            this.isA2HSConfirm = true;
            return;
        }

        document.getElementById('a2hs-button').addEventListener('click', (e) => {
            console.log("click a2hs-button");
            this.isA2HSConfirm = true;

            this.deferredPrompt.prompt();
            this.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                    this.isA2HSConfirm = false;
                }
                this.deferredPrompt = null;
            });
        });
    }

}
