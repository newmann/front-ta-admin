import { LoginResultModel } from './login.result.model';
import { ResultBody } from '../model/result.body.model';
import { Inject, Injectable } from '@angular/core';
import {AuthDataService} from './auth.data.service';
import { Account } from './../account/account.model';
import { Observable } from 'rxjs/Observable';
import { API_URL_LOGIN } from 'app/service/constant/backend.url.constant';
import { _HttpClient } from '@delon/theme';

@Injectable()
export class AuthService {
    constructor(private http: _HttpClient,
        @Inject(API_URL_LOGIN) private apiURLLogin) {

    }

    login(username: string, password: string): Observable < ResultBody < LoginResultModel >> {
        const loginAccount = new Account();
        loginAccount.username = username;
        loginAccount.password = password;
        return this.http.post<ResultBody<LoginResultModel>>(this.apiURLLogin, loginAccount);
        //   .subscribe(
        //   data=>{
        //     if(data.code == ResultBody.RESULT_CODE_SUCCESS){
        //       this.changeAccount(data.data.account);
        //       this.token = data.data.token;
        //       return   AuthService.URL_AUTH_LOGIN;
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
    // githubLogin() {
        // const provide = new firebase.auth.GithubAuthProvider();
        // return this.afAuth.auth.signInWithPopup(provide).then((credential) => {
        //   this.currentAccount = credential.user;
        //   this.updateUserData();
        // }).catch(error => console.log(error));
    // }

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

    /**
     *  邮箱注册
     * */
    // emailSignUp(email: string, password: string) {
        // return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((user) => {
        //   this.currentAccount = user;
        //   this.updateUserData();
        // }).catch(error => console.log(error));
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
