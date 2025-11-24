import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Utensils, Truck, Banknote, MoreHorizontal, FileText, Database, Settings } from 'lucide-angular';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatListModule,
    MatExpansionModule,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  readonly UtensilsIcon = Utensils;
  readonly TruckIcon = Truck;
  readonly CashRegisterIcon = Banknote;
  readonly MoreHorizontalIcon = MoreHorizontal;
  readonly FileTextIcon = FileText;
  readonly DatabaseIcon = Database;
  readonly SettingsIcon = Settings;
}
