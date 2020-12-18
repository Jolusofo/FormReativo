import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DataFormService} from '../data-form/data-form.service';

@Component({
  selector: 'app-data-edit',
  templateUrl: './data-edit.component.html',
  styleUrls: ['./data-edit.component.css']
})
export class DataEditComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
   modelData: any = {};

  constructor(
    public actRoute: ActivatedRoute,
    public router: Router,
    private formservice: DataFormService

  ) { }

  ngOnInit(): void {
    this.formservice.get(this.id).subscribe((data: {}) => {
      this.modelData = data;
      console.log(this.modelData);
      })
      
  }


  updateModel() {
    if(window.confirm('Tem certeza que deseja atualizar?'))
    
    {this.formservice.update(this.id, this.modelData).subscribe(data => {this.router.navigate(['/lista'])})

    }
  }

}
