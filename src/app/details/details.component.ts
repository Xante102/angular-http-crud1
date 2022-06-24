import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'products';
import { DataService } from '../data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  product: any = [];

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const id = Number(routeParams.get('id'));

    this.dataService.getProduct(id).subscribe((data: product[]) => {
      this.product = data;
    });
  }

  success() {
    this.router.navigate(['success']);
  }
}
