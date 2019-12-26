var socket = io.connect(document.URL.split('/'));
function send() {
    let _name = document.getElementById('name').value;
    if(_name.length<3){
      document.getElementById('error').innerText = 'Մասնակցի անվան դաշտը սխալ է լրացված';
      return;
    }
    let _team = document.getElementById('team').value;
    let _teacher = document.getElementById('teacher').value;
    let _email = document.getElementById('email').value;
    if(_email.split('@')[0].length != 0){
      if(_email.split('@')[1]){
        if(_email.split('@')[1].split('.')[0].length != 0){
          if(_email.split('@')[1].split('.')[1]){
            if(_email.split('@')[1].split('.')[1].length >2 && _email.split('@')[1].split('.')[1].length < 5){
            }
            else{
              document.getElementById('error').innerText = 'Էլ․փոստի հասցեն սխալ է';
              return;
            }
          }
          else{
            document.getElementById('error').innerText = 'Էլ․փոստի հասցեն սխալ է';
            return;
          }
        }
        else{
          document.getElementById('error').innerText = 'Էլ․փոստի հասցեն սխալ է';
          return;
        }
      }
      else{
        document.getElementById('error').innerText = 'Էլ․փոստի հասցեն սխալ է';
        return;
      }
    } else{
      document.getElementById('error').innerText = 'Էլ․փոստի հասցեն սխալ է';
      return;
    }
    let _city = document.getElementById('city').value;
    let _school = document.getElementById('school').value;
    let _class = document.getElementById('class').value;
    let _descp = document.getElementById('descp').value;
    let _urls = document.getElementById('urls').value;
    if(_urls.length<12){
      document.getElementById('error').innerText = 'Հղումների դաշտը սխալ է լրացված';
      return;
    } else{
      if((_urls.split(' ').join('')) != _urls){
        document.getElementById('error').innerText = 'Հղումներն իրարից բաժանեք , ստորակետներով։ Ջնջեք ԲԱՑԱՏՆԵՐԸ։';
        return;
      }
    }

    document.getElementById('error').innerText = '';

    let id = '';
    var symbols = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    for (i = 0; i < 24; i++) {
        id += symbols[Math.round(Math.random() * symbols.length)];
    }

    let newData = {
        id, _name, _team, _teacher, _email, _city, _school, _class, _descp, _urls, 'likes': []
    };

    socket.emit('new',newData);
}
