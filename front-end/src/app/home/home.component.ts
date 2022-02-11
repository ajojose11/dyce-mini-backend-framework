import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';
import { ApiService } from '../shared/services/api.service';
import { AuthService } from '../shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private apiService: ApiService, private authService: AuthService) { }
  formShow= false;
  name;
  user;
  nameexists = false;
  progress = false;
  networks
  limit = false;
  ngOnInit() {
    this.authService.getUser().subscribe(res => {
      this.user = res;
      this.apiService.listNetwork(this.user).subscribe(res1 => {
        this.networks = res1;
        if (this.networks.length > 0) this.limit = true;
      })
    })
  }

  formShowClick() {
    this.formShow = true;
  }

  createNetwork() {
  this.user.name = this.name;
    if (this.name) {
      this.nameexists = false
      this.progress = true
      this.apiService.createNetwork(this.user).subscribe(res => {
      this.progress = false;
    }, err => {
      if(err.error.error === "name_already_exists") this.nameexists = true;
      this.progress = false;
    })
    }
  }
}
