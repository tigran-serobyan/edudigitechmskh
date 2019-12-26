var id = localStorage.getItem('id');
if(!id){
  let symbols = 'zxcvbnmasdfghjklqwertyuiop1234567890';
  let id = '';
  for(let i = 0; i < 16; i++){
    id += symbols[Math.round(Math.random()*symbols.length)];
  }
  localStorage.setItem('id',id);
}
var socket = io.connect(document.URL.split('/'));
var posts = [];
socket.emit('posts');
socket.on('posts',function(data){
  posts = data;
  if(document.getElementById('applications').innerHTML){
    document.getElementById('new_posts').style.display = 'block';
  } else{
    show_posts();
  }
});
function show_posts(){
  document.getElementById('applications').innerHTML = '';
  document.getElementById('new_posts').style.display = 'none';
  for (let i in posts) {
    let post = document.createElement('div');
    post.setAttribute('class','inform-block');

    let like = document.createElement('div');
    like.setAttribute('class','row');
    like.innerHTML = '<p class="title"><i class="fas fa-heart"></i></p><p class="value">'+posts[i].likes.length+'</p>';
    let _function = "like(event, '"+posts[i].id+"')";
    like.getElementsByClassName('title')[0].setAttribute("onclick",_function);
    for(let l in posts[i].likes){
      if(posts[i].likes[l] == id){
        like.getElementsByClassName('title')[0].setAttribute("class",'title liked');
      }
    }

    let name = document.createElement('div');
    name.setAttribute('class','row');
    name.innerHTML = '<p class="title">Մասնակից՝ </p><p class="value">'+posts[i]._name+'</p>';

    let team = document.createElement('div');
    team.setAttribute('class','row');
    team.innerHTML = '<p class="title">Խմբային աշխատանքի դեպքում մյուս հեղինակների անունները` </p><p class="value">'+posts[i]._team+'</p>';

    let teacher = document.createElement('div');
    teacher.setAttribute('class','row');
    teacher.innerHTML = '<p class="title">Խորհրդատու ուսուցիչ՝ </p><p class="value">'+posts[i]._teacher+'</p>';

    let city = document.createElement('div');
    city.setAttribute('class','row');
    city.innerHTML = '<p class="title">Երկիր, մարզ, քաղաք, գյուղ՝ </p><p class="value">'+posts[i]._city+'</p>';

    let school = document.createElement('div');
    school.setAttribute('class','row');
    school.innerHTML = '<p class="title">Հաստատություն՝ </p><p class="value">'+posts[i]._school+'</p>';

    let _class = document.createElement('div');
    _class.setAttribute('class','row');
    _class.innerHTML = '<p class="title">Դպրոց, դասարան` </p><p class="value">'+posts[i]._class+'</p>';

    let descp = document.createElement('div');
    descp.setAttribute('class','row');
    descp.innerHTML = '<p class="title">Նկարագրություն` </p><p class="value">'+posts[i]._descp+'</p>';

    let urls = document.createElement('div');
    urls.setAttribute('class','row');
    let urlsHtml = '';
    let urlI = 1;
    let url = '';
    for(let j in posts[i]._urls){
      if(posts[i]){
        if(posts[i]._urls[j] != ','){
          url += posts[i]._urls[j];
        } else{
          i++;
          urlsHtml += '<a href="'+url+'">Հղում '+urlI+'</a>';
          urlI ++;
          url = '';
        }
      }
    }
    urlsHtml += '<a href="'+url+'">Հղում '+urlI+'</a>';
    urls.innerHTML = urlsHtml;

    post.appendChild(like);
    post.appendChild(name);
    post.appendChild(team);
    post.appendChild(teacher);
    post.appendChild(city);
    post.appendChild(school);
    post.appendChild(_class);
    post.appendChild(descp);
    post.appendChild(urls);

    document.getElementById('applications').appendChild(post);
  }
}

function like(e, post_id){
  if (e.target.parentElement.getAttribute('class') == 'title'){
    e.target.parentElement.setAttribute('class', 'title liked');
  } else{
    e.target.parentElement.setAttribute('class', 'title');
  }
  socket.emit('like', {id, post_id});
}
