$(document).ready(function() {



	//to check user has visited has visited first time and to check the consent and to take appropriate action:
	$.ajax({
	  	url:"essentials.php",
	  	success:function(result)
	  	{
			var obj = jQuery.parseJSON(result);
			
			
			//check its the users first time
			if(obj[0] == 0)
			{
				$("#results").css("display","none");
			}
			else
			{
				$("#results").css("display","");
			}
			
			
			//to check the consent value and take the appropriate action
			if(obj[1] == 0)
			{
				$("#consent-main, #consent-panel").fadeIn(300);
				$("#close1").hide();
				$("#close2").hide();
			}
			else if(obj[1] == 1)
			{
				$("#agree").hide();
				$("#disagree").hide();
			}
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	//If the user is here for the first time, then the user will be asked to either click agree or the disagree button. the following code defines those actions.
	
	//disagree clicked
	$("#disagree").click(function() {
		var url = "//facebook.com";
		$(location).attr('href',url);
	});
	
	
	//agree clicked
	$("#agree").click(function() {
		$.ajax({
		  	url:"consent_submit.php",
		  	success:function(result)
		  	{
		  		if(result == "success")
		  		{
		  			$("#consent-main, #consent-panel").fadeOut(300);
		  			$("#close1").show();
					$("#close2").show();
		  		}
			}
		});
	});
	
	
	
	
	
	
	
	
	
	//To hide/show the consent********************************************
	
	$("#show_consent").click(function(){
		$("#consent-main, #consent-panel").fadeIn(300);
		$("#agree").hide();
		$("#disagree").hide();
		$("#my-window").css("overflow","hidden");
	})
	
	//to hide the shown consent
	$("#close1").click(function(){
		$("#consent-main, #consent-panel").fadeOut(300);
		$("#my-window").css("overflow","");
	});
	
	//to hide the shown consent
	$("#close2").click(function(){
		$("#consent, #consent-panel").fadeOut(300);
		$("#my-window").css("overflow","");
	});
	
	
	
	

	
	
	
	
	
	
	//By default we don't want to show either the graph or the table or the exceptions.
	$("#mytable").css("display","none");
	$("#graph-space").css("display","none");
	$("#exceptions").hide();
	$("#hide_exc").hide();
	
	
	
	
	
	//If you want to hide your exceptions, then click this
	$('#hide_exc').click(function() {
			$("#exceptions").hide();
			$("#hide_exc").hide();
	});
	
	
	
	
	//select table to show****************************************************************************************
	$("#show_table").click(function() {
			
			//we exchange onlink because to show the selected effect.
			$("#show_graph").removeClass("onlink");
			$("#show_table").addClass("onlink");
			
			//hide the graph and show the table
			$("#graph-space").hide();
			$("#mytable").show();
			
			//we need to hide the exceptions div
			$("#exceptions").hide();
			
			//then finally call this function that brings the table data.
			show_table();
	});
	
	
	
	//function to show table
	function show_table()
	{
		$("#table_body").html("");
		$.ajax({
			url:"bring_data.php",
			success:function(result)
			{
				$("#table_body").append(result);
			}
		});
	}
	
	
	
	
	
	
	
	
	
	
	//select graph to show****************************************************************************************
	$("#show_graph").click(function() {
			
			//we exchange onlink because to show the selected effect.
			$("#show_table").removeClass("onlink");
			$("#show_graph").addClass("onlink");
			
			//hide the table and show the graph
			$("#mytable").hide();
			$("#graph-space").show();
			
			//then finally call this function that brings the graph data.
			bring_graph_data(1);
	});
	
	
	
	//function to show graph
	function show_graph(arrayOfDataMulti,cat,cus_legends)
	{
			$('#mygraph').html('');
			
			if(cat == 1)
			{
					$('#mygraph').jqBarGraph({
						data: arrayOfDataMulti,
						colors: ['#242424','#437346','#97D95C'],
						width: 600,
						legendWidth: 200,
						legend: true,
						legends: cus_legends,
						barSpace: 20
					}); 
			}
			
			else if(cat == 2)
			{
					$('#mygraph').jqBarGraph({
						data: arrayOfDataMulti,
						colors: ['#242424','#437346','#97D95C'],
						width: 600,
						legendWidth: 200,
						legend: true,
						legends: cus_legends,
						barSpace: 20,
						type: 'multi'
					}); 
			}
	}
	
	
	
	
	//switching between graph-menu
	$("#dis1").click(function() {
			$("#dis2").removeClass("selected");
			$(this).addClass("selected");
			bring_graph_data(1);
	});
	
	$("#dis2").click(function() {
			$("#dis1").removeClass("selected");
			$(this).addClass("selected");
			bring_graph_data(2);
	});
	
	
	
	function bring_graph_data(cat)
	{
			$.post("graph_data.php",{category: cat},
			function(data) {
				var obj = jQuery.parseJSON(data);
				
				var parsed_data = new Array();
				var exception_array = new Array();
				
				jQuery.each(obj, function() {
						var temp = this[1];
						
						var found = 0;
						var pos = 0;
						
						if(parsed_data.length == 0)
						{
								var pos2 = 0;
								
								parsed_data[pos2] = new Array();
								parsed_data[pos2][0] = temp;		//******************************Attention Here*********************************
								parsed_data[pos2][1] = 0;	//position 1 is for "Friends".
								parsed_data[pos2][2] = 0;	//position 2 is for "Friends of Friends".
								parsed_data[pos2][3] = 0;	//position 3 is for "Public".
								found = 1;
								pos = 0;
								
								exception_array[pos2] = new Array();
								exception_array[pos2][0] = "";	//exception 0 is for "Friends".
								exception_array[pos2][1] = "";	//exception 1 is for "Friends of Friends".
								exception_array[pos2][2] = "";	//exception 2 is for "Public".
						}
						
						else
						{
							var x = 0;
							var y = parsed_data.length;
							
							for(x = 0; x < y; x++)
							{
									if(parsed_data[x][0] == temp)
									{
											found = 1;
											break;
									}
							}
							
							pos = x;
						}

						
						if(found == 0)
						{
								var pos2 = parsed_data.length;
										
								parsed_data[pos2] = new Array();
								parsed_data[pos2][0] = temp;
								parsed_data[pos2][1] = 0;	//position 1 is for "Friends".
								parsed_data[pos2][2] = 0;	//position 2 is for "Friends of Friends".
								parsed_data[pos2][3] = 0;	//position 3 is for "Public".
								
								found = 1;
								pos = pos2;
								
								exception_array[pos2] = new Array();
								exception_array[pos2][0] = "";	//exception 0 is for "Friends".
								exception_array[pos2][1] = "";	//exception 1 is for "Friends of Friends".
								exception_array[pos2][2] = "";	//exception 2 is for "Public".
						}
						
						if(found == 1)
						{
								var temp2 = this[2];
								
								if(temp2 == "everyone")
								{
										parsed_data[pos][1] += 1;
										parsed_data[pos][2] += 1;
										parsed_data[pos][3] += 1;
								}
								
								else if(temp2 == "friends")
								{
										parsed_data[pos][1] += 1;
								}
										
								else if(temp2 == "only me")
								{
										parsed_data[pos][3] += 1;
								}
										
								else if(temp2 == "public")
								{
										parsed_data[pos][1] += 1;
										parsed_data[pos][2] += 1;
										parsed_data[pos][3] += 1;
								}
										
								else if(temp2 == "friends of friends")
								{
										parsed_data[pos][2] += 1;
										parsed_data[pos][1] += 1;
								}
								
								else if(temp2 == "custom_value")
								{
										if(this[3] == "111")
										{
												$.post("more_graph_data.php",{setRef: this[0]},
												function(new_res) {
														var my_res = jQuery.parseJSON(new_res);
														var label = "";
														var set_exc_rule = "";
														var toAppend = "";
														var real_exc = 0;
														
														jQuery.each(my_res, function() {
																if(this[0] == "special")
																{
																		label = this[1];
																		toAppend = "<h3><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Exceptions List___</u></h3><br />---->Exceptions for  <u>" + label + "</u><br /><br />";
																}
																else if(this[0] == "friends" && this[1] == "30")
																{
																		parsed_data[pos][1] += 1;	//what to do for this case ???????????????????????????????????????????????
																		set_exc_rule = "o";		//??????????????????????????????????????????????????????????????????????????????
																}
																else if(this[0] == "friends" && this[1] == "40")
																{
																		parsed_data[pos][1] += 1;
																		set_exc_rule = "f";
																}
																else if(this[0] == "friends" && this[1] == "50")
																{
																			parsed_data[pos][1] += 1;
																			parsed_data[pos][2] += 1;
																			set_exc_rule = "ff";
																}
																else if(this[0] == "ids_x_anon" || this[0] == "ids_anon" || this[0] == "lists" || this[0] == "lists_x")
																{
																		real_exc = 1;
																		if(this[0] == "ids_x_anon")
																		{
																				this[0] = "Not Allowed to this Person: ";
																		}
																		else if(this[0] == "ids_anon")
																		{
																				this[0] = "Allowed to this Person: ";
																		}
																		else if(this[0] == "lists")
																		{
																				this[0] = "Allowed to this List: ";
																		}
																		else if(this[0] == "lists_x")
																		{
																				this[0] = "Not Allowed to this List: ";
																		}
																		
																		toAppend += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this[0] + "----->" + this[1] + "<br />";
																}
														});
														
														if(set_exc_rule == "f" && real_exc == 1)
														{
																exception_array[pos][0] = toAppend;//set the exclamation mark
																set_exc_rule = "";
																 real_exc == 0;
														}
														else if(set_exc_rule == "ff" && real_exc == 1)
														{
																exception_array[pos][0] = toAppend;//set the exclamation mark
																exception_array[pos][1] = toAppend;//set the exclamation mark
																set_exc_rule = "";
																real_exc == 0;
														}
														else if(set_exc_rule == "o" && real_exc == 1)
														{
																exception_array[pos][2] = toAppend;//set the exclamation mark
																set_exc_rule = "";
																real_exc == 0;
														}
														else
														{
																toAppend = "";
														}
												});
										}
										//For custom value 50 what to increment ?????????????????????????????????????????????????????????????????????????
								}
								/*
								else
								{
										parsed_data[pos][3] += 1;
								}
								*/
						}
								
						
				});
				
				cus_legends = new Array(
					['Friends'],
					['Friends of Friends'],
					['Public']
				);
				
				arrayOfDataMulti = new Array();
				var j = 0;
				alert("hi");
				jQuery.each(parsed_data, function() {
						var total = this[1] + this[2] + this[3];
						var percent1 = parseInt((this[1] / total) * 100);
						var percent2 = parseInt((this[2] / total) * 100);
						var percent3 = parseInt((this[3] / total) * 100);
						
						arrayOfDataMulti[j] = new Array();
						arrayOfDataMulti[j][0] = new Array();
						arrayOfDataMulti[j][0][0] = percent1;
						arrayOfDataMulti[j][0][1] = percent2;
						arrayOfDataMulti[j][0][2] = percent3;
						arrayOfDataMulti[j][1] = this[0];
						arrayOfDataMulti[j][2] = new Array();
						arrayOfDataMulti[j][2][0] = exception_array[j][0];
						arrayOfDataMulti[j][2][1] = exception_array[j][1];
						arrayOfDataMulti[j][2][2] = exception_array[j][2];
						j++;
				});
				
				show_graph(arrayOfDataMulti,2,cus_legends);
			});
	}
});