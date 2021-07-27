import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Data, ChildData } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Covid19-India-Tracker';
  allData: Data[];
  totalData: Data;
  selectedState: string;
  selectedDistrictCode: string;
  stateData: Data;
  statewiseData: ChildData[];
  districtData: ChildData[];

  constructor(private service: DataService) {}

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    this.service.getAllData().subscribe((response) => {
      this.allData = response.statewise;
      this.totalData = this.allData.find((x) => x.statecode == 'TT');
      this.allData = this.allData.filter(
        (x) => x.statecode != 'TT' && x.statecode != 'UN'
      );
      this.getStateData();
    });
  }

  getStateData() {
    this.service.getStateData().subscribe((response) => {
      let arr = JSON.parse(JSON.stringify(response));
      let newarr = [];
      let otherarr = [];
      for (let i in arr) {
        newarr.push(arr[i]);
      }
      this.statewiseData = newarr;
      console.log(arr);
      console.log(newarr);
    });
  }

  onStateSelected() {
    this.stateData = this.allData.find(
      (x) => x.statecode == this.selectedState
    );
    let stateCode = this.selectedState == 'LA' ? 'LK' : this.selectedState;
    let data = [
      this.statewiseData.find((x) => x.statecode == `${stateCode}`)
        .districtData,
    ];
    let arr = JSON.parse(JSON.stringify(data[0]));
    let newarr = [];
    let otherarr = [];
    for (let i in arr) {
      newarr.push(arr[i]);
      otherarr.push(i);
    }
    newarr.map((item, index) => (item['name'] = otherarr[index]));
    this.districtData = newarr;
    console.log(newarr);
  }
}
