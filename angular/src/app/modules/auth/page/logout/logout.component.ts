import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SessionService} from '@app/service/session.service';
import {HeaderService} from '@shared/service/header.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent implements OnInit {

  constructor(
    private readonly session: SessionService,
    private headerService: HeaderService,
  ) {
    this.headerService.setTitle('Logout');
  }

  ngOnInit(): void {
    // always destroy session when the page is opened
    this.session.destroySession();
  }

}