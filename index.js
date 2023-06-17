// const express=require('express');
// const app=express();
const fs=require('fs');
const homefile=fs.readFileSync('./home.html',"utf-8");
const http=require('http');
const requests=require('requests');


const replaceval=(tempval,orgval)=>{
        let temp=tempval.replace("{%tempval%}",orgval.main.temp);
        temp=temp.replace("{%tempmin%}",orgval.main.temp_min);
        temp=temp.replace("{%tempmax%}",orgval.main.temp_max);
        temp=temp.replace("{%location%}",orgval.name);
        temp=temp.replace("{%country%}",orgval.sys.country);
        temp=temp.replace("{%tempstat%}",orgval.weather[0].main);
        return temp;
}
const server=http.createServer((req,res)=>{
    // app.get("/",(req,res)=>{
    //     res.send(homefile);
    //     res.end();
    // });
    // app.listen(200,"127.0.0.1",()=>{
    //     console.log("server is running on port ");
    // })
    if(req.url=="/"){
        let apikey="12ad8e9ddee8a61a3b97d8bb2902a803";
        let url=`https://api.openweathermap.org/data/2.5/weather?q=Gujrat%20&appid=${apikey}`;
        requests(url)
.on('data', function (chunk) {
    const parsechunk=JSON.parse(chunk);
    const arrData=[parsechunk];
//   console.log(arrData[0].main.temp);
const realTimedata=arrData
.map((val)=>replaceval(homefile,val))
.join("");
res.write(realTimedata);
console.log(realTimedata);
})

.on('end', function (err) {
  if (err) return console.log('connection closed due to errors', err);
 
//   console.log('end');
res.end();
})
    }


});
server.listen(300,"127.0.0.1");
// console.log(server.address.port);
// app.get('/',(req,res)=>{
//     res.send(homefile);
// })
// app.listen(300),()=>{
//     console.log("our server is running");
// };