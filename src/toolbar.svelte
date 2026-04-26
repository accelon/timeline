<script lang="ts">
import AudioPlayer from './audioplayer.svelte'
import StampIndicator from './stampindicator.svelte'
let {src,mp3,msg=''}=$props();
import {nfolio,nline,totalpages} from './store.js'
let editingfolio=$state(false);
const editfolio=()=>{
    editingfolio=true;
}
const seteditfocus=(ele)=>{
    ele.focus();
}
const onkeyup=(e)=>{
    if (e.key=='Enter') {
        onchange(e)
    } else if (e.key=='Escape') {
        editingfolio=false;
    }
}
const onchange=(e)=>{
    let v=parseInt(e.target.value);
    if (v>0 && v<=$totalpages) nfolio.set(v-1);
    editingfolio=false;
}

</script>
{#if editingfolio}
    <input type="number" use:seteditfocus size={2}
     min=1 max={$totalpages} value={$nfolio+1} 
     {onkeyup} {onchange}/>
{:else}
<span class="nfolio" aria-hidden="true" 
onclick={editfolio}>{$nfolio+1}/{$totalpages}</span>:
<span class="nline" aria-hidden="true">{$nline+1}</span>
{/if}
{#if src!==mp3}{mp3}{:else}{src}{/if} 
<AudioPlayer {mp3}/>
<br/>{msg}

<style>
    input {font-size:1.8em;width:4em;text-align:center}
    .nfolio {font-size:1.4em;color:#99ff00}
    .nline {font-size:1.4em;color:#ffc400}
</style>