import {inject, Injectable, makeStateKey, TransferState} from '@angular/core';

const envStateKey = makeStateKey<{ ATTRIBUTE_ONE: string , ATTRIBUTE_TWO: string}>('env');

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  transferState = inject(TransferState)

  constructor() {
    let state = this.transferState.get(envStateKey, {ATTRIBUTE_ONE: 'one', ATTRIBUTE_TWO: "two"})
    console.log(state.ATTRIBUTE_ONE)
    console.log(state.ATTRIBUTE_TWO)
  }
}
