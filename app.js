let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let ip = require('ip');
let fs = require('fs-extra');
let postsJson = fs.readJsonSync('posts.json');
let posts;
if (postsJson ? postsJson.data : false) {
    posts = postsJson.data;
} else {
    posts = [];
}


let url = ip.address();
console.log(url + ':5000');
let date = new Date();
app.use(express.static("./public"));
let last_post = 0;
function save_posts(){
  if(last_post > 3){
    fs.writeJson('posts.json', {"data": posts}, err => {
        if (err) return console.log(err);
    });
  } else{
    last_post += (last_post=0)?0:1;
  }
}
setInterval(() => {
    save_posts();
}, 6000);
app.get('/', function (req, res) {
    res.redirect('./');
});
app.get('/applications', function (req, res) {
    res.redirect('./applications.html');
});
server.listen(5000);
io.on('connection', function (socket) {

  socket.on("posts", function (data) {
    io.sockets.emit('posts',posts);
  });
  socket.on("new", function (data) {
    posts.push(data);
    last_post++;
    io.sockets.emit('posts',posts);
  });

  socket.on("like", function (data) {
    for(let i in posts){
      if(posts[i].id == data.post_id){
        let liked = false;
        for(let j in posts[i].likes){
          if(posts[i].likes[j] == data.id){
            posts[i].likes.splice(j,1);
            liked = true;
          }
        }
        if(!liked){
          posts[i].likes.push(data.id);
        }
      }
    }
    let newPostsArray = [];
    while(posts.length){
      let top = 0;
      for (let i in posts) {
        if(posts[i].likes.length>posts[top].likes.length){
          top = i;
        }
      }
      newPostsArray.push(posts[top]);
      posts.splice(top,1);
    }
    posts = newPostsArray;
  });

});
