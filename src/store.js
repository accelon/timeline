import { get,writable,derived } from 'svelte/store';
export const theaudioplayer=writable(null); 
export const playing=writable(false); 
export const recording=writable(false); 
export const nfolio=writable(0);
export const nline=writable(-1); //0~4
export const stamps=writable([]);
export const dirty=writable(false);
export const totalpages=writable(0);

export const linestamped=derived([stamps,nfolio,nline],([stamps,nfolio,nline])=>{
    if (!stamps) return;
    // console.log('linestamped',nfolio,nline,stamps)
    const prev=stamps[nfolio-1]||[]
    const timestamps=[...stamps[nfolio]||[]] ;
    const out=[0,0,0,0,0];

    if (timestamps[0]) {
        if (prev.length&&prev[4]>timestamps[0]) out[0]=2;//error
        else out[0]=1; //done
    }

    for (let i=1;i<timestamps.length;i++) {
        if (!timestamps[i]) continue;
        if (timestamps[i]<timestamps[i-1]) out[i-1]=2;//error
        else if (timestamps[i]) out[i]=1;//done
    }

    return out;
})

