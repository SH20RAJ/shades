let apiurl = "https://api.com/getnextvideos";
let tags = [];
let allvideos = [];
let newvideos = [];
let arr=[];
localStorage.arr = [1,2];
// let localarr = JSON.parse(localStorage.arr);
let tagsapi = ""
let videooftagapi = "";
let numvideoatatime = 2;
const getnextvideos = async (n) => {
    try {
        let options = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: n || 20,
                filter:  arr.filter((item, index) => arr.indexOf(item) === index)
            })
        };

        let res = await fetch(apiurl, options);

        // let res = await fetch(apiurl);
        let json = await res.json();
        console.log(json);
        

            allvideos = allvideos.concat(json.data);
            newvideos = json.data;
            newvideos = json.data.slice().sort(() => Math.random() - 0.5);
            arr = allvideos.map(video => video.video_id);
            console.log('arr', arr);


            localStorage.allvideos = JSON.stringify(allvideos);
            localStorage.arr = JSON.stringify(arr);

    } catch (error) {
        console.error("Error fetching videos:", error);
        throw error;
    }
};

const getrandomvideos = async (tag) => {
    try {
        let res = await fetch(videooftagapi + tags[Math.floor(Math.random() * tags.length)] || "cfnm" );

        // let res = await fetch(apiurl);
        let json = await res.json();
        console.log(json);

            json.data = json.props.pageProps.videos.data;
            console.log(json.data);
            allvideos = allvideos.concat(json.data);
            newvideos = json.data;
            newvideos = json.data.sort(() => Math.random() - 0.5).slice(30 - numvideoatatime);
            console.log("NV",newvideos);
            arr = allvideos.map(video => video.id);
            console.log('arr', arr);


            localStorage.allvideos = JSON.stringify(allvideos);
            localStorage.arr = JSON.stringify(arr);

    } catch (error) {
        console.error("Error fetching videos:", error);
        throw error;
    }
};

let integrate = async (n) => {
    try {
        await getnextvideos(n);
        console.log("All videos:", allvideos);
        console.log("New videos:", newvideos);
        newvideos.forEach((e)=>{
            document.querySelector(".center").insertAdjacentHTML( 'beforeend', createcard(e)); 
        });

        document.querySelectorAll("video").forEach(video => {
            video.addEventListener("click", (e) => {
              playpause(e.target);
            //   window.video = e.target;
            });
          });
          init();
        
        


    } catch (error) {
        console.error("Error getting videos:", error);
    }
};

let integrate2 = async (n) => {
    try {
        await getrandomvideos(n);
        console.log("All videos:", allvideos);
        console.log("New videos:", newvideos);
        newvideos.forEach((e)=>{
            document.querySelector(".center").insertAdjacentHTML( 'beforeend', createcard2(e)); 
        });

        document.querySelectorAll("video").forEach(video => {
            video.addEventListener("click", (e) => {
              playpause(e.target);
            //   window.video = e.target;
            });
          });
          init();
        
        


    } catch (error) {
        console.error("Error getting videos:", error);
    }
};
// integrate(50)

let createcard = (video)=>
     html = `<div id="vid" class="wrapper">
    <div class="wrapper_header">
        <a href="">following</a> | <a href="">feeds</a>
    </div>
    <div class="video-container active">
        <div class="playbtn">
            <i class=" fa fa-play"></i>
        </div>

        <div class="video-player">
            <video poster="${video.poster_url}" src="${video.downloadurl}" playsinline id="${video.video_id}" width="100%" loading="lazy" loop></video>
        </div>
    </div>
    <div class="cations">
        <div class="author"><img src="logo.png" alt=""> <span>@</span>GliiJoy </div>
        <div class="captiontext">${video.video_text.meta_description.default.text}</div>
    </div>
    <div class="tools">
        <i class="fa fa-heart-o"></i>
        <i class="fa fa-comment-o"></i>
        <i class="fa fa fa-share"></i>
    </div>
    <div class="comments">
        <div class="comment">
            <div class="comment_author">@ravi</div>
            <div class="comment_content">This is a great video! Keep up the good work.</div>
        </div>
    </div>
</div> `;

let createcard2 = (video)=>
html = `<div id="vid" class="wrapper">
<div class="wrapper_header">
   <a href="">following</a> | <a href="">feeds</a>
</div>
<div class="video-container active">
   <div class="playbtn">
       <i class=" fa fa-play"></i>
   </div>

   <div class="video-player">
       <video preload="none" poster="${video.poster}" src="${video.downloadLink}" playsinline id="${video.id}" width="100%" loading="lazy" loop></video>
   </div>
</div>
<div class="cations">
   <div class="author"><img src="logo.png" alt=""> <span>@</span>GliiJoy </div>
   <div class="captiontext">${video.metadata.description}</div>
</div>
<div class="tools">
   <i class="fa fa-heart-o"></i>
   <i class="fa fa-comment-o"></i>
   <i class="fa fa fa-share"></i>
</div>
<div class="comments">
   <div class="comment">
       <div class="comment_author">@ravi</div>
       <div class="comment_content">This is a great video! Keep up the good work.</div>
   </div>
</div>
</div> `;


integrate2()