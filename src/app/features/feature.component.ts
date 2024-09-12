import { Component } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent {
  name = '!!!';
  viewMode = 'tab1';
  tabValue:any ="general";
  
  tabChange(data:any){
    this.tabValue = data
  }
}