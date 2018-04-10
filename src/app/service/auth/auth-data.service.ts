import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Account } from '../account/account.model';
/**
 *  @Author: xinsh
 * @Description: 保存登录后的token和account信息
 *  @Date: Created in  14:58 2018/1/23.
 */

@Injectable()
export class AuthDataService {
    get Token(): string{
        return this.token;
    }
    set Token(t: string){
        this.token = t;
        this.Token$.next(t);
    }
    private token = ''; // 当前账户的token,初始值为空字符串
    get Account(): Account{
        return this.account;
    }
    set Account(newAccount: Account){
        this.account = newAccount;
        this.Account$.next(newAccount);        
    }
    private account: Account = null; // 当前登录的用户
    public Account$: BehaviorSubject<Account> = new BehaviorSubject<Account>(null);
    public Token$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor() { }

    get authenticated() {
        return this.account !== null;
    }

    // 当前登录用户id
    get currentUserId(): string {
        return this.authenticated ? this.account.id : '';
    }

    // 用户账号
    get currentAccountDisplayName(): string {
        if (!this.account) {
            return '未知账户';
        } else {
            return this.account.fullName + '[' + this.account.username + ']';
        }
    }

    get currentUserObservable() {
        return this.Account$.asObservable;
        // return this.afAuth.currentAccount;
    }

    // public changeAccount(newAccount: Account) {
    //     this.account = newAccount;
    //     this.Account$.next(newAccount);
    // }
}