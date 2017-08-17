function GetLunrIndex(){$.ajax({cache:!0,url:"/assets/content/LunrIndex.json?_=1",type:"GET",dataType:"json",success:function(e){PrepareLunrIndex(e);var t="",n=getQueryVariable("category")||"";if(""!=n){var a=n.split(",");for(i=0;i<a.length;i++){var r=$('input[type="checkbox"][value="'+a[i]+'"]');r.prop("checked",!0);var o=r.parentsUntil(".panel-default",".panel-body");o.hasClass("read-more")&&o.siblings(".show-more").click()}t=PrepareFilter()}Search(t)},error:function(e){alert("Error! Please try again."+e.responseText),console.log(e)}})}function FilterLurData(){Search(PrepareFilter())}function PrepareFilter(){var e=[];return $filterCheckboxes.filter(":checked").length>0?$filterCheckboxes.filter(":checked").each(function(){var t=this.name.replace(/\s/g,"");e.hasOwnProperty(t)||(e[t]=[]),e[t].push(this.value.replace(/\s+/g,"_|_"))}):e=null,e}function Search(e){var t=null;if(e)for(var n in e){var a=Object(),r=new Object;r[n]={boost:1},a.fields=r;var o=[];o.push(idx.search(e[n].join(" "),a)),o.length>0&&(o=o[0],t?(t=t||[],t=Intersect(t,o)):t=o)}else{t=[];for(var n in idx.documentStore.docs)t.push(idx.documentStore.docs[n])}BindSensorResult(t)}function Intersect(e,t){for(var n=[],a=0;a<e.length;a++)for(var r=0;r<t.length;r++)if(e[a].ref===t[r].ref){n.push(e[a]);break}return n}function bindPagination(){$(".page_navigation").show(),$("#findSensor").pajinate({num_page_links_to_display:6,items_per_page:50})}function hidePagination(){$(".page_navigation").hide()}function BindSensorResult(e){var t=Handlebars.compile($("#findSensorDetail").html()),n=$("#findSensor .content");n.html("");var a=[];if(e.length>0){if(e[0].ref)for(var r=0;r<e.length;r++)a.push(e[r].doc);else a=e;n.html(t(a)),bindPagination()}else{n.html('<div class="no-results">No sensors match the selected filters.</div>'),hidePagination()}}function GetFacetsData(){$.ajax({cache:!0,url:"/assets/content/facets.json?_=1",type:"GET",dataType:"json",success:function(e){PrepareFacetOptions(e),$filterCheckboxes=$('#leftSection input[type="checkbox"]')},error:function(e){alert("Error! Please try again."+e.responseText),console.log(e)}})}function PrepareFacetOptions(e){var t=$("#accordianTemplate").html(),n=Handlebars.compile(t),a=n(e);$("#accordion").html(a),checkSeeMoreOption()}function checkSeeMoreOption(){var e=$(".panel-body");for(i=0;i<e.length;i++)e[i].children.length>5?(e[i].nextElementSibling.style.display="block",e[i].style.height="160px"):e[i].style.height="auto"}function LoadMoreData(){$(this).parent().find(".panel-body").toggleClass("read-less").toggleClass("read-more"),"See more..."==$(this).text()?$(this).text("See less..."):$(this).text("See more...")}var searchterm=[];$(document).ready(function(){GetFacetsData(),GetLunrIndex()}),jQuery.ui.autocomplete.prototype._resizeMenu=function(){this.menu.element.outerWidth(this.element.outerWidth())},$("#searchBox").length>0&&($("#searchBox").autocomplete({source:function(e,t){var n=idx.search(e.term,{fields:{PartNumbers:{boost:2},Brief:{boost:2}},expand:!0});if(0==n.length){var a=new Object;a.ref=-1,n.push(a)}t(n)},focus:function(e,t){return(t.item.ref||"").length>0&&$("#searchBox").val(t.item.doc.Brief),!1},select:function(e,t){e.preventDefault(),(t.item.ref||"").length>0&&(location.href="/sensorDetail.html?name="+t.item.ref)}}).autocomplete("instance")._renderItem=function(e,t){return-1!=t.ref?$("<li>").addClass("ui-menu-item").attr("data-id",t.ref).append("<div class='ui-menu-item-wrapper'>"+t.doc.Brief+" ("+ConcatenateArray(t.doc.PartNumbers)+")</div>").appendTo(e):$("<li>").addClass("ui-autocomplete-noresult").append("<div class='ui-menu-item-wrapper'>No Results Found !!</div>").appendTo(e)},$(window).resize(function(){$("#searchBox").autocomplete("close")})),$("body").on("click",".show-more",LoadMoreData),$("#menu-hide").click(function(){$(".left-container").hasClass("open")?$(".left-container").removeClass("open"):$(".left-container").addClass("open")}),$(document).ready(function(){$("#menu-hide").click(function(){$(this).toggleClass("open")})});