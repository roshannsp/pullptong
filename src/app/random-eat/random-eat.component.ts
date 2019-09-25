import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
declare const $: any
declare const google: any

@Component({
  selector: 'app-random-eat',
  templateUrl: './random-eat.component.html',
  styleUrls: ['./random-eat.component.scss']
})
export class RandomEatComponent implements OnInit, AfterViewInit {
  @ViewChild('gmap', { static: false }) gmap: ElementRef
  map: any
  navigator: any = window.navigator
  currentPos: any
  markers = []
  places = []
  searchForm: FormGroup
  winner: any = {}

  constructor() {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      radius: new FormControl(500, [Validators.pattern('[0-9]')]),
      minprice: new FormControl(0, [Validators.pattern('[0-4]')]),
      maxprice: new FormControl(4, [Validators.pattern('[0-4]')])
    })
    this.searchForm.valueChanges.subscribe(() => {
      this.map.setZoom(this.radiusToZoom(this.searchForm.controls.radius.value))
      this.getPlaces(this.currentPos)
    })
    this.navigator.geolocation.getCurrentPosition((pos: Position) => this.setCurrentLocation(pos))
  }

  ngAfterViewInit() {
    var mapProp = {
      center: new google.maps.LatLng(18.7951492, 98.9723131),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.gmap.nativeElement, mapProp)
  }

  radiusToZoom(radius: number) {
    return Math.round(15 - Math.log(radius / 1000) / Math.LN2)
  }

  setCurrentLocation(pos: Position) {
    if (this.map) {
      const currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      this.currentPos = currentPos
      this.clearMarkers()
      this.map.setCenter(currentPos)
      this.getPlaces(currentPos)
      this.addCurrentLocationMarker()
    }
  }

  addCurrentLocationMarker() {
    var icon = {
      url: 'https://tinytown.com.au/wp-content/uploads/Blue-Circle.png', // url
      scaledSize: new google.maps.Size(15, 15), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    }
    this.markers.push(
      new google.maps.Marker({
        position: this.currentPos,
        map: this.map,
        icon,
        zIndex: 2
      })
    )
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null)
    }
    this.markers = []
    this.addCurrentLocationMarker()
  }

  getPlaces(currentPos: any) {
    this.clearMarkers()
    const request = {
      location: currentPos,
      radius: this.searchForm.controls.radius.value || 500,
      type: 'restaurant',
      language: 'th',
      minprice: this.searchForm.controls.minprice.value || 0,
      maxprice: this.searchForm.controls.maxprice.value || 4,
      opennow: true
    }
    const service = new google.maps.places.PlacesService(this.map)
    service.nearbySearch(request, (results: any[], status: any) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.places = results
        $('#rollerRestaurant').eroller({
          items: results.map((place: any) => ({
            ...place,
            img: place.photos && place.photos[0].getUrl({})
          })),
          key: 'name'
        })
        for (var x = 0; x < results.length; x++) {
          $('#rollerRestaurant .select-item').append('<option>' + results[x].id + '</option>')
        }
        for (var i = 0; i < results.length; i++) {
          const place = results[i]
          this.createPlaceMarker(place)
        }
      }
    })
  }

  startRamdom() {
    this.winner = this.places[Math.floor(Math.random() * this.places.length)]
    $('#rollerRestaurant').eroller('start', 'id', this.winner.id, 8000)
    $(document).on('eroller.complete', '.roller', () => {
      $('#restaurantDetailModel').modal()
    })
  }

  createPlaceMarker(place: any) {
    const image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    }
    this.markers.push(
      new google.maps.Marker({
        map: this.map,
        icon: image,
        title: place.name,
        position: place.geometry.location,
        zIndex: 1
      })
    )
  }

  go() {
    window.location.href = encodeURI(
      `https://www.google.com/maps/search/?api=1&query=${this.winner.geometry.location.lat()},${this.winner.geometry.location.lng()}&query_place_id=${
        this.winner.place_id
      }`
    )
  }
}
