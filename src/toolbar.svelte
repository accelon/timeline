<script lang="ts">
import AudioPlayer from './audioplayer.svelte'
import StampIndicator from './stampindicator.svelte'
let {mp3}=$props()
import {nfolio,nline} from './store.js'
let player;

</script>
<AudioPlayer bind:player {mp3}/>
<StampIndicator/>
{$nfolio}-{$nline}