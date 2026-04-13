import { get,writable,derived } from 'svelte/store';


export const theaudio=writable(null); 
export const playing=writable(false); 
export const nfolio=writable(0);
export const nline=writable(-1); //0~4
export const stamps=writable([]);
export const totalpages=writable(0);
export const linestamped=derived([nfolio,nline],([nfolio,nline])=>{
    const prev=get(stamps)[nfolio-1]||[]
    const timestamps=[...get(stamps)[nfolio]||[]] ;
    const out=[0,0,0,0,0];

    if (timestamps[0]) {
        if (prev.length&&prev[4]>timestamps[0]) out[0]=3;//error
        else out[0]=1;
    }

    for (let i=1;i<timestamps.length;i++) {
        if (!timestamps[i]) continue;
        if (timestamps[i]<timestamps[i-1]) out[i-1]=3;//error
        else if (timestamps[i]) out[i]=1;//done
    }

    if (nline>4) {
        out[0]=2;
    } else {
        out[nline+1]=2;//active
    }

    return out;
})

