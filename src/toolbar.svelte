<script lang="ts">
import AudioPlayer from './audioplayer.svelte'
import StampIndicator from './stampindicator.svelte'
let {mp3}=$props()
import {nfolio,nline} from './store.js'

</script>
<AudioPlayer {mp3}/>
<StampIndicator/>
{$nfolio}:{$nline}