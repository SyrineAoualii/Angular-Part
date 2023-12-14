import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { UserService } from 'src/app/services/user.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Status } from 'src/app/models/status.enum';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.css']
})
export class AchatComponent {
  items=[] as any;
  purchases:any;
  userconnect:any
   user:any
   course:any
   courseDetails:any
   Status=Status;
   courseId: number;
   tests: any[] = [];
  constructor(private cartservice:CartService,private purchaseservice:PurchaseService,private userservice:UserService,  private router: Router,    private courseservice : CourseService,private authenticationService :AuthenticationService,private testservice:TestService){}
  ngOnInit(): void {
    const userConnect = localStorage.getItem("currentUser");
    if (userConnect) {
      this.userconnect = JSON.parse(userConnect);


      // Now you can access this.userconnect.id without an error
    } else {
      console.log('No user connected data in local storage.');
    }


   this.items = this.cartservice.getItems(); 
   // Now check if userConnect is not null
   if (userConnect) {
     this.userconnect = JSON.parse(userConnect);
     console.log(this.userconnect);
     console.log(this.userconnect.id);
     console.log(this.userconnect.email); 
     console.log(this.userconnect.image);// Should log the object, not 'null'
     // Now you can access this.userconnect.id without an error
   } else {
     console.log('No user connected data in local storage.');
   }
   this.getAllPurchasesByUserId5(this.userconnect.id)
   this.getTestByCourseId(2)
   console.log("hello");
  }
  loadUser() {
    // Assuming you have the user's ID stored in local storage after they log in
    const userId = this.userconnect.id;

    if (userId) {
      this.userservice.getUser(userId).subscribe(
        userData => {
          this.user = userData;
          console.log(this.user); // Log to see the retrieved user data
        },
        error => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('No user ID found in local storage.');
    }
  }
  getAllPurchasesByUserId(id: any) {
    this.purchaseservice.getAllPurchasesByUserId(id).subscribe((res: any) => {
      this.purchases = res;
      const courseIds = res.map((purchase: any) => purchase.courseId);
      console.log("Course IDs:", courseIds);
    });
  }
  
  logout(){
    localStorage.clear()
    this.router.navigateByUrl("/")
  }
  getOneCourse(id:any): Observable<any> {
    return this.courseservice.getoneCourse(id).pipe(
        tap((res) => {
            this.course = res;
            console.log("detail of course", this.course);
        })
    );
  }
  getAllPurchasesByUserId5(id: any) {
    this.purchaseservice.getAllPurchasesByUserId(id).subscribe(
      (purchases: any) => { // Remplacez any[] par any si nécessaire
        const courseObservables = purchases.map((purchase: any) => 
          this.getOneCourse(purchase.courseId).pipe(
            catchError(error => {
              console.error('Erreur lors de la récupération du cours', error);
              return of(null); // En cas d'erreur
            })
          )
        );
  
        forkJoin(courseObservables).subscribe(
          details => {
            this.courseDetails = details;
            console.log('Détails de tous les cours achetés:', this.courseDetails);
          },
          err => console.error('Erreur lors de la récupération des détails des cours', err)
        );
      },
      err => console.error('Erreur lors de la récupération des achats', err)
    );
  }
  
  sendEmail(toEmail: string, subject: string, body: string,courseId:any,status:Status ) {
    const emailRequest = { toEmail, subject, body };
    this.authenticationService.sendEmail(emailRequest).subscribe({
      next: (response) => {
        console.log('Email envoyé avec succès', response);
        // Ajoutez ici la logique pour gérer la réponse réussie
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi de l\'email', error);
      }
    });
    this.courseservice.updateCourseStatus(courseId, status).subscribe(
      (response) => {
        console.log('Status updated successfully:', response);
      },
      (error) => {
        console.error('Error updating status:', error);
      }
    );
  }
setStatusToCompleted(courseId:any,status:Status) {
  this.courseservice.updateCourseStatus(courseId, status).subscribe( (response) => {
    console.log('Status updated successfully:', response);
  },
  (error) => {
    console.error('Error updating status:', error);
  }
);}
getTestByCourseId(courseId:any){
  this.testservice.getallTestsByCourseId(courseId).subscribe((res)=>{
    console.log(res)

  })
}



}


