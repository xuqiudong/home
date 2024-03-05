var host = "https://xuqiudong.cn";
var $ul;
var $contentFoot;

var categoryLiHtml, navHeadHtml, navHtml;
(function() {
	//分类
	$ul = $("ul.main-menu");
	//站点
	$contentFoot = $("div.main-content footer.main-footer");
	initTemplate();
	//分类列表
	var categorys = [];


	var url = host + "/nav/category/all?v=" + Math.random();
	$.ajax(url, {
		type: "get",
		async: false,
		dataType: 'json',

	}).done(function(res) {
		if (res.code == 0) {
			categorys = res.data;
			appendCatgorys(categorys);

		} else {
			console.log(res.msg);
		}
	}).fail(function(msg) {
		console.error("fail " + msg)
	});


})();


//追加分类
function appendCatgorys(categorys) {
	if (!categorys) return;
	categorys.forEach(function(category) {
		let $cli = $(categoryLiHtml);
		let $a = $("a", $cli).attr("href", "#" + category.code);
		$("i", $a).addClass(category.icon || "linecons-star");
		$("span.title", $a).text(category.title);
		$ul.append($cli);
		if (category.sites) {
			appendSites(category, category.sites);
		}

	});
}

function appendSites(category, sites) {
	var $navHead = $('<h4 class="text-gray"><i class="linecons-tag" style="margin-right: 7px;" id="' + category.code +
		'"></i>' + category.title + '</h4>');
	$contentFoot.before($navHead);
	var $row = $(`<div class="row"></div>`);
	$contentFoot.before($row);
	for (var i = 0; i < sites.length; i++) {
		var $col = $(navHtml);
		if (i > 0 && i % 4 == 0) {
			$row = $(`<div class="row"></div>`);
			$contentFoot.before($row);
		}
		var site = sites[i];
			//			 
		var $labelInfo = $("div.label-info", $col).attr("data-original-title", site.title || site.url);
		$labelInfo.attr("onclick", "window.open('"+site.url+"', '_blank')");
		
		//img
		$(".xe-user-img img", $col).attr("data-src", site.logo || "./assets/images/logos/default.png")
		$(".xe-comment strong", $col).text(site.name);
		$(".xe-comment p", $col).text(site.description);
		$row.append($col);
	}
	$contentFoot.before($("<br />"));

}

function initTemplate() {
	categoryLiHtml =
		`<li>
			<a href="#lcxm-home" class="smooth">
				<i class=""></i>
				<span class="title"></span>
			</a>
		</li>`;
	navHeadHtml =
		`<h4 class="text-gray"><i class="linecons-tag" style="margin-right: 7px;" id=""></i></h4>`;
	navHtml =
		`<div class="col-sm-3"> 
			 <div class="xe-widget xe-conversations box2 label-info" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="">
				<div class="xe-comment-entry">
					<a class="xe-user-img">
						<img data-src="" class="lozad img-circle" width="40">
					</a>
					<div class="xe-comment">
						<a href="#" class="xe-user-name overflowClip_1">
							<strong>-</strong>
						</a>
						<p class="overflowClip_2">-</p>
					</div>
				</div>
			</div>
		</div>`;

}
