<script>
let {frame={left:0,top:0,width:0,height:0},setPlayTime,linedurations,
blinkline=1,linestamped=[0,0,0,0,0,0],editing}=$props();
let timers=[];
const folioline=5;

const stylestring=(o)=>`left:${o.left}px;top:${o.top}px;width:${o.width}px;height:${o.height}px;`
const stripstyle=(strip)=>{
    const w=frame.width/folioline;
    let out=[];
    out.push('position:absolute');
    out.push('left:'+Math.floor( (folioline-strip-1)*w)+'px');
    out.push('top:0px');
    out.push('width:'+Math.floor(w)+'px');
    out.push('height:'+frame.height+'px');
    return out.join(';');
}
const stylelinestamped=(frame,nline)=>{ 
    const w=frame.width/5;
    let out=[];
    out.push('position:absolute');
    out.push('top:'+(frame.top-35)+'px');
    if (nline<5) {
        out.push('left:'+(w/8+frame.left+Math.floor( (folioline-nline-1)*w))+'px');
    } else { //next page first line
        out.push('left:'+(w/8)+'px')
    }
    return out.join(';')
}
const lines=[0,1,2,3,4,5]

</script>
{#each lines as nline}
<div onclick={setPlayTime} aria-hidden="true"
 class={(editing&&nline==blinkline+1?"editing ":"")
 + "linestamped linestamped"+linestamped[nline]}
 style={stylelinestamped(frame,nline)}>　　</div>
{/each}
<div class="transcript" style={stylestring(frame)} >
    <div id="strip" class="strip blinker" style={stripstyle(blinkline)}></div>
</div>
<style>

.strip {background:rgba(212, 194, 0, 0.4)}
.blinker {
  animation-name: blinker;
  animation-iteration-count: infinite;
  animation-duration: 1s;
}
.linestamped {z-index:8;position:absolute;user-select:none;    }
.linestamped0 {background-color:rgba(0, 0, 0, 0)}
.linestamped1 {background:rgba(98, 203, 6, 0.9)}
.editing { 
  animation-name: blinker;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  border:solid black 2px;
  /* background:rgba(183, 203, 6, 0.9) */
}
.linestamped2 {background:rgba(255, 0, 0, 0.9)}
.transcript {z-index:8;position:absolute;
    overflow:hidden;pointer-events: none;user-select: none;}
@keyframes blinker {
  50% {
    opacity: 0;
  }
}

</style>