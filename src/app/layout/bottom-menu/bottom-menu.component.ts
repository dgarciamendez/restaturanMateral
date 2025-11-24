import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { LucideAngularModule, FileText, Database, Settings } from 'lucide-angular';

@Component({
  selector: 'app-bottom-menu',
  standalone: true,
  imports: [MatListModule, RouterLink, LucideAngularModule],
  templateUrl: './bottom-menu.component.html',
  styleUrl: './bottom-menu.component.scss'
})
export class BottomMenuComponent {
  private _bottomSheetRef = inject(MatBottomSheetRef<BottomMenuComponent>);

  readonly FileTextIcon = FileText;
  readonly DatabaseIcon = Database;
  readonly SettingsIcon = Settings;

  close() {
    this._bottomSheetRef.dismiss();
  }
}
