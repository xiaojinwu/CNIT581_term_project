import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

declare var Cesium: any;
@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.sass']
})
export class VisualizationComponent implements OnInit {
  viewer: any;
  constructor(
    
    public http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.initEarth();
  }
  initEarth() {
    Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZTdiMGNlOS1mMGU4LTQ3NjEtYmVhNS0zNmRhYWRlZDdhZWUiLCJpZCI6MTM5OTQsImlhdCI6MTYzMTM5NjI3MH0.27fOT75Tsj0mLo-h5rX-ztBIKAIOGQ7LOaZAjjh1dHg';
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90);
  this.viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false,
    infoBox: true,
    fullscreenButton: true,
    baseLayerPicker: true,
    animation: false,
    shouldAnimate: true,
    homeButton: true,
    geocoder: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
  });

  this.viewer.scene.globe.depthTestAgainstTerrain = false;
  this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  this.viewer.scene.debugShowFramesPerSecond = false;  
  this.viewer.cesiumWidget.creditContainer.style.display = 'none';
  var canvas = this.viewer.scene.canvas;
  var ellipsoid = this.viewer.scene.globe.ellipsoid;
  var handler = new Cesium.ScreenSpaceEventHandler(canvas);
  
  }

}
