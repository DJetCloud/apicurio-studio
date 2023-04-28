import {Component, ViewChild} from '@angular/core';
import {AbstractPageComponent} from "../../../components/page-base.component";
import {LoginSessionService} from '../../../services/login-session.service';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {LoginSession} from '../../../models/login-session';
import {ConfirmDeleteDialogComponent} from '../../../components/dialogs/confirm-delete.component'; 

@Component({
  selector: 'editor-loginsessions',
  templateUrl: './loginsessions.component.html',
  styleUrls: ['./loginsessions.component.css']
})
export class LoginSessionsComponent extends AbstractPageComponent {
  
   @ViewChild("confirmDeleteModal", { static: true }) confirmDeleteModal: ConfirmDeleteDialogComponent;


    private sessions: LoginSession[];
    isValid: boolean = true;
    
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

    public deleteLoginSession(id: string) {
      this.confirmDeleteModal.onDelete.subscribe(_ =>
          this.loginSession.deleteLoginSessionById(id).then(_ => {
              this.loadAsyncPageData();
          }).catch(error => {
              console.error("[TemplatesPageComponent] Error deleting login session with id %s.", id);
              this.error(error);
          })
      );
      this.confirmDeleteModal.open();
   }
}