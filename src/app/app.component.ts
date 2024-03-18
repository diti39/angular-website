import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { MatBadgeModule } from '@angular/material/badge';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from './services/dialog.service';
import { ThemeService } from './services/theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, MatIconModule, MatButtonModule, MatToolbarModule, HomeComponent, MatBadgeModule, DialogComponent, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent implements OnInit {
  title = 'my-new-app';
  selectedProductsCount: number = 0;

  constructor(private router: Router,public dialog: MatDialog, private dialogService: DialogService, public themeService: ThemeService) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showGoBackButton();
      }
    });

    this.dialogService.getSelectedProductsCountObservable().subscribe(count => {
      this.selectedProductsCount = count;
    });

  }
  openBillDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
    });
  }

  toggleTheme() {
    this.themeService.updateTheme();
  }

  showGoBackButton(): boolean {
    return this.router.url !== '/';
  }

  goBack(): void {
    this.router.navigate(['/']); 
  }
}
