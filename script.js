//console.log("teste");
lsUsuario = [];
function gravarUsuario(){
    //console.log("dentro da função gravar");
    id = document.getElementById("id").value;
    nome = document.getElementById("nome").value;
    statuss= document.getElementById("statuss").value;
    local= document.getElementById("local").value;
    previsto= document.getElementById("previsto").value;
    inicio= document.getElementById("inicio").value;
    fim= document.getElementById("fim").value;
    saida= document.getElementById("saida").value;
    url =`nome=${nome}&status=${status}&local=${local}&previsto=${previsto}&inicio=${inicio}&fim=${fim}&saida=${saida}`;
    if (nome.trim()== '') {
        alert('Erro no preenchimento do nome.');
        return;
    }
    if (email.trim()== '') {
        alert('Erro no preenchimento do e-mail.');
        return;
    }
    const xhttp = new XMLHttpRequest();
    if(id == ''){
        xhttp.open("POST", "http://localhost:8080/demo/add?"+url);
    }else{
        xhttp.open("PUT", `http://localhost:8080/demo/update/${id}?${url}`);
    }
    xhttp.send();
    xhttp.onload = function() {
        msg = this.responseText;
        alert(msg);
        atualizarTabela();
        if(msg.substring(0,2) == 'ok'){
            limparCampos();
        };
        
    }       
}

function limparCampos(){
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("statuss").value = "";
    document.getElementById("local").value = "";
    document.getElementById("previsto").value = "";
    document.getElementById("inicio").value = "";
    document.getElementById("fim").value = "";
    document.getElementById("saida").value; 
    }

function atualizarTabela() {
const xhttp = new XMLHttpRequest();
xhttp.open("GET", "http://localhost:8080/demo/all");
xhttp.send();
xhttp.onload = function() {
    lsUsuario = JSON.parse(this.responseText);
    carregarPagina(0);
    }
}
function carregarPagina(pg){
    qtPagina = (lsUsuario.length) / 5;
    if (qtPagina > 1){
        txtPaginas = `<li class="page-item" onclick='carregarPagina(0)'><a class="page-link" href="#">Início</a></li>`;
            for(i = 1; i<= qtPagina; i++){
                txtPaginas += `<li class="page-item" onclick='carregarPagina(${i - 1})'><a class="page-link" href="#">${i}</a></li>`;
            }

        txtPaginas += `<li class="page-item"onclick='carregarPagina(${qtPagina - 1})'><a class="page-link" href="#">Fim</a></li>`;
        document.getElementById("lsPagina").innerHTML = txtPaginas;
    }

    texto = "";
    pg = 7 * pg;
     for(i = pg; i <= pg; i++){
        u = lsUsuario[i];
        texto += `<tr onclick='carregarUsuario(${i})'><td>${u.id}</td><td>${u.nome}</td><td>${u.status}</td><td>${local}</td><td>${previsto}</td><td>${inicio}</td><td>${fim}</td><td>${saida}</td></tr>`;
    }
    document.getElementById("tbCorpo").innerHTML = texto;
}

function carregarUsuario(i){
//console.log(lsUsuario[i]);
u = lsUsuario[i];
    document.getElementById("id").value = u.id;
    document.getElementById("nome").value = u.nome;
    document.getElementById("statuss").value = u.status;
    document.getElementById("local").value = u.local;
    document.getElementById("previsto").value = u.previsto;
    document.getElementById("inicio").value = u.inicio;
    document.getElementById("fim").value = u.fim;
    document.getElementById("saida").value = u.saida; 

}
function apagarUsuario(){
    id = document.getElementById("id").value;
    if (id =='') {
        alert("Selecione um registro");
        return;
    }
    if (!confirm("Deseja Relamente apagar este registro?")){
        return;
    }       
              
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:8080/demo/delete/" + id);
    xhttp.send();
    xhttp.onload = function() {
        alert(this.responseText);
        atualizarTabela();
        limparCampos();
    }       
} 

