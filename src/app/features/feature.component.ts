import { Component } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent {
  name = '!!!';
  viewMode = 'tab1';
  tabs = [
    { label: 'Personal', value: 'general' },
    { label: 'Social', value: 'social' },
    { label: 'Design', value: 'design' }
  ];
  
  tabValue: string = 'general';
  tabChange(data:any){
    this.tabValue = data
  }
}