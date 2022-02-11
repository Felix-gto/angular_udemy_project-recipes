import { Directive, HostListener, HostBinding, ElementRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]' 
})

export class DropdownDirective {

    @HostBinding('class.open') isOpen = false;  // Adds the .open CSS Class. By default it does not added -> dropdown menu not showing


    /***** Closes dropdown menu when clicking the button (not when clicking anywhere on the page) *****/
    @HostListener('click') toggleOpen() {       // Listens to ('click') event and runs our custom toggleOpen() method when clicking, changing isOpen to true / false

        this.isOpen = !this.isOpen;

    }


    /***** Closes dropdown menu when clicking anywhere on the page (which also means that a click on one dropdown closes any other one) *****/
    // @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    //     this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    // }

    // constructor(private elRef: ElementRef) {}
    
}