import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-a2hs',
    templateUrl: './a2hs.component.html'
})
export class A2hsComponent implements OnInit {

    private deferredPrompt: any = null;
    isA2HSConfirm = true;

    constructor() { }

    ngOnInit(): void {
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log("beforeinstallprompt");
            e.preventDefault();
            this.deferredPrompt = e;
            this.isA2HSConfirm = false;
        });
    }

    public a2hs() {
        console.log("a2hs");
        if (this.isA2HSConfirm) {
            return;
        }
        this.isA2HSConfirm = true;
        if (!this.deferredPrompt || this.deferredPrompt == null) {
            return;
        }
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
