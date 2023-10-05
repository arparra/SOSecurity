import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userLocation: any;
  map: google.maps.Map | undefined;
  userAddress: string | undefined;
  contactList: any[] = [];

  constructor(private authService: AuthService, private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    const storedContacts = this.localStorage.get<string>('contacts');
    if (storedContacts) {
      this.contactList = JSON.parse(storedContacts);
  }
    window.addEventListener('load', () => {
      this.getUserLocation();
    });
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        this.userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        if (this.userLocation) {
          const mapOptions: google.maps.MapOptions = {
            center: { lat: this.userLocation.latitude, lng: this.userLocation.longitude },
            zoom: 15,
          };
          this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

          this.convertCoordinatesToAddress();
        }
      }, (error: any) => {
        console.error('Error al obtener la ubicación: ', error);
      });
    } else {
      console.error('Geolocalización no está disponible en este navegador.');
    }
  }

  convertCoordinatesToAddress() {
    if (this.userLocation && this.map) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(this.userLocation.latitude, this.userLocation.longitude);

      geocoder.geocode({ 'location': latlng }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            this.userAddress = results[0].formatted_address;
          } else {
            console.error('No se encontraron resultados de geocodificación.');
          }
        } else {
          console.error('Error en la geocodificación: ' + status);
        }
      });
    }
  }

  sendSOSMessage() {
    if (navigator.userAgent.match(/Android|iOS/i)) {
      const message = `¡Necesito ayuda! Mi ubicación actual es: ${this.userAddress}`;
      
      this.contactList.forEach((contact) => {
        const phoneNumber = contact.phoneNumbers[0]?.value;
        if (phoneNumber) {
          const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
          const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
          window.open(smsUrl, '_blank');
          window.open(whatsappUrl, '_blank');
        }
      });
    } else {
      alert('Esta función solo está disponible en dispositivos móviles. Por favor, envía un mensaje SOS manualmente.');
    }
  }
  navigateTocontact() {
    this.router.navigate(['/contact-detail']);
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
