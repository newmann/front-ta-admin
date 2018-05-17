import { Component, ViewChild } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
    selector: 'mobile-app-header',
    templateUrl: './mobile-header.component.html'
})
export class MobileHeaderComponent {
    searchToggleStatus: boolean;

    constructor(public settings: SettingsService) { }

    // toggleCollapsedSidebar() {
    //     this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
    // }
    //
    // searchToggleChange() {
    //     this.searchToggleStatus = !this.searchToggleStatus;
    // }

}
