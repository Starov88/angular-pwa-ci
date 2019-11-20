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

    isA2HSConfirm = true;
    
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(private breakpointObserver: BreakpointObserver) {
        
    }

    ngOnInit(): void {
        console.log("nav init");
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log("beforeinstallprompt");
            e.preventDefault();
            this.deferredPrompt = e;
            this.isA2HSConfirm = false;
        });
    }


    public a2hs() {
        if (!this.deferredPrompt || this.deferredPrompt == null) {
            this.isA2HSConfirm = true;
            return;
        }
        this.isA2HSConfirm = false;
        
        console.log("click a2hs-button");
        this.isA2HSConfirm = true;
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
                this.deferredPrompt = null;
            } else {
                console.log('User dismissed the A2HS prompt');
                this.isA2HSConfirm = false;
            }
        });
    }
}
