import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Commodity {
  id: string;
  name: string;
  mat: string;
  base: number;
  range: [number, number];
  unit: string;
}

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticker.html',
  styleUrl: './ticker.scss'
})
export class TickerComponent implements OnInit, OnDestroy {
  commodities: Commodity[] = [
    { id: 'ms', name: 'MS Steel (IS 2062)', mat: 'Mild Steel', base: 58.5, range: [42, 78], unit: '₹/kg' },
    { id: 'gi', name: 'GI Sheet / Zinc Coating', mat: 'Galvanised', base: 198, range: [165, 240], unit: '₹/kg' },
    { id: 'al', name: 'Aluminium (LME)', mat: 'Aluminium', base: 228, range: [190, 260], unit: '₹/kg' },
    { id: 'cu', name: 'Copper (MCX)', mat: 'Copper', base: 785, range: [680, 880], unit: '₹/kg' },
    { id: 'ci', name: 'Cast Iron Scrap', mat: 'Cast Iron', base: 41, range: [34, 52], unit: '₹/kg' },
    { id: 'ss', name: 'SS 304 (LME Nickel adj.)', mat: 'Stainless', base: 310, range: [265, 380], unit: '₹/kg' },
    { id: 'ht', name: 'HT Steel Gr 8.8/10.9', mat: 'High Tensile', base: 82, range: [62, 108], unit: '₹/kg' },
    { id: 'hdpe', name: 'HDPE Pipe Grade', mat: 'Polymer', base: 96, range: [78, 120], unit: '₹/kg' },
  ];

  liveVals: { [key: string]: number } = {};
  private interval: any = null;

  ngOnInit() {
    this.updateValues();
    this.interval = setInterval(() => this.updateValues(), 5000);
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  private updateValues() {
    this.commodities.forEach(c => {
      this.liveVals[c.id] = parseFloat((c.base + (Math.random() - 0.5) * 3).toFixed(2));
    });
  }

  getVal(c: Commodity): number {
    return this.liveVals[c.id] || c.base;
  }

  getDelta(c: Commodity): number {
    return this.getVal(c) - c.base;
  }

  isUp(c: Commodity): boolean {
    return this.getDelta(c) >= 0;
  }
}
