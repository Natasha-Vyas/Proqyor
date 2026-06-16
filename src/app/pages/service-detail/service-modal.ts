import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceData {
  id: string;
  title: string;
  description: string;
  image: string;
  benefits: { icon: string; text: string }[];
}

@Component({
  selector: 'app-service-modal',
  imports: [CommonModule],
  templateUrl: './service-modal.html',
  styleUrl: './service-modal.scss'
})
export class ServiceModalComponent {
  @Input() isOpen = false;
  @Input() currentServiceId = '';
  @Output() closeModal = new EventEmitter<void>();

  services: ServiceData[] = [
    {
      id: 'cnc-machining',
      title: 'CNC Machining',
      description: 'Tight tolerances and finishing capabilities, as fast as 2 days.',
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/2d00510e-ec24-449f-b5dd-a72df3c19403_CNC%20Machining.jpg',
      benefits: [
        { icon: 'bolt', text: 'Parts delivered in as fast as 2 days' },
        { icon: 'precision', text: 'Tight tolerances and superior finishing capabilities' },
        { icon: 'people', text: 'Expert engineering team for complex projects' },
        { icon: 'globe', text: 'Global manufacturing network for cost optimization' },
        { icon: 'certificate', text: 'ISO certified facilities worldwide' }
      ]
    },
    {
      id: 'injection-molding',
      title: 'Injection Molding',
      description: 'T1 samples as fast as 10 days with low minimum order quantities.',
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/cc527f53-e997-4c34-8193-615e3fd54931_injection%20modeling.jpg',
      benefits: [
        { icon: 'bolt', text: 'T1 samples delivered in as fast as 10 days' },
        { icon: 'settings', text: 'No minimum order quantities' },
        { icon: 'people', text: 'Dedicated team of engineers, from prototyping to production' },
        { icon: 'globe', text: 'Global network of manufacturers - domestic, overseas, and nearshore options' },
        { icon: 'certificate', text: 'Access to ISO 9001, ISO 13485, IATF 16949 facilities' }
      ]
    },
    {
      id: '3d-printing',
      title: '3D Printing',
      description: 'FDM, SLS, SLA, PolyJet, MJF technologies.',
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/6000e91e-697d-4caf-81aa-860243db4d11_3D%20printing%20.jpg',
      benefits: [
        { icon: 'bolt', text: 'Rapid prototyping in as fast as 1-3 days' },
        { icon: 'settings', text: 'Multiple technologies: FDM, SLS, SLA, PolyJet, MJF' },
        { icon: 'people', text: 'Design for additive manufacturing expertise' },
        { icon: 'globe', text: 'Advanced materials and finishing options' },
        { icon: 'certificate', text: 'Quality assurance and testing available' }
      ]
    },
    {
      id: 'urethane-casting',
      title: 'Urethane Casting',
      description: 'Production quality parts without the tooling investment.',
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/45b75d2e-9888-4ce7-b991-b3bc8967fe63_Urethane%20Casting.jpg',
      benefits: [
        { icon: 'bolt', text: 'Quick turnaround for low-volume production' },
        { icon: 'settings', text: 'No expensive tooling required' },
        { icon: 'people', text: 'Wide range of material properties available' },
        { icon: 'globe', text: 'Production-quality surface finishes' },
        { icon: 'certificate', text: 'Ideal for prototypes and bridge production' }
      ]
    },
    {
      id: 'sheet-metal',
      title: 'Sheet Metal',
      description: 'Experience the versatility & cost efficiency with flexible application options.',
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/0336df04-e9db-469d-8953-cf3ad1d2ef6f_Sheet%20Metal.jpg',
      benefits: [
        { icon: 'bolt', text: 'Fast turnaround for sheet metal fabrication' },
        { icon: 'settings', text: 'Cutting, bending, welding, and finishing services' },
        { icon: 'people', text: 'Engineering support for design optimization' },
        { icon: 'globe', text: 'Wide range of materials and gauges available' },
        { icon: 'certificate', text: 'Quality control and inspection services' }
      ]
    },
    {
      id: 'die-casting',
      title: 'Die Casting',
      description: 'Create high quality custom mechanicals with precision and accuracy.',
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/476b1dd9-f066-45b4-89e4-bc3326b11067_Die%20Casting.jpg',
      benefits: [
        { icon: 'bolt', text: 'High-precision metal parts production' },
        { icon: 'settings', text: 'Excellent surface finish and dimensional accuracy' },
        { icon: 'people', text: 'Engineering support for complex geometries' },
        { icon: 'globe', text: 'Multiple alloy options for various applications' },
        { icon: 'certificate', text: 'High-volume production capabilities' }
      ]
    },
    {
      id: 'compression-molding',
      title: 'Compression Molding',
      description: 'Experience lower tooling costs with high-quality durable parts.',
      image: 'https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/58592aba-5c52-45cf-90ea-f5330d90fe5d_Compression%20Molding.jpg',
      benefits: [
        { icon: 'bolt', text: 'Cost-effective tooling solutions' },
        { icon: 'settings', text: 'High-quality, durable parts production' },
        { icon: 'people', text: 'Material selection and optimization support' },
        { icon: 'globe', text: 'Suitable for both prototyping and production' },
        { icon: 'certificate', text: 'Certified manufacturing processes' }
      ]
    }
  ];

  get currentService(): ServiceData | undefined {
    return this.services.find(s => s.id === this.currentServiceId);
  }

  selectService(serviceId: string) {
    this.currentServiceId = serviceId;
  }

  close() {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }
}
