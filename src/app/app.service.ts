import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Winner } from "./interface";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AppService {
  url = "https://www.ag-grid.com/example-assets/olympic-winners.json";

  constructor(private http: HttpClient) {}

  getData(): Observable<Winner[]> {
    return this.http.get<Winner[]>(this.url);
  }
}
