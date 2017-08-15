<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript" src="<%=basePath %>/flow/js/jquery-1.6.js"></script>
	<script type="text/javascript" src="<%=basePath %>/flow/js/core/Cavans.js"></script>
	<script type="text/javascript" src="<%=basePath %>/flow/js/core/FlowNode.js"></script>
	<script type="text/javascript" src="<%=basePath %>/flow/js/core/Flow.js"></script>
	<script type="text/javascript" src="<%=basePath %>/flow/js/util/IndexCluser.js"></script>
	<script type="text/javascript" src="<%=basePath %>/flow/js/util/BasicFunction.js"></script>
	<script type="text/javascript" src="<%=basePath %>/flow/js/util/Map.js"></script>
	<script type="text/javascript" src="<%=basePath %>/flow/js/example/FlowTest.js"></script>
	<script type="text/javascript" src="<%=basePath %>/flow/js/wz_jsgraphics.js"></script>
	<style>
		div .flow{
			border:1px solid #000000;
			text-align:center;
			background:#444444;
			color:#ffffff;
			cursor:pointer;
			font-weight:bold;
		}
	</style>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body>
  	<div id="canvas"></div>
  	<div id="console" style="top:1200px;width:800px;height:500px;overflow:auto;position:absolute;float:left;"></div>
  </body>
  <script>
  	//var flow = complexTest2();
  	//var flow = evenTest2();
  	var flow = simple();
  	var cavans = new Cavans();
  	cavans.init(flow);
	cavans.show();
  </script>
</html>
