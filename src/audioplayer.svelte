<script lang="ts">
import {theaudio,playing} from './store.js'

let {mp3} = $props();
const togglePlay=()=>{
    let audio=$theaudio;
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
    theaudio.set(ele);
}
</script>

<audio use:setAudio onplay={onplay} onpause={onpause} >
    <source src={mp3+'.mp3'}/>
</audio>
{#if $theaudio}
    <span aria-hidden="true"  onclick={()=>togglePlay()}>{$playing?'Stop':'Play'}</span>
{/if}