$(document).ready(function(){
$('.flexme1').flexigrid();
            $('.flexme2').flexigrid({
                height : 'auto',
                striped : false
            });

            $(".flexme3").flexigrid({
                url : 'post-xml.php',
                dataType : 'xml',
                colModel : [ {
                    display : 'ISO',
                    name : 'iso',
                    width : 40,
                    sortable : true,
                    align : 'center'
                    }, {
                        display : 'Name',
                        name : 'name',
                        width : 180,
                        sortable : true,
                        align : 'left'
                    }, {
                        display : 'Printable Name',
                        name : 'printable_name',
                        width : 120,
                        sortable : true,
                        align : 'left'
                    }, {
                        display : 'ISO3',
                        name : 'iso3',
                        width : 130,
                        sortable : true,
                        align : 'left',
                        hide : true
                    }, {
                        display : 'Number Code',
                        name : 'numcode',
                        width : 80,
                        sortable : true,
                        align : 'right'
                } ],
                buttons : [ {
                    name : 'Add',
                    bclass : 'add',
                    onpress : test
                    }, {
                        name : 'Delete',
                        bclass : 'delete',
                        onpress : test
                    }, {
                        separator : true
                } ],
                searchitems : [ {
                    display : 'ISO',
                    name : 'iso'
                    }, {
                        display : 'Name',
                        name : 'name',
                        isdefault : true
                } ],
                sortname : "iso",
                sortorder : "asc",
                usepager : true,
                title : 'Countries',
                useRp : true,
                rp : 15,
                showTableToggleBtn : true,
                width : 700,
                height : 200
            });      

            function test(com, grid) {
                if (com == 'Delete') {
                    confirm('Delete ' + $('.trSelected', grid).length + ' items?')
                } else if (com == 'Add') {
                    alert('Add New Item');
                }
            }

            $(".flexme4").flexigrid({
                url : 'example4.php',
                dataType : 'json',
                colModel : [ {
                    display : 'Protocolo',
                    name : 'protocolo',
                    width : 250,
                    sortable : true,
                    align : 'center'
                    }, {
                        display : 'Situação',
                        name : 'situacao',
                        width : 350,
                        sortable : true,
                        align : 'left'
                    }, {
                        display : 'Setor',
                        name : 'setor',
                        width : 120,
                        sortable : true,
                        align : 'left'
                    }, {
                        display : 'Data Abertura',
                        name : 'data_abertura',
                        width : 150,
                        sortable : true,
                        align : 'left'
                },
				{
                        display : 'Data Prazo',
                        name : 'data_prazo',
                        width : 150,
                        sortable : true,
                        align : 'left'
                },
				{
                        display : 'Tipo',
                        name : 'tipo',
                        width : 110,
                        sortable : true,
                        align : 'left'
                }],
                searchitems : [ {
                    display : 'Protocolo',
                    name : 'protocolo'
                    } ],
                sortname : "iso",
                sortorder : "asc",
                usepager : true,
                title : 'Employees',
                useRp : true,
                rp : 15,
                showTableToggleBtn : true,
                width : 1140,
                height : 300
            });

            function Example4(com, grid) {
                if (com == 'Delete') {
                    var conf = confirm('Delete ' + $('.trSelected', grid).length + ' items?')
                    if(conf){
                        $.each($('.trSelected', grid),
                            function(key, value){
                                $.get('example4.php', { Delete: value.firstChild.innerText}
                                    , function(){
                                        // when ajax returns (callback), update the grid to refresh the data
                                        $(".flexme4").flexReload();
                                });
                        });    
                    }
                }
                else if (com == 'Edit') {
                    var conf = confirm('Edit ' + $('.trSelected', grid).length + ' items?')
                    if(conf){
                        $.each($('.trSelected', grid),
                            function(key, value){
                                // collect the data
                                var OrgEmpID = value.children[0].innerText; // in case we're changing the key
                                var EmpID = prompt("Please enter the New Employee ID",value.children[0].innerText);
                                var Name = prompt("Please enter the Employee Name",value.children[1].innerText);
                                var PrimaryLanguage = prompt("Please enter the Employee's Primary Language",value.children[2].innerText);
                                var FavoriteColor = prompt("Please enter the Employee's Favorite Color",value.children[3].innerText);
                                var FavoriteAnimal = prompt("Please enter the Employee's Favorite Animal",value.children[4].innerText);

                                // call the ajax to save the data to the session
                                $.get('example4.php', 
                                    { Edit: true
                                        , OrgEmpID: OrgEmpID
                                        , EmpID: EmpID
                                        , Name: Name
                                        , PrimaryLanguage: PrimaryLanguage
                                        , FavoriteColor: FavoriteColor
                                        , FavoritePet: FavoriteAnimal  }
                                    , function(){
                                        // when ajax returns (callback), update the grid to refresh the data
                                        $(".flexme4").flexReload();
                                });
                        });    
                    }
                }
                else if (com == 'Add') {
                    // collect the data
                    var EmpID = prompt("Please enter the Employee ID","5");
                    var Name = prompt("Please enter the Employee Name","Mark");
                    var PrimaryLanguage = prompt("Please enter the Employee's Primary Language","php");
                    var FavoriteColor = prompt("Please enter the Employee's Favorite Color","Tan");
                    var FavoriteAnimal = prompt("Please enter the Employee's Favorite Animal","Dog");

                    // call the ajax to save the data to the session
                    $.get('example4.php', { Add: true, EmpID: EmpID, Name: Name, PrimaryLanguage: PrimaryLanguage, FavoriteColor: FavoriteColor, FavoritePet: FavoriteAnimal  }
                        , function(){
                            // when ajax returns (callback), update the grid to refresh the data
                            $(".flexme4").flexReload();
                    });
                }
            }
						   });