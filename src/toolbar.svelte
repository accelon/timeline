<script lang="ts">
import AudioPlayer from './audioplayer.svelte'
import StampIndicator from './stampindicator.svelte'
let {imageIndex,mp3}=$props()

</script>
<AudioPlayer {mp3}/>
<StampIndicator/>
{imageIndex}