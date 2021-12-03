<?php
	header ('Content-type: text/html; charset=utf-8');
	require_once('Connections/acesso_bd.php');		
	session_start();
	if(isset($_SESSION["logado"])){
		$query_Recordset1 = sprintf("SELECT * FROM clientes");
		$Recordset1 = mysqli_query($con,$query_Recordset1) or die(mysqli_error($con));
		$row_Recordset1 = mysqli_fetch_assoc($Recordset1);
		$totalRows_Recordset1 = mysqli_num_rows($Recordset1);
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
	<link rel="shortcut icon" href="img/favicon.ico">
    <link rel="stylesheet" href="style.css" />
    <title>Cadastro dos Clientes</title>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="css/justified-nav.css" rel="stylesheet">
    <link href="css/bootstrap-theme.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.0/css/jquery.dataTables.css" /> 
    <script src="js/jquery.js"></script>
    <script src="js/jquery.dataTables.js"></script>
    <script src="//cdn.datatables.net/plug-ins/28e7751dbec/sorting/date-uk.js"></script>
    <script> 
	$(document).ready(function(){
		/*$('#tabela').dataTable( {
        "aoColumns": [
            null,
            null,
            null,
            { "sType": "date-uk" } ,
            null             
        ]
    });*/
		$('#tabela').dataTable({
			"columnDefs": [
				{ type: 'date-uk', targets: [ 3 ],
                "visible": false,
                "searchable": false  }
			],
			"ordering": true,	
			"order": [[ 1, "asc" ]],
			"language": {
				"lengthMenu": "Exibir _MENU_ registros por página",
				"zeroRecords": "Nada encontrado - desculpe",
				"info": "Mostrando página _PAGE_ de _PAGES_",
				"infoEmpty": "Sem registros disponíveis",
				"infoFiltered": "(filtered from _MAX_ total records)",
				"search": "Busca",
				"oPaginate": {
					"sFirst": "Primeiro",
					"sPrevious": "Anterior",
					"sNext": "Próximo",
					"sLast": "Último"
				}
			}
		});
	});
    </script>
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
            <div style="font-size:20px; margin-top:70px;">
                Clientes
            </div>        
        </div>
<?php
    if ($totalRows_Recordset1 > 0){
		mysqli_data_seek($Recordset1, '0');
		echo "<table id='tabela' > 
		<thead>
		<tr>
		<th width='50' style='font-weight:bold'> CPF </th>
		<th width='250' style='font-weight:bold'> Nome </th>
		<th width='250' style='font-weight:bold'> Data Nasc </th>
		<th width='100' style='font-weight:bold'> </th>
		<th width='35' style='font-weight:bold'>  </th>
		</tr>
		</thead> <tbody>";
    } else {
    	echo "Nenhum dado a ser mostrado no momento.";	
    }
    while($linha = mysqli_fetch_array($Recordset1)){
		$codigo = $linha['cpf'];	
		$data_nasc = substr($linha['data_nasc'],8,2)."/".substr($linha['data_nasc'],5,2)."/".substr($linha['data_nasc'],0,4) ;
		$cpf = substr($linha['cpf'],0,3).".".substr($linha['cpf'],3,3).".".substr($linha['cpf'],6,3)."-".substr($linha['cpf'],9,2);
		echo "<tr> <td align='left'> <a href='visualizar_cliente.php?cod=".base64_encode($codigo)."'>";
		echo $cpf."</a></td>";
		echo "<td> ";
		echo $linha['nome']."</td>";
		echo "<td align='center'>";
		echo $data_nasc."</td>";
		echo "<td>";
		echo "</td>";
		echo "<td>";
		echo "</td> </tr>";
		}
		echo "</table>";
    //echo "$row_Recordset1['SOL_PROTOCOLO'];";
?>
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