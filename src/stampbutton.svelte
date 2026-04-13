<script lang="ts">
let {frame}=$props();
let stamper=null;
const stylestring=()=>{
    const out=[];
    out.push('left:'+frame.left+'px');
    out.push('top:'+(frame.top+frame.height/2)+'px');
    return out;
}
const onmousedown=e=>{
    const out=stylestring();
    out.push('fill:green');
    stamper.setAttribute('style', out.join(';'));
}
const onmouseup=e=>{
    const out=stylestring();
    out.push('fill:black');
    stamper.setAttribute('style', out.join(';'));
}
</script>
<svg class="stamper" aria-hidden="true" bind:this={stamper}
ontouchstart={onmousedown}
ontouchend={onmouseup}
onmousedown={onmousedown} 
onmouseup={onmouseup}
 style={stylestring().join(';')} data-name="Layer 1" 
 viewBox="0 0 25 25">
 <path d="M0,19.74V18a2,2,0,0,1,2-2H6a4,4,0,0,0,3.93-2.9,3.58,3.58,0,0,0,.11-.85A9.21,9.21,0,0,0,9,8.08,8.15,8.15,0,0,1,8,4.54,4.54,4.54,0,0,1,9.67,1,4.49,4.49,0,0,1,13.43.1,4.67,4.67,0,0,1,17,5.29a8.9,8.9,0,0,1-.85,2.6A9.89,9.89,0,0,0,15,12.25a3.49,3.49,0,0,0,.11.84A4,4,0,0,0,19,16H23a2,2,0,0,1,2,2v1.78A1.25,1.25,0,0,1,23.75,21H1.26A1.26,1.26,0,0,1,0,19.74ZM2,22v1.75A1.25,1.25,0,0,0,3.25,25h18.5A1.25,1.25,0,0,0,23,23.75V22Z"/></svg>
<style>
.stamper{z-index:99;opacity:0.3;position: absolute;}
</style>