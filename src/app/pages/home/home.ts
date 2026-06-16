import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceModalComponent } from '../service-detail/service-modal';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, ServiceModalComponent],
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
      label: 'IDEATION',
      title: 'Guided Expertise',
      features: [
        'Manufacturability Guidance',
        'Material & Finishing Expertise',
        'Cost, Quality, Compliance'
      ],
      techTitle: 'Our Technology',
      techFeatures: [
        'Instant DFM',
        'Materials.AI',
        '2D drawings generator & annotation'
      ],
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/a91980cb-4afa-4439-90bb-effb5a76e09a_Design%20.jpg'
    },
    prototyping: {
      label: 'RAPID PROTOTYPING',
      title: 'Fast Iteration',
      features: [
        'Quick turnaround times',
        'Multiple material options',
        'Functional prototypes'
      ],
      techTitle: 'Our Capabilities',
      techFeatures: [
        '3D Printing',
        'CNC Machining',
        'Vacuum Casting'
      ],
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/c91260a7-f25f-453a-ab2e-a60ce1885ebb_Rapid%20prototyping.jpg'
    },
    sourcing: {
      label: 'SOURCING',
      title: 'Global Network',
      features: [
        'Vetted supplier network',
        'Quality assurance',
        'Cost optimization'
      ],
      techTitle: 'Our Approach',
      techFeatures: [
        'Strategic sourcing',
        'Supplier management',
        'Risk mitigation'
      ],
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/d09a4a6f-a5d2-4063-9e78-a9dc0cfa3b79_Sourcing.jpg'
    },
    planning: {
      label: 'MANUFACTURING PLANNING',
      title: 'Strategic Planning',
      features: [
        'Production optimization',
        'Timeline management',
        'Resource allocation'
      ],
      techTitle: 'Our Process',
      techFeatures: [
        'Capacity planning',
        'Process optimization',
        'Quality control'
      ],
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/e83b207d-4fec-4d93-81da-daeba4740944_Manufacture%20planning.webp'
    },
    production: {
      label: 'PRODUCTION',
      title: 'Scale Manufacturing',
      features: [
        'High-volume production',
        'Consistent quality',
        'On-time delivery'
      ],
      techTitle: 'Our Services',
      techFeatures: [
        'Full-scale manufacturing',
        'Quality assurance',
        'Supply chain management'
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

  currentStorySlide = 0;
  storyDots = [0, 1];

  nextStory() {
    if (this.currentStorySlide < this.storyDots.length - 1) {
      this.currentStorySlide++;
    }
  }

  prevStory() {
    if (this.currentStorySlide > 0) {
      this.currentStorySlide--;
    }
  }

  goToStorySlide(index: number) {
    this.currentStorySlide = index;
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Set up visibility change listener to resume videos when tab becomes visible
    this.visibilityChangeHandler = () => this.handleVisibilityChange();
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
  }

  ngAfterViewInit() {
    // Ensure all videos start playing after view initialization
    setTimeout(() => {
      this.initializeAllVideos();
    }, 100);
  }

  ngOnDestroy() {
    // Clean up event listener
    if (this.visibilityChangeHandler) {
      document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
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
