/**
 *  @Author: xinsh
 * @Description:  路由守卫，
 *  1、控制权限
 *   2、不同的环境进入不同的页面（比如移动端进入移动端页面）
 *  @Date: Created in  12:58 2018/4/11.
 */
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Inject, Injectable} from '@angular/core';
import {BylLoggerService} from '../utils/logger';
import {CheckClientBrowserType} from '../utils/client-browser-type.utils';
import {DA_SERVICE_TOKEN, ITokenService, JWTTokenModel, SimpleTokenModel} from "@delon/auth";
import {BylStringUtils} from "../utils/string.utils";

@Injectable()
export class BylRouterGuardService implements CanActivate{
    private _browserType: string; // 客户端类型
    private _isMobile: boolean; // 是否为移动端

    constructor( private router: Router,
                 @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService){
        // 获取当前的浏览器环境
        const check = CheckClientBrowserType();
        this._browserType = check.from();
        this._isMobile = check.browser.versions.mobile;


    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        let url: string = state.url;
        console.info("进入url", url);

        if (this._isMobile) {
            console.info("进入移动端");
            if (BylStringUtils.isMobileUrl(url)){
                console.info("url正确，无须转跳");
            }else{
                console.info("新url:", BylStringUtils.genMobileUrl(url));
                this.router.navigateByUrl(BylStringUtils.genMobileUrl(url));
                return false;
            }

        } else{
            // 在浏览器登录
            console.info("进入非移动端");
        }
        console.log("In Router canActivate:",route);

        //第三方平台登陆的回调路由需要特别处理
        let permitURL = ['/passport/login',
            '/callback/',
            '/passport/register',
            '/passport/register-result',
            '/passport/oauth-register',
            '/passport/oauth-register-result'];

        if (permitURL.includes(url)) {
            //直接通过
            return true;
        }else{
            try {
                let token: JWTTokenModel;
                token = this.tokenService.get<JWTTokenModel>(JWTTokenModel);
                // console.log("token:",token.token);
                // console.log("token payload:", token.payload);
                // console.log('token expired:',token.isExpired(0));
                if (token.isExpired(0)) {
                    console.log("In BylRouterGuardService, token expired。");
                    //无效，进入登录界面
                    this.router.navigate(['/passport/login']);
                    return false;

                } else {
                    //有效，继续
                    return true;

                }
            } catch (error) {
                console.warn("In Router canActivate:", error);

                this.router.navigate(['/passport/login']);
                return false;

            }
            // //判断是否登录，如果没有，则转到登录页面
            //   let s: SimpleTokenModel;
            //   s = this.tokenService.get();
            //   console.log("In Router canActivate:", s);
            //
            //   if (s.token) {
            //
            //       let token: JWTTokenModel;
            //       token = this.tokenService.get<JWTTokenModel>(JWTTokenModel);
            //       // console.log("token:",token.token);
            //       // console.log("token payload:", token.payload);
            //       // console.log('token expired:',token.isExpired(0));
            //       if (token.isExpired(0)) {
            //           console.log("In BylRouterGuardService, token expired。");
            //           //无效，进入登录界面
            //           this.router.navigate(['/passport/login']);
            //           return false;
            //
            //       } else {
            //           //有效，继续
            //           return true;
            //
            //       }
            //   } else {
            //       //无效，进入登录界面
            //       this.router.navigate(['/passport/login']);
            //       return false;
            //   }
        }


    }

}
