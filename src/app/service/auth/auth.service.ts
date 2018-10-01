import {BylLoginResultModel} from './login-result.model';
import {BylResultBody} from '../model/result-body.model';
import {Inject, Injectable} from '@angular/core';
import {BylAuthDataService} from './auth-data.service';
import {BylAccount} from '../account/model/account.model';
import {Observable} from 'rxjs';
import {BYL_API_URL_LOGIN} from 'app/service/constant/backend-url.constant';
import {_HttpClient} from '@delon/theme';
import {UUID} from 'angular2-uuid';
import {getEmailName} from '../utils/string.utils';
import {BylOAuthTokenQueryModel} from "./oauth-token-query.model";
import {BylOAuthRegisterModel} from "./oauth-register.model";

@Injectable()
export class BylAuthService {
    protected BASE_API_URL = 'api/auth';

    constructor(private http: _HttpClient) {

    }

    login(username: string, password: string): Observable<BylResultBody<BylLoginResultModel>> {
        const loginAccount = new BylAccount();
        loginAccount.username = username;
        loginAccount.password = password;
        return this.http.post<BylResultBody<BylLoginResultModel>>(this.BASE_API_URL + '/login', loginAccount);
        //   .subscribe(
        //   data=>{
        //     if(data.code == BylResultBody.RESULT_CODE_SUCCESS){
        //       this.changeAccount(data.data.account);
        //       this.token = data.data.token;
        //       return   BylAuthService.URL_AUTH_LOGIN;
        //     } else{
        //       return data.msg;
        //     }
        //   },
        //   err => {
        //     console.log(err);
        //     return err.toString;
        //   }
        // );
    }
    /**
     *  账户注册
     * */
    codeRegister(code: string, password: string, mobile?: string): Observable<BylResultBody<BylAccount>> {
        let registerAccount = new BylAccount();
        registerAccount.username = code;
        registerAccount.password = password;
        registerAccount.phone = mobile;
        console.log("regisger:", registerAccount);
        return this.http.post<BylResultBody<BylAccount>>(this.BASE_API_URL + '/register', registerAccount);
    }
    /**
     *  邮箱注册
     * */
    emailRegister(email: string, password: string, mobile?: string): Observable<BylResultBody<BylAccount>> {
        let registerAccount = new BylAccount();
        registerAccount.username = UUID.UUID(); //给出一个uuid,以便保证后台的处理要求
        registerAccount.password = password;
        registerAccount.nickname = getEmailName(email);
        registerAccount.email = email;
        registerAccount.phone = mobile;
        console.log("regisger:", registerAccount);
        return this.http.post<BylResultBody<BylAccount>>(this.BASE_API_URL + '/register', registerAccount);
    }

    githubLogin(tokeyQuery: BylOAuthTokenQueryModel): Observable<BylResultBody<BylLoginResultModel>> {
        return this.http.post<BylResultBody<BylLoginResultModel>>(this.BASE_API_URL + '/github-login', tokeyQuery);
    }

    githubRegister(oAuthRegister: BylOAuthRegisterModel): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/github-register', oAuthRegister);
    }

    // googleLogin() {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // return this.afAuth.auth.signInWithPopup(provider).then((credential) => {
    //   this.currentAccount = credential.user;
    //   this.updateUserData();
    // }).catch(error => console.log(error));
    // }

    // twitterLogin() {
    // const provider = new firebase.auth.TwitterAuthProvider();
    // return this.afAuth.auth.signInWithPopup(provider).then((credential) => {
    //   this.currentAccount = credential.user;
    //   this.updateUserData();
    // }).catch(error => console.log(error));
    // }

    // anonymousLogin() {
    // return this.afAuth.auth.signInAnonymously().then((user) => {
    //   this.currentAccount = user;
    //   this.updateUserData();
    // }).catch(error => console.log(error));
    // }

    // emailLogin(email: string, password: string) {
    // return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
    //   this.currentAccount = user;
    //   this.updateUserData();
    // });
    // }


    // resetPassword(email: string) {
    // const fbAuth = firebase.auth();
    // return fbAuth.sendPasswordResetEmail(email).then(() => {
    //   console.log('密码已发到你的邮箱中');
    // }).catch(error => console.log('密码重置出错', error));
    // }

    /**
     *  退出登录
     * */
    // signOut() {
    // return this.afAuth.auth.signOut().then(() => {
    //   this.currentAccount = null;
    // }).catch(error => console.log(error));
    // }

    // private updateUserData() {
    // const path = `users/${this.currentUserId}`;
    // this.userRef = this.db.object(path);
    // const data = {
    //   email: this.currentAccount.email,
    //   name: this.currentAccount.displayName
    // };
    //
    // this.userRef.update(data).catch(error => console.log('更新用户数据：', error));
    // }

}
