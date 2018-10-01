import {Component, Inject, OnInit, Optional} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DA_SERVICE_TOKEN, SocialService, TokenService} from '@delon/auth';
import {BylAuthService} from "../../service/auth/auth.service";
import {BylOAuthTokenQueryModel} from "../../service/auth/oauth-token-query.model";
import {BylResultBody} from "../../service/model/result-body.model";
import {BylAuthDataService} from "../../service/auth/auth-data.service";
import {ReuseTabService} from "@delon/abc";
import {BylStartupService} from "../../service/startup/startup.service";
import {CacheService} from "@delon/cache";
import {BYL_OAUTH_CODE_LOCAL_KEY} from "../../service/constant/general.constant";

@Component({
  selector: 'byl-app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.less'],
  providers: [SocialService],
})
export class BylCallbackComponent implements OnInit {
  type: string;
  showError = false;
  errMsg : string;
  constructor(
    private socialService: SocialService,
    private authService: BylAuthService,
    private authDataService: BylAuthDataService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private route: ActivatedRoute,
    private router: Router,
    @Optional() @Inject(ReuseTabService) private reuseTabService: ReuseTabService,
    private startupService: BylStartupService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
      console.log("In callback component url:",this.router.url);
      console.log("In callback component url code:",this.router.url.split('?')[1].split('=')[1]);

      const rightUrl = this.router.url.split('?')[1].split('=')[1];

      //从url中判断返回的内容是否正确。
      if(this.router.url.indexOf('code=') <= 0){
          this.showError = true;
          this.errMsg = this.router.url.split('?')[1];
          return;
      }

    let tokenQuery: BylOAuthTokenQueryModel;

    this.route.params.subscribe(params => {

        this.type = params['type'];
        switch (this.type){
            case 'github':
                tokenQuery = new BylOAuthTokenQueryModel();
                tokenQuery.code = this.router.url.split('?')[1].split('=')[1];
                tokenQuery.redirectUri = "http://localhost/passport/callback/github";


                this.authService.githubLogin(tokenQuery).subscribe(
                    data =>{
                            console.log(data);

                            if (data.code === BylResultBody.RESULT_CODE_SUCCESS) {
                                //如果返回token为空，则提示绑定账户，否则登陆成功
                                if (data.data.token){
                                    this.authDataService.Account = data.data.account;
                                    this.authDataService.Token = data.data.token;

                                    console.log('login return token:',data.data.token);

                                    // 清空路由复用信息
                                    this.reuseTabService.clear();
                                    if (this.startupService.saveTokenToLocal(
                                        this.authDataService.Token,
                                        this.authDataService.Account.id,
                                        this.authDataService.Account.username,
                                        this.authDataService.Account.email)) {
                                        //重新初始化系统配置
                                        this.startupService.load().then(() => {
                                            // this.chatService.initAndConnect(); // todo 是否启用 chat Service
                                            this.router.navigate(['/']);
                                        }).catch(
                                            (err) => {
                                                console.error(err);
                                            });
                                    }else{
                                        let err = "保存token到本地缓存失败！";
                                        console.error(err);

                                    }
                                }else {
                                    //提示绑定账户，先将code保存到本地缓存
                                    this.cacheService.set(BYL_OAUTH_CODE_LOCAL_KEY , tokenQuery);

                                    this.router.navigate(['/passport/oauth-register']);
                                }
                            } else{
                                console.error(data.msg);
                            }
                    },
                    err => {
                        console.error(err);
                    });
                break;
        }

        // console.log("In callback component",this.type);
        // let a = this.socialService.callback();
        // console.log("In callback component",a);
      // this.mockModel();
    });
  }

  gotoLogin(){
      this.router.navigate(['/passport/login']);
  }

  private mockModel() {
    this.socialService.callback({
      token: '123456789',
      name: 'cipchk',
      email: `${this.type}@${this.type}.com`,
      id: 10000,
      time: +new Date(),
    });
  }
}
