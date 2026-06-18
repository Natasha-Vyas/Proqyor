import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MedusaService } from '../../services/medusa.service';
import { ServiceModalComponent } from '../service-detail/service-modal';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, FormsModule, ServiceModalComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  isModalOpen = false;
  selectedServiceId = '';
  activeTab = 'design';
  private visibilityChangeHandler: (() => void) | null = null;

  tabContent = {
    design: {
      label: 'DESIGN BRIEF',
      title: 'Technical Inputs',
      features: [
        'Engineering drawings & BOQ',
        'Material & specification review',
        'Feasibility assessment'
      ],
      techTitle: 'What We Accept',
      techFeatures: [
        'AutoCAD / PDF / DWG / DXF',
        'Excel BOQ & specs',
        'Scanned sketches & briefs'
      ],
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/a91980cb-4afa-4439-90bb-effb5a76e09a_Design%20.jpg'
    },
    prototyping: {
      label: 'ENGINEERING REVIEW',
      title: 'BOQ Finalization',
      features: [
        'Structured costing overview',
        'Material grade selection',
        'Production timeline planning'
      ],
      techTitle: 'Our Capabilities',
      techFeatures: [
        '24-hour response',
        'Commodity rate transparency',
        'IS/RDSO compliance check'
      ],
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/c91260a7-f25f-453a-ab2e-a60ce1885ebb_Rapid%20prototyping.jpg'
    },
    sourcing: {
      label: 'MATERIAL SOURCING',
      title: 'Certified Mills',
      features: [
        'Premium quality raw materials',
        'Certified mill procurement',
        'Material test certificates'
      ],
      techTitle: 'Our Standards',
      techFeatures: [
        'IS 2062 / IS 800 steel',
        'Grade 4.6 to 10.9 fasteners',
        'RDSO approved materials'
      ],
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/d09a4a6f-a5d2-4063-9e78-a9dc0cfa3b79_Sourcing.jpg'
    },
    planning: {
      label: 'FABRICATION',
      title: 'Production Control',
      features: [
        'Precision manufacturing',
        'Modern equipment',
        'Partner workshop coordination'
      ],
      techTitle: 'Facilities',
      techFeatures: [
        'Kalakal plant',
        'Cherlapally facility',
        'Maheshwaram unit'
      ],
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/e83b207d-4fec-4d93-81da-daeba4740944_Manufacture%20planning.webp'
    },
    production: {
      label: 'QC & DISPATCH',
      title: 'Quality Assured Delivery',
      features: [
        'RITES inspection & certification',
        'Multiple strength checkpoints',
        'Packing & dispatch to site'
      ],
      techTitle: 'Documentation',
      techFeatures: [
        'Material test certificates',
        'Third-party inspection reports',
        'Full GST documentation'
      ],
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/e83b207d-4fec-4d93-81da-daeba4740944_Manufacture%20planning.webp'
    }
  };

  openServiceModal(serviceId: string) {
    this.selectedServiceId = serviceId;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeServiceModal() {
    this.isModalOpen = false;
    document.body.style.overflow = '';
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getActiveContent() {
    return this.tabContent[this.activeTab as keyof typeof this.tabContent];
  }


  activeFlowStep = 1;
  private flowInterval: any = null;
  private flowPaused = false;
  activeDivisionPopup: string | null = null;

  openDivisionPopup(division: string) {
    this.activeDivisionPopup = division;
    document.body.style.overflow = 'hidden';
  }

  closeDivisionPopup() {
    this.activeDivisionPopup = null;
    document.body.style.overflow = '';
  }

  uploadedFiles: File[] = [];
  isDragOver = false;
  docSubmitted = false;
  docForm = { company: '', contactPerson: '', phone: '', docType: '' };

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    if (event.dataTransfer?.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
    }
  }

  addFiles(fileList: FileList) {
    for (let i = 0; i < fileList.length; i++) {
      this.uploadedFiles.push(fileList[i]);
    }
  }

  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  docSubmitting = false;

  submitDocuments() {
    if (this.docSubmitting) return;
    this.docSubmitting = true;

    const formData = { ...this.docForm };
    const filesToUpload = [...this.uploadedFiles];

    // Show success immediately
    this.docSubmitting = false;
    this.docSubmitted = true;
    this.uploadedFiles = [];
    setTimeout(() => {
      this.docSubmitted = false;
      this.docForm = { company: '', contactPerson: '', phone: '', docType: '' };
    }, 5000);

    // Background: upload files then submit with URLs
    if (filesToUpload.length > 0) {
      this.medusa.uploadFiles(filesToUpload).subscribe({
        next: (res: any) => {
          const fileUrls = res.files.map((f: any) => f.url).join(', ');
          this.sendDocInBackground(formData, fileUrls);
        },
        error: () => {
          const fileNames = filesToUpload.map(f => f.name).join(', ');
          this.sendDocInBackground(formData, fileNames);
        }
      });
    } else {
      this.sendDocInBackground(formData, 'No files attached');
    }
  }

  private sendDocInBackground(formData: typeof this.docForm, files: string) {
    this.http.post('https://submit-form.com/1izYfVt9E', {
      _subject: 'Document Submission - Proqyur',
      company: formData.company,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      documentType: formData.docType,
      files
    }, { headers: { Accept: 'application/json' }, responseType: 'text' as 'json' }).subscribe();

    this.medusa.submitForm({
      type: 'document',
      company: formData.company,
      contact_person: formData.contactPerson,
      phone: formData.phone,
      document_type: formData.docType,
      files
    }).subscribe();
  }

  scrollToQuote() {
    const el = document.getElementById('quote-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  constructor(private elementRef: ElementRef, private http: HttpClient, private medusa: MedusaService) {}

  ngOnInit() {
    this.visibilityChangeHandler = () => this.handleVisibilityChange();
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
    this.startFlowCycle();
  }

  startFlowCycle() {
    this.flowInterval = setInterval(() => {
      if (!this.flowPaused) {
        this.activeFlowStep = this.activeFlowStep >= 6 ? 1 : this.activeFlowStep + 1;
      }
    }, 3000);
  }

  pauseFlowCycle() {
    this.flowPaused = true;
  }

  resumeFlowCycle() {
    this.flowPaused = false;
  }

  ngAfterViewInit() {
    // Ensure all videos start playing after view initialization
    setTimeout(() => {
      this.initializeAllVideos();
    }, 100);
  }

  ngOnDestroy() {
    if (this.visibilityChangeHandler) {
      document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
    }
    if (this.flowInterval) {
      clearInterval(this.flowInterval);
    }
  }

  private initializeAllVideos() {
    const videos = this.elementRef.nativeElement.querySelectorAll('video');
    videos.forEach((video: HTMLVideoElement) => {
      this.setupVideoElement(video);
    });
  }

  private setupVideoElement(video: HTMLVideoElement) {
    // Ensure video attributes are set
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.preload = 'auto';

    // Play the video
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log('Video autoplay prevented, retrying...', error);
        // Retry after a short delay
        setTimeout(() => {
          video.play().catch(err => console.log('Retry failed:', err));
        }, 500);
      });
    }

    // Add event listeners to handle pausing
    video.addEventListener('pause', () => this.handleVideoPause(video));
    video.addEventListener('ended', () => this.handleVideoEnded(video));

    // Intersection Observer to resume video when in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (video.paused) {
            video.play().catch(err => console.log('IntersectionObserver play failed:', err));
          }
        }
      });
    }, { threshold: 0.25 });

    observer.observe(video);
  }

  private handleVideoPause(video: HTMLVideoElement) {
    // If video pauses unexpectedly, try to resume it
    if (!document.hidden && video.readyState >= 2) {
      setTimeout(() => {
        if (video.paused) {
          video.play().catch(err => console.log('Resume from pause failed:', err));
        }
      }, 100);
    }
  }

  private handleVideoEnded(video: HTMLVideoElement) {
    // This should not happen with loop=true, but handle it just in case
    video.currentTime = 0;
    video.play().catch(err => console.log('Replay after end failed:', err));
  }

  private handleVisibilityChange() {
    if (!document.hidden) {
      // Page became visible, resume all videos
      const videos = this.elementRef.nativeElement.querySelectorAll('video');
      videos.forEach((video: HTMLVideoElement) => {
        if (video.paused) {
          video.play().catch(err => console.log('Resume from visibility change failed:', err));
        }
      });
    }
  }
}
