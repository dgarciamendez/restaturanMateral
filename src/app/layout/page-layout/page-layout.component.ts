import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-page-layout',
    standalone: true,
    imports: [MatDividerModule],
    templateUrl: './page-layout.component.html',
    styleUrl: './page-layout.component.scss'
})
export class PageLayoutComponent {
    @Input() pageTitle: string = '';
}
