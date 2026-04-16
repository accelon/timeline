<script lang="ts">
import {theaudioplayer,playing} from './store.js'
import {playicon,stopicon} from './icon.js'

let {mp3} = $props();
const togglePlay=()=>{
    let audio=$theaudioplayer;
    if (!audio) return;
    if (audio.paused) audio.play();
    else audio.pause();
    playing.set(!audio.paused);   
}
const onplay=()=>{
    playing.set(true)
}
const onpause=()=>{
    playing.set(false)
}
const setAudio=(ele:HTMLAudioElement)=>{
    theaudioplayer.set(ele);
}
</script>

<audio use:setAudio onplay={onplay} onpause={onpause} >
    <source src={"baudio/"+mp3+".mp3"}/>
</audio>
{#if $theaudioplayer}
    <span class="audioicon" aria-hidden="true"  onclick={()=>togglePlay()}>{@html $playing?stopicon:playicon}</span>
{/if}
<style>
    .audioicon {width:3em;height: 3em;position:absolute;right:0;top:0;cursor:pointer;z-index:10}
</style>