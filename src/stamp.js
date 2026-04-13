import {stamps,theaudio,nfolio,nline,totalpages} from './store.js'
import {get} from 'svelte/store'

export const initstamp=()=>{
    const _stamps=[]
    _stamps.length=get(totalpages);
    for (let i=0;i<_stamps.length;i++) {
       _stamps[i]=[0,0,0,0,0];
    }
    stamps.set(_stamps);
}
export const addStamp=()=>{
    const _stamps=get(stamps);
    let nl=get(nline), nf=get(nfolio);
    nl++;
    if (nl>4) {
        nl=4;
        if (nf<_stamps.length-1) {
            nf++;
            nl=0;
        } else {
            get(theaudio).pause();
        }
    }
    _stamps[nf][nl]=get(theaudio).currentTime;
    stamps.set([..._stamps]);

    nline.set(nl);
    nfolio.set(nf);
}

export const settrack=t=>{
    get(theaudio).currentTime=t;
}
