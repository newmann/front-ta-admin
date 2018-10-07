import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import {BylAuthDataService} from "../../../../../service/auth/auth-data.service";
import {Observer, Subscriber, Subscription} from "rxjs/Rx";
import {BylAccount} from "../../../../../service/account/model/account.model";
import {NzModalService} from "ng-zorro-antd";
import {BylListFormFunctionModeEnum} from "../../../../../service/model/list-form-function-mode.enum";
import {BylHelperFlowComponent} from "./helper-flow.component";

@Component({
  selector: 'byl-header-user',
  template: `
      <nz-dropdown nzPlacement="bottomRight">
          <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown>
              <nz-avatar [nzText]="getAvtarText()" nzSize="small" class="mr-sm"></nz-avatar>
              {{settings.user.name}}
          </div>
          <div nz-menu class="width-sm">
              <div nz-menu-item [nzDisabled]="disableSelfSetting" (click)="selfSetting()"><i
                  class="anticon anticon-user mr-sm"></i>个人中心
              </div>
              <li nz-menu-divider></li>
              <div nz-menu-item (click)="showFlowChart()"><i
                  class="anticon anticon-compass mr-sm"></i>功能流程图
              </div>

              <!--<div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-setting mr-sm"></i>设置</div>-->
              <li nz-menu-divider></li>
              <div nz-menu-item (click)="logout()"><i class="anticon anticon-logout mr-sm"></i>退出登录</div>
          </div>
      </nz-dropdown>
  `,
})
export class BylHeaderUserComponent implements OnInit,OnDestroy{
    accountObserver: Subscription;
    accountId: string;
    public disableSelfSetting = true;
  constructor(
      public authDataService: BylAuthDataService,
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
      public modalService: NzModalService,
  ) {}

    ngOnInit(): void {
      this.accountObserver = this.authDataService.Account$.subscribe( data =>{
          console.log("In BylHeaderUser, account:", data);
          if(data){
              this.accountId = data.id;
              this.disableSelfSetting = false;
          } else{
              this.accountId = null;

              this.disableSelfSetting = true;
          }
      });
    }

    ngOnDestroy(): void {
      if (this.accountObserver){
          this.accountObserver.unsubscribe();
      }
    }

    getAvtarText(){
      if(this.settings.user){
          return this.settings.user.name.slice(0,1);
      }else {
          return null;
      }
    }

  selfSetting(){
      this.router.navigate(["/account/account/crud", this.accountId]);
  }

  // disableSelfSetting(): boolean{
  //   let result = false;
  //
  //   if (this.accountId) {
  //           result =  this.accountId.length > 0;
  //   }
  //
  //   return result;
  // }

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url);
  }

  showFlowChart(){
      this.modalService.create({
          nzTitle: "功能流程图",
          nzZIndex: 9999, //最外层
          nzWidth: '90%',
          nzContent: BylHelperFlowComponent,
          nzFooter: null,
          nzMaskClosable: false
      });
  }
}
