import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface ServiceData {
  id: string;
  title: string;
  description: string;
  image: string;
  benefits: { icon: string; text: string }[];
}

@Component({
  selector: 'app-service-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss'
})
export class ServiceDetailComponent implements OnInit {
  service?: ServiceData;

  private services: { [key: string]: ServiceData } = {
    'injection-molding': {
      id: 'injection-molding',
      title: 'Injection Molding',
      description: 'T1 samples as fast as 10 days with low minimum order quantities.',
      image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=600&h=600&fit=crop',
      benefits: [
        { icon: 'bolt', text: 'T1 samples delivered in as fast as 10 days' },
        { icon: 'settings', text: 'No minimum order quantities' },
        { icon: 'people', text: 'Dedicated team of engineers, from prototyping to production' },
        { icon: 'globe', text: 'Global network of manufacturers - domestic, overseas, and nearshore options' },
        { icon: 'certificate', text: 'Access to ISO 9001, ISO 13485, IATF 16949 facilities' }
      ]
    },
    'cnc-machining': {
      id: 'cnc-machining',
      title: 'CNC Machining',
      description: 'Tight tolerances and finishing capabilities, as fast as 2 days.',
      image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=600&fit=crop',
      benefits: [
        { icon: 'bolt', text: 'Parts delivered in as fast as 2 days' },
        { icon: 'precision', text: 'Tight tolerances and superior finishing capabilities' },
        { icon: 'people', text: 'Expert engineering team for complex projects' },
        { icon: 'globe', text: 'Global manufacturing network for cost optimization' },
        { icon: 'certificate', text: 'ISO certified facilities worldwide' }
      ]
    },
    '3d-printing': {
      id: '3d-printing',
      title: '3D Printing',
      description: 'FDM, SLS, SLA, PolyJet, MJF technologies.',
      image: 'https://images.unsplash.com/photo-1581092918484-8313e1f2e828?w=600&h=600&fit=crop',
      benefits: [
        { icon: 'bolt', text: 'Rapid prototyping in as fast as 1-3 days' },
        { icon: 'settings', text: 'Multiple technologies: FDM, SLS, SLA, PolyJet, MJF' },
        { icon: 'people', text: 'Design for additive manufacturing expertise' },
        { icon: 'globe', text: 'Advanced materials and finishing options' },
        { icon: 'certificate', text: 'Quality assurance and testing available' }
      ]
    },
    'sheet-metal': {
      id: 'sheet-metal',
      title: 'Sheet Metal Services',
      description: 'Experience the versatility & cost efficiency with flexible application options.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=600&fit=crop',
      benefits: [
        { icon: 'bolt', text: 'Fast turnaround for sheet metal fabrication' },
        { icon: 'settings', text: 'Cutting, bending, welding, and finishing services' },
        { icon: 'people', text: 'Engineering support for design optimization' },
        { icon: 'globe', text: 'Wide range of materials and gauges available' },
        { icon: 'certificate', text: 'Quality control and inspection services' }
      ]
    },
    'compression-molding': {
      id: 'compression-molding',
      title: 'Compression Molding Services',
      description: 'Experience lower tooling costs with high-quality durable parts.',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=600&fit=crop',
      benefits: [
        { icon: 'bolt', text: 'Cost-effective tooling solutions' },
        { icon: 'settings', text: 'High-quality, durable parts production' },
        { icon: 'people', text: 'Material selection and optimization support' },
        { icon: 'globe', text: 'Suitable for both prototyping and production' },
        { icon: 'certificate', text: 'Certified manufacturing processes' }
      ]
    },
    'urethane-casting': {
      id: 'urethane-casting',
      title: 'Urethane Casting Services',
      description: 'Production quality parts without the tooling investment.',
      image: 'https://images.unsplash.com/photo-1581092918484-8313e1f2e828?w=600&h=600&fit=crop',
      benefits: [
        { icon: 'bolt', text: 'Quick turnaround for low-volume production' },
        { icon: 'settings', text: 'No expensive tooling required' },
        { icon: 'people', text: 'Wide range of material properties available' },
        { icon: 'globe', text: 'Production-quality surface finishes' },
        { icon: 'certificate', text: 'Ideal for prototypes and bridge production' }
      ]
    },
    'die-casting': {
      id: 'die-casting',
      title: 'Die Casting Services',
      description: 'Create high quality custom mechanicals with precision and accuracy.',
      image: 'https://images.unsplash.com/photo-1581092918484-8313e1f2e828?w=600&h=600&fit=crop',
      benefits: [
        { icon: 'bolt', text: 'High-precision metal parts production' },
        { icon: 'settings', text: 'Excellent surface finish and dimensional accuracy' },
        { icon: 'people', text: 'Engineering support for complex geometries' },
        { icon: 'globe', text: 'Multiple alloy options for various applications' },
        { icon: 'certificate', text: 'High-volume production capabilities' }
      ]
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const serviceId = params['id'];
      this.service = this.services[serviceId];
    });
  }
}
