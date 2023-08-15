import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CoreModule } from './core/core.module';
import { AdminComponent } from './modules/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, LayoutComponent, AdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
