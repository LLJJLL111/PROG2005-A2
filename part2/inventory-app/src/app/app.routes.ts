// Author: Jialin Li
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { InventoryComponent } from './inventory/inventory';
import { SearchComponent } from './search/search';
import { PrivacyComponent } from './privacy/privacy';
import { HelpComponent } from './help/help';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'search', component: SearchComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: 'home' },
];