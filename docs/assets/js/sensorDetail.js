function loadSensorDetailData(a,e){for(var t=0;t<e.length;t++){var l=e[t]["Sensor Class"];for(var r in l)if(r==a){var i=l[a];i.Library=e[t].Library;var o=$("#sensorDetailPageTemplate").html(),s=Handlebars.compile(o),n=s(i);$("#sensorDetailPage").html(n)}}}function GetSensorData(){$.ajax({cache:!0,url:"/upm/assets/content/sensorDetail.json?_=1",type:"GET",dataType:"json",success:function(a){loadSensorDetailData(getQueryVariable("name"),a),InitializeCarousel(a),InitializeCodeSample()},error:function(a){alert("Error! Please try again."+a.responseText),console.log(a)}})}function InitializeCarousel(a){$(".carousel .item").length?($(".carousel").find(".item").first().addClass("active"),$(".carousel").find(".carousel-indicators li").first().addClass("active"),$(".carousel").carousel({interval:2e3})):$("#carousel-section").hide()}function InitializeCodeSample(){$('a[data-toggle="tab"]').on("show.bs.tab",function(a){loadCodeSamples($(a.target).parent())}),loadCodeSamples($(".nav-pills li:first"))}function loadCodeSamples(a){var e=a;"false"==(e.attr("data-flag")||"false")&&$.ajax({cache:!1,url:"https://raw.githubusercontent.com/intel-iot-devkit/upm/master/examples/"+a.attr("data-parent")+"/"+a.attr("data-value").split(",")[0],success:function(a,t,l){var r=a;r="python"==e.attr("data-parent")?a.replace(/(#.*?\n){4,}/g,""):a.replace(/\/\*[^]*?\*\//g,""),r=r.replace(/^[\s]*$\n/m,""),$("#"+e.attr("data-id")).find("code").text(r),hljs.highlightBlock($("#"+e.attr("data-id")).find("code")[0]),e.attr("data-flag","true")}})}$(document).ready(function(){GetSensorData()});