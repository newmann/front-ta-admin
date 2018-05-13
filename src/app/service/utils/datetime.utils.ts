/**
 * @Description:
 * @Author: newmannhu@qq.com
 * @Date: Created in 2018-05-13 15:56
 **/
import * as format from 'date-fns/format';
const zhLocale = require('date-fns/locale/zh_cn');
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

/**
 * @see http://ng-alain.com/docs/service-pipe#%E6%97%A5%E6%9C%9F-_date
 */

export class BylDatetimeUtils {
    static formatString: string = 'YYYY-MM-DD HH:mm';

    static formatDateTime(value: number): string{
        if (value) {
            return format(value, this.formatString);
        } else {
            return "";
        }


    }

    static formatDateTimeWeek(value: number): string{
        if (value) {
            return format(value, 'YYYY-MM-DD dddd HH:mm',{
                locale: zhLocale
            });
        } else {
            return "";
        }


    }
    static distanceInWordsToNow(value: number): string{
        if (value) {
            return distanceInWordsToNow(value, {
                locale: zhLocale,
                // locale: (window as any).__locale__,
            });
        }else {
            return "";
        }

    }

}

