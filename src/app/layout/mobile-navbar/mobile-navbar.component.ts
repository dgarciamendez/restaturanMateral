import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Utensils, Truck, Banknote, MoreHorizontal } from 'lucide-angular';
import { BottomMenuComponent } from '../bottom-menu/bottom-menu.component';

@Component({
  selector: 'app-mobile-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatBottomSheetModule,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
  ],
  templateUrl: './mobile-navbar.component.html',
  styleUrl: './mobile-navbar.component.scss'
})
export class MobileNavbarComponent {
  private bottomSheet = inject(MatBottomSheet);

  readonly UtensilsIcon = Utensils;
  readonly TruckIcon = Truck;
  readonly CashRegisterIcon = Banknote;
  readonly MoreHorizontalIcon = MoreHorizontal;

  openOthersMenu() {
    this.bottomSheet.open(BottomMenuComponent);
  }
}
