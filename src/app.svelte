<script lang="ts">
  import {downloadToCache} from 'ptk/platform/downloader.js'
  import {ZipStore} from 'ptk/zip/zipstore.ts';
  import  FolioView  from '../../offtextfolio/folio/folioview.svelte';
  let CacheName='offtextfolio';
  let thezip=null;
  let downloading='';

  const addressFromUrl=()=>{
    let hash=window.location.hash;
    if (hash[0]=='#') hash=hash.slice(1);
    let address=decodeURI(hash);
    if (~address.indexOf('%')) address=decodeURIComponent(address)  
    return address;
  }
  const init=async()=>{
    const address=addressFromUrl();
    let [src,folio,line,char]=address.split('.');

    let host='folio/';
        const zipfilename=src+'.zip'
    const res=await downloadToCache(CacheName,host+zipfilename,(msg: string)=>{
        downloading=zipfilename+ " "+msg;
    });
    if (!res||!res.ok) {
        downloading='error loading '+host+zipfilename;
        return;
    }
    downloading='';
    const buf=await res.arrayBuffer();
    const zip=new ZipStore(buf);
    thezip=zip;
  }
setTimeout(init,500);
</script>

<main>
<div class="app"><div class="pane">
{#if thezip}
  <FolioView {thezip}/>
{/if}
</div>
</div>
</main>

<style>
  .pane {background-color: blue;width:25vw}
  main {width:100vw;height:100vh}
</style>
