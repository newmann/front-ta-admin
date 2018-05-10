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
import {genMobileUrl, isMobileUrl} from '../utils/string.utils';
import {DA_SERVICE_TOKEN, ITokenService, JWTTokenModel} from "@delon/auth";

@Injectable()
export class RouterGuardService implements CanActivate{
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
            if (isMobileUrl(url)){
                console.info("url正确，无须转跳");
            }else{
                console.info("新url:", genMobileUrl(url));
                this.router.navigateByUrl(genMobileUrl(url));
                return false;
            }

        } else{
            // 在浏览器登录
            console.info("进入非移动端");
        }

        //判断是否登录，如果没有，则转到登录页面
        let token: JWTTokenModel;
        token = this.tokenService.get<JWTTokenModel>(JWTTokenModel);
        console.log("token:",token.token);
        console.log("token payload:", token.payload);
        console.log('token expired:',token.isExpired(0));
        if (token.isExpired(0)) {
            //无效，进入登录界面
            this.router.navigate(['/passport/login']);
            return false;

        } else {
            //有效，继续
            return true;

        }

    }

}
