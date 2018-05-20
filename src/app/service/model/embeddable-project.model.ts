/**
 * @Description: 与后台交互的业务bean的通用属性定义
 *
 * @Author: newmannhu@qq.com
 * @Date：

 */
export class BylEmbeddableProject{

    projectId: string;
    projectCode: string;
    projectName: string;

    getFullCaption() {
        if ((this.projectCode) && (this.projectName)) {
            return this.projectName +"[" + this.projectCode +"]";
        }else{
            return "[]";
        }

    }
}
