import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  imageSrc: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    const storedImage = localStorage.getItem('bannerImage');
    if (storedImage) {
      this.imageSrc = storedImage;
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
        localStorage.setItem('bannerImage', this.imageSrc as string);
      };
      reader.readAsDataURL(file);
    }
  }
}
