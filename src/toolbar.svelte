<script lang="ts">
import AudioPlayer from './audioplayer.svelte'
import StampIndicator from './stampindicator.svelte'
let {src,mp3,msg=''}=$props();
import {nfolio,nline,totalpages} from './store.js'

</script>
<StampIndicator/>
{#if src!==mp3}{mp3}{:else}{src}{/if} #{$nfolio+1}/{$totalpages}:{$nline}
<AudioPlayer {mp3}/>
<br/>{msg}
