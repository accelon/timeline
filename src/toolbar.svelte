<script lang="ts">
import AudioPlayer from './audioplayer.svelte'
let {imageIndex,mp3}=$props()

</script>
<AudioPlayer {mp3}/>
{imageIndex}