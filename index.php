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
		<div id="my-window">
			
	


			<!--the menu bar on the top is shown here. it has two parts. the name of the website and a link that is to show consent to user.-->
			<div id="menu">
				<ul id="menu-bar">
					<li>__frivacy___________</li>
				</ul>
				
				<div id="r-consent">
					<a href="#" id="show_consent">Show Consent</a>
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
				
								<h2 align="center">Addressing Security Issues and Privacy Protection in Social Networking Systems</h2>
				
								<p><u>Principal Investigator: James Joshi (jjoshi@sis.pitt.edu, 412-624-9982)</u></p>
				
								<p>
								<u><b>Contact Information:</b></u>
								Questions about this research study should be directed to the primary research conductor, Amirreza Masoumzadeh (amirreza@sis.pitt.edu), or the principal investigator, James Joshi (jjoshi@sis.pitt.edu).
								</p>
				
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
			</div> <!-- End of header -->
		
			
			
			
			
			<!--body will have 3 main parts.
				1) the instructions
				2) menu
				3) display area
			-->
			<div id="body">
				
				
				<div id="scan-settings">
					
					<!--
					<div id="setting-animation">
						<h3 id="progress-texts">Your Progress</h3>
						
						<img id="progress" />
					</div>
					-->
					
					
					<div id="setting-texts">
						<h2>Follow these easy steps in order to scan your privacy settings:<br /></h2>
						<h4>1. Drag and drop &lsaquo; <a href='javascript:( function(){	if(!window.jQuery)	{		jq = document.createElement("SCRIPT");		jq.type = "text/javascript";		jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";		document.getElementsByTagName("head")[0].appendChild(jq);	}		bookmarklet = document.createElement("SCRIPT");	bookmarklet.type = "text/javascript";	bookmarklet.src = "https://lersais.exp.sis.pitt.edu/frivacy/frivacy-client.js?v=1";	document.getElementsByTagName("head")[0].appendChild(bookmarklet);})();'>Frivacy Scan!</a> &rsaquo; to your bookmarks toolbar.</h4>
						<h4>2. Navigate to your Facebook home page <a href="//facebook.com" target=_blank">facebook.com</a></h4>
						<h4>3. Click on your "Frivacy Scan!" bookmark</h4>
					</div>
				</div> <!-- End of scan-settings -->
				
				
				
				
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
											<thead>
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
								<div id="graph-menu">
									<ul id="g-menu">
										<li id="dis1" class="selected">Display 1</li>
										<li id="dis2">Display 2</li>
									</ul>
								</div>
								
								
								<div id="mygraph">
								</div>
						</div>
						
						
						
						
						<!-- This div is needed to show the exceptions that may be present in the graph part. -->
						<button id="hide_exc"><img src="images/close.png">Hide Exceptions</button>
						<div id="exceptions">
						</div>
						<!-- End of exceptions -->
				
				
						
					</div>
					<!--#actual-result ends here.-->
					
					
					
				</div> <!-- End of results -->
				
				
				
			</div> <!-- End of body -->
		
		
		
		
			<div id="footer">
			</div>
			
			
		</div> <!-- End of my-window -->
	</body>
</html>
