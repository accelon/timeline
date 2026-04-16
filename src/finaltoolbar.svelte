<script lang="ts">
import {uploadicon} from './icon.js'
import {buildtimestampjson} from '../../offtextfolio/timestamp.js'
import {nfolio,playing,totalpages,stamps,dirty} from './store.js'
let {mp3,src}=$props();
let errormsg=$state('');
const uploadstamp=async ()=>{
    const jsonStr = JSON.stringify(buildtimestampjson($stamps,src,mp3),(key, value) => {
    if (typeof value === 'number' && !Number.isInteger(value)) {
      return parseFloat(value.toFixed(2));
    }
    return value;
    }, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const formData = new FormData();
    const jsonfilename=(mp3+'.json');
    formData.append("jsonfile", blob, jsonfilename);
    const response = await fetch("/cgi-bin/upload_json.cgi", {method: "POST", body: formData });
    const result = await response.json();
    if (response.ok) {
        dirty.set(false);
        errormsg='👌';
        setTimeout(()=>{
            errormsg='';
        },2000);
    } else {
        errormsg='❗';
    }
}

</script>
{#if $nfolio+1==$totalpages && $dirty && !$playing}
<button aria-label="Upload stamps" onclick={uploadstamp} class="uploadbtn">{@html uploadicon}</button>
{/if}
{errormsg}
<style>
    .uploadbtn {
        background:none;
        border:none;
        cursor:pointer;
        width:100%;
        padding:0;
    }
</style>

<!-- upload_json.cgi
#!/usr/bin/perl
use strict;
use warnings;
use CGI;
# sudo apt install libcgi-pm-perl libcgi-simple-perl
# sudo a2enmod cgi
# sudo chmod +x /usr/lib/cgi-bin/upload_json.cgi
# sudo chown www-data:www-data /usr/lib/cgi-bin/upload_json.cgi
# sudo chown www-data:www-data /var/www/html/timelinejson
# sudo chmod 775 /var/www/html/timelinejson
# sudo systemctl restart apache2
$CGI::DISABLE_UPLOADS = 0;
$CGI::POST_MAX = 1048576;
# 設置返回 JSON 格式
print "Content-type: application/json; charset=utf-8\n\n";

# 創建 CGI 對象
my $cgi = CGI->new;

# 獲取上傳的文件（客戶端用的 key 是 jsonfile）
my $fileHandle = $cgi->upload("jsonfile");
my $fileName = $cgi->param("jsonfile");

if (!$fileHandle) {
    print '{"status":"error","message":"未接收到文件"}';
    exit;
}

# 服務器保存目錄（必須先創建）
my $saveDir = "/var/www/html/timelinejson";

# 生成唯一文件名，避免覆蓋
my $saveName = $fileName;
my $savePath = "$saveDir/$saveName";

# 寫入文件
open my $outFile, ">", $savePath or do {
    print '{"status":"error","message":"無法寫入服務器文件"}';
    exit;
};

binmode $outFile;
while (my $bytes = read($fileHandle, my $buffer, 1024)) {
    print $outFile $buffer;
}
close $outFile;
system("chgrp","yap",$savePath);
system("chmod", "0775", $savePath);
# 返回成功信息
print '{"status":"success","message":"JSON文件上傳成功","save_path":"' . $savePath . '"}';

-->