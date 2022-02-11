import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';
import { AuthService } from '../shared/services';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  status = {
    0: "In Progress",
    1: "Completed",
    2: "Failed"
  }
  user;
  networks;
  show = false;
  constructor(private authService: AuthService, private apiService: ApiService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(res => {
      this.user = res;
      this.apiService.listNetwork(this.user).subscribe(res1 => {
        this.networks = res1;
        if (this.networks.length > 0) this.show = true
      })
    })
  }

  
}
