import {stamps,theaudioplayer,nfolio,nline,totalpages} from './store.js'
import {get} from 'svelte/store'

export const initstamp=(json='')=>{
    if (json){
        let _stamps=JSON.parse(json);
        if (_stamps.timestamps&&_stamps.timestamps.length==get(totalpages)) {
            stamps.set(_stamps.timestamps);
            // console.log('stamps loaded',_stamps.timestamps)
        }
    } else {
        const _stamps=[]
        _stamps.length=get(totalpages);
        for (let i=0;i<_stamps.length;i++) {
        _stamps[i]=[0,0,0,0,0];
        }
        stamps.set(_stamps);
    }
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
            get(theaudioplayer).pause();
        }
    }
    _stamps[nf][nl]=get(theaudioplayer).currentTime;
    stamps.set([..._stamps]);

    nline.set(nl);
    nfolio.set(nf);
}

export const settrack=t=>{
    get(theaudioplayer).currentTime=t;
}
