import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { defaultIfEmpty, filter, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../types/team.type';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  // private property to store all backend URLs
  private readonly _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  /**
   * Function to return list of team
   */
  fetch(): Observable<Team[]> {
    return this._http.get<Team[]>(this._backendURL.allTeams)
      .pipe(
        filter((team: Team[]) => !!team),
        defaultIfEmpty([])
      );
  }

  /**
   * Function to return one team for current id
   */
  fetchOne(id: string): Observable<Team> {
    return this._http.get<Team>(this._backendURL.oneTeam.replace(':id', id));
  }

  /**
   * Function to create a new team
   */
  create(team: Team): Observable<any> {
    delete team._id;
    return this._http.post<Team>(this._backendURL.allTeams, team, this._options());
  }

  /**
   * Function to update one Team
   */
  update(id: string, team: Team): Observable<any> {
    return this._http.patch<Team>(this._backendURL.oneTeam.replace(':id', id), team, this._options());
  }

  /**
   * Function to delete one team for current id
   */
  delete(id: string): Observable<string> {
    return this._http.delete(this._backendURL.oneTeam.replace(':id', id))
      .pipe(
        map(() => id)
      );
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}
