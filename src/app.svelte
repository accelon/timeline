<script lang="ts">
  import {downloadToCache} from 'ptk/platform/downloader.js'
  import {ZipStore} from 'ptk/zip/zipstore.ts';
  import FolioView  from '../../offtextfolio/folio/folioview.svelte';
  import { nextImageIndex }  from '../../offtextfolio/folio/ziputils.js';
  import SimpleFolioView  from '../../offtextfolio/folio/simplefolioview.svelte';
  import Toolbar from './toolbar.svelte';
  import TranscriptLayer from './transcriptlayer.svelte';
  import { onMount } from 'svelte';
  import StampButton from './stampbutton.svelte';
  let CacheName='offtextfolio';
  let thezip=$state(null),totalpages=$state(0),mp3=$state('');
  let imageIndex=$state(0),frame=$state({left:0,top:0,width:0,height:0});
  let downloading=$state('');

  const addressFromUrl=()=>{
    let hash=window.location.hash;
    if (hash[0]=='#') hash=hash.slice(1);
    let address=decodeURI(hash);
    if (~address.indexOf('%')) address=decodeURIComponent(address)  
    return address;
  }
  const init=async()=>{
    const params = new URLSearchParams(addressFromUrl());
    const src=params.get('src')||'sdp1';
    mp3='baudio/'+(params.get('mp3')||src);

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
    thezip =zip;
    totalpages=thezip.files.length;
  }

onMount(()=>{
  init();
  setTimeout(()=>{
    const rightview=document.getElementsByClassName('right-view')[0]
    if (!rightview) return;
    const rect=rightview.getBoundingClientRect();
    frame.top=rect.top;//just set the top left , width, height resolve in folioview
    frame.left=rect.left;
  },50)
})

</script>


<div class="app">
<table>
<tbody>
<tr class="top"><td colspan=2><Toolbar {imageIndex} {mp3}/></td></tr>
{#if thezip}
<tr class="bottom">
  <td class="left-view">
    <SimpleFolioView {thezip} imageIndex={nextImageIndex(totalpages, imageIndex)} {frame} showline={4}/> 
  </td>
  <td class="right-view" style:--sv-swipe-panel-height="95.5%">
  <TranscriptLayer {frame} blinkline={1} linestamped={[1,1,2,0,3,0]}/>
    <FolioView {thezip} bind:imageIndex bind:frame/>
    <StampButton {frame}/>
  </td></tr>
{/if}
</tbody>
</table>
</div>
<style>
 .app {width:100vw;height:100vh}
 table{width:100%}
 td{vertical-align: top;}
 .top {height:15vh;background-color:gray}
 .bottom {height:85vh;background-color:gray}
 .left-view{width:17%;height: 100%;}
 .right-view{width:83%;height: 100%;}
  

  * {
      margin: 0;
      padding: 0;
    }
      /* 手機外框容器 */
    .app {
      /* display: flex;
      flex-direction: column; */
      height: 100vh;
      width: 100%;      
      margin: 0 auto;
    }
    
   /* 手機直向鎖定提示（選配） */
    @media (orientation: landscape) {
      .app::after {
        content: "請切換至直向模式以獲得最佳體驗";
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.8);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        font-size: 1.2rem;
      }
    }
</style>
