<?php
	header ('Content-type: text/html; charset=utf-8');
	require_once('Connections/acesso_bd.php');
	session_start();
	if(isset($_SESSION["logado"])){
	$cpf = base64_decode($_GET['cod']);

	
	$sql_consulta = mysqli_query($con," SELECT * FROM clientes c INNER JOIN cliente_plano cp ON c.cpf = cp.cpf INNER JOIN planos p ON p.cod = cp.cod_plano WHERE c.cpf = '$cpf'") or die(mysqli_error($con));
	$query=mysqli_fetch_array($sql_consulta);
	if (!mysqli_num_rows($sql_consulta)){
		echo "<meta http-equiv='refresh' content='0; URL= principal.php'> <meta charset='utf-8'>
				<script type=\"text/javascript\"> 
					alert(\"Cliente não encontrado!\"); 
				</script>";
	}
?>
<?php
if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysqli_escape_string") ? mysqli_escape_string(dbconnect(),$theValue) : mysqli_escape_string(dbconnect(),$theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}
}

$editFormAction = $_SERVER['PHP_SELF'];
if (isset($_SERVER['QUERY_STRING'])) {
  $editFormAction .= "?" . htmlentities($_SERVER['QUERY_STRING']);
}

if ((isset($_POST["MM_insert"])) && ($_POST["MM_insert"] == "cadsecao")) {

}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
	<link rel="shortcut icon" href="img/favicon.ico">
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.12.0/jquery.validate.min.js"></script>
    <script type="text/javascript" src="http://igorescobar.github.io/jQuery-Mask-Plugin/js/jquery.mask.min.js"></script>
    <script type="text/javascript">	
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
		}	//fim mascara tel
	//** regras de validacao
		$(document).ready(function(){
			$('#cadsecao').validate({
			rules:{
				secao: {
					required: true
				},
				ordem: {
					required: true
				}
			},
			messages:{
				secao:{
					required: 'Campo obrigatório.'
				},
				ordem:{
					required: 'Campo obrigatório'
				}
			}
			});		
		});
	// fim regras de validacao **//
	</script>
    <title>Clientes - Unimed</title>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="css/justified-nav.css" rel="stylesheet">
    <link href="css/bootstrap-theme.min.css" rel="stylesheet">
    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body role="document">
     <!-- Fixed navbar -->
    <div class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand"><span style="color:#00ADEF">Unimed</span></a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="index.php">Home</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>

    <div class="container">
        <div class="page-header">
            <div style="font-size:20px;  margin-top:70px;">
                Clientes
            </div>        
        </div>
        <form action="<?php echo $editFormAction; ?>" method="POST" name="cli" class="form-horizontal" id="cli" >
            <fieldset>
            	<!-- Text input-->
                <div class="form-group">
                    <label class="col-md-2 control-label" for="Nome">Plano:</label>   
                    <div class="col-md-2">
                    	<input id="cart" name="cart" type="text"  class="form-control input-md" value="<?php echo $query['descricao'];?>" disabled>    
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-2 control-label" for="Nome">Carteira:</label>   
                    <div class="col-md-2">
                    	<input id="cart" name="cart" type="text"  class="form-control input-md" value="<?php echo $query['numero_carteira'];?>" disabled>    
                    </div>
                </div>               
                
                <div class="form-group">
                    <label class="col-md-2 control-label" for="Nome">CPF:</label>   
                    <div class="col-md-2">
                    	<input id="cpf" name="cpf" type="text"  class="form-control input-md" value="<?php echo $query['cpf'];?>" disabled>    
                    </div>
                </div>
                
                <!-- Text input-->
                <div class="form-group">
                    <label class="col-md-2 control-label" for="Nome">Nome:</label>   
                    <div class="col-md-5">
                    	<input id="nome" name="nome" type="text"  style="text-transform:uppercase" class="form-control input-md" value="<?php echo utf8_encode($query['nome']);?>" disabled>    
                    </div>
                </div>
                <div class="form-group">
                  <label class="col-md-2 control-label">Endereço</label>   
                  <div class="col-md-5">
                  <input id="endereco" name="endereco" type="text" value="<?php echo utf8_encode($query['endereco']);?>" class="form-control input-md" disabled>    
                  </div>
                </div>
                <!-- Text input-->
                <div class="form-group">
                    <label class="col-md-2 control-label" for="Nome">Data Nasc.:</label>   
                    <div class="col-md-2">
                    	<input id="data" name="data" type="date" class="form-control" MAXLENGTH="14" value="<?php echo ($query['data_nasc']);?>" disabled>    
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="col-md-2 control-label" for="Nome">Nome da Mãe:</label>   
                    <div class="col-md-5">
                    	<input id="nome_mae" name="nome_mae" type="text" class="form-control" MAXLENGTH="14" value="<?php echo utf8_encode($query['nome_mae']);?>" disabled>    
                    </div>
                </div>
                
                <?php 
					$sql_exa = mysqli_query($con, "SELECT e.descricao, c.data FROM cliente_exame c inner join exames e ON c.cod_exame = e.cod WHERE c.cpf = '$cpf'");
				?>
                <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col" width="5%">Exame</th>
                                    <th scope="col" width="15%">Data Exame</th>                                  
                                </tr>
                            </thead>	
                            <tbody>
                            <?php while($query_exa=mysqli_fetch_array($sql_exa)){ ?>
                                <tr>                                              
                                    <td><?php echo $query_exa['descricao']?></td>                      
                                    <td><?php echo substr($query_exa['data'],8,2)."/".substr($query_exa['data'],5,2)."/".substr($query_exa['data'],0,4)." ".substr($query_exa['data'],10,9);?></td>
                                </tr>
                                <?php } ?>
                            </tbody>
                            </table>
                
            </fieldset>
            <input type="hidden" name="MM_insert" value="cadsecao">
        </form>
	</div> <!-- /container -->
    <!-- Bootstrap core JavaScript -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
  </body>
</html>
<?php
	} else {
		print("<script language=JavaScript>alert('Sem permissão de acesso!');parent.location='login.php';</script>");
	}
?>