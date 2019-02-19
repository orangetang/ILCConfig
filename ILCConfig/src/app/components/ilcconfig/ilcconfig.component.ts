import { Component, OnInit, } from '@angular/core';
import { ILCCongig} from '../../model/ILCConfig.model';
import { Cluster} from '../../model/cluster.model';
import {FormsModule} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import { ajax, css } from 'jquery';
import {stringify} from 'querystring';
import { ILCconfigService} from '../../services/ILCConfigService/ilcconfig.service';


@Component({
  selector: 'app-ilcconfig',
  templateUrl: './ilcconfig.component.html',
  styleUrls: ['./ilcconfig.component.css']
})
export class ILCConfigComponent implements OnInit {

  ilc: ILCCongig;
  cluster: Cluster;

  campus: string;
  building: string;
  agentId: string;
  demandLimit: string;
  curtailmentTime: string;
  curtailmentConfirm: string;
  curtailmentBreak: string;
  buildingPowerWindow: string;
  staggerRelease: string;
  staggerOfftime: string;
  device: string;
  point: string;
  demandFormula: string;
  demandformulaAgrs: string;
  demandformulaAgrsArr = [];

  // Cluster Attributes
  noOfCluster = 1;

  clusterPriority: string;
  pairWiseCriteria: string;
  deviceCriteriaFile: string;
  deviceCurtailmentFile: string;

  finalCalculation: string;
  clusterArr: Cluster[] = [];

constructor(private ilcService: ILCconfigService) { }

  addDemandFormula() {
    $('#powerMeter').append('<label>Demand Formula Arguments (Optional)</label>' +
      '<input style="width: 50%" type="text" class="form-control" [(ngModel)]="demandformulaAgrs"><br/>');
    // @ts-ignore
    this.demandformulaAgrsArr.push(this.demandformulaAgrs);
    console.log(this.demandformulaAgrsArr);
  }

  addCluster() {
    let newCluterVal = this.noOfCluster + 1;
    this.noOfCluster++;
    console.log('newClu' + newCluterVal);
    console.log('noofclus' + this.noOfCluster);
    $('#clusterBlock').append('<div style="margin-top: 10px; margin-bottom: 10px; border-style: groove">\n' +
      '      <label style="width: 100%">\n' +
      '        <p  data-toggle="collapse"\n' +
      '            href="#Cluster' + newCluterVal + '" role="button" aria-expanded="false" aria-controls="collapseExample">\n' +
      '          Cluster ' + newCluterVal + '  <i style="padding-left: 80%" class="material-icons">\n' +
      '          keyboard_arrow_down\n' +
      '        </i></p>\n' +
      '      </label>\n' +
      '\n' +
      '      <div class="collapse" id="Cluster' + newCluterVal + '">\n' +
      '          <div class="card card-body" id="clusterForm">\n' +
      '            <label>Cluster Priority</label>\n' +
      '            <input type="text" class="form-control" [(ngModel)]="clusterPriority"  name="clusterPtiority">\n' +
      '            <label>Pairwise criteria File</label>\n' +
      '            <form class="form-inline">\n' +
      '              <input type="text" class="form-control file-input" [(ngModel)]="pairWiseCriteria"\n' +
      '                     name="pairwiseCriteria">\n' +
      '              <button type="button" class="btn btn-primary btn-sm">Open</button>\n' +
      '            </form>\n' +
      '            <label>Device Criteria File</label>\n' +
      '            <form  class="form-inline">\n' +
      '              <input type="text" class="form-control file-input" [(ngModel)]="deviceCriteriaFile"\n' +
      '                     name="devceCriteriaFile">\n' +
      '              <button type="input" class="btn btn-primary btn-sm">Open</button>\n' +
      '            </form>\n' +
      '            <label>Device Curtailment file</label>\n' +
      '            <form class="form-inline">\n' +
      '              <input id="file"type="file"  class="form-control file-input"\n' +
      '                     [(ngModel)]="deviceCurtailmentFile" name="devicecurtailment">\n' +
      '              <button type="button" value="upload" class="btn btn-primary btn-sm"\n' +
      '                      (click)="thisFileUpload()">Open</button>\n' +
      '            </form>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '      </div>');
  }

  onRefeshClick() {

    if(this.staggerOfftime === undefined) {
      this.staggerOfftime = 'false';
    }

    if(this.staggerRelease === undefined) {
      this.staggerRelease = 'false';
    }

    this.ilc = new ILCCongig(this.campus, this.building, this.device, this.point, this.demandFormula,
                             this.demandformulaAgrs, this.agentId, this.demandLimit, this.curtailmentTime,
                             this.curtailmentConfirm, this.curtailmentBreak, this.buildingPowerWindow,
                             this.staggerRelease, this.staggerOfftime, this.clusterArr);
    this.ilcService.createIlcConfig(this.ilc);
    this.finalCalculation = this.ilcService.getFinalCalculation();
  }
  thisFileUpload() {
    document.getElementById('file').click();
  }

ngOnInit() {
  this.ilc = this.ilcService.getIlcConfig();
  this.campus = this.ilc.campus;
  this.building = this.ilc.building;
  this.device = this.ilc.device;
  this.point = this.ilc.point;
  this.demandFormula = this.ilc.demandFormula
  this.demandformulaAgrs = this.ilc.demandFormulaArgs;
  this.agentId = this.ilc.agentId;
  this.demandLimit = this.ilc.demandLimit;
  this.curtailmentTime = this.ilc.curtailmentTime
  this.curtailmentConfirm = this.ilc.curtailmentConfirm;
  this.curtailmentBreak = this.ilc.curtailmentBreak;
  this.buildingPowerWindow = this.ilc.buildingPowerWindow;
  this.clusterArr = this.ilc.cluster;

  this.finalCalculation = this.ilcService.getFinalCalculation();
}

}