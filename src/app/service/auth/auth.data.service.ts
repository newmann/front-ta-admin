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
    public token = ''; // 当前账户的token,初始值为空字符串
    public currentAccount: Account = null; // 当前登录的用户
    public currentAccountSubject: BehaviorSubject<Account> = new BehaviorSubject<Account>(null);
    constructor() { }

    get authenticated() {
        return this.currentAccount !== null;
    }

    // 当前登录用户id
    get currentUserId(): string {
        return this.authenticated ? this.currentAccount.id : '';
    }

    // 用户账号
    get currentAccountDisplayName(): string {
        if (!this.currentAccount) {
            return '未知账户';
        } else {
            return this.currentAccount.fullName + '[' + this.currentAccount.username + ']';
        }
    }

    get currentUserObservable() {
        return this.currentAccountSubject.asObservable;
        // return this.afAuth.currentAccount;
    }

    public changeAccount(newAccount: Account) {
        this.currentAccount = newAccount;
        this.currentAccountSubject.next(newAccount);
    }
}
