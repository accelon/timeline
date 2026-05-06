<script lang="ts">
  import { onMount } from 'svelte';
  import {downloadToCache} from 'ptk/platform/downloader.js'
  import {ZipStore} from 'ptk/zip/zipstore.ts';
  import FolioView  from '../../offtextfolio/folio/folioview.svelte';
  import { nextImageIndex }  from '../../offtextfolio/folio/ziputils.js';
  import SimpleFolioView  from '../../offtextfolio/folio/simplefolioview.svelte';
  import Toolbar from './toolbar.svelte';
  import FinalToolbar from './finaltoolbar.svelte';
  import TranscriptLayer from './transcriptlayer.svelte';
  import StampButton from './stampbutton.svelte';
  import {addStamp, initstamp} from './stamp.js'
  import {nfolio,nline,linestamped,totalpages,stamps, playing,recording, theaudioplayer} from './store.js'
  let CacheName='offtextfolio';
  let thezip=$state(null),src=$state(''),mp3=$state(''),stampfile=$state('');
  let frame=$state({left:0,top:0,width:0,height:0});
  let downloading=$state('');
  
  const addressFromUrl=()=>{
    let q=window.location.search;
    if (q[0]=='?') q=q.slice(1);
    let address=decodeURI(q);
    if (~address.indexOf('%')) address=decodeURIComponent(address) ;
    return address;
  }
  const init=async()=>{
    const params = new URLSearchParams(addressFromUrl());
    src=params.get('src')||'sdp1';
    mp3=(params.get('mp3')||src);
    let dir='timelinejson/';
    
    const filename=(params.get('stamp')||params.get('mp3')||src);
    const [m,prefix,num]=filename.match(/([a-z]+)(\d*)$/);
    if (num) dir+=prefix+'/';
    stampfile=dir+filename;

    let host='folio/';
    const zipfilename=src+'.zip'
    const res=await downloadToCache(CacheName,host+zipfilename,(msg: string)=>{
        downloading=zipfilename+ " "+msg;
    });
    
    if (!res||!res.ok) {
        downloading='error loading '+host+zipfilename;
        return;
    }
    await loadZip(res);
    downloading='';
    fetch(stampfile+'.json').then(res=>res.text()).then(text=>{
        initstamp(text);
    }).catch(e=>{
        initstamp();
    })
    
  }
const loadZip=async (res)=>{
    const buf=await res.arrayBuffer();
    const zip=new ZipStore(buf);
    thezip =zip;
    totalpages.set(thezip.files.length);
    console.log('zip loaded',thezip.files.length);
}
const onStamp=()=>{
  addStamp();
}
const setImageIndex=(idx:number)=>{
  nfolio.set(idx)
  nline.set(-1)
}
onMount(async ()=>{
  await init();
  setTimeout(()=>{
    const rightview=document.getElementsByClassName('right-view')[0]
    if (!rightview) return;
    const rect=rightview.getBoundingClientRect();
    frame={left:rect.left,top:rect.top,width:frame.width,height:frame.height};
  },100)

})

const setPlayTime=(e)=>{
  const line=Math.floor((e.clientX-frame.left)/(frame.width/5));
  if (line<0||line>5) return;
  const l=5-line-1;
  const t=($stamps[$nfolio]||[])[l]||0;
  $theaudioplayer.currentTime=t;
  if (!$playing) {
    $theaudioplayer.play();
  }
  nline.set(l);
}

const onfolioclick=()=>{
  const nextimageIndex=($nfolio<$totalpages-1)?nextImageIndex($totalpages, $nfolio):-1;
  if (nextimageIndex>-1) nfolio.set(nextimageIndex);
} 
</script>


<div class="app">
<table>
<tbody>
<tr class="top"><td colspan=2>
  <Toolbar {src} {mp3} msg={downloading}/>
</td></tr>
{#if thezip}
<tr class="bottom">
  <td class="left-view">
    {#if $nfolio==$totalpages-1}
    <FinalToolbar {src} {mp3}/>
    {:else}
    <SimpleFolioView {onfolioclick} {thezip} imageIndex={($nfolio<$totalpages-1)?nextImageIndex(totalpages, $nfolio):-1} {frame} showline={4}/> 
    {/if}
  </td>
  <td class="right-view" style:--sv-swipe-panel-height="95.5%">
  <TranscriptLayer {setPlayTime} {frame} 
  editing={($playing||$recording)} blinkline={$nline} linestamped={$linestamped}/>
    <FolioView {thezip} imageIndex={$nfolio} {setImageIndex} bind:frame/>
    {#if $playing || $recording}
`   <StampButton {frame} {onStamp}/>
    {/if}
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
