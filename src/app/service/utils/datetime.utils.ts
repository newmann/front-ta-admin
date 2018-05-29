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
    static formatDateTimeString: string = 'YYYY-MM-DD HH:mm';
    static formatDateString: string = 'YYYY-MM-DD';

    static formatDateTime(value: number): string {
        if (value) {
            return format(value, this.formatDateTimeString);
        } else {
            return null;
        }


    }

    static formatDate(value: number): string {
        if (value) {
            return format(value, this.formatDateString);
        } else {
            return null;
        }


    }


    static convertMillsToDateTime(value: number): Date {
        if (value) {
            return new Date(value);
        } else {
            return null;
        }

    }

    static convertDateTimeToMills(value: any): number {
        console.log("in datetime.utils, ", typeof value);
        let result: number;

        switch (typeof value) {
            case "string": {
                result = Date.parse(value);
                break;
            }
            case "object": {
                result = value.getTime();
                break;
            }
            default: {
                result = 0;
            }

        }

        return result;

        // if (value) {
        //     return value.valueOf();
        // } else {
        //     return 0;
        // }

    }


    static formatDateTimeWeek(value: number): string {
        if (value) {
            return format(value, 'YYYY-MM-DD dddd HH:mm', {
                locale: zhLocale
            });
        } else {
            return null;
        }


    }

    static distanceInWordsToNow(value: number): string {
        if (value) {
            return distanceInWordsToNow(value, {
                locale: zhLocale,
                // locale: (window as any).__locale__,
            });
        } else {
            return null;
        }

    }

}

