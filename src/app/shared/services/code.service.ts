import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class CodeService {
  constructor (private http: Http) {}

  private _retrieveUrl = 'api/code/retrieve';
  private _saveUrl = 'api/code/save';
  private _listUrl = 'api/code/list';
  private _listFilesUrl = 'api/code/listFiles';
  private _addUrl = 'api/code/add';

  /**
   * List files by type
   *
   */
  listFiles (dir: string) {

    let headers = new Headers();
    headers.append('X-AUTH', 'Bearer ' + localStorage.getItem('id_token'));
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this._listFilesUrl + '?dir=' + dir, options).map((res:Response) => res.json());
  }

  /**
   * List code by type
   *
   */
  list (type: string) {
    let headers = new Headers();
    headers.append('X-AUTH', 'Bearer ' + localStorage.getItem('id_token'));
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this._listUrl + '/' + type, options).map((res:Response) => res.json());
  }

  /**
   * Retrieves code from a URL
   *
   * @param {string} url
   * @return {Observable}
   */
  retrieve (url: string) {

    let headers = new Headers();
    headers.append('X-AUTH', 'Bearer ' + localStorage.getItem('id_token'));
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this._retrieveUrl + '?url=' + url, options).map((res:Response) => res.text());

  }

  /**
   * Saves code
   *
   * @param {string} name
   * @param {string} cssClass
   * @return {Observable}
   */
  save (value: string, url: string) {

    let body = JSON.stringify({ value, url });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-AUTH', 'Bearer ' + localStorage.getItem('id_token'));
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._saveUrl, body, options);

  }

  /**
   * Add code
   *
   * @param {string} type
   * @param {string} name
   * @return {Observable}
   */
  add (type: string, name: string) {

    let body = JSON.stringify({ type, name });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-AUTH', 'Bearer ' + localStorage.getItem('id_token'));
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._addUrl, body, options);

  }



}