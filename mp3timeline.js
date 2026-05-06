import MP3Tag from 'mp3tag.js'
import fs from 'node:fs';
const infile=process.argv[2];
const data=`{
 "folio": "pphs",
 "audio": "pphs_ulucitta",
 "foliolines": 5,
 "timestamps": [
  [
   0.172452,
   9.562953,
   15.201607,
   22.247998,
   30.286135
  ],
  [
   37.807327,
   45.960346,
   53.538936,
   61.697635,
   69.803531
  ],
  [
   79.421838,
   86.079178,
   94.126677,
   101.59111,
   109.181036
  ],
  [
   116.657936,
   124.709413,
   127.191944,
   132.250574,
   136.275238
  ]
 ]
}`
// Reading from MP4/M4A
const buffer = fs.readFileSync(infile)
const mp3tag = new MP3Tag(buffer,true)
mp3tag.read()
mp3tag.tags.comment=data
mp3tag.tags.title = 'NEW TITLE'
mp3tag.tags.artist = 'NEW ARTIST'
mp3tag.tags.album = 'NEW ALBUM'
mp3tag.save() 
if (mp3tag.error !== '') throw new Error(mp3tag.error)
mp3tag.read()
console.log(mp3tag.tags.comment )

fs.writeFileSync('1.mp3', mp3tag.buffer)