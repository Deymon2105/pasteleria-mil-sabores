// Registro/login en localStorage
function getUsers(){
  return JSON.parse(localStorage.getItem('users')||'[]');
}
function setUsers(users){
  localStorage.setItem('users', JSON.stringify(users));
}

document.addEventListener('DOMContentLoaded', ()=>{
 //si el usuario esta vacio
  if(getUsers().length===0){
    setUsers(AppData.users);
  }

  const regBtn = document.getElementById('register-btn');
  if(regBtn){
    regBtn.addEventListener('click', ()=>{
      const name = $('#reg-name').value.trim();
      const email = $('#reg-email').value.trim();
      const birthdate = $('#reg-birthdate').value;
      const pass = $('#reg-pass').value;
      if(!name || !email || !birthdate || !pass){ alert('Completa todos los campos'); return; }
      const users = getUsers();
      if(users.some(u=>u.email===email)){ alert('Email ya registrado'); return; }
      users.push({name,email,role:'user',birthdate,benefits:[]});
      setUsers(users);
      alert('Registro exitoso, ahora ingresa');
      location.href = 'login.html';
    });
  }

  const loginBtn = document.getElementById('login-btn');
  if(loginBtn){
    loginBtn.addEventListener('click', ()=>{
      const email = $('#login-email').value.trim();
      const pass = $('#login-pass').value; // no validación real de pass en demo
      const users = getUsers();
      const user = users.find(u=>u.email===email);
      if(!user){ alert('Usuario no encontrado'); return; }
      localStorage.setItem('sessionUser', JSON.stringify(user));
      location.href = 'profile.html';
    });
  }
});
