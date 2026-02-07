import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../../shared/shared.module';
import { SandboxComponent } from './sandbox.component';
import { DevicePanelComponent } from './components/device-panel/device-panel.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { DeviceCardComponent } from './components/device-card/device-card.component';
import { DeviceSettingsDialogComponent } from './components/device-settings-dialog/device-settings-dialog.component';
import { SimulationPanelComponent } from './components/simulation-panel/simulation-panel.component';
import { ConfigFormComponent } from './components/config-form/config-form.component';
import { TemplateSelectorComponent } from './components/template-selector/template-selector.component';

const routes: Routes = [
  {
    path: '',
    component: SandboxComponent
  }
];

@NgModule({
  declarations: [
    SandboxComponent,
    DevicePanelComponent,
    WorkspaceComponent,
    DeviceCardComponent,
    DeviceSettingsDialogComponent,
    SimulationPanelComponent,
    ConfigFormComponent,
    TemplateSelectorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
    RouterModule.forChild(routes)
  ]
})
export class SandboxModule { }
