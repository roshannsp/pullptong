import { LoadingService } from './../shared/services/loading.service'
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
  infoWindows = []
  tempValue: any
  loading = false

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.clearMarkers()
    this.searchForm = new FormGroup({
      radius: new FormControl(300, [, Validators.pattern('[0-9]')]),
      minprice: new FormControl(0, [Validators.pattern('[0-4]')]),
      maxprice: new FormControl(undefined, [Validators.pattern('[0-4]')])
    })
    this.tempValue = {
      radius: 300,
      minprice: 0,
      maxprice: undefined
    }
  }

  ngAfterViewInit() {
    var mapProp = {
      center: new google.maps.LatLng(18.7951492, 98.9723131),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.gmap.nativeElement, mapProp)
    this.searchForm.valueChanges.subscribe(newValue => {
      if (this.tempValue) {
        if (
          this.tempValue.radius !== newValue.radius ||
          this.tempValue.minprice !== newValue.minprice ||
          this.tempValue.maxprice !== newValue.maxprice
        ) {
          this.map.setZoom(this.radiusToZoom(this.searchForm.controls.radius.value))
          this.getPlaces(this.currentPos)
        }
      }
      this.tempValue = newValue
    })
    this.navigator.geolocation.getCurrentPosition((pos: Position) => this.setCurrentLocation(pos))
  }

  radiusToZoom(radius: number) {
    return Math.round(15 - Math.log(radius / 1000) / Math.LN2)
  }

  setCurrentLocation(pos: Position) {
    if (this.map) {
      const currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
      this.currentPos = currentPos
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
    this.places = []
    this.markers = []
    this.infoWindows = []
    this.addCurrentLocationMarker()
  }

  getPlaces(currentPos: any) {
    this.clearMarkers()
    // this.loadingService.startLoading()
    const request = {
      location: currentPos,
      radius: this.searchForm.controls.radius.value || 500,
      type: ['restaurant'],
      language: 'th',
      minPriceLevel: this.searchForm.controls.minprice.value || 0,
      maxPriceLevel: this.searchForm.controls.maxprice.value || 0,
      openNow: true
    }
    const service = new google.maps.places.PlacesService(this.map)
    service.nearbySearch(request, (results: any[], status: any, pagination: any) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.places = this.places.concat(results)
        if (pagination.hasNextPage) {
          pagination.nextPage()
        } else {
          $('#rollerRestaurant').eroller({
            items: this.places.map((place: any) => {
              $('#rollerRestaurant .select-item').append('<option>' + place.id + '</option>')
              this.createPlaceMarker(place)
              return {
                ...place,
                img: place.photos && place.photos[0].getUrl({})
              }
            }),
            key: 'name'
          })
          this.loadingService.stopLoading()
        }
      } else {
        this.loadingService.stopLoading()
      }
    })
  }

  startRamdom() {
    try {
      this.loading = true
      this.winner = this.places[Math.floor(Math.random() * this.places.length)]
      $('#rollerRestaurant').eroller('start', 'id', this.winner.id, 8000)
      $(document).on('eroller.complete', '.roller', () => {
        $('#restaurantDetailModel').modal()
        this.loading = false
      })
    } catch (e) {
      this.loading = false
    }
  }

  createPlaceMarker(place: any) {
    const image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(-25, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    }
    const marker = new google.maps.Marker({
      map: this.map,
      icon: image,
      title: place.name,
      position: place.geometry.location,
      zIndex: 1,
      animation: google.maps.Animation.DROP
    })
    marker.addListener('mouseover', () => {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null)
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE)
        setTimeout(() => marker.setAnimation(null), 1500)
      }
    })
    marker.addListener('click', () => {
      const content = `<h5>${marker.title}</h5>`
      const infowindow = new google.maps.InfoWindow({
        content
      })
      for (let infoWindow of this.infoWindows) {
        infoWindow.close()
      }
      infowindow.open(this.map, marker)
      this.infoWindows.push(infowindow)
    })
    this.markers.push(marker)
  }

  go() {
    window.location.href = encodeURI(
      `https://www.google.com/maps/search/?api=1&query=${this.winner.geometry.location.lat()},${this.winner.geometry.location.lng()}&query_place_id=${
        this.winner.place_id
      }`
    )
  }
}
