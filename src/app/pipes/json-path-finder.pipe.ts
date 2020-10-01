import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Pipe({
    name: 'jpf'
})
export class JsonPathFinderPipe implements PipeTransform {

    constructor(private httpService: HttpClient) { }

    async transform(value: string, ...args: unknown[]): Promise<string> {
        let result = '';
        function _deepSearch(_object, _array, _needle) {
            for (const key in _object) {
                if (_object.hasOwnProperty(key)) {

                    const element = _object[key];
                    let _type = element.hasOwnProperty('label') ? 'label' : 'title'

                    let _position = [..._array, key, _type]
                    let _string

                    if (element.hasOwnProperty(_type)) {
                        _string = element[_type]
                    }

                    if (_string == _needle) {
                        let _interpolate = _position.join('.');
                        result = _interpolate;
                        return;
                    }

                    if (typeof element === 'object') {
                        _deepSearch(element, [..._array, key], _needle)
                    }
                }
            }
        }
        let lang = await this.httpService.get('/assets/i18n/es.json').pipe(take(1)).toPromise();
        _deepSearch(lang, [], value)
        return result;
    }

}


