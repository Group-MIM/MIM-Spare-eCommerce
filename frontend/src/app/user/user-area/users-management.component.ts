import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {
  @Input() users: Array<User>;
  pageActual: number = 1;
  
  constructor(private router: Router, private translate: TranslateService, private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  navigateTo(route: any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route);
    this.router.navigateByUrl(lang + route);
  }

  navigateToId(route: any, id: any) {
    var path = window.location.pathname;
    var ruta_arr = path.split("/");
    var lang = ruta_arr[1];
    console.log(lang + route + id);
    this.router.navigateByUrl(lang + route + id);
  }

  getUser() {
    this.userService.getUserById(parseInt('0')).subscribe((data: any) => {
      this.users = data;

    }, (error: any) => {
      console.log(error);
    });
  }

  deleteUser(id: any) {
    var seguroBorrar = this.translate.instant('seguro_desea_eliminar_usuario.texto');
    if (confirm(seguroBorrar)) {
      this.userService.deleteUser(id).subscribe((data: any) => {
        location.reload();
      }, (error: any) => {
        console.log(error);
      });
    }


  }

}
