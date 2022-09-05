class produtos{

    constructor() {
    
        this.id=1
        this.arrayprodutos=[]
        this.edt= null
    }
    //todo processo se encadeia a partir do salvar 
    salvar(){
        let produto = this.lendovalres();

        if (this.verificandovalores(produto)){
            if(this.edt==null){
                this.adicionar(produto)
            }else{
                this.atualizar(this.edt , produto)
            }
        }       
        this.listatabela()
        this.cancelar()
    }

    //listar as informaçoes dentro da tr
    listatabela() {
        this.tbody =document.getElementById("tbody");
        tbody.innerText=""

        for(let i = 0 ;i< this.arrayprodutos.length;i++){
            let tr =tbody.insertRow();

            let td_id =  tr.insertCell()
            let td_nome = tr.insertCell()
            let td_valor= tr.insertCell()
            let td_acoes= tr.insertCell()

            td_id.innerText =this.arrayprodutos[i].id
            td_nome.innerText= this.arrayprodutos[i].valornome
            td_valor.innerText=this.arrayprodutos[i].valorpreco
            
            td_id.classList.add('center')//ajustando as entrads do id para o centro

            //icone de editar e suas funções
            let imgedit=document.createElement('img')
            imgedit.src="edit.png";
            imgedit.classList.add('img_css')
            imgedit.setAttribute('onclick','produto.editar('+ JSON.stringify(this.arrayprodutos[i])+')')//toda informção para ser editada é mandada em forma de string
            td_acoes.appendChild(imgedit)

            //icone de deletar e suas funções
            let imgdelete = document.createElement('img')
            imgdelete.src="delete.png"
            imgdelete.classList.add("img_css") 
            imgdelete.setAttribute('onclick',"produto.delete("+this.arrayprodutos[i].id+")")
            td_acoes.appendChild(imgdelete)
        }


    }
    //adicionar produtos na array
    adicionar(produto) {
        this.id++
        this.arrayprodutos.push(produto)
    }

    // mandar as informações da array depois de atualizada
    atualizar(id, produto){
        for(let i = 0 ;i< this.arrayprodutos.length;i++){
            if(this.arrayprodutos[i].id==id){
                this.arrayprodutos[i].valornome=produto.valornome
                this.arrayprodutos[i].valorpreco=produto.valorpreco
            }
        }
    }
    
    //cancelar apaga o input /reinicia o sistema 
    cancelar(){
        document.getElementById('nome').value=""
        document.getElementById('preco').value=""
        document.getElementById('buttonsalv').innerText='Salvar'
        this.edt= null
    }
    //verifica dentyros das ids para que seja deletada /icon delete
    delete(id){

        for(let i = 0 ;i< this.arrayprodutos.length;i++){
            if (this.arrayprodutos[i].id == id){
                this.arrayprodutos.splice(i, 1)
            }
        
        }
        this.listatabela()
    }
    //coloca os dados da tabela dentyro do input para ser editado 
    editar(dados){
        this.edt= dados.id
         document.getElementById('nome').value=dados.valornome
         document.getElementById('preco').value= dados.valorpreco,
         document.getElementById('buttonsalv').innerText="Atualizar"
        
    }

    //ler valores do input inicial
    lendovalres(){
        let produto ={}
        produto.id = this.id;
        produto.valornome = document.getElementById('nome').value
        produto.valorpreco = document.getElementById('preco').value
        return produto
    }

    //varifica se nenhum campo esta vazio
    verificandovalores(produto){
        let msg =''
        if(produto.valornome==''){
            msg +='-informe o nome \n'
        }
        if(produto.valorpreco==''){
            msg += '-informe o valor\n'
        }
        if(msg!=''){
            alert(msg)
            return false
        }
        return true                

    }
    
}
var produto = new produtos();
