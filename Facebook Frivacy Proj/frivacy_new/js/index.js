$(document).ready(function() {
	//the first task is to remove the style attribute for the whole page to load. This was done on purpose because without it, the users with bad inter conn
	//will see the whole page without css until jquery loads, which approx takes 10 secs to load.
	$("#my-window").removeAttr('style');
	
var bar_color1 = '#242424';
var bar_color2 = '#437346';
var bar_color3 = '#97D95C';


//By default we don't want to show either the graph or the table or the exceptions.
	$("#mytable").css("display","none");
	$("#graph-space").css("display","none");
	$("#exceptions").hide();
	$("#leg_help").hide();
	$("#legends").hide();
	$("#exc_help").hide();
	$('#label_exc_help').hide();
	
	/*

		//to detect browsers
		function BrowserDetection() {

				if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {

					var ffversion = new Number(RegExp.$1) ; 
						return "ff";
				}

				else if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {

					var ieversion = new Number(RegExp.$1); 
						return "ie";
				}

				else if (/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
					var chromeversion = new Number(RegExp.$1);
					// capture x.x portion and store as a number
						return "chrome";

				}
				else if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {

					var oprversion = new Number(RegExp.$1) ;
						return "op";
				}
				else if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
					var safariversion = new Number(RegExp.$1);
					return "sf";

				}
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		
		//Put here the code that puts appropriate button based on what browser is used by the user.
		
		
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
	*/
	
	
	
	//to bring time of last scan
	$.ajax({
	  	url:"bring_time.php",
	  	success:function(result)
	  	{
			var obj = jQuery.parseJSON(result);
			
			$("#scan-detail").html("");
			$("#scan-detail").append(obj[0]);
		}
	});

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
		var url = "//facebook.com/home.php";
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
		$("#consent-main, #consent-panel").show();
		$("#agree").hide();
		$("#disagree").hide();
		$("#my-window").css("overflow","hidden");
	});
	
	//to hide the shown consent
	$("#close1").click(function(){
		$("#consent-main, #consent-panel").hide();
		$("#my-window").css("overflow","");
	});
	
	//to hide the shown consent
	$("#close2").click(function(){
		$("#consent, #consent-panel").hide();
		$("#my-window").css("overflow","");
	});
	
	
	
	

	
	


	//To hide/show the "about"********************************************
	
	$("#show_about").click(function(){
		$("#about-main, #about-panel").fadeIn(300);
		$("#my-window").css("overflow","hidden");
	});
	
	//to hide the shown about
	$("#close3").click(function(){
		$("#about-main, #about-panel").fadeOut(300);
		$("#my-window").css("overflow","");
	});
	
	//to hide the shown about
	$("#close4").click(function(){
		$("#about, #about-panel").fadeOut(300);
		$("#my-window").css("overflow","");
	});


	
	
	//select table to show****************************************************************************************
	$("#show_table").click(function() {
			
			$("#my-window").css("overflow","");
			
			//hide the graph and show the table
			$("#graph-space").hide();
			$("#mytable").show();
			
			$("#show_graph").removeClass();
			$("#show_table").addClass("mylink");
			
			//show animation
			$("#theadss").hide();
			$('#table_body').html('');
			$("#table_body").append('<br /><br /><br /><br /><br /><h4 align="left" id="loader1">Loading...(ETA 5sec)</h4><br /><img id="loader2" align="left" src="images/loading2.gif" />');
			
			//we need to hide the exceptions div
			$("#exceptions").hide();
			$("#legends").hide();
			
			//then finally call this function that brings the table data.
			show_table();
	});
	
	
	
	//function to show table
	function show_table()
	{
		$.ajax({
			url:"bring_data.php",
			success:function(result)
			{
				$("#theadss").show();
				$("#table_body").html("");
				$("#table_body").append("<br />");
				$("#table_body").append(result);
			}
		});
	}
	
	
	
	
	
	//select graph to show****************************************************************************************
	$("#show_graph").click(function() {
		//hide the graph and show the table
		$("#graph-space").show();
		$("#mytable").hide();
		
		//show animation
		$('#mygraph').html('');
		$("#mygraph").append('<br /><br /><br /><br /><br /><h4 align="left">Loading...(ETA 10sec)</h4><br /><img align="left" src="images/loading2.gif" />');
		
		$("#show_table").removeClass();
		$("#show_graph").addClass("mylink");
		
			$("#exceptions").hide();
			$("#exc_help").hide();
			$("#leg_help").hide();
			$("#legends").hide();
			$('#label_exc_help').hide();
			$('#label-exc-div').hide();
			
		$("#dis2").removeAttr("checked");
		$("#dis1").attr("checked", "checked");
		
		//By default show first graph.
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
						colors: [bar_color1,bar_color2,bar_color3],
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
	//dis1 is for cat1
	$("#dis1").click(function() {
			//show the loading animation
			$("#mytable").hide();
			$('#mygraph').html('');
			$("#mygraph").append('<br /><br /><br /><br /><br /><h4 align="left">Loading...(ETA 10sec)</h4><br /><img align="left" src="images/loading2.gif" />');
			
			$("#graph-space").show();
			
			$("#exceptions").hide();
			$("#exc_help").hide();
			$("#leg_help").hide();
			$("#legends").hide();
			$('#label_exc_help').hide();
			$('#label-exc-div').hide();
			
			
			bring_graph_data(1);
	});
	
	//dis2 is for cat2
	$("#dis2").click(function() {
			//show the loading animation
			$("#mytable").hide();
			$('#mygraph').html('');
			$("#mygraph").append('<br /><br /><br /><br /><br /><h4 align="left">Loading...(ETA 10sec)</h4><br /><img align="left" src="images/loading2.gif" />');
			
			$("#graph-space").show();
			
			$("#exceptions").hide();
			$("#exc_help").hide();
			$("#leg_help").hide();
			$("#legends").hide();
			$('#label_exc_help').hide();
			$('#label-exc-div').hide();
			
			
			bring_graph_data(2);
	});
	
	
	
	
	var counter_e = 0;
	//switching between graph-helper
	$('#exc_help').click(function() {
			if(counter_e % 2 == 0)
			{
				$("#excs").hide();
				$('#exc_help').removeClass('button2');
				$('#exc_help').addClass('button3');
			}
			else
			{
				$("#excs").show();
				$('#exc_help').removeClass('button3');
				$('#exc_help').addClass('button2');
			}
			
			counter_e += 1;
	});
	
	var counter_l = 0;
	//switching between graph-helper
	$('#leg_help').click(function() {
			if(counter_l % 2 == 0)
			{
				$("#legs").hide();
				$('#leg_help').removeClass('button2');
				$('#leg_help').addClass('button3');
			}
			else
			{
				$("#legs").show();
				$('#leg_help').removeClass('button3');
				$('#leg_help').addClass('button2');
			}
			
			counter_l += 1;
	});
	
	
	var counter_le = 0;
	//switching between graph-helper
	$('#label_exc_help').click(function() {
			if(counter_le % 2 == 0)
			{
				$("#label-exceps").hide();
				$('#label_exc_help').removeClass('button2');
				$('#label_exc_help').addClass('button3');
			}
			else
			{
				$("#label-exceps").show();
				$('#label_exc_help').removeClass('button3');
				$('#label_exc_help').addClass('button2');
			}
			
			counter_le += 1;
	});
	
	
	
	function bring_graph_data(cat)
	{
			$.post("graph_data.php",{category: cat},
			function(data) {
				var obj = jQuery.parseJSON(data);
				
				var parsed_data = new Array();
				var exception_array = new Array();
				var legend_array = new Array();
				var label_array = new Array();
				
				$.post("get_label.php",{category: cat},
				function(mres) {
				
					var mmres = jQuery.parseJSON(mres);
					
					legend_array = mmres;
				});
				
				//get label exceptions
				$.post("get_label_exc.php",
				function(label_data) {
				
					var l_data = jQuery.parseJSON(label_data);
					
					label_array = l_data;
				});
				
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
																		toAppend = "<table class='leg_t' width='100%'><tr class='leg_th'><th colspan='2' id='exc_help'>Exceptions for " + label + "</th></tr>";
																		//"<h3><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Exceptions List___</u></h3><br />---->Exceptions for  <u>" + label + "</u><br /><br />";
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
																		
																		toAppend += "<tr class='leg' width='100%'><td>" + this[0] + "</td><td>" + this[1] + "</td></tr>";
																		//"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + this[0] + "----->" + this[1] + "<br />";
																}
														});
														
														if(set_exc_rule == "f" && real_exc == 1)
														{
																exception_array[pos][0] += toAppend;//set the exclamation mark
																set_exc_rule = "";
																 real_exc = 0;
														}
														else if(set_exc_rule == "ff" && real_exc == 1)
														{
																exception_array[pos][0] += toAppend;//set the exclamation mark
																exception_array[pos][1] += toAppend;//set the exclamation mark
																set_exc_rule = "";
																real_exc = 0;
														}
														else if(set_exc_rule == "o" && real_exc == 1)
														{
																exception_array[pos][2] += toAppend;//set the exclamation mark
																set_exc_rule = "";
																real_exc = 0;
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
				
				setTimeout(function() {
					cus_legends = new Array(
						['Friends'],
						['Friends of Friends'],
						['Public']
					);
					
					
					
					arrayOfDataMulti = new Array();
					var j = 0;
					
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
							arrayOfDataMulti[j][3] = new Array();
							arrayOfDataMulti[j][3][0] = legend_array[0][1];
							arrayOfDataMulti[j][3][1] = legend_array[1][1];
							arrayOfDataMulti[j][3][2] = legend_array[2][1];
							arrayOfDataMulti[j][4] = new Array();
							arrayOfDataMulti[j][4][0] = label_array;
							j++;
					});
					
					show_graph(arrayOfDataMulti,2,cus_legends);
				}, 10000);
			});
	}
});