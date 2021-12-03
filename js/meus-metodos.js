jQuery.validator.addMethod("escolaridade", function(value, element) {
	value = jQuery.trim(value);
	if (value == 0){
		return false;
	} else {
		return true;	
	}
});

jQuery.validator.addMethod("CPF", function(value, element) {
    value = jQuery.trim(value);
	value = value.replace('.','');
	value = value.replace('.','');
	cpf = value.replace('-','');
	while(cpf.length < 11) cpf = "0"+ cpf;
	var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
	var a = [];
	var b = new Number;
	var c = 11;
	for (i=0; i<11; i++){
		a[i] = cpf.charAt(i);
		if (i < 9) b += (a[i] * --c);
	}
	if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
	b = 0;
	c = 11;
	for (y=0; y<10; y++) b += (a[y] * c--);
	if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
	
	var retorno = true;
	if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) {
		retorno = false;
		document.getElementById("CPF").focus();
	}
	document.getElementById("button1id").disabled=false;
	return this.optional(element) || retorno;

}); // Mensagem padrÃ£o 

jQuery.validator.addMethod("dateBR", function(value, element) {
	 //contando chars
	if((value.length>=1) && (value.length<=9)){ 
		document.getElementById("DataNasc").focus();
		return false;
	}
	//pega data atual
	var now = new Date();
	var Nowdia     = now.getDate();           // 1-31
	if (Nowdia<10) Nowdia="0"+Nowdia;
	var Nowmes     = now.getMonth();          // 0-11 (zero=janeiro)
	Nowmes+=1;
	if (Nowmes<10){
		Nowmes="0"+Nowmes;
	}
	var Nowano4    = now.getFullYear();       // 4 dígitos
	var str_data = Nowdia + '/' + (Nowmes) + '/' + Nowano4;

	// verificando data
	var data 		= value;
	var dia 		= data.substr(0,2);
	var barra1		= data.substr(2,1);
	var mes 		= data.substr(3,2);
	var barra2		= data.substr(5,1);
	var ano 		= data.substr(6,4);
	
	var nova_data1 = parseInt(str_data.split("/")[2].toString() + str_data.split("/")[1].toString() + str_data.split("/")[0].toString());
	var nova_data2 = parseInt(data.split("/")[2].toString() + data.split("/")[1].toString() + data.split("/")[0].toString());


	if (nova_data2 > nova_data1){
		document.getElementById("DataNasc").focus();
		return false; 
	}
	
	
	if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12) {
		document.getElementById("DataNasc").focus();
		return false;
	}
	if((mes==4||mes==6||mes==9||mes==11) && dia==31) {
		document.getElementById("DataNasc").focus();
		return false;
	}
	if(mes==2  &&  (dia>29||(dia==29 && ano%4!=0))){
		document.getElementById("DataNasc").focus();
		return false;
	}
	if(ano < 1900) {
		document.getElementById("DataNasc").focus();
		return false;
	}
	return true;
}, "Informe uma data vÃ¡lida");  // Mensagem padrÃ£o  

jQuery.validator.addMethod("dateTimeBR", function(value, element) {
	 //contando chars
	if(value.length!=16) return false;
	 // dividindo data e hora
	if(value.substr(10,1)!=' ') return false; // verificando se hÃ¡ espaÃ§o
	var arrOpcoes = value.split(' ');
	if(arrOpcoes.length!=2) return false; // verificando a divisÃ£o de data e hora
	// verificando data
	var data 		= arrOpcoes[0];
	var dia 		= data.substr(0,2);
	var barra1		= data.substr(2,1);
	var mes 		= data.substr(3,2);
	var barra2		= data.substr(5,1);
	var ano 		= data.substr(6,4);
	if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12)return false;
	if ((mes==4||mes==6||mes==9||mes==11) && dia==31)return false;
	if (mes==2  &&  (dia>29||(dia==29 && ano%4!=0)))return false;
	// verificando hora
	var horario 	= arrOpcoes[1];
	var	hora 		= horario.substr(0,2);
	var doispontos 	= horario.substr(2,1);
	var minuto 		= horario.substr(3,2);
	if(horario.length!=5||isNaN(hora)||isNaN(minuto)||hora>23||minuto>59||doispontos!=":")return false;
	return true;
}, "Informe uma data e uma hora vÃ¡lida");	



/*
 *
 * NOVO METODO PARA O JQUERY VALIDATE
 * VALIDA CNPJ COM 14 OU 15 DIGITOS
 * A VALIDAÃ‡ÃƒO Ã‰ FEITA COM OU SEM OS CARACTERES SEPARADORES, PONTO, HIFEN, BARRA
 *
 * ESTE MÃ‰TODO FOI ADAPTADO POR:
 * 
 * Shiguenori Suguiura Junior <junior@dothcom.net>
 * 
 * http://blog.shiguenori.com
 * http://www.dothcom.net
 * 
 */
jQuery.validator.addMethod("CNPJ", function(cnpj, element) {

   cnpj = jQuery.trim(cnpj);
	// DEIXA APENAS OS NÃšMEROS
   cnpj = cnpj.replace('/','');
   cnpj = cnpj.replace('.','');
   cnpj = cnpj.replace('.','');
   cnpj = cnpj.replace('-','');

   var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
   digitos_iguais = 1;

   if (cnpj.length < 14 && cnpj.length < 15){
	   document.getElementById("CNPJ").focus();
      return this.optional(element) || false;

   }
   for (i = 0; i < cnpj.length - 1; i++){
      if (cnpj.charAt(i) != cnpj.charAt(i + 1)){
         digitos_iguais = 0;
         break;
      }
   }

   if (!digitos_iguais){
      tamanho = cnpj.length - 2
      numeros = cnpj.substring(0,tamanho);
      digitos = cnpj.substring(tamanho);
      soma = 0;
      pos = tamanho - 7;

      for (i = tamanho; i >= 1; i--){
         soma += numeros.charAt(tamanho - i) * pos--;
         if (pos < 2){
            pos = 9;
         }
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0)){
		  document.getElementById("CNPJ").focus();
         return this.optional(element) || false;
      }
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0,tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--){
         soma += numeros.charAt(tamanho - i) * pos--;
         if (pos < 2){
            pos = 9;
         }
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	  
      if (resultado != digitos.charAt(1)){
		  document.getElementById("CNPJ").focus();
         return this.optional(element) || false;
      }
      return this.optional(element) || true;
   }else{
	   document.getElementById("CNPJ").focus();
      return this.optional(element) || false;
   }
}, "Informe um CNPJ vÃ¡lido."); // Mensagem padrÃ£o 

jQuery.validator.addMethod("notEqual", function(value, element, param) {
   return value == $(param).val() ? false : true;
}, "Este valor nÃ£o pode ser igual"); // Mensagem padrÃ£o 

jQuery.validator.addMethod("diferenteDe", function(value, element, strCompara) {
   return value == strCompara ? false : true;
}, "Este valor nÃ£o foi alterado"); // Mensagem padrÃ£o 

jQuery.validator.addMethod("maiorQue", function(value, element, param) {
   return value <= $(param).val() ? false : true;
}, "Este valor precisa ser maior"); // Mensagem padrÃ£o 

jQuery.validator.addMethod("menorQue", function(value, element, param) {
   return value >= $(param).val() ? false : true;
}, "Este valor precisa ser menor"); // Mensagem padrÃ£o 


//** mascara cep
jQuery( function($){
	$("#cep").mask("99999-999");	
	$("#data").mask("99/99/9999");
});
//fim mascara cep **//

jQuery( function($){
	$("#CPF").mask("999.999.999-99");	
});

jQuery( function($){
	$("#CNPJ").mask("99.999.999/9999-99");
});	


/*
jQuery.validator.addMethod("setor", function(value, element) {
	
	if ($("#setor").value = -1){
		alert('123');
	}
	return this.optional(element) || retorno;
}); // Mensagem padrÃ£o 

*/
function mascaraTelefone(campo) {
	
	function trata( valor,  isOnBlur ) {
		
		valor = valor.replace(/\D/g,"");
		valor = valor.replace(/^(\d{2})(\d)/g,"($1)$2");
		
		if( isOnBlur ) {
			
			valor = valor.replace(/(\d)(\d{4})$/,"$1-$2");
		} else {
	
			valor = valor.replace(/(\d)(\d{3})$/,"$1-$2");
		}
		return valor;
	}
	
	campo.onkeypress = function (evt) {
		 
		var code = (window.event)? window.event.keyCode : evt.which;
		var valor = this.value
		
		if(code > 57 || (code < 48 && code != 8 ))  {
			return false;
		} else {
			this.value = trata(valor, false);
		}
	}
	
	campo.onblur = function() {
		
		var valor = this.value;
		if( valor.length < 13 ) {
			this.value = ""
		}else {
			var ddd = valor.substr(1, 2)
			if (ddd < 11){
				this.value = ""
			}
			this.value = trata( this.value, true );
		}
	}
	
	campo.maxLength = 14;
	}	
	
	function ajax(p) {	
		if(typeof p.url!=="string")//se nao for string retorna
			return;
		var url = p.url;
		var tipo = p.tipo || "GET"; //se nao for informado usa o padrao GET
		var param = p.parametros || null; // se nao for informado não sera utilizado
		var a = p.assincrona || true; // se nao for informado padrao TRUE
		var espera = p.espera;
		var sucesso = p.sucesso;
		var erro = p.erro;
		
		var req;
		// Verificar o Browser
		// Firefox, Google Chrome, Safari e outros
		if (window.XMLHttpRequest) {
			req = new XMLHttpRequest();
		}
		// Internet Explorer
		else if (window.ActiveXObject) {
			req = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		req.open(tipo, p.url, a);
	
		// Quando o objeto recebe o retorno, chamamos a seguinte função;
		req.onreadystatechange = function() {
	
			// enquanto carrega
			if (req.readyState == 1&& espera) {
				espera();
			}
			// Verifica se o Ajax realizou todas as operações corretamente
			if (req.readyState == 4 && req.status == 200) {
				// Resposta retornada pelo ajax
				respostaAjax = "";
				respostaAjax = req.responseText;
				if(sucesso)
					sucesso();
			}
			if(req.readyState == 4 && req.status == 404 && erro)
				erro();
		};
		req.send(param);
	}
	
	function buscaCidades(campo, resultado, cadastro) {
		if(cadastro === undefined) cadastro = true;
		
		if(campo.value!=''){
			var url = cadastro ? 'listamunicipio.ajax.php?UF='+campo.value :'listamunicipio.ajax.php?UF='+campo.value;
			
			ajax({
				url:url,
				espera: function(){
					document.getElementById(resultado).innerHTML = '<select style="width:150px;"><option/></select>';
				},
				sucesso: function() {
					document.getElementById(resultado).innerHTML = respostaAjax;
				},
				erro: function() {
					ajax({
						url:'../'+url,
						espera: function(){
							document.getElementById(resultado).innerHTML = '<select style="width:150px;"><option/></select>';
						},
						sucesso: function() {
							document.getElementById(resultado).innerHTML = respostaAjax;
						}
					});
				}
			});
		}else{
			document.getElementById(resultado).innerHTML = '<select style="width:150px;"><option/></select>';
		}
	}
	
	/**
  * Função para criar um objeto XMLHTTPRequest
  */
 function CriaRequest() {
	 try{
		 request = new XMLHttpRequest();        
	 }catch (IEAtual){
		 
		 try{
			 request = new ActiveXObject("Msxml2.XMLHTTP");       
		 }catch(IEAntigo){
		 
			 try{
				 request = new ActiveXObject("Microsoft.XMLHTTP");          
			 }catch(falha){
				 request = false;
			 }
		 }
	 }

	 if (!request)
		 alert("Seu Navegador não suporta Ajax!");
	 else
		 return request;
 }
 
 /**
  * Função para enviar os dados
  */
 function getDados() {
	 // Declaração de Variáveis
	 var nome   = document.getElementById("CPF").value;
	 var result = document.getElementById("Resultado");
	 var xmlreq = CriaRequest();
	 
	 // Exibi a imagem de progresso
	// result.innerHTML = '<img src="Progresso1.gif"/>';
	 
	 // Iniciar uma requisição
	 xmlreq.open("GET", "teste.ajax.php?CPF=" + nome, true);
	 
	 // Atribui uma função para ser executada sempre que houver uma mudança de ado
	 xmlreq.onreadystatechange = function(){
		 
		 // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
		 if (xmlreq.readyState == 4) {
			 
			 // Verifica se o arquivo foi encontrado com sucesso
			 if (xmlreq.status == 200) {
				 result.innerHTML = xmlreq.responseText;
			 }else{
				 result.innerHTML = "Erro: " + xmlreq.statusText;
			 }
		 }
	 };
	 xmlreq.send(null);
 }
 
 function getDados3() {
	 // Declaração de Variáveis
	 var nome   = document.getElementById("CPF").value;
	 var result = document.getElementById("Resultado");
	 var xmlreq = CriaRequest();
	 
	 // Exibi a imagem de progresso
	// result.innerHTML = '<img src="Progresso1.gif"/>';
	 
	 // Iniciar uma requisição
	 xmlreq.open("GET", "teste3.ajax.php?CPF=" + nome, true);
	 
	 // Atribui uma função para ser executada sempre que houver uma mudança de ado
	 xmlreq.onreadystatechange = function(){
		 
		 // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
		 if (xmlreq.readyState == 4) {
			 
			 // Verifica se o arquivo foi encontrado com sucesso
			 if (xmlreq.status == 200) {
				 result.innerHTML = xmlreq.responseText;
			 }else{
				 result.innerHTML = "Erro: " + xmlreq.statusText;
			 }
		 }
	 };
	 xmlreq.send(null);
 }
 
  function getDadosMed() {
	 // Declaração de Variáveis
	 var nome   = document.getElementById("crm_med").value;
	 var result = document.getElementById("Resultado");
	 var xmlreq = CriaRequest();

	 // Exibi a imagem de progresso
	// result.innerHTML = '<img src="Progresso1.gif"/>';
	 
	 // Iniciar uma requisição
	 xmlreq.open("GET", "teste2.ajax.php?crm=" + nome, true);
	 
	 // Atribui uma função para ser executada sempre que houver uma mudança de ado
	 xmlreq.onreadystatechange = function(){
		 
		 // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
		 if (xmlreq.readyState == 4) {
			 
			 // Verifica se o arquivo foi encontrado com sucesso
			 if (xmlreq.status == 200) {
				 result.innerHTML = xmlreq.responseText;
			 }else{
				 result.innerHTML = "Erro: " + xmlreq.statusText;
			 }
		 }
	 };
	 xmlreq.send(null);	 
 }
 function getDadosMed2() {
	 // Declaração de Variáveis
	 var nome   = document.getElementById("crm_med").value;
	 var result = document.getElementById("Resultado2");
	 var xmlreq = CriaRequest();

	 // Exibi a imagem de progresso
	// result.innerHTML = '<img src="Progresso1.gif"/>';
	 
	 // Iniciar uma requisição
	 xmlreq.open("GET", "teste2.ajax.php?crm=" + nome, true);
	 
	 // Atribui uma função para ser executada sempre que houver uma mudança de ado
	 xmlreq.onreadystatechange = function(){
		 
		 // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
		 if (xmlreq.readyState == 4) {
			 
			 // Verifica se o arquivo foi encontrado com sucesso
			 if (xmlreq.status == 200) {
				 result.innerHTML = xmlreq.responseText;
			 }else{
				 result.innerHTML = "Erro: " + xmlreq.statusText;
			 }
		 }
	 };
	 xmlreq.send(null);	 
 }
 function getDadosMedSec() {
	 // Declaração de Variáveis
	 var nome   = document.getElementById("crm_med_sec").value;
	 var result = document.getElementById("Resultado_Sec");
	 var xmlreq = CriaRequest();

	 // Exibi a imagem de progresso
	// result.innerHTML = '<img src="Progresso1.gif"/>';
	 
	 // Iniciar uma requisição
	 xmlreq.open("GET", "teste2_sec.ajax.php?crm=" + nome, true);
	 
	 // Atribui uma função para ser executada sempre que houver uma mudança de ado
	 xmlreq.onreadystatechange = function(){
		 
		 // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
		 if (xmlreq.readyState == 4) {
			 
			 // Verifica se o arquivo foi encontrado com sucesso
			 if (xmlreq.status == 200) {
				 result.innerHTML = xmlreq.responseText;
			 }else{
				 result.innerHTML = "Erro: " + xmlreq.statusText;
			 }
		 }
	 };
	 xmlreq.send(null);	 
 }
 function getDadosMedTerc() {
	 // Declaração de Variáveis
	 var nome   = document.getElementById("crm_med_terc").value;
	 var result = document.getElementById("Resultado_Terc");
	 var xmlreq = CriaRequest();

	 // Exibi a imagem de progresso
	// result.innerHTML = '<img src="Progresso1.gif"/>';
	 
	 // Iniciar uma requisição
	 xmlreq.open("GET", "teste2_terc.ajax.php?crm=" + nome, true);
	 
	 // Atribui uma função para ser executada sempre que houver uma mudança de ado
	 xmlreq.onreadystatechange = function(){
		 
		 // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
		 if (xmlreq.readyState == 4) {
			 
			 // Verifica se o arquivo foi encontrado com sucesso
			 if (xmlreq.status == 200) {
				 result.innerHTML = xmlreq.responseText;
			 }else{
				 result.innerHTML = "Erro: " + xmlreq.statusText;
			 }
		 }
	 };
	 xmlreq.send(null);	 
 }
 function NumbersOnly(e){//mascara somente numeros, libera copiar e colar
	var aKey;
	
	if (window.event)
		aKey = e.keyCode;
	else 
		aKey = e.which;
	
	//if das teclas precionadas
	if(!(((aKey==67)&&(e.ctrlKey))||((aKey==86)&&(e.ctrlKey))||(aKey==8)||(aKey==9)||(aKey==13)||(aKey==16)||(aKey==17)||(aKey==92)
	||((aKey>=96)&&(aKey<=105))||((aKey>=48)&&(aKey<=57))||((aKey>=37)&&(aKey<=40))||((aKey>=112)&&(aKey<=123)&&(aKey<=190)&&(aKey<=194)&&(aKey<=110)&&(aKey<=188))))
	{		  
		return false;	
	}
}

function buscaCid(campo, resultado, cadastro) {
	if(cadastro === undefined) cadastro = true;
	
	if(campo.value!=''){		
		
		var sexo = document.getElementById('sexo').value.substr(0, 1);
		var url = cadastro ? 'listaCid.ajax.php?id='+campo.value+'|'+sexo :'listaCid.ajax.php?id='+campo.value+'|'+sexo;
		ajax({
			url:url,
			espera: function(){
				document.getElementById(resultado).innerHTML = '<select style="width:150px;"><option/></select>';
			},
			sucesso: function() {
				document.getElementById(resultado).innerHTML = respostaAjax;
			},
			erro: function() {
				ajax({
					url:'../'+url,
					espera: function(){
						document.getElementById(resultado).innerHTML = '<select style="width:150px;"><option/></select>';
					},
					sucesso: function() {
						document.getElementById(resultado).innerHTML = respostaAjax;
					}
				});
			}
		});
	}else{
		document.getElementById(resultado).innerHTML = '<select style="width:150px;"><option/></select>';
	}
}

function buscaSetor(campo, resultado, cadastro) {
	if(cadastro === undefined) cadastro = true;
	
	if(campo.value!=''){		
		var url = cadastro ? 'listaSetor.ajax.php?id='+campo.value :'listaSetor.ajax.php?id='+campo.value;
		ajax({
			url:url,
			espera: function(){
				document.getElementById(resultado).innerHTML = '<select style="width:150px;"><option/></select>';
			},
			sucesso: function() {
				document.getElementById(resultado).innerHTML = respostaAjax;
			},
			erro: function() {
				ajax({
					url:'../'+url,
					espera: function(){
						document.getElementById(resultado).innerHTML = '<select style="width:150px;"><option/></select>';
					},
					sucesso: function() {
						document.getElementById(resultado).innerHTML = respostaAjax;
					}
				});
			}
		});
	}else{
		document.getElementById(resultado).innerHTML = '<select style="width:150px;"><option/></select>';
	}
}

function buscaCidRel(campo, resultado, cadastro) {
	if(cadastro === undefined) cadastro = true;
	
	if(campo.value!=''){		

		var sexo = document.getElementById('sexo').value.substr(0, 1);
		var url = cadastro ? 'listaCidRel.ajax.php?id='+campo.value+'|'+sexo :'listaCidRel.ajax.php?id='+campo.value+'|'+sexo;
		ajax({
			url:url,
			espera: function(){
				document.getElementById(resultado).innerHTML = '<select style="width:150px;"><option/></select>';
			},
			sucesso: function() {
				document.getElementById(resultado).innerHTML = respostaAjax;
			},
			erro: function() {
				ajax({
					url:'../'+url,
					espera: function(){
						document.getElementById(resultado).innerHTML = '<select style="width:150px;"><option/></select>';
					},
					sucesso: function() {
						document.getElementById(resultado).innerHTML = respostaAjax;
					}
				});
			}
		});
	}else{
		document.getElementById(resultado).innerHTML = '<select style="width:150px;"><option/></select>';
	}
}
	
	function getDados2() {
	 
	 // Declaração de Variáveis
	 var nome   = document.getElementById("CPF").value;
	 var result = document.getElementById("Resultado");
	 var xmlreq = CriaRequest();
	 
	 // Exibi a imagem de progresso
	// result.innerHTML = '<img src="Progresso1.gif"/>';
	 
	 // Iniciar uma requisição
	 xmlreq.open("GET", "teste_adm.ajax.php?CPF=" + nome, true);
	 
	 // Atribui uma função para ser executada sempre que houver uma mudança de ado
	 xmlreq.onreadystatechange = function(){
		 
		 // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
		 if (xmlreq.readyState == 4) {
			 
			 // Verifica se o arquivo foi encontrado com sucesso
			 if (xmlreq.status == 200) {
				 result.innerHTML = xmlreq.responseText;
			 }else{
				 result.innerHTML = "Erro: " + xmlreq.statusText;
			 }
		 }
	 };
	 xmlreq.send(null);
 }
 
 function getDadosDem() {
	 
	 // Declaração de Variáveis
	 var nome   = document.getElementById("CPF").value;
	 var result = document.getElementById("Resultado");
	 var xmlreq = CriaRequest();
	 
	 // Exibi a imagem de progresso
	// result.innerHTML = '<img src="Progresso1.gif"/>';
	 
	 // Iniciar uma requisição
	 xmlreq.open("GET", "teste_dem.ajax.php?CPF=" + nome, true);
	 
	 // Atribui uma função para ser executada sempre que houver uma mudança de ado
	 xmlreq.onreadystatechange = function(){
		 
		 // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
		 if (xmlreq.readyState == 4) {
			 
			 // Verifica se o arquivo foi encontrado com sucesso
			 if (xmlreq.status == 200) {
				 result.innerHTML = xmlreq.responseText;
			 }else{
				 result.innerHTML = "Erro: " + xmlreq.statusText;
			 }
		 }
	 };
	 xmlreq.send(null);
 }