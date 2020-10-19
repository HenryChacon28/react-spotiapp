import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// consumo de api para poder cargar las canciones

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
  }

  getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    // Token necesario para las peticiones usar token personal que no haya expirado su uso

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAwt1KSwH1oIddPRjU6BHO2CV5ltTYPKRcX0mhvfcZY4pR7qGL3oq5MGb5W6Mu9y9kzRCJmrxMHZo7RKDLbOqOiJUqGT_SDuMsLsmz0rbX4N7P6e8p6WNLYqPnJS2e0CJdwxvgerIwBgAB5MrP19wEZ44EYkSY'
    });

    return this.http.get(url, { headers });

  }

  //  función que retorna un limite de 20 petiones de albums

  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
              .pipe( map( data => data['albums'].items ));

  }

  //  función que retorna un limite de 15 petiones de artistas

  getArtistas( termino: string ) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( data => data['artists'].items));

  }

  // query para retornar el id de artista

  getArtista( id: string ) {

    return this.getQuery(`artists/${ id }`);

  }

  getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( data => data['tracks']));

  }

}
