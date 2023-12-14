import { Component, OnInit, ViewChild } from '@angular/core';
import {Purchase} from "../../models/purchase.model";
import {User} from "../../models/user.models";
import {PurchaseService} from "../../services/purchase.service";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../models/role.enum";
import { FormBuilder } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { CourseService } from 'src/app/services/course.service';
import { CartService } from 'src/app/services/cart.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Status } from 'src/app/models/status.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {
  user: any;
listcourses:any;
popupform:any;
course:any;
purchase:any;
Status=Status;
  userconnect=JSON.parse(localStorage.getItem("currentUser")!)
  id=this.activeroute.snapshot.params["id"]
  selectedCourses: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private router: Router,
    private userservice:UserService,
    private courseservice : CourseService,
    private cartservice:CartService,
    private purchaseservice:PurchaseService,
    private activeroute:ActivatedRoute,
    private http: HttpClient
  ) {}
  
  ngOnInit(): void {

    const userConnect = localStorage.getItem("currentUser");

    // Now check if userConnect is not null
    if (userConnect) {
      this.userconnect = JSON.parse(userConnect);
      console.log(this.userconnect);
      console.log(this.userconnect.id);
      console.log(this.userconnect.name); 
      console.log(this.userconnect.image);// Should log the object, not 'null'
      // Now you can access this.userconnect.id without an error
    } else {
      console.log('No user connected data in local storage.');
    }
    this.loadUser();
    this.getAllCourses()
    console.log("hello",this.cartservice.getItems());
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
    console.log(this.course);
  }
  logout(){
    localStorage.clear()
    this.router.navigateByUrl("/")
  }
  getAllCourses(){
    this.courseservice.getAllCourses().subscribe((res:any)=>{
    this.listcourses=res
    console.log("list of courses",this.listcourses)})
}
// open(content:any,subcategory:any) {
//   console.log(subcategory)
//   // tawaaaa bech n3abiw el formulaire
//   this.popupform.patchValue({
//     id:subcategory.id,
//     title:subcategory.title,
//     description:subcategory.description,
   
//   })
//   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
//     (result) => {
//       this.closeResult = `Closed with: ${result}`;
//     },
//     (reason) => {
//       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//     },
//   );
// }
getOneCourse(id:any): Observable<any> {
  return this.courseservice.getoneCourse(id).pipe(
      tap((res) => {
          this.course = res;
          console.log("detail of course", this.course);
      })
  );
}

// In your component where you handle "Buy Now"
buyNowClicked(courseId: string, total: number) {
  this.purchaseservice.setCourseDetails(courseId, total);
  // You can then call addcourse or other logic here
}


// addToCart(courseId: any) {
//   this.courseservice.getoneCourse(courseId).subscribe((course: any) => {
//     this.cartservice.addToCart(course);
//     console.log("Courses in cart:", this.cartservice.getItems());
//   });
// }


buyCourse(courseId: number) {
  // Vérifier si l'utilisateur est connecté
  const course=this.getOneCourse(courseId)
  if (!this.userconnect || !this.userconnect.id) {
    console.error('L\'utilisateur n\'est pas connecté.');
    return;
  }

  // Assurez-vous que la propriété 'price' existe dans 'this.course'
  if (!this.course || this.course.price === undefined) {
    console.error('Les informations du cours ne sont pas disponibles.');
    return;
  }

  // Création de l'objet d'achat
  // Utilisez le constructeur de la classe 'Purchase' si nécessaire
  // ou créez simplement l'objet avec les propriétés requises
  const purchase = new Purchase(
    this.userconnect.id, // L'ID de l'utilisateur connecté
    this.course.id,           // L'ID du cours à acheter
    this.course.price   // Le prix du cours
  );
  console.log(course);
  console.log(this.course.price);
  // Appel du service pour enregistrer l'achat
  this.purchaseservice.addpurchase(purchase).subscribe({
    next: (response) => {
      console.log('Achat enregistré avec succès', response);
      // Logique post-achat...
    },
    error: (error) => {
      console.error('Erreur lors de l\'enregistrement de l\'achat', error);
    }
  });
}
addPurchase(courseId:any) {

  
  console.log("Bonjour",this.userconnect.id);
    
  console.log("hello",this.getOneCourse(courseId));

//   if (!this.userconnect.id) {
//       console.error("User ID not found in local storage");
//       return;
//   }

//   let total = this.purchaseservice.getTotal();



//   let formData = new FormData();
//   formData.append("userId", this.userconnect.id);
//   formData.append("courseId", courseId);
//  // Convert total to string

//   this.purchaseservice.addpurchase(formData).subscribe((res) => {
//       this.purchase=res
//       console.log(res)
//   });
}
addPurchase1(courseId: any) {
  console.log("User ID:", this.userconnect.id);

  this.getOneCourse(courseId).subscribe((courseDetails) => {
      console.log("Course Price:", courseDetails.price);

      // Assuming courseDetails contains the price and courseId
      let purchase = new Purchase(
          this.userconnect.id,   // User ID
          courseId,              // Course ID
          courseDetails.price    // Total price
      );

      // Now, use the addpurchase method from the service
      this.purchaseservice.addpurchase(purchase).subscribe(response => {
          console.log("Purchase response:", response);
          // Handle the response here, like redirecting to a success page
      }, error => {
          console.error("Error during purchase:", error);
          // Handle any errors here
      });

  }, error => {
      console.error("Error fetching course details:", error);
      // Handle any errors in fetching course details here
  });
}
addPurchase2(courseId: any,status: Status) {
  console.log("User ID:", this.userconnect.id);

  this.getOneCourse(courseId).subscribe((courseDetails) => {
    console.log("Course Price:", courseDetails.price);

    let purchase = new Purchase(
      this.userconnect.id,
      courseId,
      courseDetails.price
    );

    // Add the course to the purchase history and the cart
    this.purchaseservice.addpurchase(purchase).subscribe(response => {
      console.log("Purchase added to database", response);
      
      // Here you would typically also call a method to update the cart UI
      this.cartservice.addToCart(courseDetails);
      this.courseservice.updateCourseStatus(courseId, status).subscribe(
        (response) => {
          console.log('Status updated successfully:', response);
          // Handle success, if needed
        },
        (error) => {
          console.error('Error updating status:', error);
          // Handle error, if needed
        }
      );
      // Update the course status to 'Enrolled'
      // this.updateCourseStatus(courseId, 'Enrolled').subscribe(updateResponse => {
      //   console.log("Course status updated successfully", updateResponse);
      // }, updateError => {
      //   console.error("Error updating course status:", updateError);
      // });

    }, purchaseError => {
      console.error("Error during purchase:", purchaseError);
    });

  }, courseError => {
    console.error("Error fetching course details:", courseError);
  });

}

goToCart() {
  this.router.navigate(['/achat']);
}

updateStatus(courseId: number, status: Status) {
  this.courseservice.updateCourseStatus(courseId, status).subscribe(
    (response) => {
      console.log('Status updated successfully:', response);
      // Handle success, if needed
    },
    (error) => {
      console.error('Error updating status:', error);
      // Handle error, if needed
    }
  );
}
sendEmail(toEmail: string, subject: string, body: string) {
  const emailRequest = { toEmail, subject, body };
  this.authenticationService.sendEmail(emailRequest).subscribe({
    next: (response) => {
      console.log('Email envoyé avec succès', response);
      // Ajoutez ici la logique pour gérer la réponse réussie
    },
    error: (error) => {
      console.error('Erreur lors de l\'envoi de l\'email', error);
      // Ajoutez ici la logique pour gérer l'erreur
    }
  });
}





}