import { Injectable, Signal } from '@angular/core';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { AppConstants } from '../../constants/app.constants';
import { IMonster } from '../../interfaces/monster.interface';

@Injectable({
  providedIn: 'root',
})
export class MonsterWithHttpResourceService {
  private allMonstersResource = httpResource<IMonster[]>(
    `${AppConstants.API_BASE_URL}/monsters/`,
    {
      defaultValue: [],
    },
  );
  monsters = this.allMonstersResource.value;
  monstersError = this.allMonstersResource.error as Signal<
    HttpErrorResponse | undefined
  >;
  monstersStatus = this.allMonstersResource.status;
  monstersIsLoading = this.allMonstersResource.isLoading;

  // Method 1: call the API using httpResource
  // Like this, httpResource directly calls the API
  // but `id` is undefined as no option is selected
  // by default.
  // Moreover, this method only calls once the API.
  // Any subsequent call will not happen, because there is no signal!
  aMonsterResource = (id: string | undefined) =>
    httpResource<IMonster | undefined>(
      `${AppConstants.API_BASE_URL}/monsters/${id}`,
      {
        defaultValue: undefined,
      },
    );
  // Method 2: call the API using httpResource with a reactive function
  aProperMonsterResource = (id: Signal<string | undefined>) => {
    return httpResource<IMonster | undefined>(
      // To make the resource reactive, you simple use an arrow fuction
      // and select the URL only way and the full customization way...
      () => {
        // If you have a input signal, let's ignore it when
        // it is `undefined` e.g. not set yet or provided,
        // through the UI, by the user.
        if (!id()) {
          // This prevents the case when the id is not yet set.
          // e.g. httpResource doesn't perform an API call
          return undefined;
        }

        // When it is provide, httpResource can call the final URL.
        //return `${AppConstants.API_BASE_URL}/monsters/${id()}`;

        // Or you can fully customize the request.
        return {
          // With the URL to call
          url: `${AppConstants.API_BASE_URL}/monsters/${id()}`,
          // the method to use
          method: 'GET',
          // the headers to provide
          headers: {
            // 'X-Custom-Header': 'This call is customized',
            'Content-Type': 'application/json',
          },
        };
      },
      {
        // This is the default value the httpResource return if
        // no call occurs.
        defaultValue: undefined,
      },
    );
  };
  // aMonster = this.aMonsterResource.value;
  // aMonstersError = this.aMonsterResource.error as Signal<
  //   HttpErrorResponse | undefined
  // >;
  // aMonstersStatus = this.aMonsterResource.status;
  // aMonstersIsLoading = this.aMonsterResource.isLoading;
}
