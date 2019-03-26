import {Component, Input, OnInit} from '@angular/core';
import { ILCCongig} from '../../model/ILCConfig.model';
import {MainModel} from '../../model/main.model';
import {PairwiseModel} from '../../model/pairwise.model';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit {

  @Input() ilc: ILCCongig;
  @Input() mainModel: MainModel;

  clusterList: { _deviceCriteriaFile: string;
                 _deviceCurtailmentFile: string;
                 _pairwiseCriteriaFile: string;
                 _clusterPriority: string }[];

  constructor() {}

  addCluster() {
    this.clusterList.push({_clusterPriority: '',
                           _pairwiseCriteriaFile: '',
                           _deviceCriteriaFile: '',
                           _deviceCurtailmentFile: ''});
    this.ilc.updateClusterList(this.clusterList);
    this.mainModel.addPairwise(new PairwiseModel());
    this.mainModel.print();
  }

  removeCluster(index) {
    this.clusterList.splice(index, 1);
    this.ilc.updateClusterList(this.clusterList);
  }

  ngOnInit() {
    this.clusterList = this.ilc.clusterList;
  }

  trackByIndex(index: number): any {
    return index;
  }
}