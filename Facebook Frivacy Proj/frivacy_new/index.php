<?php
	require "create_session.php";
?>

<html>
	
	<!--head is here.-->
	<head>
			<title>Frivacy</title>
			
			<!-- all stylesheet must be attached here.-->
			<link rel="stylesheet" type="text/css" href="css/index.css" />
			
			<!--all scripts must be attached here.-->
			<script type="text/javascript" src="js/jquery.js"></script>
			<script type="text/javascript" src="js/jqBarGraph.1.js"></script>
			<script type="text/javascript" src="js/index.js"></script>
			
	</head>
	<!--head ends here.-->
	
	
	<!--body is here.-->
	<body>
		<!--my-window tag is the whole area where everything resides. you can move this div anywhere and the whole page will follow.-->
		<div id="my-window" style="display: none">
			
			<!--the menu bar on the top is shown here. it has two parts. the name of the website and a link that is to show consent to user.-->
			<div id="menu-bar">
				<img src="images/icon.png" />
			</div>
			
			<div id="menu">
				<div id="r-consent">
					<a href="#" id="show_about" style="cursor: pointer">About Frivacy</a>
					<a href="#" id="show_consent" style="cursor: pointer">Show Consent</a>
				</div>
				
				<iframe src="https://www.facebook.com/plugins/like.php?href=https://apps.facebook.com/frivacy/" id="like" scrolling="no" frameborder="0" style="border:none; width:450px; height:80px">
				</iframe>
			</div>
			
			<div id="m-consent">
				<span><button id="launch" class="button" value="<?php echo $_SESSION['uid']; ?>">Scan Now</button></span>
				<span><label>Last Scan(GMT):    </label><div id="scan-detail">No Last Scan Found. Please scan your settings.</div></span>
			</div>
			
			<div id="error-panel">
				<div id="error-report">
					<img src="images/error.png" width="25px" height="25px" />
					
					<label id="put_error">No Errors.</label>
				</div>
			</div>
			
			
			<!--header only contains things related to consent.-->
			<div id="header">
				<div id="consent">
	
							<!--*******************************************CONSENT TEXT*******************************************************************-->
							<!--consent-panel contains all the textual materials. this has nothing to do in the code.-->
							<div id="consent-panel">
								<p>
									<a href="" border="0"><img align="right" id="close2" src="images/close.png" width="25px" height="25px" /></a>
								</p>
				
								<h3 align="center"><u>Consent to Act as a Participant in a Research Study</u></h3>
								<br />
								<h2 align="center">Addressing Security Issues and Privacy Protection in Social Networking Systems</h2>
								<br />
								<p><u>Principal Investigator: James Joshi (jjoshi@sis.pitt.edu, 412-624-9982)</u></p>
								<br />
								<p>
								<u><b>Contact Information:</b></u>
								Questions about this research study should be directed to the primary research conductor, Amirreza Masoumzadeh (amirreza@sis.pitt.edu), or the principal investigator, James Joshi (jjoshi@sis.pitt.edu).
								</p>
								<br />
								<p>
								<div id="p1"><u><b>Purpose and Procedures:</b></u></div>
								<div id="para1">
								This study will investigate the privacy and security needs of users in social networking environments, and evaluate techniques and tools to help users achieve better protection in such systems. As a participant in this study, you will be asked to allow access to the related information to security and privacy of your shared information in Facebook. The collected information includes your privacy settings, attributes, friend list, information about wall posts, tags, etc. You may also be asked to try our tools to configure your settings and evaluate their effectiveness to fulfill your privacy and security desires. The information collection and tools will be in the form of running script on your browsers or installing a specific Facebook application on your account. Moreover, we may ask you to complete surveys and questionnaires.
								</div>
								</p>
				
				
								<p>
								<div id="p2"><u><b>Voluntariness:</b></u></div>
								<div id="para2">
								Your participation in this research study is entirely voluntary, and you can, at any time, withdraw from this research study. Your decision to withdraw from this study will have no effect on your current or future relationship with the University of Pittsburgh. Also, your participation or withdrawal from this study will have no effect on your account on Facebook.
								</div>
								</p>
				
				
								<p>
								<div id="p3"><u><b>Risks and Benefits:</b></u></div>
								<div id="para3">
								No changes to your settings in Facebook will be made without your permission. There is minimal risk of a breach of confidentiality. The study will contribute to the understanding of privacy and security issues in social networking systems for the benefit of the generic users of these systems. You may benefit from our analysis of your security/privacy settings and preferences, and the suggestions provided by our tools regarding your settings. However, no benefits are guaranteed.
								</div>
								</p>
				
				
								<p>
								<div id="p4"><u><b>Compensation:</b></u></div>
								<div id="para4">
								N/A
								</div>
								</p>
				
				
								<p>
								<div id="p5"><u><b>Privacy and Confidentiality:</b></u></div>
								<div id="para5">
								Your information will be kept confidential and used solely for the purpose of this study. We will only collect and store information that is relevant and required for the purpose of the study. All the collected information will be stored securely in our database. In the publications as the results of this study, we will not disclose any personal identifying information. In unusual cases, your research records may be released in response to an order from a court of law. It is also possible that authorized representatives from the University of Pittsburgh Research Conduct and Compliance Office may review your data for the purpose of monitoring the conduct of this study. Note that as per the University of Pittsburgh policy all research records will be maintained for at least 7 years following final reporting or publication of the study.
								</div>
								</p>
				
				
								<p><br /><h4><font color="red">I understand that I may always request that my questions, concerns or complaints be addressed by a listed investigator. I understand that I may contact the Human Subjects Protection Advocate of the IRB Office, University of Pittsburgh (1-866-212-2668) to discuss problems, concerns, and questions; obtain information; offer input; or discuss situations that occurred during my participation.</font></h4>
								</p>
				
				
								<p align="right">
									<button type="button" id="close1" href="#">Close</button>
									
									<div id="decision" align="right">
										<button type="button" id="agree" href="#">I Agree</button>
										<button type="button" id="disagree" href="#">I Disagree</button>
									</div>
								</p>
							</div><!-- End of consent-panel -->
							<!--*******************************************CONSENT TEXT ENDS*******************************************************************-->
	
	
					<!--the consent-main panel here is used to show some buttons that is shown according to arrival of user.-->
					<div id="consent-main">
					</div><!-- End of consent-main -->
					
					
				</div> <!-- End of consent -->
				
				<div id="about">
	
							<div id="about-panel">
								<p>
									<a href="" border="0"><img align="right" id="close4" src="images/close.png" width="25px" height="25px" /></a>
								</p>
								
								<p>
									<u>App Version: 1.0</u><br />
									(School of Information Science, University of Pittsburgh)
								</p>
								
								<p>
									Principal Investigator: James Joshi (jjoshi@sis.pitt.edu, 412-624-9982)
								</p>
								<p>
									Research Conductor: Amirreza Masoumzadeh (amirreza@sis.pitt.edu)
								</p>
								<p>
									Developer: Rahul Chaudhary (rac130@pitt.edu)
								</p>
								<p>
									Special Thanks To: Angella Horneman
								</p>
							</div><!-- End of about-panel -->
							
	
	
					
					<div id="about-main">
					</div><!-- End of about-main -->
					
					
				</div> <!-- End of about -->
				
			</div> <!-- End of header -->
		
			
			
			
			
			<div id="body">
				
				<div id="results">
					
					<div id="tab">
						<div id="holder">
							<ul>
								<li><a href="#" id="show_graph">Show Graph</a></li>
								<li><a href="#" id="show_table">Show Table</a></li>
							</ul>
						</div>
					</div>
					
					<div id="actual_results">
						
						<div id="mytable" value="current">
									<table id="rounded-corner">
											<thead id="theadss">
												<tr>
													<th class="rounded-tables">Elements</th>
													<th>Privacy Settings</th>
													<th class="rounded-q1">Customized Value</th>
												</tr>
											</thead>
											
											<tbody id="table_body">
											</tbody>
									</table>
						</div>
						
						
						<div id="graph-space" value="">
								
								<div id="add_menu">
									<input type="radio" id="dis1" name="cat" checked value="Category1">Category 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<input type="radio" id="dis2" name="cat" value="Category2">Category 2
								</div>
								
								<label id="usr-help">Note: Click on a graph-bar for more information.</label>
								
								<div id="graph-helper">
								<!-- 
									If you want to change the contents of tool-tip, then do so here.
								-->
									<button type="button" id="leg_help" href="#" class="button2">Labels<span class="custom info"><img src="images/Info.png" alt="Information" height="48" width="48" /><em>Labels</em>Each graph-bar has a "graph-class" that is provided below the graph-bars. In this section you will see all those settings that fall under this "class" and were used while producing your graph.</span></button>
									<button type="button" id="exc_help" href="#" class="button2">Exceptions<span class="custom info"><img src="images/Info.png" alt="Information" height="48" width="48" /><em>Exceptions</em>The graph-bar that you clicked may contain some exceptions that you have defined in your facebook settings. All those exceptions appear in this section. To show each exception, its name is provided as a header.</span></button>
									<button type="button" id="label_exc_help" href="#" class="button2">X-Labels<span class="custom info"><img src="images/Info.png" alt="Information" height="48" width="48" /><em>X-labels</em>These are those fields that cannot be counted as your privacy settings, and thus are NOT included while your graph was produced.</span></button>
									<table>
										<tr id="excs">
											<td>
											<br />
											<!-- This div is needed to show the exceptions that may be present in the graph part. -->
											<div id="exceptions">
											</div>
											<!-- End of exceptions -->
											</td>
										</tr>
										
										<tr id="legs">
											<td>
											<br />
											<!-- This div is needed to show the legends. -->
											<div id="legends">
											</div>
											<!-- End of legends -->
											</td>
										</tr>
										
										<tr id="label-exceps">
											<td>
											<br />
											<!-- This div is needed to show the label exceptions. -->
											<div id="label-exc-div">
											</div>
											<!-- End of label exceptions -->
											</td>
										</tr>
									
									
									</table>
								</div>
								
								
								<div id="mygraph">
									<div id="loader">
									</div>
								</div>
						</div>
						
					</div>
					<!--#actual-result ends here.-->
					
					
					
				</div> <!-- End of results -->
				
				<?php
					//check if we have the read_friendlists permission, because we need that permission.
					$fql_query_url = 'https://graph.facebook.com/' . $_SESSION['uid'] . '/permissions?'
						. '&access_token=' . $_SESSION['access_token'];
					
					$fql_query_result = file_get_contents($fql_query_url);
					$results = json_decode($fql_query_result, true);
					
					if(array_key_exists("read_friendlists", $results['data'][0]))
					{
						$myscript = "
						<script language=javascript>
							$('#error-panel').hide();
						</script>
						";
						echo $myscript;
					}
					else
					{
						$myscript = "
						<script language=javascript>
							$('#put_error').html('You have not provided us suffucient permissions. Please do so on your next visit.');
						</script>
						";
						echo $myscript;
					}
				?>
				
			</div> <!-- End of body -->
		
			
			<div id="footer">
			</div>
			
			
		</div> <!-- End of my-window -->
	</body>
</html>
