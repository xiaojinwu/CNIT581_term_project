import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

declare var Cesium: any;
@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.sass']
})
export class VisualizationComponent implements OnInit {
  viewer: any;
  token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MjBjM2NkZC1lYzdmLTQ2MGMtODRmMi04OGUzNjhmZDhhMzEiLCJpZCI6MTM5OTQsImlhdCI6MTYyMDk2Njk1NX0.h-5lN_C0xbyJ174AYESgah0ySi6NGaHA9vDxdpmPJak';
  headers_object = new HttpHeaders();
  resourcelist:any;
  renderlist:any={}
  constructor(
    
    private http: HttpClient,
  ) { 

      // add http authentication header
 this.headers_object.append('Authorization', 'Bearer ' + this.token);
 this.headers_object.append('Content-Type', 'application/json');
  }
add(resource:any){
  const id=resource.id;
  if(this.renderlist[id]){
    alert('already added');
  }else{
    let ret=this.addResource(resource);
    if(ret){
      this.renderlist[id]=ret;
      this.viewer.zoomTo(ret);

    }
  }

}
remove(resource:any) { 
if(this.renderlist[resource.id]){
  this.viewer.scene.primitives.remove(this.renderlist[resource.id]);
  delete this.renderlist[resource.id];
}
}
 

addResource(resource:any){
  let ret=false;
  switch(resource.type){
    case '3DTILES':
     ret= this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(resource.id),
      }));
      break;
    
    default:
      break;

  }
  return ret;
}

  ngOnInit(): void {
    this.initResources();
    this.initEarth();
  }
  initResources() {
    this.http.get('https://api.cesium.com/v1/assets/?limit=100&access_token='+this.token).subscribe(
      (data:any) => {
         
        this.resourcelist=data.items.filter((item:any)=>item.type==='3DTILES');
        
      },(error) => {
        alert(error.error.non_field_errors[0]);
      }
    );
  }
  initEarth() {
    Cesium.Ion.defaultAccessToken =this.token;
    
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
