import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  title: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.data.title;
  }
}
