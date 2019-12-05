import { UserStateService } from '@states/user.state.service';
import { Component } from '@angular/core';
import { UserColdService } from '@app/services/user.service.cold';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public users$ = this.userColdService.getUsers().pipe(share());

  public user$ = this.userColdService.getUser('1').pipe(share());

  public userCash$ = this.userStateService.getUsers();

  constructor(
    private userColdService: UserColdService,
    private userStateService: UserStateService
  ) { }
}
