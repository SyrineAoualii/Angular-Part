import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  listcourses:any
  constructor(private courseservice : CourseService){}
  ngOnInit(): void {
    console.log("hello")
    this.getAllCourses()
  }
  getAllCourses(){
    this.courseservice.getAllCourses().subscribe((res:any)=>{
    this.listcourses=res
    console.log("list of courses",this.listcourses)})
}

}