<script>
let {frame={left:0,top:0,width:0,height:0},blinkline=0}=$props();

const stylestring=(o)=>`left:${o.left}px;top:${o.top}px;width:${o.width}px;height:${o.height}px;`
const stripstyle=(strip)=>{
    let folioline=5;
    const w=frame.width/folioline;
    let out=[];
    out.push('position:absolute');
    out.push('left:'+Math.floor( (folioline-strip-1)*w)+'px');
    out.push('top:0px');
    out.push('width:'+Math.floor(w)+'px');
    out.push('height:'+frame.height+'px');
    return out.join(';');
}

// $effect(()=>console.log('transcriptlayer render',frame,'blinkline',blinkline))
</script>
<div class="transcript" style={stylestring(frame)} >
    <div class="strip blinker" style={stripstyle(blinkline)}></div>
</div>
<style>
.strip {background:rgba(212, 194, 0, 0.4)}
.blinker {
  animation-name: blinker;
  animation-iteration-count: infinite;
  animation-duration: 1s;
}

.transcript {z-index:8;position:absolute;user-select: none;overflow:hidden;pointer-events: none;user-select: none;}
@keyframes blinker {
  50% {
    opacity: 0;
  }
}

</style>