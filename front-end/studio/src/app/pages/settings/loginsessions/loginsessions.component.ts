import { Component } from '@angular/core';
import {AbstractPageComponent} from "../../../components/page-base.component";
import { LoginSessionService } from '../../../services/login-session.service';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import { LoginSession } from '../../../models/login-session';
@Component({
  selector: 'editor-loginsessions',
  templateUrl: './loginsessions.component.html',
  styleUrls: ['./loginsessions.component.css']
})
export class LoginsessionsComponent extends AbstractPageComponent {

  private sessions: LoginSession[];

  constructor(private loginSession: LoginSessionService, route: ActivatedRoute, titleService: Title) {
    super(route, titleService);
}

protected pageTitle(): string {
  return "DJAI - Settings - Login Sessions";
}

public loadAsyncPageData(): void {
  this.loginSession.getLoginSession().then( sessions => {
      this.sessions = sessions;
      this.loaded("sessions");
  }).catch( error => {
      console.error("[LoginSessionsPageComponent] Error fetching login sessions.");
      this.error(error);
  });
}

 

}
