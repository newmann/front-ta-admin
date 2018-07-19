import {I18NService} from '@core/i18n/i18n.service';
import {_HttpClient} from '@delon/theme';
import {BylConfigService} from '../constant/config.service';
import {Observable} from 'rxjs';
import {BylResultBody} from '../model/result-body.model';
import {BylQueryReqBody} from '../model/query-req-body.model';
import {BylPageReq} from '../model/page-req.model';
import {BylPageResp} from '../model/page-resp.model';
import {BylBaseService} from "./base.service";
import {BylMasterDataBaseService} from "./master-data-base.service";
import {BylTreeChildNodeAddModel} from "../model/tree-child-node-add.model";
import {BylTreeBaseModel} from "../model/tree-base.model";
import {BylTreeSiblingNodeAddModel} from "../model/tree-sibling-node-add.model";
import {BylTreeNodeMoveModel} from "../model/tree-node-move.model";


/**
 *  @Author: xinsh
 * @Description: 与后台接口的基础类
 *  @Date: Created in  14:00 2018/4/13.
 */

export class BylTreeBaseService<T extends BylTreeBaseModel> extends BylMasterDataBaseService<T>{
    // protected BASE_API_URL = 'api/';

    constructor(protected http: _HttpClient,
                protected configServer: BylConfigService,
                protected i18nService: I18NService) {
        super(http,configServer,i18nService);
    }

    findAllByParentId(parentId: string): Observable<BylResultBody<Array<T>>> {
        return this.http.get<BylResultBody<Array<T>>>(this.BASE_API_URL + '/find-all-by-parentid/' + parentId);
    }

    findAllByLevelNo(levelNo: number): Observable<BylResultBody<Array<T>>> {
        return this.http.get<BylResultBody<Array<T>>>(this.BASE_API_URL + '/find-all-by-level-no/' + levelNo);
    }

    addChildNode(parentNode: T, node: T): Observable<BylResultBody<T>> {
        let newNode: BylTreeChildNodeAddModel<T> = new BylTreeChildNodeAddModel();
        newNode.parentNode = parentNode;
        newNode.node = node;
        return this.http.post<BylResultBody<T>>(this.BASE_API_URL + '/add-child-node', newNode);
    }

    addSiblingNode(siblingNode: T, node: T, pos: number): Observable<BylResultBody<T>> {
        let newNode: BylTreeSiblingNodeAddModel<T> = new BylTreeSiblingNodeAddModel();
        newNode.siblingNode = siblingNode;
        newNode.node = node;
        newNode.pos = pos;
        return this.http.post<BylResultBody<T>>(this.BASE_API_URL + '/add-sibling-node', newNode);
    }

    moveNode(targetNode: T, node: T, pos: number): Observable<BylResultBody<T>> {
        let newNode: BylTreeNodeMoveModel<T> = new BylTreeNodeMoveModel();
        newNode.targetNode = targetNode;
        newNode.node = node;
        newNode.pos = pos;
        return this.http.post<BylResultBody<T>>(this.BASE_API_URL + '/move-node', newNode);
    }

    deleteNode(node: T): Observable<BylResultBody<boolean>> {
        return this.http.post<BylResultBody<boolean>>(this.BASE_API_URL + '/delete-node', node);
    }

}
